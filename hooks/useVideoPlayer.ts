import { useState, useEffect, useRef } from 'react';

export const useVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,        // 0 to 100
        currentTime: 0,     // Current second
        duration: 0,        // Total seconds
        volume: 1,          // 0 to 1
        isMuted: false,
        isFullscreen: false,
        isBuffering: false, // For the loading spinner
    });

    // Toggle Play/Pause
    const togglePlay = () => {
        if (!videoRef.current) return;

        // We update state based on what the DOM actually does
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    // Handle Time Update (The loop)
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;

        // Calculate percentage (0-100)
        const progress = (current / total) * 100;

        setPlayerState((prev) => ({
            ...prev,
            currentTime: current,
            progress: isNaN(progress) ? 0 : progress,
        }));
    };

    // Handle Seeking (Clicking the timeline)
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;

        const manualChange = Number(e.target.value);
        videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;

        setPlayerState((prev) => ({
            ...prev,
            progress: manualChange,
        }));
    };

    // Sync state when video loads metadata
    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setPlayerState((prev) => ({
            ...prev,
            duration: videoRef.current.duration,
        }));
    };

    // Sync Play/Pause state with actual events (Fixes browser autoplay blocks)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updatePlayState = () => setPlayerState(p => ({ ...p, isPlaying: !video.paused }));
        const setBufferTrue = () => setPlayerState(p => ({ ...p, isBuffering: true }));
        const setBufferFalse = () => setPlayerState(p => ({ ...p, isBuffering: false }));

        video.addEventListener('play', updatePlayState);
        video.addEventListener('pause', updatePlayState);
        video.addEventListener('waiting', setBufferTrue); // Buffering starts
        video.addEventListener('playing', setBufferFalse); // Buffering ends

        return () => {
            video.removeEventListener('play', updatePlayState);
            video.removeEventListener('pause', updatePlayState);
            video.removeEventListener('waiting', setBufferTrue);
            video.removeEventListener('playing', setBufferFalse);
        };
    }, [videoRef]);

    return {
        videoRef,
        containerRef,
        playerState,
        togglePlay,
        handleTimeUpdate,
        handleSeek,
        handleLoadedMetadata,
    };
};