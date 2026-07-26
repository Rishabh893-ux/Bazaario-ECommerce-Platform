# Vendly by Bazaario

A modern, full-stack multi-vendor e-commerce marketplace platform built with Next.js, Prisma, and Stripe Connect.

Vendly empowers independent sellers to launch their digital storefronts while providing a secure, premium shopping experience for customers.

## 🚀 Features

### For Customers
- **Sleek & Modern UI:** Glassmorphism, smooth micro-animations, and a responsive design.
- **Unified Cart:** Add products from multiple different vendors into a single cart.
- **Secure Checkout:** Integrated with Stripe for fast and secure payments.
- **Order Tracking:** Track your order status right from your account dashboard.
- **Reviews & Ratings:** Leave reviews for products you have purchased.

### For Sellers (Vendors)
- **Vendor Onboarding:** Seamless onboarding via Stripe Connect.
- **Custom Storefront:** Vendors get their own store profile and product catalog.
- **Vendor Dashboard:** Add products, manage inventory, and track sales performance.
- **Image Uploads:** Powered by Cloudinary for fast and optimized product images.
- **Automated Payouts:** Stripe automatically splits the checkout total and routes payouts to the correct vendors.

### For Admins
- **Admin Dashboard:** Centralized view of platform revenue, total orders, and user metrics.
- **Vendor Moderation:** Approve or suspend vendors before they can list products.

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database:** MongoDB
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Payments:** [Stripe Connect](https://stripe.com/connect)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Image Hosting:** [Cloudinary](https://cloudinary.com/)
- **Emails:** [Resend](https://resend.com/)

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
