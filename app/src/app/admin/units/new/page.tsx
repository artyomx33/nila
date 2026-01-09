// ============================================
// NEW UNIT PAGE
// Agent 2: Create new unit
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { UnitForm } from "@/components/admin/units/unit-form";

export default function NewUnitPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/units" className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block">
            ← Back to Units
          </Link>
          <h1 className="text-3xl font-bold text-white">Add New Unit</h1>
          <p className="text-gray-400 mt-1">Create a new property in your portfolio</p>
        </div>

        {/* Form */}
        <UnitForm mode="create" />
      </div>
    </div>
  );
}
