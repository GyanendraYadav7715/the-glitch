"use client";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import InputField from "../ui/InputField";
import ActionButton from "../ui/ActionButton";

export default function RegisterForm({ onSwitch, onSubmit, setEmail }) {
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
