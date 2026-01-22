import React from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 2. Modal Content */}
      <div className="relative w-full max-w-[480px] bg-[#1a1927] rounded-3xl p-10 shadow-2xl border border-white/5">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-all shadow-xl z-10"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Title */}
        <h2 className="text-white text-3xl font-bold text-center mb-10">
          Welcome back!
        </h2>

        {/* Form Fields */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-white/40 text-[11px] font-bold tracking-widest ml-1 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full bg-[#e8f0fe] text-black py-3.5 px-4 rounded-xl focus:outline-none font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/40 text-[11px] font-bold tracking-widest ml-1 uppercase">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#e8f0fe] text-black py-3.5 px-4 rounded-xl focus:outline-none"
            />
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[#ffbade] focus:ring-[#ffbade] cursor-pointer"
              />
              <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <button className="text-[#ffbade] text-sm font-medium hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Captcha Placeholder */}
          <div className="bg-[#2a2937] border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold">Success!</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">
                Cloudflare
              </div>
              <div className="text-[9px] text-white/20 space-x-1 font-bold">
                <span className="hover:text-white/40 cursor-pointer">
                  Privacy
                </span>
                <span>•</span>
                <span className="hover:text-white/40 cursor-pointer">
                  Terms
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full bg-[#ffbade] text-black font-extrabold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-[#ffbade]/10 text-lg"
          >
            Login
          </button>
        </form>

        {/* Signup / Verify Link */}
        <div className="text-center mt-10 text-sm font-medium">
          <span className="text-white/60 tracking-tight">
            Don't have an account?{" "}
          </span>
          <button className="text-[#ffbade] hover:underline mx-1">
            Register
          </button>
          <span className="text-white/40">or</span>
          <button className="text-[#ffbade] hover:underline mx-1">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
