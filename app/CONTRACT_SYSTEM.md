# NILA Contract System

## Overview
The online contract system allows property managers to create, view, and manage rental contracts for long-term bookings directly within the NILA app.

## Components

### 1. ContractView Component
**Location**: `/src/components/bookings/ContractView.tsx`

A comprehensive component that displays all contract terms including:
- Parties (landlord and tenant information)
- Property details
- Rental terms (dates, monthly rent, security deposit)
- Utilities and services included
- Payment schedule
- Terms and conditions
- Signature sections

**Props**:
- `booking` - The booking object with contract details
- `unit` - The unit/property details
- `property` - Optional property information
- `onMarkAsSent` - Callback to mark contract as sent
- `onMarkAsSigned` - Callback to mark contract as signed
- `readOnly` - Whether to hide action buttons

### 2. ContractStatusBadge Component
**Location**: `/src/components/bookings/ContractStatusBadge.tsx`

Displays a badge indicating the current contract status:
- `not_needed` - No badge shown (for short-term bookings)
- `draft` - Muted badge: "Contract Draft"
- `sent` - Warning badge: "Contract Sent"
- `signed` - Success badge: "Contract Signed"

### 3. Database Functions
**Location**: `/src/lib/db/bookings.ts`

**updateContractStatus(id, status)**
- Updates the contract_status field in the database
- Automatically adds contract_signed_at timestamp when status is set to "signed"
- Status values: "not_needed", "draft", "sent", "signed"

## Routes

### Contract View Page
**URL**: `/admin/bookings/[id]/contract`
**Location**: `/src/app/admin/bookings/[id]/contract/page.tsx`

Displays the full contract for a long-term booking with actions to:
- Print the contract
- Mark as sent (when status is "draft")
- Mark as signed (when status is "sent")

**Access Control**:
- Only available for long-term bookings
- Redirects to booking details for short-term bookings
- Shows error if booking or unit not found

## Database Schema

The `NILA_bookings` table includes:

```sql
contract_status TEXT CHECK (contract_status IN ('not_needed', 'draft', 'sent', 'signed')) DEFAULT 'not_needed'
contract_url TEXT
contract_signed_at TIMESTAMP
```

Additional long-term booking fields:
- `booking_type` - "short_term" or "long_term"
- `monthly_rate` - Monthly rental amount
- `security_deposit` - Refundable deposit amount
- `wifi_included` - Boolean
- `electricity_included` - Boolean
- `water_fee_monthly` - Fixed monthly water fee

## Usage Flow

### Creating a Long-Term Booking
1. Create a booking with `booking_type: "long_term"`
2. Contract status defaults to "not_needed"
3. Change to "draft" when ready to send

### Sending a Contract
1. Navigate to booking details
2. Click "View Contract" button
3. Review contract terms
4. Click "Mark as Sent" to update status
5. Share contract link with tenant

### Signing a Contract
1. Tenant reviews contract (can share URL)
2. Property manager confirms signature received
3. Click "Mark as Signed" to finalize
4. System automatically records `contract_signed_at` timestamp

## Integration with Booking Details

The booking detail page (`/admin/bookings/[id]/page.tsx`) includes:
- Contract status badge in header
- Contract information card (for long-term bookings only)
- "View Contract" button to navigate to full contract view

## Print Functionality

The contract view includes a "Print Contract" button that triggers `window.print()`, allowing users to:
- Print physical copies
- Save as PDF (using browser's print-to-PDF feature)
- Generate copies for records

## Future Enhancements

Potential improvements for the contract system:
- Electronic signature integration (DocuSign, HelloSign)
- PDF generation and storage in Supabase Storage
- Email contract directly to tenant
- Contract templates with customizable terms
- Multi-language support
- Contract versioning and amendment tracking
