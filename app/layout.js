export const dynamic = 'force-dynamic';
import "./globals.css";
import Providers from "./providers";
import BackButton from "./components/BackButton";

export const metadata = {
  title: "Vendly — Multi-Vendor Marketplace",
  description: "Shop from independent sellers, all in one place. Discover unique products from hundreds of small businesses.",
  keywords: "multi-vendor, marketplace, ecommerce, independent sellers, small business",
  openGraph: {
    title: "Vendly — Multi-Vendor Marketplace",
    description: "Shop from independent sellers, all in one place.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
          <BackButton />
        </Providers>
      </body>
    </html>
  );
}
