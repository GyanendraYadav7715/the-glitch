"use client";
import { Mail, Lock } from "lucide-react";
import InputField from "../ui/InputField";
import ActionButton from "../ui/ActionButton";

export default function LoginForm({ onSwitch, onSubmit }) {
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
