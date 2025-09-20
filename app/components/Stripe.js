"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CreditCard,
  FileText,
  Triangle,
  DollarSign,
  Archive,
  Package,
  X,
  Briefcase,
  Radar,
  Terminal,
  Link,
  User,
} from "lucide-react";

// Custom hook for media query
function UseMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

// All Icons
const allIcons = {
  CreditCard: <CreditCard size={20} />,
  FileText: <FileText size={20} />,
  Triangle: <Triangle size={20} />,
  DollarSign: <DollarSign size={20} />,
  Archive: <Archive size={20} />,
  Package: <Package size={20} />,
  X: <X size={20} />,
  Briefcase: <Briefcase size={20} />,
  Radar: <Radar size={20} />,
  Terminal: <Terminal size={20} />,
  Link: <Link size={20} />,
};

const desktopPatterns = [
  {
    name: "Tax → Payments → Radar",
    activeCards: ["tax", "payments", "radar"],
    connections: [
      { from: "tax", to: "payments", color: "#8b5cf6" },
      { from: "payments", to: "radar", color: "#8b5cf6" },
    ],
    specialCards: [
      {
        id: "tax",
        title: "WManagers",
        icon: <Package size={16} />,
        color: "blue",
        position: { x: 232, y: 38 },
      },
      {
        id: "payments",
        title: "MF Trade",
        icon: <User size={16} />,
        color: "green",
        position: { x: 232, y: 181 },
      },
      {
        id: "radar",
        title: "SEBI",
        icon: <Radar size={16} />,
        color: "cyan",
        position: { x: 303, y: 255 },
      },
    ],
  },
  {
    name: "Billing → Invoicing",
    activeCards: ["billing", "invoicing"],
    connections: [{ from: "billing", to: "invoicing", color: "#10b981" }],
    specialCards: [
      {
        id: "billing",
        title: "Brokers",
        icon: <FileText size={16} />,
        color: "purple",
        position: { x: 88, y: 110 },
      },
      {
        id: "invoicing",
        title: "Banks",
        icon: <DollarSign size={16} />,
        color: "green",
        position: { x: 376, y: 110 },
      },
    ],
  },
  {
    name: "Connect → Payments → Terminal",
    activeCards: ["connect", "payments", "terminal"],
    connections: [
      { from: "connect", to: "payments", color: "#06b6d4" },
      { from: "payments", to: "terminal", color: "#8b5cf6" },
    ],
    specialCards: [
      {
        id: "connect",
        title: "IFAs",
        icon: <Link size={16} />,
        color: "cyan",
        position: { x: 88, y: 255 },
      },
      {
        id: "payments",
        title: "MF Trade",
        icon: <User size={16} />,
        color: "purple",
        position: { x: 232, y: 181 },
      },
      {
        id: "terminal",
        title: "Customers",
        icon: <Terminal size={16} />,
        color: "blue",
        position: { x: 232, y: 325 },
      },
    ],
  },
  {
    name: "Capital → Treasury → Issuing",
    activeCards: ["capital", "treasury", "issuing"],
    connections: [
      { from: "capital", to: "treasury", color: "#10b981" },
      { from: "treasury", to: "issuing", color: "#8b5cf6" },
    ],
    specialCards: [
      {
        id: "capital",
        title: "WManagers",
        icon: <DollarSign size={16} />,
        color: "green",
        position: { x: 376, y: 110 },
      },
      {
        id: "treasury",
        title: "Brokers",
        icon: <Briefcase size={16} />,
        color: "yellow",
        position: { x: 448, y: 183 },
      },
      {
        id: "issuing",
        title: "Customers",
        icon: <Package size={16} />,
        color: "cyan",
        position: { x: 376, y: 325 },
      },
    ],
  },
  {
    name: "Connect → Terminal",
    activeCards: ["connect", "terminal"],
    connections: [{ from: "connect", to: "terminal", color: "#06b6d4" }],
    specialCards: [
      {
        id: "connect",
        title: "IFAs",
        icon: <Link size={16} />,
        color: "blue",
        position: { x: 88, y: 255 },
      },
      {
        id: "terminal",
        title: "Customers",
        icon: <Terminal size={16} />,
        color: "green",
        position: { x: 232, y: 325 },
      },
    ],
  },
];

const mobilePatterns = [
  {
    name: "Tax → Payments → Radar",
    activeCards: ["tax", "payments", "radar"],
    connections: [
      { from: "tax", to: "payments", color: "#8b5cf6" },
      { from: "payments", to: "radar", color: "#8b5cf6" },
    ],
    specialCards: [
      {
        id: "tax",
        title: "WManagers",
        icon: <Package size={16} />,
        color: "blue",
        position: { x: 73, y: 2 },
      },
      {
        id: "payments",
        title: "MF Trade",
        icon: <User size={16} />,
        color: "green",
        position: { x: 71, y: 147 },
      },
      {
        id: "radar",
        title: "SEBI",
        icon: <Radar size={16} />,
        color: "cyan",
        position: { x: 145, y: 290 },
      },
    ],
  },
  {
    name: "Billing → Invoicing",
    activeCards: ["billing", "invoicing"],
    connections: [{ from: "billing", to: "invoicing", color: "#10b981" }],
    specialCards: [
      {
        id: "billing",
        title: "Brokers",
        icon: <FileText size={16} />,
        color: "purple",
        position: { x: 143, y: 74 },
      },
      {
        id: "invoicing",
        title: "Banks",
        icon: <DollarSign size={16} />,
        color: "green",
        position: { x: 216, y: 74 },
      },
    ],
  },
  {
    name: "Payments → Terminal",
    activeCards: ["payments", "terminal"],
    connections: [{ from: "payments", to: "terminal", color: "#8b5cf6" }],
    specialCards: [
      {
        id: "payments",
        title: "MF Trade",
        icon: <User size={16} />,
        color: "purple",
        position: { x: 72, y: 147 },
      },
      {
        id: "terminal",
        title: "Customers",
        icon: <Terminal size={16} />,
        color: "blue",
        position: { x: 72, y: 290 },
      },
    ],
  },
  {
    name: "Capital → Treasury → Issuing",
    activeCards: ["capital", "treasury", "issuing"],
    connections: [
      { from: "capital", to: "treasury", color: "#10b981" },
      { from: "treasury", to: "issuing", color: "#8b5cf6" },
    ],
    specialCards: [
      {
        id: "capital",
        title: "WManagers",
        icon: <DollarSign size={16} />,
        color: "green",
        position: { x: 217, y: 75 },
      },
      {
        id: "treasury",
        title: "Brokers",
        icon: <Briefcase size={16} />,
        color: "yellow",
        position: { x: 144, y: 220 },
      },
      {
        id: "issuing",
        title: "Customers",
        icon: <Package size={16} />,
        color: "cyan",
        position: { x: 217, y: 364 },
      },
    ],
  },
  {
    name: "Connect → Terminal",
    activeCards: ["connect", "terminal"],
    connections: [{ from: "connect", to: "terminal", color: "#06b6d4" }],
    specialCards: [
      {
        id: "connect",
        title: "Banks",
        icon: <DollarSign size={16} />,
        color: "green",
        position: { x: 217, y: 75 },
      },
      {
        id: "terminal",
        title: "Customers",
        icon: <Terminal size={16} />,
        color: "cyan",
        position: { x: 73, y: 291 },
      },
    ],
  },
];

const cardItems = [
  {
    id: "chart-top",
    icon: <Package size={20} />,
    position: { gridColumn: "3", gridRow: "1" },
    coords: { x: 35, y: 10 },
    title: "WManagers",
    hoverColor: "blue",
  },
  {
    id: "terminal-grid",
    icon: <DollarSign size={20} />,
    position: { gridColumn: "1", gridRow: "2" },
    coords: { x: 5, y: 30 },
    title: "Brokers",
    hoverColor: "pink",
  },
  {
    id: "clock",
    icon: <FileText size={20} />,
    position: { gridColumn: "4", gridRow: "2" },
    coords: { x: 55, y: 30 },
    title: "Bank",
    hoverColor: "red",
  },
  {
    id: "clock2",
    icon: <DollarSign size={20} />,
    position: { gridColumn: "5", gridRow: "2" },
    coords: { x: 70, y: 30 },
    title: "Customers",
    hoverColor: "purple",
  },
  {
    id: "triangle",
    icon: <Triangle size={20} />,
    position: { gridColumn: "2", gridRow: "3" },
    coords: { x: 20, y: 50 },
    title: "Atlas",
    hoverColor: "yellow",
  },
  {
    id: "payment",
    icon: <User size={20} />,
    position: { gridColumn: "3", gridRow: "3" },
    coords: { x: 35, y: 50 },
    title: "MF Trade",
    hoverColor: "green",
  },
  {
    id: "infinity",
    icon: <Briefcase size={20} />,
    position: { gridColumn: "4", gridRow: "3" },
    coords: { x: 55, y: 50 },
    title: "Brokers",
    hoverColor: "yellow",
  },
  {
    id: "infinity2",
    icon: <Briefcase size={20} />,
    position: { gridColumn: "6", gridRow: "3" },
    coords: { x: 85, y: 50 },
    title: "Brokers",
    hoverColor: "indigo",
  },
  {
    id: "globe",
    icon: <Link size={20} />,
    position: { gridColumn: "1", gridRow: "4" },
    coords: { x: 5, y: 70 },
    title: "IFAs",
    hoverColor: "orange",
  },
  {
    id: "diamond",
    icon: <Radar size={20} />,
    position: { gridColumn: "4", gridRow: "4" },
    coords: { x: 55, y: 70 },
    title: "SEBI",
    hoverColor: "cyan",
  },
  {
    id: "folder",
    icon: <Terminal size={20} />,
    position: { gridColumn: "3", gridRow: "5" },
    coords: { x: 35, y: 90 },
    title: "Customers",
    hoverColor: "lime",
  },
  {
    id: "hexagon",
    icon: <Package size={20} />,
    position: { gridColumn: "4", gridRow: "5" },
    coords: { x: 55, y: 90 },
    title: "Checkout",
    hoverColor: "teal",
  },
  {
    id: "hexagon2",
    icon: <Package size={20} />,
    position: { gridColumn: "5", gridRow: "5" },
    coords: { x: 70, y: 90 },
    title: "Issuing",
    hoverColor: "amber",
  },
  {
    id: "document",
    icon: <FileText size={20} />,
    position: { gridColumn: "2", gridRow: "6" },
    coords: { x: 20, y: 110 },
    title: "Identity",
    hoverColor: "emerald",
  },
  {
    id: "close",
    icon: <X size={20} />,
    position: { gridColumn: "5", gridRow: "6" },
    coords: { x: 70, y: 110 },
    title: "Sigma",
    hoverColor: "violet",
  },
  {
    id: "cube",
    icon: <Archive size={20} />,
    position: { gridColumn: "6", gridRow: "6" },
    coords: { x: 85, y: 110 },
    title: "Elements",
    hoverColor: "fuchsia",
  },
];

const getCardRefMap = (cards) => {
  const map = {};
  cards.forEach((card) => {
    map[card.id] = React.createRef();
  });
  return map;
};

export default function AnimatedDiagram() {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const isDesktop = UseMediaQuery("(min-width: 768px)");
  const patterns = isDesktop ? desktopPatterns : mobilePatterns;
  const currentConfig = patterns[currentPattern];
  const activePattern = patterns[currentPattern];
  const cardRefs = useRef(getCardRefMap(cardItems));

  const getCardAbsoluteCoords = (cardId) => {
    const gridCard = cardItems.find((item) => item.id === cardId);
    if (gridCard) {
      return { x: gridCard.coords.x + 32, y: gridCard.coords.y + 32 };
    }

    const specialCard = currentConfig.specialCards.find(
      (card) => card.id === cardId
    );
    if (specialCard) {
      return { x: specialCard.position.x + 40, y: specialCard.position.y + 35 };
    }

    return { x: 0, y: 0 };
  };

  const getConnectionPath = (fromCardId, toCardId) => {
    const fromCoords = getCardAbsoluteCoords(fromCardId);
    const toCoords = getCardAbsoluteCoords(toCardId);

    if (!fromCoords || !toCoords) {
      return { path: "", fromCoords: { x: 0, y: 0 }, toCoords: { x: 0, y: 0 } };
    }

    const path = `M ${fromCoords.x} ${fromCoords.y}
                  Q ${(fromCoords.x + toCoords.x) / 2} ${
      Math.min(fromCoords.y, toCoords.y) - 30
    }
                  ${toCoords.x} ${toCoords.y}`;
    return { path, fromCoords, toCoords };
  };

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentPattern((prev) => (prev + 1) % patterns.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, patterns.length]);

  const getHoverClasses = (color) => {
    switch (color) {
      case "blue":
        return "group-hover:bg-blue-500 hover:border-blue-600 hover:border-2 group-hover:text-white";
      case "green":
        return "group-hover:bg-green-500 hover:border-green-600 hover:border-2 group-hover:text-white";
      case "red":
        return "group-hover:bg-red-500 hover:border-red-600 hover:border-2 group-hover:text-white";
      case "purple":
        return "group-hover:bg-purple-500 hover:border-purple-600 hover:border-2 group-hover:text-white";
      case "gray":
        return "group-hover:bg-gray-500 hover:border-gray-600 hover:border-2 group-hover:text-white";
      case "pink":
        return "group-hover:bg-pink-500 hover:border-pink-600 hover:border-2 group-hover:text-white";
      case "yellow":
        return "group-hover:bg-yellow-500 hover:border-yellow-600 hover:border-2 group-hover:text-white";
      case "indigo":
        return "group-hover:bg-indigo-500 hover:border-indigo-600 hover:border-2 group-hover:text-white";
      case "orange":
        return "group-hover:bg-orange-500 hover:border-orange-600 hover:border-2 group-hover:text-white";
      case "cyan":
        return "group-hover:bg-cyan-500 hover:border-cyan-600 hover:border-2 group-hover:text-white";
      case "lime":
        return "group-hover:bg-lime-500 hover:border-lime-600 hover:border-2 group-hover:text-white";
      case "teal":
        return "group-hover:bg-teal-500 hover:border-teal-600 hover:border-2 group-hover:text-white";
      case "amber":
        return "group-hover:bg-amber-500 hover:border-amber-600 hover:border-2 group-hover:text-white";
      case "emerald":
        return "group-hover:bg-emerald-500 hover:border-emerald-600 hover:border-2 group-hover:text-white";
      case "violet":
        return "group-hover:bg-violet-500 hover:border-violet-600 hover:border-2 group-hover:text-white";
      case "fuchsia":
        return "group-hover:bg-fuchsia-500 hover:border-fuchsia-600 hover:border-2 group-hover:text-white";
      default:
        return "";
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fff] p-1 dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Stack vertically */}

        <div className="block lg:hidden p-4">
          {/* Text Content */}
          <div className="mb-8">
            <p className="text-base font-bold mb-6 leading-relaxed text-justify">
              <span>Designed for </span>
              <span className="text-[#A3CF32]">
                Banks, Brokers & Wealth Managers.
              </span>
            </p>

            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-[380px] flex flex-row flex-wrap gap-4 items-center justify-center shadow-md"
              style={{
                boxShadow: "0 0 12px rgba(0, 0, 0, 0.15)",
              }}
            >
             {["SEBI-ready", "API-first", "Built for scale"].map(
                (feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {/* Replace dot animation with GIF */}
                    <img
                      src="/icons8-check.gif"
                      alt="indicator"
                      className="w-4 h-4"
                    />

                    <span className="font-medium text-base whitespace-nowrap">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Diagram Controls */}
          {/* <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentConfig.name}
            </h2>
            <div className="flex justify-center gap-2 mb-4">
              {patterns.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPattern(index);
                    setIsAutoPlay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPattern
                      ? "bg-blue-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isAutoPlay ? "Pause" : "Play"}
            </button>
          </div> */}

          {/* Diagram */}
          <div className="relative w-full h-[430px] bg-white rounded-xl overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {currentConfig.connections.map((connection, index) => {
                const { path, toCoords } = getConnectionPath(
                  connection.from,
                  connection.to
                );
                if (!path) return null;

                return (
                  <g key={`${currentPattern}-${index}`}>
                    <path
                      d={path}
                      stroke={connection.color}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="8,4"
                      opacity="0.9"
                      style={{
                        animation: "dash 3s linear infinite",
                      }}
                    />
                    <circle
                      cx={toCoords.x}
                      cy={toCoords.y}
                      r="4"
                      fill={connection.color}
                      style={{
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            <div
              className="absolute inset-0 grid gap-2"
              style={{
                gridTemplateColumns: "repeat(6, 64px)",
                gridTemplateRows: "repeat(6, 64px)",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {cardItems.map((item) => (
                <div
                  key={item.id}
                  ref={cardRefs.current[item.id]}
                  className={`group rounded-lg flex items-center justify-center w-16 h-16 border transition-all duration-300
                  ${getHoverClasses(item.hoverColor)}
                  ${
                    activePattern.activeCards.includes(item.id)
                      ? "bg-white shadow-md border-gray-300"
                      : "border-gray-200"
                  }`}
                  style={{
                    gridColumn: item.position?.gridColumn || "auto",
                    gridRow: item.position?.gridRow || "auto",
                  }}
                >
                  <div className="flex flex-col items-center ">
                    <div
                      className={`p-1 rounded-md transition-all duration-300 text-gray-300 group-hover:mt-1 ${getHoverClasses(
                        item.hoverColor
                      )}`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}

              {currentConfig.specialCards.map((card) => (
                <div
                  key={`${currentPattern}-${card.id}`}
                  className={`absolute bg-white rounded-xl p-1 shadow-lg border-2 flex flex-col items-center justify-center min-w-16 h-16 transition-all duration-500 z-20
                    ${card.color === "green" ? "border-green-500" : ""}
                    ${card.color === "blue" ? "border-blue-500" : ""}
                    ${card.color === "purple" ? "border-purple-500" : ""}
                    ${card.color === "yellow" ? "border-yellow-500" : ""}
                    ${card.color === "cyan" ? "border-cyan-500" : ""}`}
                  style={{
                    left: `${card.position.x}px`,
                    top: `${card.position.y}px`,
                    animation: "fadeInScale 0.5s ease-out",
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center mb-1
                      ${
                        card.color === "green"
                          ? "bg-gradient-to-br from-green-500 to-indigo-600"
                          : ""
                      }
                      ${
                        card.color === "yellow"
                          ? "bg-gradient-to-br from-yellow-500 to-orange-600"
                          : ""
                      }
                      ${
                        card.color === "blue"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : ""
                      }
                      ${
                        card.color === "purple"
                          ? "bg-gradient-to-br from-purple-500 to-purple-400"
                          : ""
                      }
                      ${
                        card.color === "cyan"
                          ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                          : ""
                      }`}
                  >
                    <div className="text-white">{card.icon}</div>
                  </div>
                  <span className="text-[8px] font-semibold text-gray-700 text-center">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        {/* <div className="flex-1 max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentConfig.name}
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {patterns.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPattern(index);
                      setIsAutoPlay(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPattern
                        ? "bg-blue-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isAutoPlay ? "Pause" : "Play"}
              </button>
            </div>
          </div> */}
        <div className="ml-8 hidden lg:flex lg:gap-4 lg:items-center lg:min-h-screen">
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-lg">
            <p className="text-[48px] font-bold mb-8 leading-relaxed text-justify">
              <span>Designed for </span>
              <span className="text-[#A3CF32]">
                Banks, Brokers & Wealth Managers.
              </span>
            </p>

            {/* Single Card with All Features */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-[300px] flex flex-col gap-4 shadow-md mx-auto"
              style={{
                boxShadow: "0 0 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              {["SEBI-ready", "API-first", "Built for scale"].map(
                (feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {/* Replace dot animation with GIF */}
                    <img
                      src="/icons8-check.gif"
                      alt="indicator"
                      className="w-5 h-5"
                    />

                    <span className="font-medium text-base whitespace-nowrap">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Side - Diagram */}

          <div className="relative w-[600px] h-[500px] rounded-xl overflow-hidden ml-10">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {currentConfig.connections.map((connection, index) => {
                const { path, toCoords } = getConnectionPath(
                  connection.from,
                  connection.to
                );
                if (!path) return null;

                return (
                  <g key={`${currentPattern}-${index}`}>
                    <path
                      d={path}
                      stroke={connection.color}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="8,4"
                      opacity="0.9"
                      style={{
                        animation: "dash 3s linear infinite",
                      }}
                    />
                    <circle
                      cx={toCoords.x}
                      cy={toCoords.y}
                      r="4"
                      fill={connection.color}
                      style={{
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            <div
              className="absolute inset-0 grid gap-2"
              style={{
                gridTemplateColumns: "repeat(6, 64px)",
                gridTemplateRows: "repeat(6, 64px)",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {cardItems.map((item) => (
                <div
                  key={item.id}
                  ref={cardRefs.current[item.id]}
                  className={`group rounded-lg flex items-center justify-center w-16 h-16 border transition-all duration-300
                    ${getHoverClasses(item.hoverColor)}
                    ${
                      activePattern.activeCards.includes(item.id)
                        ? "bg-white shadow-md border-gray"
                        : "border-gray-200"
                    }`}
                  style={{
                    gridColumn: item.position?.gridColumn || "auto",
                    gridRow: item.position?.gridRow || "auto",
                  }}
                >
                  <div className="flex flex-col items-center ">
                    <div
                      className={`p-1 rounded-md transition-all duration-300 text-gray-300 group-hover:mt-1 ${getHoverClasses(
                        item.hoverColor
                      )}`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}

              {currentConfig.specialCards.map((card) => (
                <div
                  key={`${currentPattern}-${card.id}`}
                  className={`absolute bg-white rounded-xl p-1 shadow-lg border-2 flex flex-col items-center justify-center min-w-16 h-16 transition-all duration-500 z-20
                ${card.color === "green" ? "border-green-500" : ""}
                ${card.color === "blue" ? "border-blue-500" : ""}
                ${card.color === "purple" ? "border-purple-500" : ""}
                ${card.color === "yellow" ? "border-yellow-500" : ""}
                ${card.color === "cyan" ? "border-cyan-500" : ""}`}
                  style={{
                    left: `${card.position.x}px`,
                    top: `${card.position.y}px`,
                    animation: "fadeInScale 0.5s ease-out",
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center mb-1
                  ${
                    card.color === "green"
                      ? "bg-gradient-to-br from-green-500 to-indigo-600"
                      : ""
                  }
                  ${
                    card.color === "yellow"
                      ? "bg-gradient-to-br from-yellow-500 to-orange-600"
                      : ""
                  }
                  ${
                    card.color === "blue"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600"
                      : ""
                  }
                  ${
                    card.color === "purple"
                      ? "bg-gradient-to-br from-purple-500 to-purple-400"
                      : ""
                  }
                  ${
                    card.color === "cyan"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                      : ""
                  }`}
                  >
                    <div className="text-white">{card.icon}</div>
                  </div>
                  <span className="text-[8px] font-semibold text-gray-700 text-center">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -24;
              }
            }

            @keyframes pulse-dot {
              0%,
              100% {
                r: 3;
                opacity: 0.8;
              }
              50% {
                r: 5;
                opacity: 1;
              }
            }

            @keyframes fadeInScale {
              0% {
                opacity: 0;
                transform: scale(0.8);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
