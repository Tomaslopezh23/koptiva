"use client";

import { useState, useEffect, useRef } from 'react';
import { Header } from '@/components/landing/Header';
import VideoSection from '@/components/landing/VideoSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemsSolvedSection } from '@/components/landing/ProblemsSolvedSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { TrustSection } from '@/components/landing/TrustSection';
import { FinalCallToActionSection } from '@/components/landing/FinalCallToActionSection';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const howItWorksRef = useRef<HTMLElement>(null);

  const handleVideoPlayStateChange = (playing: boolean) => {
    setIsVideoPlaying(playing);
  };

  useEffect(() => {
    const sectionElement = howItWorksRef.current;
    if (!sectionElement) return;

    let animationFrameId: number | null = null;

    const updateBodyBackground = () => {
      if (!sectionElement) return;

      const rect = sectionElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const sectionAbsoluteTopY = rect.top + scrollTop;
      const sectionHeight = sectionElement.offsetHeight;
      const sectionFirstQuarterMarkAbsoluteY = sectionAbsoluteTopY + sectionHeight / 4;
      const sectionMidPointAbsoluteY = sectionAbsoluteTopY + sectionHeight / 2;

      // Ensure values are pixel units for CSS and respect the 100px black bar
      // The body's gradient is relative to the document, so these are absolute Y coordinates.
      const finalSectionTop = Math.max(100, sectionAbsoluteTopY);
      const finalSectionQuarter = Math.max(finalSectionTop, sectionFirstQuarterMarkAbsoluteY);
      const finalSectionMid = Math.max(finalSectionQuarter, sectionMidPointAbsoluteY);


      document.body.style.setProperty('--section-top-y', `${finalSectionTop}px`);
      document.body.style.setProperty('--section-quarter-y', `${finalSectionQuarter}px`);
      document.body.style.setProperty('--section-mid-y', `${finalSectionMid}px`);
    };
    
    const scheduleUpdate = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateBodyBackground);
    };


    // Initial calculation
    scheduleUpdate();

    // Recalculate on resize and scroll (throttled by requestAnimationFrame)
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    // MutationObserver for content changes within HowItWorksSection that might affect its height
    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(sectionElement, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      characterData: true 
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate);
      observer.disconnect();
      // Reset CSS variables if needed (optional, depending on desired behavior on unmount)
      // document.body.style.removeProperty('--section-top-y');
      // document.body.style.removeProperty('--section-quarter-y');
      // document.body.style.removeProperty('--section-mid-y');
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative main-bg-fade-out">
        <VideoSection onPlayStateChange={handleVideoPlayStateChange} />
        <HeroSection videoIsConfirmedPlaying={isVideoPlaying} />
        <div className="initial-slide-in-bottom">
          <ProblemsSolvedSection />
          <HowItWorksSection ref={howItWorksRef} />
          <UseCasesSection />
          <TrustSection />
          <FinalCallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
