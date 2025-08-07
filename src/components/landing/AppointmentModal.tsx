"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentForm } from "./AppointmentForm";
import { cn } from "@/lib/utils";

interface AppointmentModalProps {
  triggerButtonText?: string;
  triggerButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  triggerButtonClassName?: string;
}

export function AppointmentModal({ 
  triggerButtonText = "Agendar Cita", 
  triggerButtonVariant = "accent",
  triggerButtonClassName,
}: AppointmentModalProps) {
  const [open, setOpen] = useState(false);

  const handleFormSubmitSuccess = () => {
    setOpen(false); 
  };
  
  // The variant prop on Button component will handle specific accent styling
  // No need for buttonClass if using the 'accent' variant directly

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerButtonVariant} className={cn(triggerButtonClassName)}>
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto bg-card rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Agendar una Llamada</DialogTitle>
          <DialogDescription className="font-body text-muted-foreground">
            Completa el formulario para agendar tu llamada. Nos pondremos en contacto contigo para confirmar.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm onFormSubmitSuccess={handleFormSubmitSuccess} />
      </DialogContent>
    </Dialog>
  );
}
