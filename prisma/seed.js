// prisma/seed.js
// Run with: npx prisma db seed
// Creates one admin account so there's someone who can approve vendors
// on a fresh database — there's no other way to create the first admin,
// since the register API always assigns the CUSTOMER role.
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@vendly.local";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name: "Admin", email, password: hashed, role: "ADMIN" },
  });

  console.log(`Admin created — email: ${email} / password: ${password}`);
  console.log("Change this password after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
