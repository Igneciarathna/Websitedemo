"use client";
import Image from "next/image";
import aliceblue from "@/app/assets/images/aliceblue.png";
import finnovate from "@/app/assets/images/finnovate.png";
import chola from "@/app/assets/images/chola.png";
import torus from "@/app/assets/images/torus.png";
import reliance from "@/app/assets/images/reliance.png";

export default function ClientsSection() {
  const logos = [
    { src: chola, alt: "Chola" },
    { src: aliceblue, alt: "Aliceblue" },
    { src: reliance, alt: "Reliance" },
    { src: torus, alt: "Torus" },
    { src: finnovate, alt: "Finnovate" },
  ];

  return (
    <section
      id="clients"
      className="dark:bg-[#0A0A0A] py-2 px-4 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white pb-2">
          Trusted by
        </h2>

        <div className="flex flex-wrap justify-around items-center gap-y-2 gap-x-18">
          {logos.map((logo, index) => {
            const isLargeLogo =
              // logo.alt === "Aliceblue" || 
              logo.alt === "Reliance";
            const width = isLargeLogo ? 340 : 240;
            const height = isLargeLogo ? 340 : 240;

            return (
              <div
                key={index}
                className="flex justify-center items-center min-w-[120px] flex-1"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={width}
                  height={height}
                  className={`${isLargeLogo ? "max-h-[340px]" : "max-h-[240px]"} object-contain dark:invert dark:brightness-[1.2]`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
