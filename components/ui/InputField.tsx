import { Mail } from "lucide-react";

export default function InputField({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative group">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors"
          size={18}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#15161c] text-white border border-gray-700 rounded-md py-3 pl-10 pr-4 
                   focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 
                   transition-all placeholder:text-gray-600 text-sm"
      />
    </div>
  );
}
