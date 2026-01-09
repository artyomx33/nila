import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "NILA Estate Management | Luxury Property Management in Riviera Maya",
  description:
    "El arte de operar con precisión. Expert property management combining luxury hospitality standards with real estate expertise in Bacalar and Riviera Maya. Preventive maintenance, vacation rentals, interior design, and HOA management.",
  keywords: [
    "property management Riviera Maya",
    "Bacalar property management",
    "vacation rental management Tulum",
    "luxury property management Mexico",
    "HOA management Riviera Maya",
    "interior design Bacalar",
    "real estate management Quintana Roo",
    "NILA Estate Management",
  ],
  openGraph: {
    title: "NILA Estate Management | The Art of Operating with Precision",
    description:
      "Premium property management in Mexico's most exceptional destinations. From Four Seasons & Ritz-Carlton to your Riviera Maya investment.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="antialiased font-sans bg-charcoal-950 text-charcoal-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
