import type { Metadata } from "next";
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
  openGraph: {
    title: "Micro Farms Australia — Bring the Farm Home",
    description:
      "Chickens, bees, gardens, and miniature cows. Country living in your suburban backyard.",
    siteName: "Micro Farms Australia",
  },
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
