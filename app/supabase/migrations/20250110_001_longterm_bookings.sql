-- =====================================================
-- NILA Long-Term Booking Support
-- Adds fields for monthly rentals, deposits, utilities, documents
-- =====================================================

-- Add long-term booking fields to NILA_bookings
ALTER TABLE NILA_bookings
  ADD COLUMN IF NOT EXISTS booking_type TEXT CHECK (booking_type IN ('short_term', 'long_term')) DEFAULT 'short_term',
  ADD COLUMN IF NOT EXISTS monthly_rate DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS security_deposit DECIMAL(10, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS deposit_status TEXT CHECK (deposit_status IN ('pending', 'received', 'partially_returned', 'returned')) DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS deposit_return_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS deposit_return_notes TEXT,
  -- Utilities
  ADD COLUMN IF NOT EXISTS wifi_included BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS electricity_included BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS water_fee_monthly DECIMAL(10, 2) DEFAULT 0,
  -- Documents
  ADD COLUMN IF NOT EXISTS guest_passport_url TEXT,
  ADD COLUMN IF NOT EXISTS guest_id_url TEXT,
  -- Contract
  ADD COLUMN IF NOT EXISTS contract_status TEXT CHECK (contract_status IN ('not_needed', 'draft', 'sent', 'signed')) DEFAULT 'not_needed';

-- Add payment type to track different payment purposes
ALTER TABLE NILA_payments
  ADD COLUMN IF NOT EXISTS payment_type TEXT CHECK (payment_type IN (
    'reservation_deposit',
    'security_deposit',
    'rent',
    'cleaning',
    'utilities',
    'damage',
    'refund',
    'other'
  )) DEFAULT 'rent';

-- Create index for booking type queries
CREATE INDEX IF NOT EXISTS idx_nila_bookings_type ON NILA_bookings(booking_type);
CREATE INDEX IF NOT EXISTS idx_nila_payments_type ON NILA_payments(payment_type);

-- =====================================================
-- COMMENTS for documentation
-- =====================================================

COMMENT ON COLUMN NILA_bookings.booking_type IS 'short_term = nightly pricing, long_term = monthly pricing';
COMMENT ON COLUMN NILA_bookings.monthly_rate IS 'Monthly rent for long-term bookings (MXN/USD)';
COMMENT ON COLUMN NILA_bookings.security_deposit IS 'Refundable security deposit amount';
COMMENT ON COLUMN NILA_bookings.deposit_status IS 'Track if deposit has been received/returned';
COMMENT ON COLUMN NILA_bookings.wifi_included IS 'Is WiFi included in the rent?';
COMMENT ON COLUMN NILA_bookings.electricity_included IS 'Is electricity included in the rent?';
COMMENT ON COLUMN NILA_bookings.water_fee_monthly IS 'Fixed monthly water fee (0 if included)';
COMMENT ON COLUMN NILA_bookings.guest_passport_url IS 'URL to uploaded passport image';
COMMENT ON COLUMN NILA_bookings.guest_id_url IS 'URL to uploaded ID image';
COMMENT ON COLUMN NILA_bookings.contract_status IS 'Status of the rental contract';
COMMENT ON COLUMN NILA_payments.payment_type IS 'What is this payment for?';
