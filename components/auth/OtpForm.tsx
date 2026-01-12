"use client";
import { KeyRound } from "lucide-react";
import ActionButton from "../ui/ActionButton";

export default function OtpForm({ email, onSubmit }) {
  return (
    <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="bg-pink-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-pink-400">
        <KeyRound size={32} />
      </div>

      <div className="space-y-1">
        <h3 className="text-white font-medium">Enter Verification Code</h3>
        <p className="text-gray-400 text-xs">
          We've sent a 6-digit code to <br />
          <span className="text-white font-medium">
            {email || "your email"}
          </span>
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          maxLength={6}
          className="w-full bg-[#15161c] text-center text-2xl tracking-[0.5em] text-white font-mono border border-gray-700 rounded-lg py-3 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <span className="tracking-[0.5em] text-2xl">______</span>
        </div>
      </div>

      <ActionButton onClick={onSubmit}>Verify Account</ActionButton>

      <p className="text-gray-500 text-xs">
        Didn't receive code?{" "}
        <button className="text-pink-400 hover:underline">Resend in 30s</button>
      </p>
    </div>
  );
}
