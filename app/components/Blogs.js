"use client";
import { useEffect, useRef, useState } from "react";

export default function BlogsSection() {
  const sliderRef = useRef(null);
  const [direction, setDirection] = useState(1);

  const blogs = [
    {
      title: "The Future of Portfolio Management",
      description: "Exploring how technology is reshaping wealth management...",
      gradient: "jade",
    },
    {
      title: "SEBI Compliance Made Simple",
      description: "Understanding regulatory requirements in modern portfolio systems...",
      gradient: "purple",
    },
    {
      title: "API-First Architecture Benefits",
      description: "Why modern financial platforms need flexible integration...",
      gradient: "orange",
    },
    {
      title: "Streamlined Reporting Workflows",
      description: "Automate and simplify your financial reporting with modern tools...",
      gradient: "jade",
    },
    {
      title: "Cloud vs On-Premise Models",
      description: "Deciding between SaaS and self-hosted infrastructure...",
      gradient: "purple",
    },
    {
      title: "Client-Centric Digital Platforms",
      description: "Delivering personalized experiences in modern finance...",
      gradient: "orange",
    },
  ];

  const getGradientClass = (color) => {
    switch (color) {
      case "jade":
        return "from-green-200 to-blue-200";
      case "purple":
        return "from-purple-200 to-pink-200";
      case "orange":
        return "from-yellow-200 to-red-200";
      default:
        return "from-gray-200 to-gray-200";
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = slider.scrollLeft;

    const scroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (direction === 1 && scrollAmount >= maxScroll) {
        setDirection(-1);
      } else if (direction === -1 && scrollAmount <= 0) {
        setDirection(1);
      }

      scrollAmount += direction * 0.5;
      slider.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <section id="blogs" className="dark:bg-[#0A0A0A] py-2">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold dark:text-white text-gray-800">Latest Insights</h2>
      </div>

      <div ref={sliderRef} className="overflow-x-hidden w-full">
        <div className="flex gap-4 px-4">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] bg-[#f2f5f5] dark:bg-white rounded-4xl overflow-hidden transition-shadow"
            >
              <div
                className={`h-48 bg-gradient-to-br ${getGradientClass(
                  blog.gradient
                )}`}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  {blog.description}
                </p>
                <a
                  href="#"
                  className="text-[#A3CF32] font-semibold hover:text-blue-500 transition-colors"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
