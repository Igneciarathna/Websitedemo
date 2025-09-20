"use client";
import { useRef, useState, useEffect } from "react";

export default function FadeInSection({ children }) {
  const domRef = useRef();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasBeenVisible]);

  return (
    <div
      ref={domRef}
      className={`transition-opacity transition-transform duration-[1200ms] ease-in-out will-change-[opacity,transform] ${
        hasBeenVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}
