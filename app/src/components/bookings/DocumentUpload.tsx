// ============================================
// DOCUMENT UPLOAD COMPONENT
// Upload passport and ID documents to Supabase Storage
// ============================================

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type DocumentType = "passport" | "id";

interface DocumentUploadProps {
  bookingId: string;
  documentType: DocumentType;
  existingUrl?: string | null;
  onUploadComplete?: (url: string) => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function DocumentUpload({
  bookingId,
  documentType,
  existingUrl,
  onUploadComplete,
}: DocumentUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(existingUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const documentLabel = documentType === "passport" ? "Pasaporte" : "Identificación";
  const bucketName = "guest-documents";
  const fieldName = documentType === "passport" ? "guest_passport_url" : "guest_id_url";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Formato inválido. Solo se permiten imágenes (JPG, PNG, WEBP) o PDF.");
      setStatus("error");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("El archivo es demasiado grande. Tamaño máximo: 5MB.");
      setStatus("error");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setStatus("idle");
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const fileExt = file.name.split(".").pop();
      const fileName = `${bookingId}/${documentType}_${timestamp}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(uploadData.path);

      const publicUrl = urlData.publicUrl;

      // Update booking record
      const { error: updateError } = await supabase
        .from("nila_bookings")
        .update({ [fieldName]: publicUrl })
        .eq("id", bookingId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setUploadedUrl(publicUrl);
      setStatus("success");
      setFile(null);

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Error al subir el archivo");
      setStatus("error");
    }
  };

  const handleRemove = async () => {
    if (!uploadedUrl) return;

    try {
      // Extract file path from URL
      const urlParts = uploadedUrl.split(`${bucketName}/`);
      if (urlParts.length < 2) {
        throw new Error("URL inválida");
      }
      const filePath = urlParts[1];

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      // Update booking record
      const { error: updateError } = await supabase
        .from("nila_bookings")
        .update({ [fieldName]: null })
        .eq("id", bookingId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setUploadedUrl(null);
      setStatus("idle");
      setFile(null);

      if (onUploadComplete) {
        onUploadComplete("");
      }
    } catch (err) {
      console.error("Remove error:", err);
      setError(err instanceof Error ? err.message : "Error al eliminar el archivo");
      setStatus("error");
    }
  };

  const isImage = uploadedUrl && !uploadedUrl.endsWith(".pdf");

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {documentLabel}
      </label>

      {/* Upload Area */}
      {!uploadedUrl && (
        <div className="space-y-3">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              status === "error"
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            )}
          >
            <input
              type="file"
              id={`file-${documentType}`}
              accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={status === "uploading"}
            />

            <label
              htmlFor={`file-${documentType}`}
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Haz clic para seleccionar {documentLabel.toLowerCase()}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP o PDF (máx. 5MB)
              </p>
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                onClick={handleUpload}
                loading={status === "uploading"}
                disabled={status === "uploading"}
                size="sm"
                variant="primary"
              >
                Subir
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Preview Area */}
      {uploadedUrl && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {isImage ? (
            <div className="relative group">
              <img
                src={uploadedUrl}
                alt={documentLabel}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <Button
                  onClick={handleRemove}
                  variant="danger"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {documentLabel} (PDF)
                    </p>
                    <a
                      href={uploadedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-600 hover:underline"
                    >
                      Ver documento
                    </a>
                  </div>
                </div>
                <Button
                  onClick={handleRemove}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span>Documento subido exitosamente</span>
        </div>
      )}

      {status === "error" && error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
