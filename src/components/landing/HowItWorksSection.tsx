
"use client";
import type { ForwardedRef } from "react";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { Users, Settings, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Users,
    title: "Te entendemos",
    description: "Observamos cómo trabajas hoy para que mañana trabajes menos.",
  },
  {
    icon: Settings,
    title: "Aplicamos",
    description: "Conectamos tus herramientas como si siempre hubieran sido una sola.",
  },
  {
    icon: CheckCircle,
    title: "Optimizamos",
    description: "No desaparecemos. Pulimos tus procesos y siempre estamos para corregir problemas.",
  },
];

const initialCardTransforms = [
  { rotate: -12, translateX: -32, translateY: -64 }, // Card 1
  { rotate: 10, translateX: 24, translateY: 48 },    // Card 2
  { rotate: -9, translateX: -16, translateY: 80 },   // Card 3
];

// HSL values from globals.css for interpolation
const organizedColorHSL = { h: 145, s: 63, l: 45 }; // Green (accent)
const disorganizedColorHSL = { h: 0, s: 84.2, l: 60.2 }; // Red (destructive)

const HowItWorksSectionComponent = React.forwardRef<HTMLElement, {}>(
  (props, sectionElementRef) => {
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);
    const cardRefs = [card1Ref, card2Ref, card3Ref];

    const color = "14, 14, 21";
    const gradientStops = [
      `rgba(${color}, 0.00) 0%`, `rgba(${color}, 0.04) 1%`, `rgba(${color}, 0.08) 2%`, `rgba(${color}, 0.12) 3%`, `rgba(${color}, 0.16) 4%`, `rgba(${color}, 0.20) 5%`, `rgba(${color}, 0.24) 6%`, `rgba(${color}, 0.28) 7%`, `rgba(${color}, 0.32) 8%`, `rgba(${color}, 0.36) 9%`, `rgba(${color}, 0.40) 10%`, `rgba(${color}, 0.44) 11%`, `rgba(${color}, 0.48) 12%`, `rgba(${color}, 0.52) 13%`, `rgba(${color}, 0.56) 14%`, `rgba(${color}, 0.60) 15%`, `rgba(${color}, 0.64) 16%`, `rgba(${color}, 0.68) 17%`, `rgba(${color}, 0.72) 18%`, `rgba(${color}, 0.76) 19%`, `rgba(${color}, 0.80) 20%`, `rgba(${color}, 0.84) 21%`, `rgba(${color}, 0.88) 22%`, `rgba(${color}, 0.92) 23%`, `rgba(${color}, 0.96) 24%`, `rgba(${color}, 1.00) 25%`, `rgba(${color}, 1.00) 100%`,
    ];
    const backgroundStyle = {
      background: `linear-gradient(to bottom, ${gradientStops.join(", ")})`,
    };

    const handleScroll = useCallback(() => {
      if (!sectionElementRef || !(sectionElementRef as React.RefObject<HTMLElement>).current) {
        return;
      }

      const sectionNode = (sectionElementRef as React.RefObject<HTMLElement>).current;
      if (!sectionNode) return;

      const viewportHeight = window.innerHeight;
      const sectionRect = sectionNode.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const sectionMidPointY_onScreen = sectionRect.top + sectionHeight / 2;

      const animationStartMidPointScreenY = viewportHeight * 0.40;
      const animationEndMidPointScreenY = viewportHeight * 0.60;

      let progress = 0;
      if (sectionMidPointY_onScreen <= animationStartMidPointScreenY) {
        progress = 0; // Fully organized state
      } else if (sectionMidPointY_onScreen >= animationEndMidPointScreenY) {
        progress = 1; // Fully disorganized state
      } else {
        const totalAnimationDistance = animationEndMidPointScreenY - animationStartMidPointScreenY;
        if (totalAnimationDistance > 0) {
          progress = (sectionMidPointY_onScreen - animationStartMidPointScreenY) / totalAnimationDistance;
        } else {
          progress = sectionMidPointY_onScreen >= animationEndMidPointScreenY ? 1 : 0;
        }
      }
      progress = Math.max(0, Math.min(1, progress));

      cardRefs.forEach((cardRef, index) => {
        if (cardRef.current) {
          const initialTransform = initialCardTransforms[index];

          const currentRotate = initialTransform.rotate * progress;
          const currentTranslateX = initialTransform.translateX * progress;
          const currentTranslateY = initialTransform.translateY * progress;

          cardRef.current.style.transform = `rotate(${currentRotate}deg) translateX(${currentTranslateX}px) translateY(${currentTranslateY}px)`;

          const h = organizedColorHSL.h * (1 - progress) + disorganizedColorHSL.h * progress;
          const s = organizedColorHSL.s * (1 - progress) + disorganizedColorHSL.s * progress;
          const l = organizedColorHSL.l * (1 - progress) + disorganizedColorHSL.l * progress;
          const currentDynamicColorHSL = `hsl(${h}, ${s}%, ${l}%)`;

          cardRef.current.style.borderColor = currentDynamicColorHSL;
          
          if (progress === 0) { // Fully organized
            cardRef.current.style.borderWidth = '2px';
            cardRef.current.style.boxShadow = `0 0 16px 3px ${currentDynamicColorHSL}`;
          } else { // Disorganized or in transition
            cardRef.current.style.borderWidth = '1px';
            cardRef.current.style.boxShadow = `0 0 8px 0px ${currentDynamicColorHSL}`;
          }
        }
      });
    }, [sectionElementRef, card1Ref, card2Ref, card3Ref]); // Stable individual refs

    useEffect(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }, [handleScroll]);

    return (
      <section
        id="como-funciona"
        ref={sectionElementRef}
        className="py-16 md:py-24"
        style={backgroundStyle}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-[#e0e0f5]">
            ¿Cómo funciona?
          </h2>
          <p className="text-center text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            Nuestro proceso es claro, flexible y hecho para adaptarse a ti.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-20 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={index}
                  ref={cardRefs[index]}
                  className={cn(
                    "flex flex-col items-start gap-4 p-6 rounded-lg bg-[#272730] h-full border",
                    "transition-[border-color,box-shadow,border-width] duration-300 ease-out" 
                  )}
                >
                  <div className="bg-[#2f2f3a] p-3 rounded-full">
                    <IconComponent className="h-7 w-7 text-[#8bb3ff]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-snug">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

HowItWorksSectionComponent.displayName = "HowItWorksSection";

export const HowItWorksSection = HowItWorksSectionComponent;

