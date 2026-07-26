import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Shield, CreditCard, Box, AlertTriangle, FileText } from "lucide-react";

export default function SellerPoliciesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-hidden py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-ink mb-4">Seller Policies</h1>
            <p className="text-ink/60 text-lg max-w-2xl mx-auto">
              Everything you need to know about selling on Vendly. We believe in transparency, fairness, and building a trusted marketplace.
            </p>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <section className="bg-card border border-brand-light rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Box size={24} />
                </div>
                <h2 className="text-2xl font-bold text-ink">1. Prohibited Items</h2>
              </div>
              <p className="text-ink/70 leading-relaxed mb-4">
                To maintain a safe and legal marketplace, Vendly strictly prohibits the sale of certain items. Violating this policy will result in immediate account suspension.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li>Illegal drugs, regulated substances, or drug paraphernalia.</li>
                <li>Weapons, firearms, or explosive materials.</li>
                <li>Counterfeit items, unauthorized replicas, or copyright-infringing goods.</li>
                <li>Digital goods without proof of ownership or resale rights.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="bg-card border border-brand-light rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-bold text-ink">2. Fees and Payouts</h2>
              </div>
              <p className="text-ink/70 leading-relaxed mb-4">
                We believe in simple, transparent pricing so you know exactly what you'll earn from every sale.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li><strong>Platform Fee:</strong> Vendly charges a flat 5% commission on the total sale price (including shipping).</li>
                <li><strong>Payment Processing:</strong> Standard Stripe processing fees (usually 2.9% + 30¢) apply to each transaction.</li>
                <li><strong>Payouts:</strong> Funds are automatically routed to your connected Stripe account and paid out on a 2-day rolling basis.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="bg-card border border-brand-light rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <Shield size={24} />
                </div>
                <h2 className="text-2xl font-bold text-ink">3. Fulfillment & Shipping</h2>
              </div>
              <p className="text-ink/70 leading-relaxed mb-4">
                Sellers are responsible for fulfilling their own orders in a timely manner to ensure a great customer experience.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li>Orders must be marked as "Processing" within 24 hours of purchase.</li>
                <li>Items should be shipped within 3-5 business days unless otherwise stated on the product page.</li>
                <li>Sellers must provide valid tracking information once an order is shipped.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="bg-card border border-brand-light rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-2xl font-bold text-ink">4. Returns & Refunds</h2>
              </div>
              <p className="text-ink/70 leading-relaxed mb-4">
                While sellers can set their own specific return policies on their storefronts, Vendly enforces a baseline buyer protection policy.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-ink/70">
                <li>If an item is significantly not as described, damaged during transit, or never arrives, the buyer is entitled to a full refund.</li>
                <li>Sellers must respond to customer support inquiries regarding refunds within 48 hours.</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-ink/50 text-sm">Last updated: July 2026. For questions regarding these policies, please contact <a href="mailto:support@vendly.com" className="text-brand hover:underline">support@vendly.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
