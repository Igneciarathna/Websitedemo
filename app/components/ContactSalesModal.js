import { useState } from "react";
import Image from "next/image";

export default function SignupModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 top-80">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <p className="text-center text-gray-600 mt-1 font-semibold">
          Any questions or remarks? Just write us a message!
        </p>

        {/* Form */}
        <div className="flex items-center justify-center p-4">
          <form className="bg-white p-6 w-full max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm px-4 py-2 rounded-full bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3CF32]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm px-4 py-2 rounded-full bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3CF32]"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="bg-[#A3CF32] hover:bg-[#A3CF32] text-white px-6 py-2 rounded-full w-full mt-6 transition"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Footer Section */}
        <footer className="mt-2 bg-teal-400 rounded-b-lg">
          {/* Gray Box with Icons */}
          <div className="bg-gray-200 z-50 grid grid-cols-1 sm:grid-cols-3 text-center gap-12 px-4 py-12 relative">
            {/* About Club */}
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#A3CF32] flex items-center justify-center text-white -mt-20 shadow-lg">
                <Image src="/run.png" alt="run" height={30} width={30} />
              </div>
              <h3 className="mt-3 text-sm font-semibold">ABOUT CLUB</h3>
              <p className="mt-2 text-gray-600 text-xs">Running Guide</p>
              <p className="text-gray-600 text-xs">Workouts</p>
            </div>

            {/* Phone */}
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#A3CF32] flex items-center justify-center text-white -mt-20 shadow-lg">
                <Image src="/email.png" alt="phone" height={30} width={30} />
              </div>
              <h3 className="mt-3 text-sm font-semibold">PHONE (LANDLINE)</h3>
              <p className="mt-2 text-gray-600 text-xs">+ 912 3 567 8987</p>
              <p className="text-gray-600 text-xs">+ 912 5 252 3336</p>
            </div>

            {/* Location */}
            <div>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#A3CF32] flex items-center justify-center text-white -mt-20 shadow-lg">
                <Image
                  src="/location.png"
                  alt="location"
                  height={30}
                  width={30}
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold">
                OUR OFFICE LOCATION
              </h3>
              <p className="mt-2 text-xs text-gray-600">
                The Interior Design Studio
              </p>
              <p className="text-xs text-gray-600">
                The Courtyard, Al Quoz 1, Colorado, USA
              </p>
            </div>
          </div>
        </footer>
      </div>
      <div className="absolute bottom-0 w-2xl rounded-b-lg top-18 h-50 bg-[#A3CF32]"></div>
    </div>
  );
}
