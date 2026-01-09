// ============================================
// REPORTS & ANALYTICS PAGE
// Report generation and analytics dashboard
// ============================================

"use client";

import { Badge } from "@/components/ui/badge";

// Report types configuration
const reportTypes = [
  {
    id: "revenue",
    title: "Revenue Report",
    description: "Detailed breakdown of income by property, booking source, and time period",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "teal",
  },
  {
    id: "occupancy",
    title: "Occupancy Report",
    description: "Track occupancy rates, booking patterns, and availability trends",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "gold",
  },
  {
    id: "maintenance",
    title: "Maintenance Report",
    description: "Maintenance costs, frequency, and performance metrics by property",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "green",
  },
  {
    id: "owner-statements",
    title: "Owner Statements",
    description: "Generate monthly statements with revenue, expenses, and payout details",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "gold",
  },
  {
    id: "guest-analytics",
    title: "Guest Analytics",
    description: "Guest demographics, booking behavior, and satisfaction metrics",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: "teal",
  },
  {
    id: "performance",
    title: "Performance Report",
    description: "Compare properties, analyze trends, and identify optimization opportunities",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "green",
  },
];

export default function ReportsPage() {
  const getIconBoxColor = (color: string) => {
    switch (color) {
      case "teal":
        return "icon-box-teal";
      case "gold":
        return "icon-box-gold";
      case "green":
        return "icon-box-green";
      default:
        return "icon-box-teal";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-400">
          Generate comprehensive reports and track performance metrics
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Reports Generated</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-teal">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Scheduled Reports</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-gold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Export Formats</p>
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Available Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="card-default card-interactive p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`icon-box icon-box-xl ${getIconBoxColor(report.color)}`}>
                  {report.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {report.title}
                    </h3>
                    <Badge variant="warning" size="sm">
                      Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </div>

              <button
                disabled
                className="w-full btn-secondary py-2.5 px-4 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="card-default p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-600/20 mb-4">
            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Advanced Analytics Coming Soon
          </h3>
          <p className="text-gray-400 mb-6">
            We're building powerful reporting tools to give you deep insights into your property portfolio.
            Stay tuned for automated reports, custom dashboards, and predictive analytics.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="teal">In Development</Badge>
            <Badge variant="muted">Q1 2026</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
