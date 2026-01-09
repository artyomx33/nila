# Document Upload Component

## Overview

The `DocumentUpload` component allows uploading guest documents (passport and ID) to Supabase Storage and automatically updates the booking record with the document URLs.

## Features

- Upload passport and ID images (JPG, PNG, WEBP) or PDFs
- File validation (type and size - max 5MB)
- Upload progress indicator
- Preview uploaded images
- Delete uploaded documents
- Automatic database sync with `nila_bookings` table

## Usage

### Individual Document Upload

```tsx
import { DocumentUpload } from "@/components/bookings";

function BookingDetail() {
  const bookingId = "your-booking-id";

  return (
    <div>
      <DocumentUpload
        bookingId={bookingId}
        documentType="passport"
        existingUrl={booking.guest_passport_url}
        onUploadComplete={(url) => {
          console.log("Passport uploaded:", url);
          // Refresh booking data or update UI
        }}
      />
    </div>
  );
}
```

### Complete Documents Section

Use the `BookingDocuments` wrapper component for a complete documents section:

```tsx
import { BookingDocuments } from "@/components/bookings";

function BookingDetailPage() {
  const booking = useBooking(); // Your booking data hook

  return (
    <div className="space-y-6">
      <BookingDocuments
        bookingId={booking.id}
        passportUrl={booking.guest_passport_url}
        idUrl={booking.guest_id_url}
      />
    </div>
  );
}
```

## Component Props

### DocumentUpload

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `bookingId` | `string` | Yes | The booking ID to associate documents with |
| `documentType` | `"passport" \| "id"` | Yes | Type of document being uploaded |
| `existingUrl` | `string \| null` | No | URL of existing document (if any) |
| `onUploadComplete` | `(url: string) => void` | No | Callback when upload completes |

### BookingDocuments

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `bookingId` | `string` | Yes | The booking ID |
| `passportUrl` | `string \| null` | No | Existing passport URL |
| `idUrl` | `string \| null` | No | Existing ID URL |

## Supabase Setup Requirements

### 1. Storage Bucket

Create a storage bucket named `guest-documents`:

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('guest-documents', 'guest-documents', true);
```

### 2. Storage Policies

Set up RLS policies for the bucket:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'guest-documents');

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated reads"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'guest-documents');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'guest-documents');
```

### 3. Database Fields

The component uses these fields in the `nila_bookings` table:
- `guest_passport_url` (text, nullable)
- `guest_id_url` (text, nullable)

These fields already exist in your database schema.

## File Organization

Documents are stored with the following path structure:
```
guest-documents/
  {bookingId}/
    passport_{timestamp}.{ext}
    id_{timestamp}.{ext}
```

## Error Handling

The component handles:
- Invalid file types (only images and PDFs allowed)
- File size limits (max 5MB)
- Upload failures
- Network errors
- Storage deletion errors

Errors are displayed inline with helpful messages in Spanish.

## Validation Rules

- **Accepted formats**: JPG, JPEG, PNG, WEBP, PDF
- **Max file size**: 5MB
- **Storage**: Files are stored with unique timestamps to prevent overwrites

## Integration Example

Here's a complete example in a booking detail page:

```tsx
"use client";

import { useEffect, useState } from "react";
import { BookingDocuments } from "@/components/bookings";
import { supabase } from "@/lib/supabase/client";

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      const { data, error } = await supabase
        .from("nila_bookings")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) {
        setBooking(data);
      }
      setLoading(false);
    }

    loadBooking();
  }, [params.id]);

  if (loading) return <div>Cargando...</div>;
  if (!booking) return <div>Reserva no encontrada</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Reserva: {booking.guest_name}
      </h1>

      <BookingDocuments
        bookingId={booking.id}
        passportUrl={booking.guest_passport_url}
        idUrl={booking.guest_id_url}
      />
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS classes and follows the existing NILA design system with:
- Gray color palette for borders and backgrounds
- Teal accent color for primary actions
- Responsive design with mobile-first approach
- Hover states and smooth transitions

## Future Enhancements

Potential improvements:
- Progress bar during upload
- Image compression before upload
- Multi-file upload
- Drag-and-drop support
- Document expiration tracking
- OCR for automatic data extraction
