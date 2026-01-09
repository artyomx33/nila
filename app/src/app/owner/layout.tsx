"use client";

// ============================================
// OWNER LAYOUT
// Simplified layout for property owner portal
// ============================================

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Calendar, FileText, DollarSign, Home } from "lucide-react";
import { Avatar } from "@/components/ui";
import { useTranslations } from "next-intl";

type NavItemId = "dashboard" | "properties" | "bookings" | "financials" | "documents";

const ownerNavItems: { id: NavItemId; href: string; icon: typeof Home }[] = [
  { id: "dashboard", href: "/owner/dashboard", icon: Home },
  { id: "properties", href: "/owner/properties", icon: Building2 },
  { id: "bookings", href: "/owner/bookings", icon: Calendar },
  { id: "financials", href: "/owner/financials", icon: DollarSign },
  { id: "documents", href: "/owner/documents", icon: FileText },
];

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("ownerPortal");

  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 glass-strong border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/owner/dashboard" className="flex items-center gap-2">
              <div className="icon-box icon-box-md icon-box-teal">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-gradient-teal">
                NILA
              </span>
              <span className="text-sm text-zinc-500 hidden sm:inline">
                {t("title")}
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {ownerNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-teal-400 bg-teal-600/10"
                        : "text-zinc-400 hover:text-white hover:bg-charcoal-800"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t(`nav.${item.id}`)}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">Owner Name</p>
                <p className="text-xs text-zinc-500">owner@example.com</p>
              </div>
              <Avatar
                name="Owner Name"
                size="md"
                className="cursor-pointer hover:ring-2 hover:ring-teal-600/50 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-charcoal-800 bg-charcoal-900/50 backdrop-blur-sm sticky top-16 z-10">
        <div className="flex overflow-x-auto scrollbar-hide">
          {ownerNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
                  isActive
                    ? "text-teal-400 border-teal-600"
                    : "text-zinc-400 border-transparent hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t(`nav.${item.id}`)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
