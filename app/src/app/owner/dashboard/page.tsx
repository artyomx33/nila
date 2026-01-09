// ============================================
// OWNER DASHBOARD PAGE
// Property owner view with revenue and bookings
// ============================================

import { StatCard, Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function OwnerDashboard() {
  // TODO: Replace with actual owner data from stores
  const ownerProperties = [
    { id: "1", name: "Casa Azul", type: "Apartment", status: "occupied" },
    { id: "2", name: "Villa Laguna", type: "Villa", status: "available" },
  ];

  const upcomingBookings = [
    {
      id: "1",
      property: "Casa Azul",
      guest: "John Smith",
      checkIn: "Jan 15, 2026",
      checkOut: "Jan 22, 2026",
      nights: 7,
      total: 17500,
    },
    {
      id: "2",
      property: "Villa Laguna",
      guest: "Maria Garcia",
      checkIn: "Jan 20, 2026",
      checkOut: "Jan 27, 2026",
      nights: 7,
      total: 24500,
    },
  ];

  const revenueData = {
    thisMonth: 42000,
    lastMonth: 38500,
    ytd: 145000,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          Welcome back, Owner!
        </h1>
        <p className="text-zinc-400">
          Here's an overview of your properties and earnings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Building2 className="w-6 h-6" />}
          label="Your Properties"
          value={ownerProperties.length}
          variant="teal"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Upcoming Bookings"
          value={upcomingBookings.length}
          variant="gold"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          label="This Month"
          value={`$${(revenueData.thisMonth / 1000).toFixed(1)}K`}
          trend={{
            value: Math.round(((revenueData.thisMonth - revenueData.lastMonth) / revenueData.lastMonth) * 100),
            positive: revenueData.thisMonth > revenueData.lastMonth,
          }}
          variant="green"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Year to Date"
          value={`$${(revenueData.ytd / 1000).toFixed(0)}K`}
          variant="teal"
        />
      </div>

      {/* Properties & Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Properties */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Properties</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ownerProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-charcoal-900/50 hover:bg-charcoal-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="icon-box icon-box-md icon-box-teal">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {property.name}
                      </p>
                      <p className="text-xs text-zinc-500">{property.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={property.status === "occupied" ? "teal" : "success"}
                    size="sm"
                  >
                    {property.status === "occupied" ? "Occupied" : "Available"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Bookings</CardTitle>
              <Badge variant="muted" size="sm">
                {upcomingBookings.length} bookings
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 rounded-lg bg-charcoal-900/50 hover:bg-charcoal-900 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {booking.guest}
                      </p>
                      <p className="text-xs text-zinc-500">{booking.property}</p>
                    </div>
                    <Badge variant="teal" size="sm">
                      {booking.nights} nights
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">
                      {booking.checkIn} - {booking.checkOut}
                    </span>
                    <span className="text-teal-400 font-semibold">
                      ${booking.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Summary */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Revenue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-charcoal-900/50">
              <p className="text-sm text-zinc-400 mb-2">This Month</p>
              <p className="text-2xl font-bold text-white">
                ${revenueData.thisMonth.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-charcoal-900/50">
              <p className="text-sm text-zinc-400 mb-2">Last Month</p>
              <p className="text-2xl font-bold text-white">
                ${revenueData.lastMonth.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-teal-600/10 border border-teal-600/30">
              <p className="text-sm text-teal-400 mb-2">Year to Date</p>
              <p className="text-2xl font-bold text-teal-400">
                ${revenueData.ytd.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="primary" size="md" className="w-full">
              <Eye className="w-4 h-4" />
              View All Bookings
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              <DollarSign className="w-4 h-4" />
              Financial Reports
            </Button>
            <Button variant="outline" size="md" className="w-full">
              <Building2 className="w-4 h-4" />
              Manage Properties
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
