import React from "react";
import { X } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* 1. Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 2. Modal Container */}
      <div className="relative w-full max-w-[480px] bg-[#1a1927] rounded-3xl p-8 shadow-2xl border border-white/5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors shadow-lg"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {/* Header */}
        <h2 className="text-white text-2xl font-bold text-center mb-8">
          Create an Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <InputGroup label="YOUR NAME" placeholder="Name" type="text" />
          <InputGroup
            label="EMAIL ADDRESS"
            placeholder="name@email.com"
            type="email"
          />
          <InputGroup label="PASSWORD" placeholder="Password" type="password" />
          <InputGroup
            label="CONFIRM PASSWORD"
            placeholder="Confirm Password"
            type="password"
          />

          {/* Cloudflare Placeholder */}
          <div className="bg-[#2a2937] border border-white/10 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-white text-sm font-medium">Success!</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">
                Cloudflare
              </div>
              <div className="text-[8px] text-white/30 space-x-1">
                <span>Privacy</span>
                <span>•</span>
                <span>Terms</span>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#ffbade] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-2"
          >
            Register
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm">
          <span className="text-white/60">Have an account? </span>
          <button className="text-[#ffbade] hover:underline font-medium">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Form Input Component
 */
const InputGroup = ({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) => (
  <div className="space-y-1.5">
    <label className="text-white/40 text-[10px] font-bold tracking-wider ml-1 uppercase">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-white text-black py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffbade] transition-all placeholder:text-gray-400"
    />
  </div>
);

export default RegisterModal;
