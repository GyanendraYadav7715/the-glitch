"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Search,
  X,
  Disc,
  Shuffle,
  Rss,
  MessageCircle,
  Mail,
  Lock,
  User,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

// Assuming these are in your components folder
import SocialButtons from "./SocialButtons";
import NavButtons from "./NavButtons";

// --- 1. REUSABLE UI COMPONENTS (Internal to this file for simplicity) ---

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div className="relative group">
    <Icon
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors"
      size={18}
    />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#15161c] text-white border border-gray-700 rounded-md py-3 pl-10 pr-4 
                 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 
                 transition-all placeholder:text-gray-600 text-sm"
      value={value}
      onChange={onChange}
    />
  </div>
);

const ActionButton = ({ children, onClick, secondary = false }) => (
  <button
    onClick={onClick}
    className={`w-full font-bold py-3 rounded-md mt-2 transition-all active:scale-[0.98] 
      ${
        secondary
          ? "bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white"
          : "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/20"
      }`}
  >
    {children}
  </button>
);

// --- 2. AUTH MODAL (HANDLES LOGIC) ---

function AuthModal({ onClose }) {
  // Views: 'login' | 'register' | 'otp'
  const [view, setView] = useState("login");
  const [email, setEmail] = useState(""); // Track email for OTP display

  // Animation state for smooth height transitions
  const [isAnimating, setIsAnimating] = useState(false);

  // Logic: Stop propagation to prevent clicking modal from closing it
  const handleContentClick = (e) => e.stopPropagation();

  // Switch View with a tiny delay for smoothness (optional, can be direct)
  const switchView = (newView) => {
    setIsAnimating(true);
    setView(newView);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // MOCK SUBMIT HANDLERS
  const handleLogin = () => {
    alert("Logged In Successfully!");
    onClose();
  };

  const handleRegister = () => {
    // Validate inputs here, then switch to OTP
    switchView("otp");
  };

  const handleVerifyOtp = () => {
    alert("Account Verified!");
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
        {/* Header Section */}
        <div className="bg-[#2a2c3a] p-5 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            {view !== "login" && (
              <button
                onClick={() =>
                  switchView(view === "otp" ? "register" : "login")
                }
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

        {/* Dynamic Content Area */}
        <div className="p-6">
          {view === "login" && (
            <LoginForm
              onSwitch={() => switchView("register")}
              onSubmit={handleLogin}
            />
          )}
          {view === "register" && (
            <RegisterForm
              onSwitch={() => switchView("login")}
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

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function LoginForm({ onSwitch, onSubmit }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <InputField icon={Mail} type="email" placeholder="Email Address" />
        <div>
          <InputField icon={Lock} type="password" placeholder="Password" />
          <div className="flex justify-end mt-1">
            <button className="text-xs text-pink-400 hover:text-pink-300 hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>

      <ActionButton onClick={onSubmit}>Log In</ActionButton>

      <div className="flex items-center gap-3 my-4">
        <div className="h-px bg-gray-700 flex-1" />
        <span className="text-xs text-gray-500 uppercase">Or</span>
        <div className="h-px bg-gray-700 flex-1" />
      </div>

      <p className="text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-pink-400 font-medium hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch, onSubmit, setEmail }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-3">
        <InputField icon={User} type="text" placeholder="First Name" />
        <InputField icon={User} type="text" placeholder="Last Name" />
      </div>

      <InputField
        icon={Mail}
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField icon={Lock} type="password" placeholder="Password" />
      <InputField
        icon={CheckCircle2}
        type="password"
        placeholder="Confirm Password"
      />

      <div className="text-xs text-gray-500 leading-tight">
        By registering, you agree to our{" "}
        <span className="text-pink-400">Terms</span> and{" "}
        <span className="text-pink-400">Privacy Policy</span>.
      </div>

      <ActionButton onClick={onSubmit}>Create Account</ActionButton>

      <p className="text-center text-gray-400 text-sm pt-2">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-pink-400 font-medium hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  );
}

function OtpForm({ email, onSubmit }) {
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

      {/* Styled OTP Input Simulation */}
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

// --- 3. MAIN NAVBAR COMPONENT ---

export default function HiAnimeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Controls modal visibility

  const router = useRouter();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <nav className="bg-[#272a3796] backdrop-blur-md px-4 py-3 sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-pink-400 transition-colors"
            >
              <Menu size={24} />
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/logo9.png"
                alt="h!anime logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full bg-white text-gray-900 rounded-sm px-4 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <div className="absolute right-0 top-0 h-full flex items-center gap-2 pr-2">
                <button className="text-gray-500 hover:text-pink-500 transition-colors">
                  <Search size={20} />
                </button>
                <button className="bg-[#4a4b58] hover:bg-gray-600 text-white px-3 py-1 rounded-sm text-xs font-medium uppercase tracking-tighter">
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <SocialButtons />
              <NavButtons />
            </div>

            {/* Login Button triggers Modal */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-pink-300 hover:bg-pink-400 text-gray-900 font-bold px-5 py-2 rounded-sm text-sm transition-transform active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* --- RENDER AUTH MODAL --- */}
      {isLoginOpen && <AuthModal onClose={() => setIsLoginOpen(false)} />}

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1a1a2e] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <span className="text-pink-400 font-black text-2xl tracking-tighter">
              h!anime
            </span>
            <button
              onClick={toggleSidebar}
              className="text-white hover:rotate-90 transition-transform duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <SidebarLink href="/" label="Home" />
            <SidebarLink href="/movies" label="Movies" />
            <SidebarLink href="/tv-series" label="TV Series" />
            <SidebarLink href="/popular" label="Most Popular" />
            <SidebarLink href="/top-airing" label="Top Airing" />

            <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
              <SidebarLink
                href="/random"
                label="Random"
                icon={<Shuffle size={18} />}
              />
              <SidebarLink
                href="/watch2gether"
                label="Watch2gether"
                icon={<Disc size={18} />}
              />
              <SidebarLink href="/news" label="News" icon={<Rss size={18} />} />
              <SidebarLink
                href="/community"
                label="Community"
                icon={<MessageCircle size={18} />}
              />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ href, label, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-md transition-all group"
    >
      {icon && (
        <span className="text-pink-400 group-hover:scale-110 transition-transform">
          {icon}
        </span>
      )}
      <span className="font-medium text-[15px]">{label}</span>
    </Link>
  );
}
