const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Check for admin/vendor or create one
  let user = await prisma.user.findFirst({ where: { role: 'VENDOR' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Test Vendor',
        email: 'vendor2@test.com',
        role: 'VENDOR'
      }
    });
  }

  let vendor = await prisma.vendor.findFirst({ where: { userId: user.id } });
  if (!vendor) {
    vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        storeName: 'Mega Store',
        storeSlug: 'mega-store',
        status: 'APPROVED'
      }
    });
  }

  const categoryNames = ['Electronics', 'Home', 'Fashion', 'Beauty', 'Sports'];
  const categories = {};

  for (const name of categoryNames) {
    const slug = name.toLowerCase();
    let cat = await prisma.category.findUnique({ where: { slug } });
    if (!cat) {
      cat = await prisma.category.create({ data: { name, slug } });
    }
    categories[slug] = cat.id;
  }

  // Generate 20 products for each category
  const productsToCreate = [];
  
  for (const slug of Object.keys(categories)) {
    for (let i = 1; i <= 20; i++) {
      productsToCreate.push({
        name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Item ${i}`,
        slug: `${slug}-item-${i}-${Date.now()}`,
        description: `This is a highly rated ${slug} item perfect for your everyday needs.`,
        price: Math.floor(Math.random() * 200) + 9.99,
        images: [`https://picsum.photos/seed/${slug}-${i}-${Date.now()}/600/600`],
        stockCount: Math.floor(Math.random() * 50) + 1,
        sku: `${slug.toUpperCase().substring(0, 3)}-${i}-${Date.now()}`,
        vendorId: vendor.id,
        categoryId: categories[slug],
        isActive: true,
        ratingAvg: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
        ratingCount: Math.floor(Math.random() * 100)
      });
    }
  }

  // Insert in batches
  for (const p of productsToCreate) {
    await prisma.product.create({ data: p });
  }

  console.log(`Seed completed with ${productsToCreate.length} products across 5 categories.`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
