-- NILA Estate Management Database Schema
-- All tables prefixed with NILA_ to keep separate from other apps in this project
-- Uses gen_random_uuid() which is built into PostgreSQL 13+

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Property Owners
CREATE TABLE IF NOT EXISTS NILA_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties (Developments/Buildings)
CREATE TABLE IF NOT EXISTS NILA_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT,
  city TEXT NOT NULL DEFAULT 'Bacalar',
  state TEXT NOT NULL DEFAULT 'Quintana Roo',
  country TEXT NOT NULL DEFAULT 'Mexico',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  type TEXT CHECK (type IN ('condo', 'house', 'villa', 'penthouse', 'development')) DEFAULT 'condo',
  description TEXT,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Units (Individual rental units within properties)
CREATE TABLE IF NOT EXISTS NILA_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES NILA_properties(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES NILA_owners(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  unit_number TEXT,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms DECIMAL(3,1) NOT NULL DEFAULT 1,
  is_penthouse BOOLEAN DEFAULT FALSE,
  square_meters DECIMAL(10, 2),
  floor INTEGER,
  max_guests INTEGER DEFAULT 2,
  description TEXT,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  -- Pricing
  base_nightly_rate DECIMAL(10, 2),
  cleaning_fee DECIMAL(10, 2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Management
  management_fee_percent DECIMAL(5, 2) DEFAULT 25.00,
  maintenance_tier TEXT CHECK (maintenance_tier IN ('1br', '1br_ph', '2br', '2br_ph', '3br', '3br_ph')),
  maintenance_fee_mxn DECIMAL(10, 2),
  -- Status
  status TEXT CHECK (status IN ('available', 'occupied', 'maintenance', 'blocked')) DEFAULT 'available',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BOOKING SYSTEM
-- =====================================================

-- Bookings
CREATE TABLE IF NOT EXISTS NILA_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES NILA_units(id) ON DELETE CASCADE NOT NULL,
  -- Guest info
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  guest_nationality TEXT,
  guests_count INTEGER DEFAULT 1,
  guest_notes TEXT,
  -- Dates
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER GENERATED ALWAYS AS (check_out - check_in) STORED,
  -- Source
  source TEXT CHECK (source IN ('direct', 'airbnb', 'booking', 'vrbo', 'owner')) DEFAULT 'direct',
  external_id TEXT,
  -- Pricing
  nightly_rate DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  cleaning_fee DECIMAL(10, 2) DEFAULT 0,
  taxes DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  -- Status
  status TEXT CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')) DEFAULT 'pending',
  payment_status TEXT CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')) DEFAULT 'pending',
  -- Contract
  contract_url TEXT,
  contract_signed_at TIMESTAMPTZ,
  -- Notes
  notes TEXT,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Booking Payments
CREATE TABLE IF NOT EXISTS NILA_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES NILA_bookings(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  method TEXT CHECK (method IN ('cash', 'card', 'transfer', 'paypal', 'stripe', 'other')) DEFAULT 'transfer',
  reference TEXT,
  notes TEXT,
  paid_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MAINTENANCE SYSTEM
-- =====================================================

-- Maintenance Tasks
CREATE TABLE IF NOT EXISTS NILA_maintenance_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES NILA_units(id) ON DELETE CASCADE,
  property_id UUID REFERENCES NILA_properties(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN (
    'inspection', 'electrical', 'plumbing', 'hvac', 'exterior',
    'cleaning', 'painting', 'appliances', 'security', 'other'
  )) DEFAULT 'other',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  assigned_to TEXT,
  scheduled_date DATE,
  completed_at TIMESTAMPTZ,
  cost DECIMAL(10, 2),
  currency TEXT DEFAULT 'MXN',
  images JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT has_location CHECK (unit_id IS NOT NULL OR property_id IS NOT NULL)
);

-- Monthly Maintenance Reports
CREATE TABLE IF NOT EXISTS NILA_maintenance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES NILA_units(id) ON DELETE CASCADE NOT NULL,
  month DATE NOT NULL, -- First day of the month
  inspector TEXT,
  -- Checklist results
  inspection_data JSONB DEFAULT '{}',
  -- Issues found
  issues_found JSONB DEFAULT '[]',
  -- Photos
  images JSONB DEFAULT '[]',
  -- Summary
  summary TEXT,
  owner_notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(unit_id, month)
);

-- =====================================================
-- FINANCIAL TRACKING
-- =====================================================

-- Owner Payouts
CREATE TABLE IF NOT EXISTS NILA_owner_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES NILA_owners(id) ON DELETE CASCADE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  -- Income
  gross_income DECIMAL(10, 2) NOT NULL DEFAULT 0,
  platform_fees DECIMAL(10, 2) DEFAULT 0,
  management_fee DECIMAL(10, 2) DEFAULT 0,
  maintenance_fee DECIMAL(10, 2) DEFAULT 0,
  other_expenses DECIMAL(10, 2) DEFAULT 0,
  net_payout DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Breakdown
  bookings_data JSONB DEFAULT '[]',
  expenses_data JSONB DEFAULT '[]',
  -- Status
  status TEXT CHECK (status IN ('draft', 'pending', 'paid')) DEFAULT 'draft',
  paid_at TIMESTAMPTZ,
  payment_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses (for properties/units)
CREATE TABLE IF NOT EXISTS NILA_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES NILA_units(id) ON DELETE CASCADE,
  property_id UUID REFERENCES NILA_properties(id) ON DELETE CASCADE,
  category TEXT CHECK (category IN (
    'utilities', 'maintenance', 'cleaning', 'supplies', 'insurance',
    'taxes', 'hoa', 'marketing', 'other'
  )) DEFAULT 'other',
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'MXN',
  vendor TEXT,
  receipt_url TEXT,
  expense_date DATE DEFAULT CURRENT_DATE,
  billable_to_owner BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_nila_units_property ON NILA_units(property_id);
CREATE INDEX IF NOT EXISTS idx_nila_units_owner ON NILA_units(owner_id);
CREATE INDEX IF NOT EXISTS idx_nila_bookings_unit ON NILA_bookings(unit_id);
CREATE INDEX IF NOT EXISTS idx_nila_bookings_dates ON NILA_bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_nila_bookings_status ON NILA_bookings(status);
CREATE INDEX IF NOT EXISTS idx_nila_maintenance_unit ON NILA_maintenance_tasks(unit_id);
CREATE INDEX IF NOT EXISTS idx_nila_maintenance_status ON NILA_maintenance_tasks(status);
CREATE INDEX IF NOT EXISTS idx_nila_payments_booking ON NILA_payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_nila_expenses_unit ON NILA_expenses(unit_id);
CREATE INDEX IF NOT EXISTS idx_nila_owner_payouts_owner ON NILA_owner_payouts(owner_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE NILA_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_maintenance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_maintenance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_owner_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE NILA_expenses ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations for authenticated users (to be tightened later)
-- Admins can do everything
CREATE POLICY "Allow all for authenticated" ON NILA_owners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_properties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_units FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_payments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_maintenance_tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_maintenance_reports FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_owner_payouts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated" ON NILA_expenses FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read for properties (for the booking portal)
CREATE POLICY "Allow public read properties" ON NILA_properties FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Allow public read units" ON NILA_units FOR SELECT USING (is_active = TRUE);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_nila_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_nila_owners_updated_at BEFORE UPDATE ON NILA_owners FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_properties_updated_at BEFORE UPDATE ON NILA_properties FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_units_updated_at BEFORE UPDATE ON NILA_units FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_bookings_updated_at BEFORE UPDATE ON NILA_bookings FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_maintenance_tasks_updated_at BEFORE UPDATE ON NILA_maintenance_tasks FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_maintenance_reports_updated_at BEFORE UPDATE ON NILA_maintenance_reports FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
CREATE TRIGGER update_nila_owner_payouts_updated_at BEFORE UPDATE ON NILA_owner_payouts FOR EACH ROW EXECUTE FUNCTION update_nila_updated_at();
