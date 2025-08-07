
"use client";

import { Lightbulb, Link as LinkIconLucide, Workflow, HeartPulse } from "lucide-react"; 
import Image from 'next/image';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";

const problems = [
  {
    icon: Lightbulb,
    text: "Pasas horas respondiendo lo mismo en WhatsApp",
    imageUrl: "/img1.png",
    aiHint: "chat bubbles",
  },
  {
    icon: LinkIconLucide, 
    text: "Tus herramientas no están conectadas entre ellas",
    imageUrl: "/img2.png",
    aiHint: "connected nodes",
  },
  {
    icon: Workflow,
    text: "Repetir tareas te frustra y no tienes tiempo para arreglarlo",
    imageUrl: "/img3.png",
    aiHint: "gears process",
  },
  {
    icon: HeartPulse,
    text: "Cuando necesitas ayuda, nadie responde rápido",
    imageUrl: "/img4.png",
    aiHint: "support headset",
  },
];

export function ProblemsSolvedSection() {
  const [currentOpacity, setCurrentOpacity] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const contentNode = contentRef.current;

    if (contentNode) {
      const rect = contentNode.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.bottom < 0 && rect.height > 0) { 
          setCurrentOpacity(1); 
          return;
      }
      
      const visibleHeightFromTop = Math.max(0, windowHeight - rect.top);
      const triggerHeightRatio = 0.25; 
      const visibilityThreshold = rect.height * triggerHeightRatio;
      
      const currentVisibilityRatio = visibilityThreshold > 0 ? visibleHeightFromTop / visibilityThreshold : 0;
      const calculatedOpacity = Math.min(1, Math.max(0, currentVisibilityRatio));
      setCurrentOpacity(calculatedOpacity);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (problems.length === 0) return;

    let timerId: NodeJS.Timeout;

    if (!isTimerPaused) {
      timerId = setTimeout(() => {
        setActiveCardIndex((prevIndex) => (prevIndex + 1) % problems.length);
      }, 5000); 
    }

    return () => clearTimeout(timerId);
  }, [activeCardIndex, problems.length, isTimerPaused]);

  return (
    <section
      id="problemas"
      className="relative py-16 md:py-24 bg-transparent"
    >
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 26, 32, 0) 0%, #141a20 25%, #141a20 100%)',
        }}
      />
      <div
        ref={contentRef}
        style={{ opacity: currentOpacity }}
        className="max-w-[1140px] mx-auto px-4 transition-opacity duration-300 ease-in-out"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline text-[#e0e0f5]">
          ¿Te suena familiar? Esto es lo que resolvemos:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mt-28">
          {problems.map((problem, index) => {
            const isCardSelectedForEnlargement = hoveredCardIndex !== null ? index === hoveredCardIndex : index === activeCardIndex;
            
            return (
              <Card
                key={index}
                onMouseEnter={() => {
                  setHoveredCardIndex(index);
                  setIsTimerPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredCardIndex(null);
                  setIsTimerPaused(false);
                }}
                className={cn(
                  "shadow-lg hover:shadow-xl duration-300 flex flex-col text-center rounded-lg shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] border-0 transition-transform duration-700 ease-in-out relative overflow-hidden",
                  isCardSelectedForEnlargement ? 'scale-110 bg-black' : 'scale-75 bg-[#312f45]/80'
                )}
                style={!isCardSelectedForEnlargement ? { borderColor: '#ffffff40', borderWidth: '1px', borderStyle: 'solid' } : { borderWidth: '1px', borderStyle: 'solid', borderColor: 'transparent' }}
              >
                {/* Enlarged Card Content Wrapper (Image + Text) */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-in-out bg-black", 
                    isCardSelectedForEnlargement ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={problem.imageUrl}
                    alt={problem.text.substring(0,50)}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0"
                    data-ai-hint={problem.aiHint}
                    priority={true} 
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="relative z-20 flex flex-col justify-end h-full px-4 py-14">
                    <p className="font-body text-white text-base text-center text-shadow-around">
                      {problem.text}
                    </p>
                  </div>
                </div>

                {/* Small Card Content Wrapper */}
                <div
                  className={cn(
                    "flex flex-col items-center justify-center h-full transition-opacity duration-700 ease-in-out p-4",
                    !isCardSelectedForEnlargement ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                >
                  <CardHeader className="items-center pt-6 p-0">
                    <problem.icon className="h-8 w-8 mb-4 text-accent" />
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-col justify-center pb-4 px-2 p-0">
                    <p className="font-body text-slate-300 text-base line-clamp-2">
                      {problem.text}
                    </p>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
