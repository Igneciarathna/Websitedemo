"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import portfolio from "@/app/assets/images/women.png";
const features = [
  {
    id: "portfolioView",
    title: "Unified Portfolio View",
    description: "Multi-custodian, multi-asset aggregation",
    image: "/images/Portfolio.png",
  },
  {
    id: "clientReports",
    title: "Branded Client Reports",
    description: "White-labeled, SEBI-compliant reporting",
    image: "/images/clientReports.png",
  },
  {
    id: "corporateActions",
    title: "Corporate Action Handling",
    description: "Auto-updated CaS tracking",
    image: "/images/corporateActions.png",
  },
  {
    id: "dashboards",
    title: "RM - Sub Broker/Partner - Customer Dashboards",
    description: "Personalized insights, ready for client meets",
    image: "/images/dashboards.png",
  },
  {
    id: "compliance",
    title: "Compliance-First Design",
    description: "Built for regulatory readiness",
    image: "/images/compliance.png",
  },
  {
    id: "apiIntegration",
    title: "API-Based Integration",
    description: "Plug into your existing systems effortlessly",
    image: "/images/apiIntegration.png",
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState(features[0].id);

  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? "" : id));
  };

  const currentFeature =
    features.find((feature) => feature.id === activeId) || features[0];

  return (
    <>
      <Head>
        <title>Feature Accordion</title>
      </Head>

      <div className="flex flex-col md:flex-row gap-8 p-6 dark:bg-[#0A0A0A] transition-colors duration-500">
        {/* LEFT - Accordion */}
        <div className="flex-1 max-w-xl">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-4"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(feature.id)}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <span
                  className={`text-2xl font-bold text-gray-600 dark:text-gray-300 transform transition-transform duration-500 ${
                    activeId === feature.id
                      ? "rotate-180 scale-110 opacity-80"
                      : ""
                  }`}
                >
                  {activeId === feature.id ? "×" : "+"}
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  activeId === feature.id
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Image */}
        {/* <div className="flex-1 relative h-[270px] md:h-[400px] rounded-4xl overflow-hidden shadow-md dark:shadow-lg">
          {currentFeature && (
            <Image
              src={currentFeature.image}
              alt={currentFeature.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          )}
        </div> */}
        {/* RIGHT - Image */}
        <div className="flex-1 relative h-[270px] md:h-[400px] rounded-4xl overflow-hidden shadow-md dark:shadow-lg">
          {currentFeature && (
            <>
              {/* Main image */}
              <Image
                src={portfolio} // Replace with your uploaded image path
                alt="Small Icon"
                fill
                className="object-cover rounded-4xl"
              />

              {/* Small overlay image (top-left) */}
              <div className="absolute bottom-10 left-10 w-[180px] h-[220px] bg-white rounded-4xl shadow-lg p-2 flex items-center justify-center animate-float">
                <Image
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </>
          )}
        </div>
        <style jsx>
          {`
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-8px);
              }
              100% {
                transform: translateY(0px);
              }
            }

            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </>
  );
}
