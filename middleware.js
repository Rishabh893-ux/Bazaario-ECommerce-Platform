// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/vendor")) {
      // Allow access to onboarding for users who want to become vendors
      // Allow access to policies for anyone
      if (pathname === "/vendor/onboarding" || pathname === "/vendor/policies") {
        return NextResponse.next();
      }

      if (token?.role !== "VENDOR") {
        return NextResponse.redirect(new URL("/vendor/onboarding", req.url));
      }
      // Registered but not yet approved — send to a pending-review page
      // instead of the dashboard, rather than letting them see partial data.
      if (token?.vendorStatus !== "APPROVED" && pathname !== "/vendor/pending") {
        return NextResponse.redirect(new URL("/vendor/pending", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // withAuth's own gate: must at least be signed in to reach the
      // function above. Role-specific checks happen there.
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"],
};
