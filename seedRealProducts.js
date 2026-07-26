const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const realProducts = [
  { name: 'Red Nike Sneakers', category: 'sports', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', price: 120 },
  { name: 'Minimalist Wrist Watch', category: 'fashion', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', price: 199 },
  { name: 'Sony Wireless Headphones', category: 'electronics', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', price: 299 },
  { name: 'Vintage Camera', category: 'electronics', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80', price: 450 },
  { name: 'White Running Shoes', category: 'sports', url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80', price: 85 },
  { name: 'Leather Handbag', category: 'fashion', url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&q=80', price: 150 },
  { name: 'Classic Sunglasses', category: 'fashion', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', price: 75 },
  { name: 'Ceramic Coffee Mug', category: 'home', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', price: 18 },
  { name: 'Organic Face Cream', category: 'beauty', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', price: 34 },
  { name: 'Aesthetic Perfume Bottle', category: 'beauty', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80', price: 89 },
  { name: 'Wooden Desk Organizer', category: 'home', url: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&q=80', price: 42 },
  { name: 'Modern Table Lamp', category: 'home', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', price: 65 },
  { name: 'Yoga Mat', category: 'sports', url: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&q=80', price: 29 },
  { name: 'Bluetooth Speaker', category: 'electronics', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', price: 110 },
  { name: 'Denim Jacket', category: 'fashion', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80', price: 90 },
  { name: 'Essential Oil Set', category: 'beauty', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80', price: 45 },
  { name: 'Dumbbell Weights', category: 'sports', url: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=600&q=80', price: 55 },
  { name: 'Mechanical Keyboard', category: 'electronics', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80', price: 140 },
  { name: 'Cozy Throw Blanket', category: 'home', url: 'https://images.unsplash.com/photo-1580828369066-6bf6711d54bd?w=600&q=80', price: 38 },
  { name: 'Matte Lipstick', category: 'beauty', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', price: 22 }
];

async function seed() {
  let vendor = await prisma.vendor.findFirst();
  if (!vendor) {
    console.log("No vendor found. Create one first.");
    return;
  }

  for (const item of realProducts) {
    console.log(`Uploading ${item.name}...`);
    try {
      const result = await cloudinary.uploader.upload(item.url, { folder: 'vendly_real' });
      
      let cat = await prisma.category.findUnique({ where: { slug: item.category } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name: item.category, slug: item.category } });
      }

      await prisma.product.create({
        data: {
          name: item.name,
          slug: `${item.name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
          description: `A fantastic ${item.name} for you.`,
          price: item.price,
          images: [result.secure_url],
          stockCount: 10,
          sku: `SKU-${Date.now()}`,
          vendorId: vendor.id,
          categoryId: cat.id,
          isActive: true,
          ratingAvg: parseFloat((Math.random() * 1 + 4).toFixed(1)),
          ratingCount: 45
        }
      });
      console.log(`Created ${item.name}`);
    } catch (e) {
      console.error(`Failed on ${item.name}`, e);
    }
  }
}

seed().catch(console.error).finally(() => prisma.$disconnect());
