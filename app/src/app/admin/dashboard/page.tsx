// ============================================
// ADMIN DASHBOARD PAGE
// Overview with stats, today's activity, and quick actions
// ============================================

import { StatCard, Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import {
  Building2,
  Calendar,
  TrendingUp,
  Percent,
  ArrowRight,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
  // TODO: Replace with actual data from stores
  const stats = {
    totalUnits: 8,
    activeBookings: 5,
    occupancyRate: 62.5,
    monthlyRevenue: 145000,
  };

  const todayActivity = {
    checkIns: [
      { id: "1", guest: "John Smith", unit: "Casa Azul", time: "3:00 PM" },
      { id: "2", guest: "Maria Garcia", unit: "Villa Laguna", time: "4:00 PM" },
    ],
    checkOuts: [
      { id: "3", guest: "David Wilson", unit: "Condo Centro", time: "11:00 AM" },
    ],
    cleanings: [
      { id: "c1", unit: "Casa Azul", status: "pending", time: "2:00 PM" },
      { id: "c2", unit: "Villa Laguna", status: "in_progress", time: "10:00 AM" },
      { id: "c3", unit: "Condo Centro", status: "completed", time: "9:00 AM" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-zinc-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Building2 className="w-6 h-6" />}
          label="Total Units"
          value={stats.totalUnits}
          variant="teal"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Active Bookings"
          value={stats.activeBookings}
          trend={{ value: 12, positive: true }}
          variant="gold"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="This Month Revenue"
          value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
          trend={{ value: 8, positive: true }}
          variant="green"
        />
        <StatCard
          icon={<Percent className="w-6 h-6" />}
          label="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          trend={{ value: 5, positive: true }}
          variant="teal"
        />
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-ins & Check-outs */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Check-ins */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="icon-box icon-box-sm icon-box-teal">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    Check-ins ({todayActivity.checkIns.length})
                  </h4>
                </div>
                <div className="space-y-2">
                  {todayActivity.checkIns.map((checkin) => (
                    <div
                      key={checkin.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-charcoal-900/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {checkin.guest}
                        </p>
                        <p className="text-xs text-zinc-500">{checkin.unit}</p>
                      </div>
                      <Badge variant="teal" size="sm">
                        {checkin.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check-outs */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="icon-box icon-box-sm icon-box-gold">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    Check-outs ({todayActivity.checkOuts.length})
                  </h4>
                </div>
                <div className="space-y-2">
                  {todayActivity.checkOuts.map((checkout) => (
                    <div
                      key={checkout.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-charcoal-900/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          {checkout.guest}
                        </p>
                        <p className="text-xs text-zinc-500">{checkout.unit}</p>
                      </div>
                      <Badge variant="gold" size="sm">
                        {checkout.time}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cleaning Schedule */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Cleanings</CardTitle>
              <Badge variant="muted" size="sm">
                {todayActivity.cleanings.length} tasks
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayActivity.cleanings.map((cleaning) => {
                const statusConfig = {
                  pending: { icon: Clock, variant: "muted" as const, label: "Pending" },
                  in_progress: { icon: Sparkles, variant: "warning" as const, label: "In Progress" },
                  completed: { icon: Check, variant: "success" as const, label: "Completed" },
                };
                const config = statusConfig[cleaning.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={cleaning.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-charcoal-900/50 hover:bg-charcoal-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`icon-box icon-box-sm ${
                          cleaning.status === "pending"
                            ? "icon-box-teal opacity-50"
                            : cleaning.status === "in_progress"
                            ? "icon-box-gold"
                            : "icon-box-green"
                        }`}
                      >
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {cleaning.unit}
                        </p>
                        <p className="text-xs text-zinc-500">{cleaning.time}</p>
                      </div>
                    </div>
                    <Badge variant={config.variant} size="sm">
                      {config.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="primary" size="md" className="w-full">
              <Calendar className="w-4 h-4" />
              New Booking
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              <Sparkles className="w-4 h-4" />
              Assign Cleaning
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              <Building2 className="w-4 h-4" />
              Add Unit
            </Button>
            <Button variant="outline" size="md" className="w-full">
              <TrendingUp className="w-4 h-4" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
