// ============================================
// Operations Dashboard Page
// ============================================

"use client";

import { getTodayCleanings, getUpcomingCleanings } from "@/lib/db/cleanings";
import { getActiveCleaners } from "@/lib/db/cleaners";
import { getUrgentMaintenance, getActiveMaintenance } from "@/lib/db/maintenance";
import { CleaningCard } from "@/components/operations/CleaningCard";
import { MaintenanceCard } from "@/components/operations/MaintenanceCard";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function OperationsPage() {
  const t = useTranslations("operations");

  const todayCleanings = getTodayCleanings();
  const upcomingCleanings = getUpcomingCleanings(3);
  const activeStaff = getActiveCleaners();
  const urgentMaintenance = getUrgentMaintenance();
  const activeMaintenance = getActiveMaintenance();

  const stats = [
    {
      label: t("todaysCleanings"),
      value: todayCleanings.length,
      icon: "🧹",
      color: "teal",
      href: "/admin/operations/cleaning",
    },
    {
      label: t("activeStaff"),
      value: activeStaff.length,
      icon: "👥",
      color: "gold",
      href: "/admin/operations/staff",
    },
    {
      label: t("urgentIssues"),
      value: urgentMaintenance.length,
      icon: "⚠️",
      color: "red",
      href: "/admin/operations/maintenance",
    },
    {
      label: t("activeMaintenance"),
      value: activeMaintenance.length,
      icon: "🔧",
      color: "green",
      href: "/admin/operations/maintenance",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          {t("dashboard")}
        </h1>
        <p className="text-gray-400">
          {t("manageDescription")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="card-default card-interactive p-6 hover:cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-default p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{t("quickActions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/admin/operations/cleaning"
            className="btn-primary p-4 rounded-lg text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">{t("scheduleCleaning")}</div>
          </Link>
          <Link
            href="/admin/operations/maintenance"
            className="btn-secondary p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
          >
            <div className="text-2xl mb-2">🔧</div>
            <div className="font-medium">{t("reportIssue")}</div>
          </Link>
          <Link
            href="/admin/operations/staff"
            className="btn-secondary p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium">{t("manageStaff")}</div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Cleanings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{t("todaysCleanings")}</h2>
            <Link
              href="/admin/operations/cleaning"
              className="text-sm text-teal-400 hover:text-teal-300"
            >
              {t("viewAll")} →
            </Link>
          </div>
          <div className="space-y-3">
            {todayCleanings.length === 0 ? (
              <div className="card-default p-8 text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-gray-400">{t("noCleaningsToday")}</p>
              </div>
            ) : (
              todayCleanings.map((cleaning) => (
                <CleaningCard
                  key={cleaning.id}
                  cleaning={cleaning}
                  unitName={`${t("unit")} ${cleaning.unit_id.split("-")[1]}`}
                  cleanerName={
                    cleaning.cleaner_id
                      ? `Cleaner ${cleaning.cleaner_id.split("-")[1]}`
                      : undefined
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Urgent Maintenance */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {t("urgentMaintenance")}
            </h2>
            <Link
              href="/admin/operations/maintenance"
              className="text-sm text-teal-400 hover:text-teal-300"
            >
              {t("viewAll")} →
            </Link>
          </div>
          <div className="space-y-3">
            {urgentMaintenance.length === 0 ? (
              <div className="card-default p-8 text-center">
                <div className="text-4xl mb-2">👍</div>
                <p className="text-gray-400">{t("noUrgentMaintenance")}</p>
              </div>
            ) : (
              urgentMaintenance.map((maintenance) => (
                <MaintenanceCard
                  key={maintenance.id}
                  maintenance={maintenance}
                  unitName={`${t("unit")} ${maintenance.unit_id.split("-")[1]}`}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upcoming This Week */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {t("upcomingCleanings")}
          </h2>
          <Link
            href="/admin/operations/cleaning"
            className="text-sm text-teal-400 hover:text-teal-300"
          >
            {t("viewSchedule")} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingCleanings
            .filter((c) => c.scheduled_date > new Date())
            .slice(0, 6)
            .map((cleaning) => (
              <CleaningCard
                key={cleaning.id}
                cleaning={cleaning}
                unitName={`${t("unit")} ${cleaning.unit_id.split("-")[1]}`}
                cleanerName={
                  cleaning.cleaner_id
                    ? `Cleaner ${cleaning.cleaner_id.split("-")[1]}`
                    : undefined
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
