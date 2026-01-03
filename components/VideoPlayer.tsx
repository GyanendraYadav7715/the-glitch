"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  Settings,
  Loader2,
  ChevronsRight,
  ChevronsLeft,
  PictureInPicture2, // New Icon
} from "lucide-react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // -- Core State --
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false); // New PiP State
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferedRanges, setBufferedRanges] = useState<
    { start: number; end: number }[]
  >([]);

  // -- UI State --
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  // -- Touch State --
  const [doubleTapFeedback, setDoubleTapFeedback] = useState<
    "forward" | "backward" | null
  >(null);
  const lastTapRef = useRef<number>(0);
  const touchStartDistRef = useRef<number>(0);

  const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // -- Helpers --
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // -- Actions --
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) setIsMuted(true);
      else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  }, []);

  // -- New: Picture-in-Picture Logic --
  const togglePiP = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (error) {
      console.error("PiP failed:", error);
    }
  }, []);

  const seek = useCallback(
    (seconds: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(
          0,
          Math.min(duration, videoRef.current.currentTime + seconds)
        );
      }
    },
    [duration]
  );

  // -- Progress Bar Logic --
  const handleProgressMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setHoverTime(percentage * duration);
    setHoverPosition(x);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    videoRef.current.currentTime = percentage * duration;
  };

  // -- Gestures --
  const handleTouchZoneClick = (
    e: React.MouseEvent | React.TouchEvent,
    zone: "left" | "middle" | "right"
  ) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (zone === "left") {
        seek(-10);
        setDoubleTapFeedback("backward");
      } else if (zone === "right") {
        seek(10);
        setDoubleTapFeedback("forward");
      }
      setTimeout(() => setDoubleTapFeedback(null), 500);
    } else {
      if (zone === "middle") togglePlay();
      handleMouseMove();
    }
    lastTapRef.current = now;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      touchStartDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current > 0) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (currentDist > touchStartDistRef.current + 50 && !isFullscreen) {
        toggleFullscreen();
        touchStartDistRef.current = 0;
      } else if (currentDist < touchStartDistRef.current - 50 && isFullscreen) {
        toggleFullscreen();
        touchStartDistRef.current = 0;
      }
    }
  };

  // -- Effects --
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateState = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        const ranges = [];
        for (let i = 0; i < video.buffered.length; i++) {
          ranges.push({
            start: video.buffered.start(i),
            end: video.buffered.end(i),
          });
        }
        setBufferedRanges(ranges);
      }
    };

    const handlePiPChange = () => {
      setIsPiP(!!document.pictureInPictureElement);
    };

    video.addEventListener("timeupdate", updateState);
    video.addEventListener("loadedmetadata", () => setDuration(video.duration));
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("waiting", () => setIsBuffering(true));
    video.addEventListener("canplay", () => setIsBuffering(false));
    video.addEventListener("enterpictureinpicture", handlePiPChange);
    video.addEventListener("leavepictureinpicture", handlePiPChange);

    return () => {
      video.removeEventListener("timeupdate", updateState);
      video.removeEventListener("enterpictureinpicture", handlePiPChange);
      video.removeEventListener("leavepictureinpicture", handlePiPChange);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current)
      clearTimeout(hideControlsTimeoutRef.current);
    if (isPlaying)
      hideControlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
  };

  // Global Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      const key = e.code;
      if (["Space", "ArrowLeft", "ArrowRight"].includes(key))
        e.preventDefault();

      switch (key) {
        case "Space":
          togglePlay();
          break;
        case "ArrowLeft":
          seek(-5);
          break;
        case "ArrowRight":
          seek(5);
          break;
        case "KeyM":
          toggleMute();
          break;
        case "KeyF":
          toggleFullscreen();
          break;
        case "KeyP":
          togglePiP();
          break; // 'P' for PiP
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, seek, toggleFullscreen, togglePiP]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full mx-auto bg-black overflow-hidden group select-none shadow-2xl ${
        isFullscreen ? "h-screen w-screen" : "max-w-4xl rounded-lg aspect-video"
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role="region"
      aria-label="Video Player"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        playsInline
      />

      {/* --- Touch Layer --- */}
      <div className="absolute inset-0 flex z-0">
        <div
          className="w-[30%] h-full"
          onClick={(e) => handleTouchZoneClick(e, "left")}
        />
        <div
          className="w-[40%] h-full flex items-center justify-center"
          onClick={(e) => handleTouchZoneClick(e, "middle")}
        >
          {!isPlaying && !isBuffering && (
            <div className="bg-black/60 rounded-full p-6 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
              <Play className="w-12 h-12 md:w-16 md:h-16 text-white fill-white translate-x-1" />
            </div>
          )}
        </div>
        <div
          className="w-[30%] h-full"
          onClick={(e) => handleTouchZoneClick(e, "right")}
        />
      </div>

      {/* --- Feedback Icons --- */}
      {doubleTapFeedback === "backward" && (
        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center bg-black/60 backdrop-blur p-4 rounded-full animate-in fade-in zoom-in z-20">
          <ChevronsLeft className="w-8 h-8 text-white" />{" "}
          <span className="text-white text-xs font-bold">-10s</span>
        </div>
      )}
      {doubleTapFeedback === "forward" && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center bg-black/60 backdrop-blur p-4 rounded-full animate-in fade-in zoom-in z-20">
          <ChevronsRight className="w-8 h-8 text-white" />{" "}
          <span className="text-white text-xs font-bold">+10s</span>
        </div>
      )}

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* --- Controls Bar --- */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 z-40 ${
          showControls ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="relative w-full h-1.5 hover:h-2 bg-white/30 rounded-full cursor-pointer mb-4 transition-all touch-none flex items-center outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          onClick={handleProgressClick}
          onMouseMove={handleProgressMove}
          onMouseLeave={() => {
            setHoverTime(null);
            setHoverPosition(null);
          }}
          role="slider"
          aria-label="Seek Video"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex={0}
        >
          {bufferedRanges.map((range, i) => (
            <div
              key={i}
              className="absolute h-full bg-white/40 rounded-full"
              style={{
                left: `${(range.start / duration) * 100}%`,
                width: `${((range.end - range.start) / duration) * 100}%`,
              }}
            />
          ))}
          <div
            className="absolute h-full bg-red-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-red-600 rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
          </div>

          {/* Hover Thumbnail */}
          {hoverTime !== null && hoverPosition !== null && (
            <div
              className="absolute bottom-full mb-3 flex flex-col items-center -translate-x-1/2 pointer-events-none"
              style={{ left: hoverPosition }}
            >
              <div className="w-32 h-20 bg-black border-2 border-white/20 rounded-lg overflow-hidden mb-1 shadow-lg relative">
                <img
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                  alt="Preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/80 text-xs font-mono bg-black/50 px-1 rounded">
                    Preview
                  </span>
                </div>
              </div>
              <div className="text-white text-xs font-bold bg-black/80 px-2 py-1 rounded border border-white/10 font-mono">
                {formatTime(hoverTime)}
              </div>
            </div>
          )}
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={togglePlay}
              className="hover:bg-white/20 p-2 rounded-full focus:outline-none focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="text-white fill-white w-6 h-6" />
              ) : (
                <Play className="text-white fill-white w-6 h-6" />
              )}
            </button>

            <div className="flex items-center gap-2 group/volume">
              <button
                onClick={toggleMute}
                className="hover:bg-white/20 p-2 rounded-full focus:outline-none focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="text-white w-6 h-6" />
                ) : volume < 0.5 ? (
                  <Volume1 className="text-white w-6 h-6" />
                ) : (
                  <Volume2 className="text-white w-6 h-6" />
                )}
              </button>
              <div
                className={`hidden md:block overflow-hidden transition-all duration-200 ${
                  showVolumeSlider ? "w-24" : "w-0"
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Volume Control"
                />
              </div>
            </div>

            <div
              className="text-white text-xs md:text-sm font-medium font-mono select-none"
              aria-label="Current Time"
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`hover:bg-white/20 p-2 rounded-full transition-transform focus:outline-none focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white ${
                  showSettings ? "rotate-90" : ""
                }`}
                aria-label="Settings"
                aria-haspopup="true"
                aria-expanded={showSettings}
              >
                <Settings className="text-white w-5 h-5 md:w-6 md:h-6" />
              </button>
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur rounded-lg border border-white/10 overflow-hidden shadow-xl w-32 animate-in slide-in-from-bottom-2 fade-in">
                  {playbackSpeeds.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        if (videoRef.current)
                          videoRef.current.playbackRate = speed;
                        setShowSettings(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/20 focus:outline-none focus:bg-white/20 ${
                        playbackSpeed === speed
                          ? "bg-red-600 hover:bg-red-700"
                          : ""
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP Button (Only shows if supported) */}
            {typeof document !== "undefined" &&
              document.pictureInPictureEnabled && (
                <button
                  onClick={togglePiP}
                  className={`hover:bg-white/20 p-2 rounded-full focus:outline-none focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white ${
                    isPiP ? "text-red-500" : "text-white"
                  }`}
                  aria-label={
                    isPiP
                      ? "Exit Picture-in-Picture"
                      : "Enter Picture-in-Picture"
                  }
                >
                  <PictureInPicture2 className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="hover:bg-white/20 p-2 rounded-full focus:outline-none focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="text-white w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Maximize className="text-white w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
