"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/styles/HeroSection.module.css";
import SignupModal from "@/app/components/SignupModal";

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [textColor, setTextColor] = useState("text-white");
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const checkBrightness = () => {
      if (!ctx || !videoRef.current) return;
      const video = videoRef.current;
      canvas.width = 10;
      canvas.height = 10;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i],
          g = data[i + 1],
          b = data[i + 2];
        totalBrightness += (r + g + b) / 3;
      }
      const avg = totalBrightness / (canvas.width * canvas.height);
      setTextColor(avg > 128 ? "text-black" : "text-white");
    };

    const intervalHandler = () => setInterval(checkBrightness, 1000);

    if (videoRef.current)
      videoRef.current.addEventListener("play", intervalHandler);
    return () => videoRef.current?.removeEventListener("play", intervalHandler);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef}
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8 sm:py-12 lg:pb-[150px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div
          className={`w-full lg:flex-1 lg:max-w-[55%] text-center lg:text-left pt-16 sm:pt-12 lg:pt-0 transition-all duration-1000 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${textColor}`}
        >
          <h1 className="text-5xl sm:5xl lg:text-[70px] font-bold leading-tight">
            <span className="bg-[#A3CF32] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background-clip:text]">
              Portfolio Intelligence.{" "}
            </span>
            <span className="bg-[#727376]  bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background-clip:text]">
              Delivered.
            </span>
            <p className="text-2xl font-bold mb-4 leading-relaxed text-justify">
              We handle the tech so that you can manage portfolios, serve
              clients, and scale reporting.
            </p>
            <div className="hidden md:flex gap-2">
              <button
                className={`px-4 py-2 rounded-md border text-sm transition-all duration-300 cursor-pointer
                ${"text-white border-white hover:bg-white hover:text-green-600"}`}
              >
                Contact Sales
              </button>
              <button
                onClick={() => setOpen(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer
                ${"bg-[#A3CF32] text-white border border-white hover:bg-green-700"}`}
              >
                Sign Up
              </button>
            </div>
          </h1>
        </div>
        <SignupModal isOpen={open} onClose={() => setOpen(false)} />
        {/* Right Content */}
        <div
          className={`w-full lg:flex-1 lg:max-w-[50%] min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] relative flex items-center justify-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } transition-all duration-1000 ease-out`}
        >
          <div className="relative w-full max-w-[400px] sm:max-w-[500px] lg:max-w-none flex items-center justify-center">
            {/* Graph Image – layered above */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-1 sm:-rotate-2 w-[90%] sm:w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[600px] min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-1 sm:p-2 backdrop-blur-xl z-20 flex justify-center items-center">
              <Image
                src="/graph.png"
                alt="Mutual fund dashboard chart"
                width={1200}
                height={800}
                className="rounded-md w-full h-auto object-contain"
              />
            </div>

            {/* Phone SVG - Responsive sizing */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px]">
              <svg
                className={`${styles.phoneSVG} w-full h-auto`}
                viewBox="-30 -20 400 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer phone body */}
                <rect
                  x="55"
                  y="55"
                  rx="30"
                  ry="30"
                  width="180"
                  height="350"
                  fill="rgba(255, 255, 255, 0.2)"
                  stroke="#ccc"
                  strokeWidth="5"
                />
                {/* Screen */}
                <rect
                  x="55"
                  y="55"
                  rx="30"
                  ry="30"
                  width="180"
                  height="350"
                  fill="white"
                  stroke="#555"
                  strokeWidth="1"
                />
                {/* Notch/Camera (simplified) */}
                <circle cx="140" cy="65" r="5" fill="#555" />
                <rect
                  x="115"
                  y="63"
                  width="50"
                  height="5"
                  rx="2.5"
                  ry="2.5"
                  fill="#555"
                />
                {/* Home button / bottom bar (simplified) */}
                <rect
                  x="120"
                  y="480"
                  width="80"
                  height="6"
                  rx="3"
                  ry="3"
                  fill="#555"
                />
                {/* Start of the new UI content with reduced sizes */}

                {/* Header */}
                <text
                  x="65"
                  y="80"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#a0a0a0"
                >
                  Hi Sam
                </text>
                <text
                  x="65"
                  y="92"
                  fontFamily="Arial"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#333"
                >
                  Hey, Jhon Sam!
                </text>
                <circle cx="200" cy="80" r="6" fill="#f0f0f0" />
                <circle cx="220" cy="80" r="6" fill="#f0f0f0" />

                {/* Top Cards */}
                {/* Current Value Card */}
                <rect
                  x="65"
                  y="105"
                  rx="6"
                  ry="6"
                  width="80"
                  height="60"
                  fill="#f8f8f8"
                />
                <circle cx="75" cy="115" r="5" fill="#ff9800" />
                <text
                  x="85"
                  y="118"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                >
                  Current Value
                </text>
                <text
                  x="75"
                  y="135"
                  fontFamily="Arial"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#333"
                >
                  12,98,232
                </text>
                <rect
                  x="75"
                  y="145"
                  rx="3"
                  ry="3"
                  width="60"
                  height="12"
                  fill="#e8f5e9"
                />
                <text
                  x="105"
                  y="153"
                  fontFamily="Arial"
                  fontSize="6"
                  fill="#388e3c"
                  textAnchor="middle"
                >
                  XIRR 12.90%
                </text>

                {/* Invested Value Card */}
                <rect
                  x="150"
                  y="105"
                  rx="6"
                  ry="6"
                  width="75"
                  height="60"
                  fill="#f8f8f8"
                />
                <circle cx="160" cy="115" r="5" fill="#4caf50" />
                <text
                  x="170"
                  y="118"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                >
                  Invested Value
                </text>
                <text
                  x="165"
                  y="135"
                  fontFamily="Arial"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#333"
                >
                  12,98,232
                </text>
                <rect
                  x="155"
                  y="145"
                  rx="3"
                  ry="3"
                  width="65"
                  height="12"
                  fill="#e8f5e9"
                />
                <text
                  x="187"
                  y="153"
                  fontFamily="Arial"
                  fontSize="6"
                  fill="#388e3c"
                  textAnchor="middle"
                >
                  Absolute Return 90.12%
                </text>

                {/* Small Cards */}
                {/* Net G/L */}
                <rect
                  x="65"
                  y="175"
                  rx="6"
                  ry="6"
                  width="55"
                  height="45"
                  fill="#f8f8f8"
                />
                <text
                  x="75"
                  y="190"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                >
                  Net G/L
                </text>
                <text
                  x="75"
                  y="205"
                  fontFamily="Arial"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#333"
                >
                  12,98,232
                </text>

                {/* Dividend */}
                <rect
                  x="125"
                  y="175"
                  rx="6"
                  ry="6"
                  width="50"
                  height="45"
                  fill="#f8f8f8"
                />
                <text
                  x="135"
                  y="190"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                >
                  Dividend
                </text>
                <text
                  x="135"
                  y="205"
                  fontFamily="Arial"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#333"
                >
                  12,98,23
                </text>

                {/* Net G/L (Second) */}
                <rect
                  x="180"
                  y="175"
                  rx="6"
                  ry="6"
                  width="45"
                  height="45"
                  fill="#f8f8f8"
                />
                <text
                  x="193"
                  y="190"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                >
                  Net G/L
                </text>
                <text
                  x="192"
                  y="205"
                  fontFamily="Arial"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#333"
                >
                  12,232
                </text>

                {/* Filters Section */}
                <text
                  x="65"
                  y="230"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#a0a0a0"
                >
                  Asset Class
                </text>
                <rect
                  x="65"
                  y="235"
                  rx="3"
                  ry="3"
                  width="75"
                  height="18"
                  fill="#f5f5f5"
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <text
                  x="70"
                  y="247"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  19 Oct 2024
                </text>
                <text
                  x="150"
                  y="230"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#a0a0a0"
                >
                  Accounts
                </text>
                <rect
                  x="145"
                  y="235"
                  rx="3"
                  ry="3"
                  width="80"
                  height="18"
                  fill="#f5f5f5"
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <text
                  x="152"
                  y="247"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  Combined
                </text>

                {/* Quick Analysis */}
                <text
                  x="65"
                  y="270"
                  fontFamily="Arial"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#333"
                >
                  Quick Analysis
                </text>
                <text
                  x="205"
                  y="270"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                  textAnchor="middle"
                >
                  PDF
                </text>

                {/* Button Group */}
                <rect
                  x="65"
                  y="275"
                  rx="3"
                  ry="3"
                  width="50"
                  height="18"
                  fill="#e3f2fd"
                />
                <text
                  x="88"
                  y="287"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#1565c0"
                  textAnchor="middle"
                >
                  Via Assets
                </text>
                <rect
                  x="120"
                  y="275"
                  rx="3"
                  ry="3"
                  width="50"
                  height="18"
                  fill="#1565c0"
                />
                <text
                  x="145"
                  y="287"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#fff"
                  textAnchor="middle"
                >
                  Via Product
                </text>
                <rect
                  x="175"
                  y="275"
                  rx="3"
                  ry="3"
                  width="50"
                  height="18"
                  fill="#f0f0f0"
                />
                <text
                  x="197"
                  y="287"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                  textAnchor="middle"
                >
                  List View
                </text>
                <circle cx="140" cy="335" r="30" fill="#f0f0f0" />

                {/* Segment 1 - Top Right */}
                <path
                  d="M 170 335 A 30 30 0 0 1 140 365"
                  fill="none"
                  stroke="#1abc9c"
                  strokeWidth="8"
                />

                {/* Segment 2 - Bottom Right */}
                <path
                  d="M 140 365 A 30 30 0 0 1 106.66 331.44"
                  fill="none"
                  stroke="#2ecc71"
                  strokeWidth="8"
                />

                {/* Segment 3 - Bottom Left */}
                <path
                  d="M 106.66 331.44 A 30 30 0 0 1 140 305"
                  fill="none"
                  stroke="#a7dadc"
                  strokeWidth="8"
                />

                {/* Segment 4 - Top Left */}
                <path
                  d="M 140 305 A 30 30 0 0 1 170 335"
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="8"
                />

                {/* Legend */}
                <circle cx="70" cy="375" r="3" fill="#6572e8" />
                <text
                  x="75"
                  y="378"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  Gold
                </text>
                <circle cx="98" cy="375" r="3" fill="#3540a9" />
                <text
                  x="103"
                  y="378"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  Insurance
                </text>

                <circle cx="140" cy="376" r="3" fill="#9da6f9" />
                <text
                  x="148"
                  y="378"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  Income
                </text>
                <circle cx="184" cy="376" r="3" fill="#e8e9ff" />
                <text
                  x="190"
                  y="379"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#333"
                >
                  Mutual Fund
                </text>

                {/* Footer */}
                <line
                  x1="65"
                  y1="385"
                  x2="225"
                  y2="385"
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <text
                  x="70"
                  y="395"
                  fontFamily="Arial"
                  fontSize="7"
                  fontWeight="bold"
                  fill="#333"
                >
                  Grow with us
                </text>
                <text
                  x="150"
                  y="395"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                  textAnchor="middle"
                >
                  Website
                </text>
                <text
                  x="200"
                  y="395"
                  fontFamily="Arial"
                  fontSize="7"
                  fill="#666"
                  textAnchor="middle"
                >
                  Contact us
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG - Responsive */}
      <svg
        className="relative -mt-[100px] sm:-mt-[150px] lg:-mt-[200px] w-full h-[100px] sm:h-[150px] lg:h-[200px] z-10 shrink-0"
        viewBox="0 0 1440 0"
        preserveAspectRatio="none"
      >
        <path fill="white" d="M1440,96L0,200L0,320L1440,320Z" />
      </svg>
    </section>
  );
}
