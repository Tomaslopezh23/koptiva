import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 50" // ViewBox width remains to accommodate both texts
      width="285" // Width attribute of the SVG element
      height="37.5" // Height attribute of the SVG element
      aria-label="Koptiva Automatización Logo"
      {...props}
    >
      <text
        x="10"
        y="35"
        fontFamily="'Helvetica Neue LT Std 63 Medium Extended', sans-serif"
        fontSize="18" // Changed from "30" to reflect text-lg
        fontWeight="700" // Reflects font-bold
        fill="hsl(var(--primary-foreground))" // Reflects text-white
        letterSpacing="-0.025em" // Reflects tracking-tight
      >
        Koptiva automation
      </text>
    </svg>
  );
}
