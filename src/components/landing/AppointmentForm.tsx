"use client";

import type * as React from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { submitAppointment } from "@/app/actions";

const appointmentSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  whatsapp: z.string().optional(), 
  date: z.date({ required_error: "Por favor, selecciona una fecha."}),
  time: z.string({ required_error: "Por favor, selecciona una hora."}),
  automationGoal: z.string().min(10, "Describe brevemente qué quieres automatizar (mínimo 10 caracteres)."),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  onFormSubmitSuccess?: () => void;
}

export function AppointmentForm({ onFormSubmitSuccess }: AppointmentFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      automationGoal: "",
      message: "",
    },
  });

  function onSubmit(data: AppointmentFormValues) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const result = await submitAppointment(formData);
      if (result.errors) {
        toast({
          title: "Error de Validación",
          description: result.message || "Por favor, corrige los errores e inténtalo de nuevo.",
          variant: "destructive",
        });
        console.error("Validation errors:", result.errors);
      } else {
        toast({
          title: "¡Solicitud Enviada!",
          description: result.message,
        });
        form.reset();
        if (onFormSubmitSuccess) {
          onFormSubmitSuccess();
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@correo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">WhatsApp (Opcional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Tu número de WhatsApp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="automationGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">¿Qué quieres automatizar?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej: Conectar mi CRM con WhatsApp, automatizar respuestas a clientes, etc."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-foreground">Fecha Preferida para la Llamada</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal text-foreground hover:bg-muted hover:text-muted-foreground",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                        field.onChange(date);
                        setCalendarOpen(false);
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0)) 
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Hora Preferida para la Llamada</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-foreground">
                    <SelectValue placeholder="Selecciona una franja horaria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card text-foreground">
                  <SelectItem value="mañana">Mañana (9am - 12pm)</SelectItem>
                  <SelectItem value="tarde">Tarde (1pm - 5pm)</SelectItem>
                  <SelectItem value="noche">Noche (6pm - 8pm)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Mensaje Adicional (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cualquier otra información que quieras compartir."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="accent" className="w-full" disabled={isPending}>
          {isPending ? "Enviando..." : "Agendar Llamada"}
        </Button>
      </form>
    </Form>
  );
}
