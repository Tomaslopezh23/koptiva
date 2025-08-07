
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { AppointmentModal } from "./AppointmentModal";
import whatsappIconPng from '@/components/icons/whatsapplogo.png';

const WHATSAPP_NUMBER = "573108740006";
const WHATSAPP_MESSAGE = "Hola, estoy interesado en automatizar mi operación.";

interface HeroSectionProps {
  videoIsConfirmedPlaying: boolean;
}

export function HeroSection({ videoIsConfirmedPlaying }: HeroSectionProps) {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const [animationsCanStart, setAnimationsCanStart] = useState(false);
  const [isInitialDelayActive, setIsInitialDelayActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialDelayActive(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (videoIsConfirmedPlaying && !animationsCanStart) {
      setAnimationsCanStart(true);
    }
  }, [videoIsConfirmedPlaying, animationsCanStart]);

  return (
    <section
      id="hero"
      className="relative z-10 pt-10 pb-6 md:pt-12 md:pb-10 initial-slide-in-bottom"
    >
      <div className="max-w-[1140px] mx-auto px-4 text-center">
        <div className="inline-block py-6">
          <h2 className="text-7xl md:text-8xl font-bold text-primary-foreground font-koptiva leading-none mb-10 md:mb-12">
            Koptiva
          </h2>
        </div>
        <h1 className="text-3xl md:text-6xl font-bold mb-12 text-primary-foreground font-headline">
          Automatiza tu operación, gana tiempo y organiza tu negocio sin esfuerzo
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            asChild
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
              <Image src={whatsappIconPng} alt="WhatsApp" width={20} height={20} />
              Contactanos por WhatsApp
            </a>
          </Button>
          <AppointmentModal
            triggerButtonText="Agenda una llamada rápida"
            triggerButtonVariant="default" 
            triggerButtonClassName="bg-[#3B3F75] hover:bg-[#50548F] text-white px-6 py-3 rounded-full shadow-md transition"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-stretch sm:gap-2 text-center">
          <div className="py-1 px-2 rounded-lg flex items-center justify-center">
            <p className={`font-headline font-bold text-primary-foreground ${
              isInitialDelayActive
                ? 'opacity-0'
                : animationsCanStart
                  ? 'hero-text-fade-loop-1'
                  : 'opacity-20'
            }`}>Conecta tus herramientas</p>
          </div>
          <div className="py-1 px-2 rounded-lg flex items-center justify-center">
            <p className={`font-headline font-bold text-primary-foreground ${
              isInitialDelayActive
                ? 'opacity-0'
                : animationsCanStart
                  ? 'hero-text-fade-loop-2'
                  : 'opacity-20'
            }`}>Automatiza tus procesos</p>
          </div>
          <div className="py-1 px-2 rounded-lg flex items-center justify-center">
            <p className={`font-headline font-bold text-primary-foreground ${
              isInitialDelayActive
                ? 'opacity-0'
                : animationsCanStart
                  ? 'hero-text-fade-loop-3'
                  : 'opacity-20'
            }`}>Y gana tiempo</p>
          </div>
        </div>

      </div>
    </section>
  );
}
