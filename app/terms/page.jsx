import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = { title: "Terms of Service | Vendly" };

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Vendly platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services. We reserve the right to modify these terms at any time — continued use after changes constitutes acceptance.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age to use Vendly. By registering, you confirm that all information you provide is accurate and that you have the legal capacity to enter into a binding agreement.",
  },
  {
    title: "3. Buyer Responsibilities",
    body: "As a buyer, you agree to provide accurate shipping and payment information, pay for all items you order, and comply with applicable laws. You understand that each product is sold by an independent vendor and Vendly acts as a marketplace platform, not the seller of record.",
  },
  {
    title: "4. Seller Responsibilities",
    body: "Registered vendors must comply with all applicable laws, accurately describe their products, fulfill orders promptly, and maintain their Stripe Connect account in good standing. Misrepresentation, fraudulent listings, or policy violations may result in immediate account suspension.",
  },
  {
    title: "5. Payments & Fees",
    body: "Vendly charges a 5% commission on all vendor sales, plus standard Stripe processing fees. Payouts are issued on a rolling 3-day basis after order delivery. Buyers are charged at the time of checkout. All prices are displayed in USD.",
  },
  {
    title: "6. Returns & Disputes",
    body: "Return eligibility is governed by each vendor's individual return policy. In the event of a dispute that cannot be resolved between buyer and vendor within 48 hours, Vendly's support team will mediate. Vendly's decision in such disputes is final.",
  },
  {
    title: "7. Prohibited Conduct",
    body: "You may not use Vendly to sell counterfeit goods, engage in fraud, harass other users, manipulate ratings, circumvent our payment systems, or violate any applicable law. Violation of these rules will result in permanent account termination.",
  },
  {
    title: "8. Limitation of Liability",
    body: "Vendly provides its platform 'as is' without warranty of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including disputes with vendors, product defects, or data loss.",
  },
  {
    title: "9. Governing Law",
    body: "These terms are governed by the laws of the State of California, USA. Any disputes shall be resolved through binding arbitration in San Francisco, CA, except where prohibited by law.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
        <div className="bg-brand py-16 px-6 border-b border-brand-light/20">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-4xl md:text-5xl font-black text-white">Terms of Service</h1>
            <p className="text-white/60 mt-3 font-medium">Last updated: August 1, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-card border border-brand-light/50 rounded-[2rem] p-8 md:p-12 shadow-sm mb-8">
            <p className="text-ink/70 leading-relaxed font-medium">
              Please read these Terms of Service carefully before using Vendly. These terms govern your relationship with Vendly Inc. and apply to all buyers, sellers, and visitors of our platform.
            </p>
          </div>

          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-card border border-brand-light/50 rounded-[1.5rem] p-8 shadow-sm">
                <h2 className="text-lg font-black text-ink mb-3">{section.title}</h2>
                <p className="text-ink/70 leading-relaxed font-medium">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Link href="/privacy" className="block bg-card border border-brand-light/50 rounded-[1.5rem] p-6 hover:border-brand-light hover:shadow-md transition-all group">
              <h3 className="font-black text-ink mb-1 group-hover:text-accent transition-colors">Privacy Policy →</h3>
              <p className="text-sm text-ink/50 font-medium">Learn how we handle and protect your personal data.</p>
            </Link>
            <Link href="/contact" className="block bg-card border border-brand-light/50 rounded-[1.5rem] p-6 hover:border-brand-light hover:shadow-md transition-all group">
              <h3 className="font-black text-ink mb-1 group-hover:text-accent transition-colors">Contact Us →</h3>
              <p className="text-sm text-ink/50 font-medium">Have questions about our terms? We're happy to help.</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
