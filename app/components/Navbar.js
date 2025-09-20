"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import ContactSalesModal from "@/app/components/ContactSalesModal";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY < lastScrollY || currentScrollY < 50);
      setScrolled(currentScrollY > 30);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300
        ${showNav ? "translate-y-0" : "-translate-y-full"}
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm"
            : "bg-transparent backdrop-blur-lg"
        }
      `}
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Logo + Desktop Links */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="w-8 h-auto">
              <Image src={logo} alt="Logo" className="object-contain w-full" />
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium">
              {["home", "about Us", "solutions", "clients", "blogs"].map(
                (link) => (
                  <Link
                    key={link}
                    href={`#${link}`}
                    className={`transition-colors duration-300 ${
                      scrolled
                        ? "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                        : "text-white hover:text-green-400"
                    }`}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* RIGHT: Buttons + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={24} className={scrolled ? "text-black dark:text-white" : "text-white dark:text-white"} />
              ) : (
                <Menu size={24} className={scrolled ? "text-black dark:text-white" : "text-white dark:text-white"} />
              )}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2">
              <button onClick={() => setOpen(true)}
                className={`px-4 py-2 rounded-md border text-sm transition-all duration-300 cursor-pointer
                ${
                  scrolled
                    ? "text-black dark:text-white border-black dark:border-white hover:bg-green-100 dark:hover:bg-green-900"
                    : "text-white border-white hover:bg-white hover:text-green-600"
                }`}
              >
                Contact Sales
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer
                ${
                  scrolled
                    ? "bg-[#A3CF32] text-white hover:bg-green-700"
                    : "bg-[#A3CF32] text-white border border-white hover:bg-green-700"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="flex flex-col gap-3 mt-2 p-4 bg-white dark:bg-gray-900 md:hidden rounded-b-lg shadow-md border-t border-gray-200 dark:border-gray-700">
            {["home", "about Us", "solutions", "clients", "blogs"].map((link) => (
              <Link
                key={link}
                href={`#${link}`}
                className="text-black dark:text-white font-medium text-base border-b border-gray-100 dark:border-gray-700 py-2 hover:pl-2 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
            <div className="flex flex-col gap-2">
              <button className="w-full text-black dark:text-white border border-black dark:border-white py-2 rounded-md text-sm" onClick={() => setOpen(true)}>
                Contact Sales
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-md text-sm">
                Sign Up
              </button>
            </div>
          </div>
        )}
        <ContactSalesModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </nav>
  );
}
