<div align="center">
  <h1>🛍️ Vendly by Bazaario</h1>
  <p>A premium, full-stack multi-vendor e-commerce platform.</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
  [![Stripe](https://img.shields.io/badge/Stripe-Connect-6772E5?style=for-the-badge&logo=stripe)](https://stripe.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
</div>

<br />

Vendly is a modern marketplace platform that empowers independent sellers to launch their digital storefronts while providing a beautiful, seamless, and secure shopping experience for customers. It handles everything from multi-vendor cart routing and split payments to admin moderation and automated emails.

---

## ✨ Key Features

### 🛒 For Customers
- **Unified Cart:** Seamlessly add products from multiple different vendors into a single cart and checkout once.
- **Secure Payments:** Integrated with Stripe for fast, PCI-compliant transactions.
- **Order Tracking:** Track your order status right from your account dashboard.
- **Reviews & Ratings:** Leave verified reviews for products you have purchased.
- **Modern UI/UX:** Built with glassmorphism, smooth micro-animations, and responsive design.

### 🏪 For Sellers
- **Stripe Connect Onboarding:** Automated seller onboarding to safely verify and route payouts.
- **Dedicated Dashboards:** Custom portals to add products, manage inventory, and track sales performance.
- **Rich Media:** Fast, optimized product image uploads powered by Cloudinary.
- **Automated Payouts:** Stripe automatically splits the checkout total and routes exactly what is owed to the vendor.

### 🛡️ For Admins
- **Platform Analytics:** Centralized view of platform revenue, total orders, and user metrics.
- **Vendor Moderation:** Approve or suspend vendors before they can interact with the marketplace.

---

## 💻 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Database:** [MongoDB](https://mongodb.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payments:** [Stripe Connect](https://stripe.com/connect)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Media Hosting:** [Cloudinary](https://cloudinary.com/)
- **Transactional Emails:** [Resend](https://resend.com/)

---

## 🚀 Getting Started

Follow these steps to run Vendly locally on your machine.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed, along with a package manager like `npm`, `yarn`, or `pnpm`.

### 2. Clone and Install
```bash
git clone https://github.com/YourUsername/Bazaario-ECommerce-Platform.git
cd vendly
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following keys. You will need to create free accounts for MongoDB, Stripe, Cloudinary, and Resend to grab these keys:

```env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Resend
RESEND_API_KEY="re_..."
```

### 4. Sync Database
Push the Prisma schema to your MongoDB instance:
```bash
npx prisma db push
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform running!
