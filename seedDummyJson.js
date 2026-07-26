const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function seed() {
  let vendor = await prisma.vendor.findFirst();
  if (!vendor) {
    console.log("No vendor found. Create one first.");
    return;
  }

  console.log("Fetching products from DummyJSON...");
  const res = await fetch('https://dummyjson.com/products?limit=50');
  const data = await res.json();
  const products = data.products;

  let count = 0;
  for (const item of products) {
    console.log(`Uploading ${item.title}...`);
    try {
      const uploadRes = await cloudinary.uploader.upload(item.thumbnail, { folder: 'vendly_real' });
      
      let catSlug = item.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
      let cat = await prisma.category.findUnique({ where: { slug: catSlug } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name: item.category, slug: catSlug } });
      }

      await prisma.product.create({
        data: {
          name: item.title,
          slug: `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
          description: item.description,
          price: item.price,
          images: [uploadRes.secure_url],
          stockCount: item.stock,
          sku: item.sku || `SKU-${Date.now()}-${count}`,
          vendorId: vendor.id,
          categoryId: cat.id,
          isActive: true,
          ratingAvg: item.rating,
          ratingCount: Math.floor(Math.random() * 200) + 10
        }
      });
      console.log(`Created ${item.title}`);
      count++;
    } catch (e) {
      console.error(`Failed on ${item.title}`, e.message);
    }
  }

  console.log(`Finished adding ${count} new realistic products!`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
