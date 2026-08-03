import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { BookOpen, DollarSign, Package, BarChart2, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata = { title: "Seller Help Center | Vendly" };

const GUIDES = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "How to create your vendor account, complete Stripe Connect onboarding, and set up your storefront.",
    link: "/vendor/onboarding",
  },
  {
    icon: Package,
    title: "Managing Products",
    description: "Add, edit, and remove products. Learn best practices for images, titles, and pricing.",
    link: "/vendor/products",
  },
  {
    icon: DollarSign,
    title: "Payouts & Stripe",
    description: "Understand how Stripe Connect routes payments, when you get paid, and how to update banking details.",
    link: "/vendor/stripe",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Read your revenue charts, understand conversion rates, and track top-performing products.",
    link: "/vendor/analytics",
  },
  {
    icon: Package,
    title: "Fulfilling Orders",
    description: "How to view, process, and mark orders as shipped. Best practices for packaging and courier selection.",
    link: "/vendor/orders",
  },
  {
    icon: ShieldCheck,
    title: "Policies & Compliance",
    description: "Set your return, shipping, and refund policies. Understand Vendly's seller conduct rules.",
    link: "/vendor/policies",
  },
];

const FAQS = [
  { q: "How long does Stripe Connect approval take?", a: "Stripe typically verifies your identity and bank account within 1–2 business days. You'll receive an email once your account is fully activated and ready to receive payouts." },
  { q: "When do I get paid?", a: "Payouts are issued on a rolling 3-day basis after an order is marked as delivered. The funds are transferred directly to your connected bank account via Stripe." },
  { q: "Can I set my own return policy?", a: "Yes. Go to Dashboard > Policies to customize your return window, conditions, and restocking fees. Your policy is displayed publicly on your store page." },
  { q: "What happens if a buyer opens a dispute?", a: "You'll receive an email notification. Respond through your Order page within 48 hours. If no resolution is reached, Vendly's team will mediate and make a final decision." },
];

export default function VendorHelpPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
        <div className="bg-brand py-16 px-6 border-b border-brand-light/20">
          <div className="max-w-6xl mx-auto">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Seller Resources</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Seller Help Center</h1>
            <p className="text-white/60 font-medium max-w-xl">
              Everything you need to launch, grow, and manage your store on Vendly.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
          {/* Guides Grid */}
          <div>
            <h2 className="text-2xl font-black text-ink mb-8">Seller Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GUIDES.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.title}
                    href={guide.link}
                    className="bg-card border border-brand-light/50 rounded-[1.5rem] p-7 shadow-sm hover:shadow-md hover:border-brand-light hover:-translate-y-1 transition-all group"
                  >
                    <div className="p-3 bg-accent/10 text-accent rounded-2xl inline-flex mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-black text-ink mb-2 group-hover:text-accent transition-colors">{guide.title}</h3>
                    <p className="text-sm text-ink/60 font-medium leading-relaxed">{guide.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-black text-ink mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-card border border-brand-light/50 rounded-[1.5rem] p-7 shadow-sm">
                  <h3 className="font-black text-ink mb-2">{faq.q}</h3>
                  <p className="text-ink/70 text-sm leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <div className="bg-brand rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2">Still have questions?</h3>
              <p className="text-white/70 font-medium">Our seller success team is available to help you grow.</p>
            </div>
            <Link href="/contact" className="relative z-10 shrink-0 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 flex items-center gap-2">
              <MessageCircle size={20} /> Contact Support
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
