const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createTestVendor() {
  const email = "vendor@test.com";
  const password = "password123";

  try {
    const hashed = await bcrypt.hash(password, 10);
    
    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      // Update password just in case
      user = await prisma.user.update({
        where: { email },
        data: { password: hashed, role: "VENDOR" }
      });
      console.log("Updated existing test vendor user.");
    } else {
      user = await prisma.user.create({
        data: { name: "Test Vendor", email, password: hashed, role: "VENDOR" },
      });
      console.log("Created test vendor user.");
    }

    // Check if vendor profile exists
    let vendor = await prisma.vendor.findUnique({ where: { userId: user.id } });
    if (!vendor) {
      vendor = await prisma.vendor.create({
        data: {
          userId: user.id,
          storeName: "Test Store",
          storeSlug: "test-store",
          description: "This is a test store",
          status: "APPROVED"
        }
      });
      console.log("Created vendor profile.");
    } else {
      vendor = await prisma.vendor.update({
        where: { userId: user.id },
        data: { status: "APPROVED" }
      });
      console.log("Updated vendor profile to APPROVED.");
    }

    console.log(`\n✅ Test vendor account is ready!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

  } catch (err) {
    console.error("Error creating test vendor:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createTestVendor();
