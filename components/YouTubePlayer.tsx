"use client";

import React from 'react';
import { useVideoPlayer } from './useVideoPlayer'; // Import the hook we just made

// Helper to format time (e.g., 65 seconds -> "1:05")
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function YouTubePlayer({ src }: { src: string }) {
  const {
    videoRef,
    containerRef,
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
    handleLoadedMetadata,
  } = useVideoPlayer();

  const { isPlaying, progress, currentTime, duration, isBuffering } = playerState;

  return (
    // 1. MAIN CONTAINER (Relative to hold absolute overlays)
    <div ref={containerRef} className="relative w-full aspect-video bg-black group overflow-hidden rounded-xl shadow-2xl">
      
      {/* 2. THE RAW VIDEO ENGINE */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* 3. LOADING SPINNER (Buffering) */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* 4. CENTER PLAY BUTTON ANIMATION (Optional polish) */}
      {!isPlaying && !isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
             <PlayIcon className="w-8 h-8 ml-1" />
          </div>
        </div>
      )}

      {/* 5. THE CONTROLS OVERLAY (The "Skin") */}
      {/* Opacity 0 by default, 1 on group-hover (YouTube style fade) */}
      <div className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${!isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        
        {/* Dark Gradient for readability */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative px-4 pb-4">
          
          {/* A. THE SCRUBBER (Red Progress Bar) */}
          <div className="group/scrubber relative h-1 hover:h-2 bg-white/30 cursor-pointer mb-3 transition-all">
             {/* Background */}
             <div className="absolute top-0 left-0 bottom-0 w-full bg-gray-600/60"></div>
             {/* Played Progress (Red) */}
             <div 
               className="absolute top-0 left-0 bottom-0 bg-[#f00] z-10" 
               style={{ width: `${progress}%` }}
             >
                {/* The "Knob" (Only visible on hover) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#f00] rounded-full scale-0 group-hover/scrubber:scale-100 transition-transform"></div>
             </div>
             
             {/* Hidden Range Input for actual dragging logic */}
             <input
               type="range"
               min="0"
               max="100"
               value={progress}
               onChange={handleSeek}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
             />
          </div>

          {/* B. THE BUTTON ROW */}
          <div className="flex items-center justify-between h-10">
            
            {/* Left Controls */}
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="hover:bg-white/10 p-2 rounded-full transition">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              
              <button className="hover:bg-white/10 p-2 rounded-full transition group/vol">
                 <VolumeIcon />
                 {/* Hidden Volume Slider could go here */}
              </button>

              <div className="text-sm font-medium">
                <span className="text-white">{formatTime(currentTime)}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-400">{formatTime(duration)}</span>
              </div>
            </div>