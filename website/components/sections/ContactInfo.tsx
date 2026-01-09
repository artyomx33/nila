"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { contactPage } from "@/lib/content/contact";
import { MapPinIcon, PhoneIcon } from "@/components/ui/Icons";

// Custom icons
function MailIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ClockIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MessageCircleIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function CameraIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Address */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teddy/10 flex items-center justify-center">
                  <MapPinIcon size={20} className="text-teddy" />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {contactPage.infoBlock.addressLabel}
                </h3>
              </div>
              <p className="text-gray-600 ml-13 pl-[52px]">
                {contactPage.infoBlock.address}
              </p>
            </div>

            {/* Phone & WhatsApp */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teddy/10 flex items-center justify-center">
                  <PhoneIcon size={20} className="text-teddy" />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {contactPage.infoBlock.phoneLabel}
                </h3>
              </div>
              <div className="pl-[52px] space-y-2">
                <a
                  href={contactPage.infoBlock.phoneHref}
                  className="block text-gray-600 hover:text-teddy transition-colors"
                >
                  {contactPage.infoBlock.phone}
                </a>
                <a
                  href={contactPage.infoBlock.whatsappHref}
                  className="inline-flex items-center gap-2 text-teddy font-medium hover:underline"
                >
                  <MessageCircleIcon size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teddy/10 flex items-center justify-center">
                  <MailIcon size={20} className="text-teddy" />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {contactPage.infoBlock.emailLabel}
                </h3>
              </div>
              <a
                href={contactPage.infoBlock.emailHref}
                className="pl-[52px] text-gray-600 hover:text-teddy transition-colors"
              >
                {contactPage.infoBlock.email}
              </a>
            </div>

            {/* Hours */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teddy/10 flex items-center justify-center">
                  <ClockIcon size={20} className="text-teddy" />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {contactPage.hours.title}
                </h3>
              </div>
              <div className="pl-[52px] space-y-1">
                {contactPage.hours.schedule.map((item, index) => (
                  <div key={index} className="flex justify-between max-w-xs">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="font-medium text-black">{item.time}</span>
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-2">
                  {contactPage.hours.note}
                </p>
              </div>
            </div>

            {/* Quick Photo Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teddy flex items-center justify-center">
                  <CameraIcon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-black">
                  {contactPage.quickContact.photoCta.label}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {contactPage.quickContact.photoCta.description}
              </p>
              <a
                href={contactPage.quickContact.whatsappCta.href}
                className="button-primary inline-flex items-center gap-2 bg-teddy hover:bg-teddy/90"
              >
                <MessageCircleIcon size={18} />
                {contactPage.quickContact.whatsappCta.label}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe
                src={contactPage.infoBlock.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TeddyFix Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
