"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { aboutPage } from "@/lib/content/about";
import { WrenchIcon, FlagIcon } from "@/components/ui/Icons";

// Search icon for forensics tab
function SearchIcon({ className = "", size = 24 }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const tabIcons: Record<string, React.ReactNode> = {
  wrench: <WrenchIcon size={20} />,
  search: <SearchIcon size={20} />,
  flag: <FlagIcon size={20} />,
};

export function SpasProfile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(aboutPage.spas.tabs[0].id);

  const activeTabContent = aboutPage.spas.tabs.find((t) => t.id === activeTab);

  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image + Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative mb-8">
              {/* Profile image placeholder */}
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-teddy/20 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-teddy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Photo coming soon</p>
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 lg:right-8 bg-black text-white px-6 py-3 rounded-xl shadow-lg"
              >
                <span className="text-teddy font-bold text-2xl">20+</span>
                <span className="text-sm ml-2">Years Experience</span>
              </motion.div>
            </div>

            {/* Short bio */}
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-lg leading-relaxed">
                {aboutPage.spas.shortBio}
              </p>
            </div>
          </motion.div>

          {/* Right: Title + Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="inline-block bg-teddy/10 text-teddy font-semibold px-4 py-2 rounded-full text-sm mb-4">
              {aboutPage.spas.subtitle}
            </div>
            <h2 className="heading-lg text-black mb-8">{aboutPage.spas.title}</h2>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {aboutPage.spas.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span
                    className={activeTab === tab.id ? "text-teddy" : "text-gray-500"}
                  >
                    {tabIcons[tab.icon]}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTabContent && (
              <motion.div
                key={activeTabContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-black mb-4">
                  {activeTabContent.content.title}
                </h3>
                <ul className="space-y-3">
                  {activeTabContent.content.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teddy/10 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-teddy"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
