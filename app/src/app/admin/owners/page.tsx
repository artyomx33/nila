// ============================================
// PROPERTY OWNERS PAGE
// Property owners management with stats and owner cards
// ============================================

"use client";

import Link from "next/link";
import Avatar from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Mock data for owners
const mockOwners = [
  {
    id: "owner-1",
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    phone: "+1 (555) 123-4567",
    properties: 3,
    monthlyRevenue: 8500,
    avatar: null,
  },
  {
    id: "owner-2",
    name: "Sarah Thompson",
    email: "sarah.t@email.com",
    phone: "+1 (555) 234-5678",
    properties: 2,
    monthlyRevenue: 6200,
    avatar: null,
  },
  {
    id: "owner-3",
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+1 (555) 345-6789",
    properties: 5,
    monthlyRevenue: 12800,
    avatar: null,
  },
  {
    id: "owner-4",
    name: "Emily Foster",
    email: "emily.f@email.com",
    phone: "+1 (555) 456-7890",
    properties: 1,
    monthlyRevenue: 3400,
    avatar: null,
  },
];

export default function OwnersPage() {
  const stats = {
    totalOwners: mockOwners.length,
    totalProperties: mockOwners.reduce((sum, owner) => sum + owner.properties, 0),
    activeRentals: 8,
    monthlyRevenue: mockOwners.reduce((sum, owner) => sum + owner.monthlyRevenue, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Property Owners
          </h1>
          <p className="text-gray-400">
            Manage property owners and their portfolios
          </p>
        </div>
        <Button variant="primary" size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Owner
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Owners</p>
              <p className="text-3xl font-bold text-white">{stats.totalOwners}</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-teal">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-white">{stats.totalProperties}</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-gold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Rentals</p>
              <p className="text-3xl font-bold text-white">{stats.activeRentals}</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-white">
                ${stats.monthlyRevenue.toLocaleString()}
              </p>
            </div>
            <div className="icon-box icon-box-lg icon-box-teal">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Owners Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">All Owners</h2>
          <p className="text-sm text-gray-400">
            {mockOwners.length} total
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockOwners.map((owner) => (
            <div key={owner.id} className="card-default card-interactive p-6">
              <div className="flex items-start gap-4">
                <Avatar name={owner.name} size="lg" />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {owner.name}
                  </h3>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{owner.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{owner.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Properties</p>
                      <p className="text-lg font-bold text-teal-400">{owner.properties}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Revenue/mo</p>
                      <p className="text-lg font-bold text-gold-400">
                        ${(owner.monthlyRevenue / 1000).toFixed(1)}k
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/owners/${owner.id}`}
                    className="inline-flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
