import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { getLocale, getMessages } from 'next-intl/server';
import { IntlProvider } from "@/components/providers/intl-provider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NILA Manager",
    template: "%s | NILA Manager",
  },
  description: "Property management platform for NILA Estate Management - Riviera Maya",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
