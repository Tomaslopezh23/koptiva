
"use client";

import React, { useEffect, useRef } from 'react';

interface VideoSectionProps {
  onPlayStateChange: (isPlaying: boolean) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ onPlayStateChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoDiv = videoSectionRef.current;
    if (!videoDiv) return;

    const heroElement = document.getElementById('hero');
    const problemsSolvedElement = document.getElementById('problemas');

    if (!heroElement) {
      console.warn("Hero element with id 'hero' not found. VideoSection height may not be set correctly.");
    }
    if (!problemsSolvedElement) {
      console.warn("ProblemsSolvedSection element with id 'problemas' not found. Video height calculation will not include its contribution.");
    }

    let animationFrameId: number | null = null;

    const performUpdate = () => {
      if (videoDiv && heroElement) {
        const heroHeight = heroElement.offsetHeight;
        const problemsSolvedHeight = problemsSolvedElement ? problemsSolvedElement.offsetHeight : 0;
        
        const newHeight = heroHeight + (problemsSolvedHeight / 4);

        if (newHeight > 0) {
          videoDiv.style.height = `${newHeight}px`;
        } else if (heroHeight > 0) { 
          // Fallback if newHeight is not positive, but heroHeight is
          videoDiv.style.height = `${heroHeight}px`;
        }
      }
    };

    const scheduleUpdate = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(performUpdate);
    };

    if (heroElement) {
      scheduleUpdate();
      const timeoutId = setTimeout(scheduleUpdate, 150); // Increased delay slightly for potentially slower renders

      const resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(heroElement);
      // If ProblemsSolvedSection changes independently and affects calculations, observe it too.
      // For now, heroElement is the primary trigger.
      // if (problemsSolvedElement) {
      //   resizeObserver.observe(problemsSolvedElement);
      // }


      window.addEventListener('resize', scheduleUpdate);
      document.fonts.ready.then(scheduleUpdate);

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
        window.removeEventListener('resize', scheduleUpdate);
      };
    }
  }, []);


  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    const attemptPlay = () => {
      if (currentVideo.paused) {
        currentVideo.play().catch(error => {
          console.warn("Video play attempt failed. Browser might restrict background playback.", error.message);
          onPlayStateChange(false);
        });
      }
    };

    const handlePlaying = () => {
      onPlayStateChange(true);
    };

    const handlePause = () => {
      onPlayStateChange(false);
      // Attempt to resume play if browser pauses it
      // This might be overridden by browser policies, especially for background tabs.
      if (document.visibilityState === 'visible') { // Only try if tab is visible
        attemptPlay();
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    currentVideo.addEventListener('playing', handlePlaying);
    currentVideo.addEventListener('pause', handlePause);
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.visibilityState === 'visible') {
        attemptPlay();
    }

    if (!currentVideo.paused) {
        onPlayStateChange(true);
    } else {
        onPlayStateChange(false);
    }

    return () => {
      currentVideo.removeEventListener('playing', handlePlaying);
      currentVideo.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onPlayStateChange]);

  return (
    <div
      ref={videoSectionRef}
      className="absolute top-0 left-0 w-full z-[-1] overflow-hidden"
      style={{ backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videofondo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"
        }}
      ></div>
    </div>
  );
};

export default VideoSection;
