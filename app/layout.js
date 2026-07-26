export const dynamic = 'force-dynamic';
import "./globals.css";
import Providers from "./providers";
import BackButton from "./components/BackButton";

export const metadata = {
  title: "Vendly — Multi-Vendor Marketplace",
  description: "Shop from independent sellers, all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <BackButton />
        </Providers>
      </body>
    </html>
  );
}
