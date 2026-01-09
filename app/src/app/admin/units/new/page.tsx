// ============================================
// NEW UNIT PAGE
// Agent 2: Create new unit
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { UnitForm } from "@/components/admin/units/unit-form";

export default function NewUnitPage() {
  const t = useTranslations("units");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/units" className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block">
            ← {t("backToUnits")}
          </Link>
          <h1 className="text-3xl font-bold text-white">{t("addNewUnit")}</h1>
          <p className="text-gray-400 mt-1">{t("createNewProperty")}</p>
        </div>

        {/* Form */}
        <UnitForm mode="create" />
      </div>
    </div>
  );
}
