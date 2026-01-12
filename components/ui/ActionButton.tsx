export default function ActionButton({ children, onClick, secondary = false }) {
  return (
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
}
