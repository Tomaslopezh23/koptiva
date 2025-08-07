import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  aiHint?: string;
}

export function TestimonialCard({ quote, name, role, avatarUrl, aiHint }: TestimonialCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card h-full flex flex-col">
      <CardContent className="pt-6 flex-grow flex flex-col">
        <blockquote className="italic text-foreground/80 border-l-4 border-primary pl-4 mb-6 flex-grow font-body">
          "{quote}"
        </blockquote>
        <div className="flex items-center mt-auto">
          <Avatar className="h-12 w-12 mr-4">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} data-ai-hint={aiHint} />}
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary font-headline">{name}</p>
            <p className="text-sm text-muted-foreground font-body">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
