<div align="center">
  <h1>🛍️ Vendly by Bazaario</h1>
  <p>A premium, full-stack multi-vendor e-commerce platform built with Next.js.</p>
  
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
- **Secure Payments:** Integrated with Stripe for fast, PCI-compliant transactions with coupon code support.
- **Order Tracking:** Track your order status right from your account dashboard.
- **Reviews & Ratings:** Leave verified reviews for products you have purchased.
- **Wishlist:** Save your favourite products across sessions.
- **Flash Deals:** A dedicated deals page with a persistent countdown timer and category filters.
- **Modern UI/UX:** Built with glassmorphism, smooth micro-animations, dark mode, and responsive design.

### 🏪 For Sellers
- **Stripe Connect Onboarding:** Automated seller onboarding to safely verify and route payouts.
- **Dedicated Dashboard:** Custom portal to add products, manage inventory, view revenue charts, and track sales performance.
- **Rich Media:** Fast, optimized product image uploads powered by Cloudinary.
- **Automated Payouts:** Stripe automatically splits the checkout total and routes exactly what is owed to the vendor.
- **Custom Policies:** Define your own return and shipping policies visible on your store page.

### 🛡️ For Admins
- **Platform Analytics:** Centralized view of platform revenue, total orders, and user metrics.
- **Vendor Moderation:** Approve or suspend vendors before they can interact with the marketplace.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Database** | [MongoDB Atlas](https://mongodb.com/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **Payments** | [Stripe Connect](https://stripe.com/connect) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Media Hosting** | [Cloudinary](https://cloudinary.com/) |
| **Transactional Emails** | [Resend](https://resend.com/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) |

---

## 📂 Project Structure

```
vendly/
├── app/
│   ├── page.js              # Homepage — product catalog
│   ├── layout.js            # Root layout with metadata & providers
│   ├── globals.css          # Design tokens, keyframes, utility classes
│   ├── about/               # About page
│   ├── admin/               # Admin dashboard (protected)
│   ├── api/                 # Next.js API routes
│   │   ├── auth/            # NextAuth handlers
│   │   ├── cart/            # Cart & coupon endpoints
│   │   ├── checkout/        # Stripe checkout session
│   │   ├── orders/          # Order management
│   │   ├── products/        # Product CRUD
│   │   ├── reviews/         # Review submission
│   │   ├── vendor/          # Vendor dashboard data
│   │   ├── webhooks/        # Stripe webhook handler
│   │   └── wishlist/        # Wishlist toggle
│   ├── blog/                # Journal & blog
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Stripe checkout flow
│   ├── components/          # Shared UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Toast.jsx
│   │   ├── CartBadge.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── ThemeToggle.jsx
│   ├── contact/             # Contact form
│   ├── deals/               # Flash deals with countdown timer
│   ├── help/                # Help center & FAQ
│   ├── login/               # Login page
│   ├── orders/              # Order history
│   ├── product/[slug]/      # Product detail page
│   ├── profile/             # User profile
│   ├── register/            # Registration page
│   ├── store/[vendorId]/    # Vendor storefront
│   └── vendor/              # Vendor portal
│       ├── dashboard/       # Sales & analytics
│       ├── onboarding/      # Stripe Connect setup
│       ├── orders/          # Order management
│       ├── policies/        # Store policies editor
│       └── products/        # Inventory management
├── lib/
│   ├── auth.js              # NextAuth configuration
│   ├── prisma.js            # Prisma client singleton
│   ├── mailer.js            # Resend email templates
│   ├── rateLimit.js         # API rate limiting
│   └── features/            # Redux slices (cart, etc.)
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── .env.example             # Environment variable template
└── tailwind.config.js       # Design system tokens
```

---

## 🚀 Getting Started

Follow these steps to run Vendly locally on your machine.

### 1. Prerequisites
Make sure you have [Node.js 18+](https://nodejs.org/) installed, along with `npm`, `yarn`, or `pnpm`.

### 2. Clone and Install
```bash
git clone https://github.com/RishabhKasaudhan/Bazaario-ECommerce.git
cd Bazaario-ECommerce/vendly-project/vendly
npm install
```

### 3. Environment Variables
Copy the example file and fill in your credentials:
```bash
cp .env.example .env
```

You will need free accounts for MongoDB Atlas, Stripe, Cloudinary, and Resend:

```env
# Database
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/vendly"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Resend (Transactional Emails)
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@yourdomain.com"
```

### 4. Sync Database Schema
Push the Prisma schema to your MongoDB Atlas instance:
```bash
npx prisma db push
```

### 5. (Optional) Seed Sample Data
```bash
node seedRealProducts.js
node seedDummyJsonCategories.js
```

### 6. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the platform running!

### 7. Configure Stripe Webhooks (for local development)
Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward events to your local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🗺️ Key Routes

| Route | Description |
|---|---|
| `/` | Main product catalog with category filters |
| `/deals` | Flash deals with live countdown timer |
| `/blog` | Vendly Journal — articles and seller tips |
| `/help` | Help center with searchable FAQ |
| `/contact` | Contact form |
| `/cart` | Shopping cart with coupon support |
| `/checkout` | Stripe-powered checkout |
| `/orders` | Customer order history |
| `/product/[slug]` | Product detail page |
| `/store/[vendorId]` | Vendor public storefront |
| `/vendor/dashboard` | Vendor analytics & sales overview |
| `/vendor/products` | Inventory management |
| `/vendor/onboarding` | Stripe Connect setup flow |
| `/admin` | Admin moderation panel |
| `/login` / `/register` | Auth pages |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/RishabhKasaudhan">Rishabh Kasaudhan</a></p>
</div>
