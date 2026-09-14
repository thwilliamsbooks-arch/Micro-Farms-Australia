import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Micro Farms Australia — Bring the Farm Home",
  description:
    "We transform suburban backyards into thriving micro farm ecosystems — chickens, bees, gardens, and even miniature cows. Country living, right outside your door.",
  keywords: [
    "micro farm",
    "backyard chickens",
    "mini cow",
    "beehive",
    "Flow Hive",
    "suburban farm",
    "Australia",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Micro Farms",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Micro Farms Australia — Bring the Farm Home",
    description:
      "Chickens, bees, gardens, and miniature cows. Country living in your suburban backyard.",
    siteName: "Micro Farms Australia",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D2B1F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          backgroundColor: "#FAF6EE",
          color: "#3D2B1F",
        }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
