import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ServiceCardProps {
  icon?: LucideIcon;
  customIcon?: React.ReactNode;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  aiHint?: string;
}

export function ServiceCard({ icon: Icon, customIcon, title, description, imageUrl, imageAlt = "Servicio", aiHint }: ServiceCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image 
            src={imageUrl} 
            alt={imageAlt} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={aiHint}
          />
        </div>
      )}
      <CardHeader className="items-center text-center pt-6">
        {Icon && <Icon className="h-12 w-12 mb-4 text-primary" />}
        {customIcon && <div className="mb-4">{customIcon}</div>}
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <CardDescription className="font-body text-foreground/70">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
