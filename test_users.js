const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testAuth() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "vendor@test.com" },
    });
    console.log(user);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
