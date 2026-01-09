"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUnits } from "@/lib/db/units";
import { isUnitAvailable } from "@/lib/db/bookings";
import { formatCurrency } from "@/lib/utils";
import { Unit } from "@/types";

export default function BrowseUnitsPage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const allUnits = getAllUnits();

  // Filter available units if dates are selected
  const availableUnits = checkIn && checkOut
    ? allUnits.filter((unit) =>
        isUnitAvailable(unit.id, new Date(checkIn), new Date(checkOut))
      )
    : allUnits;

  const handleUnitSelect = (unitId: string) => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
    });
    router.push(`/booker/request/${unitId}?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Encuentra tu Escapada en Bacalar
        </h1>
        <p className="text-lg text-gray-600">
          Apartamentos y villas de lujo con vista a la Laguna de los 7 Colores
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Llegada
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salida
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Huéspedes
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "huésped" : "huéspedes"}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                // Filter is automatic based on state
              }}
              className="w-full px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>
        {checkIn && checkOut && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
            {availableUnits.length} unidad
            {availableUnits.length !== 1 ? "es" : ""} disponible
            {availableUnits.length !== 1 ? "s" : ""} para las fechas seleccionadas
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {checkIn && checkOut ? "Unidades Disponibles" : "Todas las Unidades"}
        </h2>

        {availableUnits.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay unidades disponibles
            </h3>
            <p className="text-gray-600">
              Intenta cambiar tus fechas para ver más opciones
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableUnits.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                onSelect={() => handleUnitSelect(unit.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UnitCard({ unit, onSelect }: { unit: Unit; onSelect: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🏠</div>
          <div className="text-sm text-gray-600">
            {unit.photos.length > 0 ? "Foto disponible" : "Sin foto"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{unit.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{unit.type}</p>
          </div>
          <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded">
            {unit.neighborhood}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {unit.bedrooms} rec
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {unit.bathrooms} baños
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {unit.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {amenity}
            </span>
          ))}
          {unit.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{unit.amenities.length - 3} más
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500">Desde</div>
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(unit.pricing.base, unit.pricing.currency)}
              <span className="text-sm font-normal text-gray-600">/noche</span>
            </div>
          </div>
          <button
            onClick={onSelect}
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
