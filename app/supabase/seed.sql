-- ============================================
-- NILA ESTATE MANAGEMENT - SEED DATA
-- Optional: Populate database with sample data
-- ============================================

-- This file contains sample data from the original mock data
-- Run this AFTER running the initial schema migration

-- ============================================
-- OWNERS
-- ============================================

INSERT INTO owners (id, name, email, phone, commission_rate) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Carlos Hernández', 'carlos@nilaestate.com', '+52 998 123 4567', 15.00),
('550e8400-e29b-41d4-a716-446655440002', 'Ana García', 'ana@nilaestate.com', '+52 998 234 5678', 15.00),
('550e8400-e29b-41d4-a716-446655440003', 'Roberto Sánchez', 'roberto@nilaestate.com', '+52 998 345 6789', 15.00);

-- ============================================
-- UNITS
-- ============================================

INSERT INTO units (id, name, type, bedrooms, bathrooms, floor, neighborhood, owner_id, amenities, is_smart, rental_type, pricing, photos, guide, platform_urls, status) VALUES
(
  '550e8400-e29b-41d4-a716-446655440101',
  'Casa Azul',
  'apartment',
  2,
  2,
  3,
  'Centro Bacalar',
  '550e8400-e29b-41d4-a716-446655440001',
  ARRAY['wifi', 'ac', 'pool', 'parking', 'kitchen', 'washer', 'tv', 'workspace'],
  true,
  'short',
  '{"base": 2500, "high_season": 3500, "low_season": 2000, "cleaning_fee": 800, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/casa-azul-1.jpg', '/images/units/casa-azul-2.jpg'],
  'Welcome to Casa Azul! Your home away from home in beautiful Bacalar. Check-in is at 3 PM, check-out at 11 AM. WiFi password: bacalar2024. Enjoy your stay!',
  '{"airbnb": "https://airbnb.com/rooms/casa-azul"}'::jsonb,
  'available'
),
(
  '550e8400-e29b-41d4-a716-446655440102',
  'Villa Laguna',
  'villa',
  4,
  3,
  1,
  'Costa del Sol',
  '550e8400-e29b-41d4-a716-446655440002',
  ARRAY['wifi', 'ac', 'pool', 'parking', 'kitchen', 'washer', 'dryer', 'tv', 'workspace', 'bbq', 'garden'],
  true,
  'short',
  '{"base": 5500, "high_season": 7500, "low_season": 4500, "cleaning_fee": 1500, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/villa-laguna-1.jpg', '/images/units/villa-laguna-2.jpg', '/images/units/villa-laguna-3.jpg'],
  'Welcome to Villa Laguna! Luxury lakefront living awaits you. The villa features a private pool and direct lagoon access.',
  '{"airbnb": "https://airbnb.com/rooms/villa-laguna", "booking": "https://booking.com/villa-laguna"}'::jsonb,
  'occupied'
),
(
  '550e8400-e29b-41d4-a716-446655440103',
  'Condo Mar',
  'condo',
  1,
  1,
  2,
  'Centro Bacalar',
  '550e8400-e29b-41d4-a716-446655440001',
  ARRAY['wifi', 'ac', 'pool', 'kitchen', 'tv'],
  false,
  'both',
  '{"base": 1800, "high_season": 2500, "low_season": 1500, "cleaning_fee": 600, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/condo-mar-1.jpg'],
  'Cozy condo perfect for couples or solo travelers. Walking distance to the lagoon and downtown.',
  '{"airbnb": "https://airbnb.com/rooms/condo-mar"}'::jsonb,
  'available'
),
(
  '550e8400-e29b-41d4-a716-446655440104',
  'Penthouse Cielo',
  'penthouse',
  3,
  2,
  5,
  'Vista Hermosa',
  '550e8400-e29b-41d4-a716-446655440003',
  ARRAY['wifi', 'ac', 'parking', 'kitchen', 'washer', 'dryer', 'tv', 'workspace', 'terrace'],
  true,
  'short',
  '{"base": 4200, "high_season": 6000, "low_season": 3500, "cleaning_fee": 1200, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/penthouse-cielo-1.jpg', '/images/units/penthouse-cielo-2.jpg'],
  'Stunning penthouse with panoramic views of Laguna Bacalar. The rooftop terrace is perfect for sunset watching.',
  '{"booking": "https://booking.com/penthouse-cielo"}'::jsonb,
  'available'
),
(
  '550e8400-e29b-41d4-a716-446655440105',
  'Studio Paz',
  'studio',
  0,
  1,
  1,
  'Centro Bacalar',
  '550e8400-e29b-41d4-a716-446655440002',
  ARRAY['wifi', 'ac', 'kitchen', 'tv'],
  false,
  'short',
  '{"base": 1200, "high_season": 1800, "low_season": 1000, "cleaning_fee": 400, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/studio-paz-1.jpg'],
  'Compact and efficient studio apartment. Perfect for budget-conscious travelers.',
  '{"airbnb": "https://airbnb.com/rooms/studio-paz"}'::jsonb,
  'maintenance'
),
(
  '550e8400-e29b-41d4-a716-446655440106',
  'Casa Paraíso',
  'villa',
  5,
  4,
  1,
  'Costa del Sol',
  '550e8400-e29b-41d4-a716-446655440003',
  ARRAY['wifi', 'ac', 'pool', 'parking', 'kitchen', 'washer', 'dryer', 'tv', 'workspace', 'bbq', 'garden', 'gym'],
  true,
  'short',
  '{"base": 8000, "high_season": 12000, "low_season": 6500, "cleaning_fee": 2000, "currency": "MXN"}'::jsonb,
  ARRAY['/images/units/casa-paraiso-1.jpg', '/images/units/casa-paraiso-2.jpg', '/images/units/casa-paraiso-3.jpg', '/images/units/casa-paraiso-4.jpg'],
  'Luxury villa with private pool, gym, and beautiful gardens. Perfect for large groups and special events.',
  '{"airbnb": "https://airbnb.com/rooms/casa-paraiso", "booking": "https://booking.com/casa-paraiso"}'::jsonb,
  'available'
);

-- ============================================
-- STAFF
-- ============================================

INSERT INTO staff (id, name, phone, email, role, status, assigned_cleanings, completed_cleanings, rating) VALUES
('550e8400-e29b-41d4-a716-446655440201', 'María López', '+52 998 111 2222', 'maria@cleaners.com', 'cleaner', 'active', 3, 45, 4.8),
('550e8400-e29b-41d4-a716-446655440202', 'Juan Pérez', '+52 998 222 3333', 'juan@cleaners.com', 'cleaner', 'active', 2, 38, 4.6),
('550e8400-e29b-41d4-a716-446655440203', 'Sofia Ramírez', '+52 998 333 4444', 'sofia@cleaners.com', 'cleaner', 'active', 4, 52, 4.9);

-- ============================================
-- BOOKINGS
-- ============================================

INSERT INTO bookings (id, unit_id, guest, check_in, check_out, source, status, pricing, payment_status) VALUES
(
  '550e8400-e29b-41d4-a716-446655440301',
  '550e8400-e29b-41d4-a716-446655440101',
  '{"name": "John Smith", "email": "john.smith@example.com", "phone": "+1 555 123 4567", "nationality": "USA", "guests_count": 2, "notes": "Anniversary trip"}'::jsonb,
  '2026-01-15',
  '2026-01-22',
  'direct',
  'confirmed',
  '{"nightly_rate": 2500, "nights": 7, "subtotal": 17500, "cleaning_fee": 800, "taxes": 2790, "total": 21090, "currency": "MXN"}'::jsonb,
  'paid'
),
(
  '550e8400-e29b-41d4-a716-446655440302',
  '550e8400-e29b-41d4-a716-446655440102',
  '{"name": "Maria Garcia", "email": "maria.garcia@example.com", "phone": "+52 998 765 4321", "nationality": "Mexico", "guests_count": 4}'::jsonb,
  '2026-01-18',
  '2026-01-25',
  'airbnb',
  'confirmed',
  '{"nightly_rate": 3000, "nights": 7, "subtotal": 21000, "cleaning_fee": 1000, "taxes": 3520, "total": 25520, "currency": "MXN"}'::jsonb,
  'paid'
),
(
  '550e8400-e29b-41d4-a716-446655440303',
  '550e8400-e29b-41d4-a716-446655440101',
  '{"name": "Pierre Dubois", "email": "pierre.dubois@example.com", "phone": "+33 1 23 45 67 89", "nationality": "France", "guests_count": 2, "notes": "Honeymoon"}'::jsonb,
  '2026-01-25',
  '2026-02-01',
  'booking',
  'confirmed',
  '{"nightly_rate": 2500, "nights": 7, "subtotal": 17500, "cleaning_fee": 800, "taxes": 2790, "total": 21090, "currency": "MXN"}'::jsonb,
  'partial'
);

-- ============================================
-- CLEANINGS
-- ============================================

INSERT INTO cleanings (id, unit_id, booking_id, scheduled_date, cleaner_id, type, status, checklist, notes) VALUES
(
  '550e8400-e29b-41d4-a716-446655440401',
  '550e8400-e29b-41d4-a716-446655440101',
  '550e8400-e29b-41d4-a716-446655440301',
  '2026-01-14',
  '550e8400-e29b-41d4-a716-446655440201',
  'turnover',
  'completed',
  '[]'::jsonb,
  'Unit ready for guest check-in'
),
(
  '550e8400-e29b-41d4-a716-446655440402',
  '550e8400-e29b-41d4-a716-446655440102',
  '550e8400-e29b-41d4-a716-446655440302',
  '2026-01-17',
  '550e8400-e29b-41d4-a716-446655440202',
  'turnover',
  'completed',
  '[]'::jsonb,
  'Deep clean completed'
),
(
  '550e8400-e29b-41d4-a716-446655440403',
  '550e8400-e29b-41d4-a716-446655440101',
  '550e8400-e29b-41d4-a716-446655440301',
  '2026-01-22',
  '550e8400-e29b-41d4-a716-446655440201',
  'turnover',
  'pending',
  '[]'::jsonb,
  'Scheduled for after guest checkout'
);

-- ============================================
-- MAINTENANCE REQUESTS
-- ============================================

INSERT INTO maintenance_requests (id, unit_id, category, priority, status, title, description, reported_by, photos) VALUES
(
  '550e8400-e29b-41d4-a716-446655440501',
  '550e8400-e29b-41d4-a716-446655440105',
  'plumbing',
  'high',
  'in_progress',
  'Leaking faucet in bathroom',
  'Guest reported dripping faucet in main bathroom. Needs immediate attention.',
  'Admin',
  ARRAY[]::text[]
),
(
  '550e8400-e29b-41d4-a716-446655440502',
  '550e8400-e29b-41d4-a716-446655440103',
  'hvac',
  'medium',
  'scheduled',
  'AC maintenance check',
  'Routine AC maintenance and filter replacement',
  'Admin',
  ARRAY[]::text[]
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- You can run these queries to verify the data was inserted correctly:

-- SELECT COUNT(*) FROM owners;
-- SELECT COUNT(*) FROM units;
-- SELECT COUNT(*) FROM staff;
-- SELECT COUNT(*) FROM bookings;
-- SELECT COUNT(*) FROM cleanings;
-- SELECT COUNT(*) FROM maintenance_requests;

-- SELECT u.name, u.status, o.name as owner_name
-- FROM units u
-- LEFT JOIN owners o ON u.owner_id = o.id
-- ORDER BY u.name;
