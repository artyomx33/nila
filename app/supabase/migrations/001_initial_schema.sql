-- ============================================
-- NILA ESTATE MANAGEMENT - INITIAL SCHEMA
-- Database migration for property management
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- OWNERS TABLE
-- ============================================
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  tax_id TEXT,
  bank_account TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 15.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_owners_email ON owners(email);
CREATE INDEX idx_owners_user_id ON owners(user_id);

-- ============================================
-- UNITS TABLE
-- ============================================
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('apartment', 'condo', 'villa', 'studio', 'penthouse')),
  bedrooms INT NOT NULL DEFAULT 0,
  bathrooms INT NOT NULL DEFAULT 1,
  floor INT,
  neighborhood TEXT,
  owner_id UUID REFERENCES owners(id) ON DELETE SET NULL,
  amenities TEXT[] DEFAULT '{}',
  is_smart BOOLEAN DEFAULT false,
  rental_type TEXT CHECK (rental_type IN ('short', 'long', 'both')),
  pricing JSONB NOT NULL DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  guide TEXT,
  platform_urls JSONB DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance', 'unavailable')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_type ON units(type);
CREATE INDEX idx_units_owner_id ON units(owner_id);
CREATE INDEX idx_units_rental_type ON units(rental_type);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  guest JSONB NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  source TEXT CHECK (source IN ('direct', 'airbnb', 'booking', 'owner')),
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  pricing JSONB NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  contract_url TEXT,
  contract_signed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_unit_id ON bookings(unit_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_check_in ON bookings(check_in);
CREATE INDEX idx_bookings_check_out ON bookings(check_out);
CREATE INDEX idx_bookings_source ON bookings(source);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);

-- ============================================
-- STAFF TABLE (Cleaners and Maintenance)
-- ============================================
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'cleaner' CHECK (role IN ('cleaner', 'maintenance', 'manager')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  assigned_cleanings INT DEFAULT 0,
  completed_cleanings INT DEFAULT 0,
  rating DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_staff_status ON staff(status);
CREATE INDEX idx_staff_role ON staff(role);

-- ============================================
-- CLEANINGS TABLE
-- ============================================
CREATE TABLE cleanings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  scheduled_date DATE NOT NULL,
  cleaner_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('turnover', 'deep', 'maintenance', 'inspection')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'verified')),
  checklist JSONB DEFAULT '[]',
  photos TEXT[] DEFAULT '{}',
  notes TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cleanings_unit_id ON cleanings(unit_id);
CREATE INDEX idx_cleanings_booking_id ON cleanings(booking_id);
CREATE INDEX idx_cleanings_cleaner_id ON cleanings(cleaner_id);
CREATE INDEX idx_cleanings_status ON cleanings(status);
CREATE INDEX idx_cleanings_scheduled_date ON cleanings(scheduled_date);

-- ============================================
-- MAINTENANCE REQUESTS TABLE
-- ============================================
CREATE TABLE maintenance_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  category TEXT CHECK (category IN ('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'cosmetic', 'other')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  title TEXT NOT NULL,
  description TEXT,
  reported_by TEXT,
  assigned_to TEXT,
  photos TEXT[] DEFAULT '{}',
  cost DECIMAL(10,2),
  currency TEXT DEFAULT 'MXN' CHECK (currency IN ('MXN', 'USD')),
  scheduled_date DATE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_maintenance_unit_id ON maintenance_requests(unit_id);
CREATE INDEX idx_maintenance_status ON maintenance_requests(status);
CREATE INDEX idx_maintenance_priority ON maintenance_requests(priority);
CREATE INDEX idx_maintenance_category ON maintenance_requests(category);

-- ============================================
-- EXPENSES TABLE
-- ============================================
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  category TEXT CHECK (category IN ('cleaning', 'maintenance', 'utilities', 'supplies', 'marketing', 'commission', 'tax', 'other')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'MXN' CHECK (currency IN ('MXN', 'USD')),
  description TEXT NOT NULL,
  receipt_url TEXT,
  date DATE NOT NULL,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_expenses_unit_id ON expenses(unit_id);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_date ON expenses(date);

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON maintenance_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS but don't add policies yet
-- Policies will be added when authentication is implemented
-- ============================================
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleanings ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- For now, create permissive policies for development
-- IMPORTANT: Replace these with proper authentication-based policies in production
CREATE POLICY "Allow all operations for development" ON owners FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON units FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON bookings FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON staff FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON cleanings FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON maintenance_requests FOR ALL USING (true);
CREATE POLICY "Allow all operations for development" ON expenses FOR ALL USING (true);
