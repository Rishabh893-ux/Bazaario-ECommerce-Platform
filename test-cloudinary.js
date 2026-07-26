// dotenv removed
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  try {
    // Upload a small sample image from unsplash via URL directly to cloudinary
    console.log('Attempting to upload to Cloudinary...');
    const result = await cloudinary.uploader.upload('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', {
      folder: 'vendly_test'
    });
    console.log('Upload successful! URL:', result.secure_url);
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    process.exit(1);
  }
}

testUpload();
