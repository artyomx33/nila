import Link from "next/link";
import { PhoneIcon, MapPinIcon } from "@/components/ui/Icons";
import { founders } from "@/lib/content/founders";
import { servicesArray } from "@/lib/content/services";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Format WhatsApp numbers
const getWhatsAppNumber = (phone: string) => phone.replace(/\s+/g, "").replace("+", "");

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-nila-600/20 flex items-center justify-center">
                <span className="text-lg font-serif text-nila-500">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif text-charcoal-50 leading-tight">
                  NILA
                </span>
                <span className="text-[10px] text-charcoal-500 uppercase tracking-wider">
                  Estate Management
                </span>
              </div>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed">
              El arte de operar con precisión. Premium property management in Riviera Maya&apos;s most exceptional destinations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-charcoal-400 hover:text-nila-500 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-charcoal-500 hover:text-nila-500 transition-colors text-sm"
                >
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesArray.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-charcoal-400 hover:text-nila-500 transition-colors text-sm"
                  >
                    {service.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPinIcon size={18} className="text-nila-500 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal-400 text-sm">
                  Bacalar & Riviera Maya, Mexico
                </span>
              </li>
              {founders.map((founder) => (
                <li key={founder.name} className="flex items-start gap-3">
                  <PhoneIcon size={18} className="text-nila-500 flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-charcoal-500 text-xs">{founder.name}</span>
                    <a
                      href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal-400 hover:text-nila-500 transition-colors text-sm"
                    >
                      {founder.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 text-sm">
            &copy; {new Date().getFullYear()} NILA Estate Management. All rights reserved.
          </p>
          <p className="text-charcoal-600 text-xs">
            Bacalar &bull; Tulum &bull; Riviera Maya
          </p>
        </div>
      </div>
    </footer>
  );
}
