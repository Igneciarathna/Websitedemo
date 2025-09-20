"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex top-80 items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Step indicator */}
        {/* <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-blue-600 text-sm">Sign up</span>
          </div>
          <div className="flex-1 h-px bg-gray-300 mx-2"></div>
          <span className="text-gray-400 text-sm">Verify Email</span>
          <div className="flex-1 h-px bg-gray-300 mx-2"></div>
          <span className="text-gray-400 text-sm">Download & install</span>
        </div> */}

        {/* Title */}
        <h2 className="text-center text-lg font-medium mb-4">
          Sign up and enjoy 15 day trial of our product
        </h2>

        {/* Social buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <img src="/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form */}
        <form className="space-y-3">
          <input type="text" placeholder="First Name*" className="w-full border-b p-2 outline-none" />
          <input type="text" placeholder="Last Name*" className="w-full border-b p-2 outline-none" />
          <input type="email" placeholder="Email*" className="w-full border-b p-2 outline-none" />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              className="w-full border-b p-2 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password*"
              className="w-full border-b p-2 outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" id="terms" className="accent-blue-500" />
            <label htmlFor="terms">
              I agree to <a href="#" className="text-blue-500">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-500">Privacy Policy</a>
            </label>
          </div>

          {/* Sign Up button */}
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded w-full mt-4"
          >
            SIGN UP
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500">Sign in</a>
        </p>
      </div>
    </div>
  );
}
