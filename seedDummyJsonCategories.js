const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const categoryMapping = [
  { appCategory: 'Electronics', dummyCategories: ['smartphones', 'laptops', 'mobile-accessories'] },
  { appCategory: 'Home', dummyCategories: ['furniture', 'home-decoration', 'kitchen-accessories'] },
  { appCategory: 'Fashion', dummyCategories: ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes', 'mens-watches'] },
  { appCategory: 'Beauty', dummyCategories: ['skincare', 'fragrances', 'beauty'] },
  { appCategory: 'Sports', dummyCategories: ['sports-accessories', 'motorcycle'] }
];

async function seed() {
  let vendor = await prisma.vendor.findFirst();
  if (!vendor) {
    console.log("No vendor found. Create one first.");
    return;
  }

  let totalCount = 0;

  for (const mapping of categoryMapping) {
    const { appCategory, dummyCategories } = mapping;
    const catSlug = appCategory.toLowerCase();
    
    let dbCategory = await prisma.category.findUnique({ where: { slug: catSlug } });
    if (!dbCategory) {
      dbCategory = await prisma.category.create({ data: { name: appCategory, slug: catSlug } });
    }

    let categoryProducts = [];

    // Fetch from all mapped DummyJSON categories
    for (const dCat of dummyCategories) {
      try {
        const res = await fetch(`https://dummyjson.com/products/category/${dCat}`);
        const data = await res.json();
        if (data && data.products) {
          categoryProducts = categoryProducts.concat(data.products);
        }
      } catch (err) {
        console.error(`Failed to fetch ${dCat}`, err.message);
      }
    }

    // Shuffle and pick up to 20 products for this category
    categoryProducts = categoryProducts.sort(() => 0.5 - Math.random()).slice(0, 20);
    console.log(`Found ${categoryProducts.length} items for ${appCategory}`);

    for (const item of categoryProducts) {
      console.log(`Uploading ${item.title} to ${appCategory}...`);
      try {
        const uploadRes = await cloudinary.uploader.upload(item.thumbnail, { folder: 'vendly_real' });
        
        await prisma.product.create({
          data: {
            name: item.title,
            slug: `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
            description: item.description,
            price: item.price,
            images: [uploadRes.secure_url],
            stockCount: item.stock,
            sku: item.sku || `SKU-${Date.now()}-${totalCount}`,
            vendorId: vendor.id,
            categoryId: dbCategory.id,
            isActive: true,
            ratingAvg: item.rating,
            ratingCount: Math.floor(Math.random() * 200) + 10
          }
        });
        console.log(`Created ${item.title}`);
        totalCount++;
      } catch (e) {
        console.error(`Failed on ${item.title}`, e.message);
      }
    }
  }

  console.log(`Finished adding ${totalCount} new products perfectly divided into categories!`);
}

seed().catch(console.error).finally(() => prisma.$disconnect());
