import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-charcoal-950 flex flex-col items-center justify-center p-8">
      {/* Logo placeholder */}
      <div className="w-20 h-20 rounded-full bg-nila-600/20 flex items-center justify-center mb-8">
        <span className="text-3xl font-serif text-nila-400">N</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-serif text-white mb-2">NILA Manager</h1>
      <p className="text-charcoal-400 mb-12">Property Operations Platform</p>

      {/* Portal Links */}
      <div className="grid gap-4 w-full max-w-md">
        <Link
          href="/admin/dashboard"
          className="card-default card-interactive p-6 text-center group"
        >
          <div className="icon-box icon-box-teal icon-box-lg mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white mb-1">Admin Portal</h2>
          <p className="text-sm text-charcoal-400">Manage all properties, bookings & operations</p>
        </Link>

        <Link
          href="/owner/dashboard"
          className="card-default card-interactive p-6 text-center group"
        >
          <div className="icon-box icon-box-gold icon-box-lg mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white mb-1">Owner Portal</h2>
          <p className="text-sm text-charcoal-400">View your properties & financial reports</p>
        </Link>

        <Link
          href="/booker/browse"
          className="card-default card-interactive p-6 text-center group"
        >
          <div className="icon-box icon-box-green icon-box-lg mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white mb-1">Book a Stay</h2>
          <p className="text-sm text-charcoal-400">Browse available properties & request booking</p>
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-charcoal-600">
        NILA Estate Management &middot; Riviera Maya
      </p>
    </main>
  );
}
