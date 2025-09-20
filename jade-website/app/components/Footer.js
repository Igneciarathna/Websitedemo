"use client";
import { useEffect, useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    recaptchaToken: "",
  });
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // 1. Handle screen resize
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    window.onRecaptchaSuccess = (token) => {
      setRecaptchaVerified(true);
      setFormData((prev) => ({ ...prev, recaptchaToken: token }));
    };

    // 3. Load reCAPTCHA script if not already present
    const existingScript = document.querySelector(
      "script[src='https://www.google.com/recaptcha/api.js']"
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      delete window.onRecaptchaSuccess;
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
  
    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
      newErrors.name = "Name must contain only letters and spaces.";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    }
  
    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)
    ) {
      newErrors.email = "Invalid email address.";
    }
  
    // Phone validation
    const trimmedPhone = formData.phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10,15}$/.test(trimmedPhone)) {
      newErrors.phone = "Phone must be 10-15 digits.";
    }
  
    // Message is optional — no validation
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let trimmedValue = value;

    // Max length enforcement
    const limits = {
      name: 100,
      email: 255,
      phone: 15,
      organization: 250,
    };

    if (limits[name] && value.length > limits[name]) return;

    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));

    // Clear error on typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!recaptchaVerified || !formData.recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }
    const payload = {
      ...formData,
      organization: formData.organization.trim() === "" ? null : formData.organization,
    };
    try {
      const res = await fetch("/api/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          recaptchaToken: "",
        });
        setRecaptchaVerified(false);
        setErrors({});
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Unexpected error occurred.");
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const updatedErrors = { ...errors };
  
    if (name === "name") {
      if (!value.trim()) {
        updatedErrors.name = "Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        updatedErrors.name = "Name must contain only letters";
      } else if (value.length < 3) {
        updatedErrors.name = "Name must be at least 3 characters.";
      } else {
        delete updatedErrors.name;
      }
    }
  
    if (name === "email") {
      if (!value.trim()) {
        updatedErrors.email = "Email is required";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
      ) {
        updatedErrors.email = "Enter a valid email address";
      } else {
        delete updatedErrors.email;
      }
    }
  
    if (name === "phone") {
      if (!value.trim()) {
        updatedErrors.phone = "Phone number is required";
      } else if (!/^\d+$/.test(value)) {
        updatedErrors.phone = "Phone must contain only numbers";
      } else if (value.length < 10) {
        updatedErrors.phone = "Phone number must be at least 10 digits";
      } else {
        delete updatedErrors.phone;
      }
    }
  
    setErrors(updatedErrors);
  };
  
  
  return (
    <footer className="relative bg-[#727376] dark:bg-[#0A0A0A] text-white py-10 sm:py-14 overflow-hidden">
      <div
        className="absolute top-0 right-0 w-1/2 h-full dark:bg-[#0A0A0A] bg-black/30 z-0 hidden sm:block"
        style={{
          clipPath:
            "polygon(100% 0, 100% 100%, 70% 100%, 50% 80%, 30% 60%, 0% 30%, 20% 0%)",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            Choose Jade. Choose Portfolio Intelligence.
          </h2>
          <p className="text-base sm:text-lg text-[#A3CF32]">Talk to Us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 sm:p-6 lg:p-8 order-2 lg:order-1">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-6 w-full"
            >
              {/* Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium mb-2">
                  Name<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  minLength={3}
                  maxLength={100}
                  onBlur={handleBlur}
                  // required
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z\s]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Your@Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#A3CF32] focus:ring-2 focus:ring-[#A3CF32] transition-all duration-200"
                />
                {errors.name && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-2">
                  Email<span className="text-red-500"> *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  maxLength={255}
                  minLength={11}
                  // required
                  placeholder="Your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#A3CF32] focus:ring-2 focus:ring-[#A3CF32] transition-all duration-200"
                />
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium mb-2">
                  Phone<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onBlur={handleBlur}
                  maxLength={15}
                  minLength={10}
                  placeholder="Your@PhoneNo"
                  value={formData.phone}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleInputChange}
                  className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#A3CF32] focus:ring-2 focus:ring-[#A3CF32] transition-all duration-200"
                />
                {errors.phone && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="organization" className="text-sm font-medium mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  placeholder="Your@Organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-[#A3CF32] focus:ring-2 focus:ring-[#A3CF32] transition-all duration-200"
                />
              </div>
              {/* reCAPTCHA */}
              <div className="w-full mt-2 sm:mt-4">
                <div className="flex justify-center sm:justify-start">
                  <div
                    className={`transform origin-center ${
                      isSmallScreen ? "scale-[0.85]" : "scale-95 sm:scale-100"
                    } transition-transform duration-200`}
                  >
                    <div
                      className="g-recaptcha"
                      // localhost
                      // data-sitekey={"6LcDK5wrAAAAALRddcSQfwSOgQsySRKgVJGv31BS"}
                      // Tunnel
                      data-sitekey={"6Lc9LJwrAAAAAOKueJ7KAhHnFXV3-LW2iIxh674J"}
                      data-callback="onRecaptchaSuccess"
                      data-size={isSmallScreen ? "compact" : "normal"}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-green-200 mt-2 text-center sm:text-left sm:hidden">
                  Tap the checkbox above to verify
                </p>
              </div>

              {/* Submit Button */}
              <div className="mt-4 sm:mt-6">
                <button
                  type="submit"
                  disabled={!recaptchaVerified}
                  className={`w-full py-3 px-6 font-semibold rounded-md transition-all duration-200 ${
                    recaptchaVerified
                      ? "bg-green-600 hover:bg-green-700 text-white transform hover:scale-[1.02] cursor-pointer"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {recaptchaVerified
                    ? "Submit"
                    : "Complete Verification to Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 sm:gap-8 order-1 lg:order-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                Get in Touch
              </h3>
              <p className="text-[#A3CF32] leading-relaxed text-sm sm:text-base">
                Ready to transform your portfolio management? Let's discuss how
                JADE Money can power your growth.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#A3CF32] rounded-full flex items-center justify-center text-sm">
                  📧
                </div>
                <span className="text-sm sm:text-base break-all">
                  contact@jademoney.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#A3CF32] rounded-full flex items-center justify-center text-sm">
                  📞
                </div>
                <span className="text-sm sm:text-base">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#A3CF32] rounded-full flex items-center justify-center text-sm">
                  📍
                </div>
                <span className="text-sm sm:text-base">Mumbai, India</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 sm:p-6 mt-2 sm:mt-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">
                Business Hours
              </h4>
              <p className="text-[#A3CF32] text-xs sm:text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM IST
                <br />
                Saturday: 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A3CF32] mt-10 sm:mt-14 pt-4 sm:pt-6 text-center">
          <p className="text-[#A3CF32] text-xs sm:text-sm">
            &copy; 2025 JADE Money. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
