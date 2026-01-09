"use client";

// ============================================
// SIDEBAR COMPONENT
// Collapsible navigation sidebar for admin portal
// ============================================

import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  ClipboardList,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const adminNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "units",
    label: "Units",
    href: "/admin/units",
    icon: Building2,
  },
  {
    id: "bookings",
    label: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    id: "operations",
    label: "Operations",
    href: "/admin/operations",
    icon: ClipboardList,
  },
  {
    id: "owners",
    label: "Owners",
    href: "/admin/owners",
    icon: Users,
  },
  {
    id: "reports",
    label: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleCollapsed } = useUIStore();

  return (
    <aside
      className={cn(
        "sidebar fixed left-0 top-0 h-screen z-30 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-charcoal-800">
        {!sidebarCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="icon-box icon-box-md icon-box-teal">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-gradient-teal">
              NILA
            </span>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center justify-center w-full">
            <div className="icon-box icon-box-md icon-box-teal">
              <Building2 className="w-5 h-5" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "sidebar-nav-item",
                isActive && "sidebar-nav-item-active",
                sidebarCollapsed && "justify-center"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-charcoal-800">
        <button
          onClick={toggleCollapsed}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
            "text-zinc-400 hover:text-white hover:bg-charcoal-800",
            "transition-all duration-200",
            sidebarCollapsed && "justify-center"
          )}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
