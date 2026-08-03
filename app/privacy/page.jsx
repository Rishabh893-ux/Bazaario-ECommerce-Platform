import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = { title: "Privacy Policy | Vendly" };

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, billing and shipping address, and payment details when you register or make a purchase. We also automatically collect technical data such as IP address, browser type, and pages visited via cookies and analytics tools.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your data to process orders, send transactional emails (order confirmations, shipping updates), personalize your experience, and improve our platform. We never sell your personal data to third parties. Payment processing is handled securely by Stripe — we do not store raw card numbers.",
  },
  {
    title: "3. Sharing with Vendors",
    body: "When you place an order, we share your shipping name and address with the relevant vendor(s) solely for order fulfillment. Vendors are contractually prohibited from using your information for any other purpose.",
  },
  {
    title: "4. Cookies",
    body: "We use essential cookies for authentication and session management, and optional analytics cookies to understand how users interact with our platform. You can disable non-essential cookies in your browser settings at any time.",
  },
  {
    title: "5. Data Retention",
    body: "We retain your account data for as long as your account is active. You may request deletion of your account and associated data at any time by contacting support@vendly.com. Order records may be retained for up to 7 years for legal and tax compliance.",
  },
  {
    title: "6. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or delete your personal data. You may also object to certain types of processing or request data portability. To exercise these rights, contact us at support@vendly.com.",
  },
  {
    title: "7. Security",
    body: "We implement industry-standard security measures including TLS encryption, secure authentication, and regular security audits. However, no system is completely secure and we cannot guarantee absolute security.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify registered users by email of any material changes. Continued use of the platform after changes constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pb-20 font-sans">
        <div className="bg-brand py-16 px-6 border-b border-brand-light/20">
          <div className="max-w-4xl mx-auto">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Legal</p>
            <h1 className="text-4xl md:text-5xl font-black text-white">Privacy Policy</h1>
            <p className="text-white/60 mt-3 font-medium">Last updated: August 1, 2026</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-card border border-brand-light/50 rounded-[2rem] p-8 md:p-12 shadow-sm mb-8">
            <p className="text-ink/70 leading-relaxed font-medium">
              At Vendly, we take your privacy seriously. This policy explains what data we collect, how we use it, and the choices you have. By using our platform, you agree to the practices described here.
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

          <div className="mt-12 bg-brand rounded-[2rem] p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            <h3 className="text-xl font-black text-white mb-2 relative z-10">Questions about your privacy?</h3>
            <p className="text-white/70 mb-6 relative z-10 font-medium">Contact our Data Protection team directly.</p>
            <Link href="/contact" className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-full transition-all shadow-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
