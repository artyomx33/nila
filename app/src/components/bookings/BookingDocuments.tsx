// ============================================
// BOOKING DOCUMENTS COMPONENT
// Integration example for DocumentUpload in booking detail view
// ============================================

"use client";

import { useTranslations } from "next-intl";
import { DocumentUpload } from "./DocumentUpload";

interface BookingDocumentsProps {
  bookingId: string;
  passportUrl?: string | null;
  idUrl?: string | null;
}

export function BookingDocuments({
  bookingId,
  passportUrl,
  idUrl,
}: BookingDocumentsProps) {
  const t = useTranslations("documents");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("guestDocuments")}
        </h3>
        <p className="text-sm text-gray-600">
          {t("dragDrop")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUpload
          bookingId={bookingId}
          documentType="passport"
          existingUrl={passportUrl}
          onUploadComplete={(url) => {
            console.log("Passport uploaded:", url);
          }}
        />

        <DocumentUpload
          bookingId={bookingId}
          documentType="id"
          existingUrl={idUrl}
          onUploadComplete={(url) => {
            console.log("ID uploaded:", url);
          }}
        />
      </div>
    </div>
  );
}
