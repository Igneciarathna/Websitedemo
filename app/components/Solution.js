"use client";
import { useEffect, useState, useRef } from "react";

const solutions = {
  enterprise: {
    title: "On-Premise Model / Enterprise Model",
    subtitle: "Best suited for Banks, Large Brokers & Wealth Managers",
    features: [
      "Full control of data and deployment within your enterprise environment",
      "Deep integration with internal systems, compliance frameworks, and reporting workflows",
      "Tailored configurations for large teams, RM hierarchies, and custom report formats",
      "Meets strict data governance and IT security requirements",
    ],
    description:
      "We simplify complex portfolio management, so you can scale confidently and handle high-volume operations with ease.",
    gradient: "bg-[#A3CF32]",
    buttonColor: `bg-[#A3CF32] hover:bg-[#727376]`,
  },
  saas: {
    title: "SaaS Model / Cloud Subscription",
    subtitle: "Best suited for Smaller Brokers, IFAs & Boutique Firms",
    features: [
      "Quick onboarding with zero infrastructure hassles",
      "Access from anywhere with secure, scalable performance",
      "Branded client reporting and dashboards",
      "Affordable monthly plans that grow with your business",
    ],
    description:
      "Ready to move beyond Excel? Our cloud platform gets you there—minus the tech hassle.",
    gradient: "bg-[#727376]",
    buttonColor: `bg-[#727376] hover:bg-[#A3CF32]`,
  },
};

export default function SolutionToggle() {
  const [activeTab, setActiveTab] = useState("enterprise");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev === "enterprise" ? "saas" : "enterprise"));
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleTabChange = (key) => {
    if (activeTab === key) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsAnimating(false);
    }, 700);
  };

  const solution = solutions[activeTab];

  return (
    <div className="flex flex-col lg:flex-row dark:bg-[#0A0A0A] text-black dark:text-white p-6 lg:p-6 md:p-6 gap-6 transition-colors duration-500">
      {/* LEFT COLUMN */}
      <div className="w-full lg:w-1/4 flex flex-col gap-6 pr-0 lg:pr-6 border-b border-[#A3CF32] lg:border-b-0 lg:border-r pb-6 lg:pb-0">
        {Object.entries(solutions).map(([key, val]) => (
          <button
            key={key}
            className={`relative text-left p-4 transition-opacity ${
              activeTab === key ? "text-black dark:text-white" : "opacity-60"
            }`}
            onClick={() => handleTabChange(key)}
          >
            <div className="flex justify-between items-center font-semibold">
              <span>{val.title}</span>
              <div
                className={`px-2 py-1 rounded text-xs text-white bg-gradient-to-r ${val.gradient}`}
              >
                ▶
              </div>
            </div>
            {activeTab === key && (
              <div
                className={`absolute top-0 right-0 w-[3px] h-full animate-[fillBarVertical_6s_linear_infinite] bg-gradient-to-r ${val.gradient}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* MIDDLE COLUMN */}
      <div
        className="flex-1 px-6 flex flex-col border-b border-green-500 lg:border-b-0 transition-all duration-500 pb-6 lg:pb-0 pt-6 lg:pt-0"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "translateY(-20px)" : "translateY(0)",
          transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        }}
      >
        <h3 className="text-2xl font-bold mb-2">{solution.title}</h3>
        <p className="text-[#A3CF32] text-base mb-6">{solution.subtitle}</p>
        <ul className="mb-6 space-y-4">
          {solution.features.map((point, idx) => (
            <li key={idx} className="flex items-start">
              {/* Animated Dot for large screens */}
              <span className="hidden lg:flex relative w-3 h-3 mr-4 mt-1">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#A3CF32] opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A3CF32]"></span>
              </span>

              {/* Animated Dot for small screens */}
              <span className="lg:hidden relative w-3 h-3 mr-2 mt-1">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-[#A3CF32] opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A3CF32]"></span>
              </span>

              <p className="leading-relaxed text-justify text-base">{point}</p>
            </li>
          ))}
        </ul>
        <p className="text-[#727376] text-base leading-relaxed text-justify">
          {solution.description}
        </p>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-1/4 flex flex-col items-center border-b lg:border-b-0 lg:border-l border-[#A3CF32] pb-6 lg:pb-0 pl-0 lg:pl-6 gap-4">
        <div className="text-center text-[#727376] text-2xl leading-relaxed mt-4">
          Intelligence at your fingertips.
          <p className="text-gray-600 dark:text-gray-400 font-bold">
            Upgrade to Jade Money.
          </p>
        </div>
        <button
          className={`mt-4 text-white font-semibold py-2 px-6 rounded transition-colors ${solutions[activeTab].buttonColor}`}
        >
          {activeTab === "enterprise" ? "Contact Sales" : "Sign Up"}
        </button>
      </div>

      <style jsx>{`
        @keyframes fillBarVertical {
          0% {
            height: 0%;
          }
          100% {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
}
