"use client";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpForm from "./OtpForm";

export default function AuthModal({ onClose }) {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");

  // Logic: Stop propagation so clicking inside doesn't close modal
  const handleContentClick = (e) => e.stopPropagation();

  // Mock Handlers
  const handleLogin = () => {
    alert("Login Success");
    onClose();
  };
  const handleRegister = () => {
    setView("otp");
  };
  const handleVerifyOtp = () => {
    alert("Verified");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] bg-[#20222e] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="bg-[#2a2c3a] p-5 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            {view !== "login" && (
              <button
                onClick={() => setView(view === "otp" ? "register" : "login")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-white font-bold text-lg tracking-wide">
              {view === "login" && "Welcome Back"}
              {view === "register" && "Create Account"}
              {view === "otp" && "Verify Email"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Body */}
        <div className="p-6">
          {view === "login" && (
            <LoginForm
              onSwitch={() => setView("register")}
              onSubmit={handleLogin}
            />
          )}
          {view === "register" && (
            <RegisterForm
              onSwitch={() => setView("login")}
              onSubmit={handleRegister}
              setEmail={setEmail}
            />
          )}
          {view === "otp" && (
            <OtpForm email={email} onSubmit={handleVerifyOtp} />
          )}
        </div>
      </div>
    </div>
  );
}
