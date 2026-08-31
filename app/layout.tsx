import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/layout/Marquee";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZENJI // ANIME STREETWEAR — LIMITED DROPS",
  description: "Heavyweight anime-inspired Australian streetwear. High-density graphics, cybernetic samurai aesthetics, strictly limited drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <CartProvider>
          <Header />
          <Marquee />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <CartDrawer />
          <Footer />
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: "#121212",
                border: "1px solid #2a2a2a",
                color: "#f5f5f2",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
