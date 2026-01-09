"use client";

// ============================================
// HEADER COMPONENT
// Top navigation bar with search and user menu
// ============================================

import { Search, Bell, Menu } from "lucide-react";
import { Avatar, Button } from "@/components/ui";
import { useUIStore } from "@/lib/stores";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export default function Header({ title, showSearch = true }: HeaderProps) {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-20 glass-strong border-b border-charcoal-800">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Mobile menu + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-charcoal-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          {title && (
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          )}
        </div>

        {/* Center: Search */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search units, bookings, guests..."
                className="input-themed w-full pl-10 pr-4 py-2 rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-charcoal-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-charcoal-800">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-zinc-500">admin@nila.com</p>
            </div>
            <Avatar
              name="Admin User"
              size="md"
              className="cursor-pointer hover:ring-2 hover:ring-teal-600/50 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
