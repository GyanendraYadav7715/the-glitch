import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4">
      {/* Container for the ripple effect */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Inner solid circle (The core) */}
        <span className="absolute h-4 w-4 rounded-full bg-primary"></span>

        {/* First Ripple Ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 duration-1000"></span>

        {/* Second Ripple Ring (Delayed for continuous effect) 
            Note: We use inline style for animation-delay since Tailwind 
            doesn't have a built-in delay utility for standard animations without plugins. 
        */}
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 duration-1000"
          style={{ animationDelay: "0.5s" }}
        ></span>
      </div>

      {/* Optional Text */}
      <h3 className="animate-pulse text-lg font-medium text-primary tracking-widest">
        LOADING
      </h3>
    </div>
  );
};

export default Loader;
