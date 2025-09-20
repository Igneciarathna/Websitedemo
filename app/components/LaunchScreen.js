"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../public/images/logo.png";

export default function LaunchScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[9999] flex items-center justify-center transition-opacity duration-800 ease-out">
        <div className="flex flex-col items-center animate-customFadeIn">
          <Image
            src={logo}
            alt="JADE Logo"
            className="w-[300px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Custom keyframes defined via <style> */}
      <style jsx global>{`
        @keyframes customFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-customFadeIn {
          animation: customFadeIn 4s ease-out;
        }
      `}</style>
    </>
  );
}
