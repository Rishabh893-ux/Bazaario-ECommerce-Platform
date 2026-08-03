import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { checkRateLimit } from "./rateLimit";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        // Rate-limited per email so a brute-force loop against one
        // account gets throttled regardless of which IP it comes from.
        const { allowed } = checkRateLimit(`login:${credentials.email}`, { windowMs: 60_000, max: 8 });
        if (!allowed) {
          throw new Error("Too many attempts — try again in a minute");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { vendor: true },
        });

        // Same generic error whether the email doesn't exist or the
        // password is wrong — don't let the response shape leak which.
        if (!user || !user.password) throw new Error("Invalid email or password");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          vendorId: user.vendor?.id ?? null,
          vendorStatus: user.vendor?.status ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Only runs on sign-in — subsequent requests reuse the token,
      // so role checks in middleware never hit the DB.
      if (user) {
        token.role = user.role;
        token.vendorId = user.vendorId;
        token.vendorStatus = user.vendorStatus;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.vendorId = token.vendorId;
      session.user.vendorStatus = token.vendorStatus;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
