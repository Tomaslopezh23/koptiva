"use server";

import { z } from "zod";

const appointmentSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  whatsapp: z.string().optional(), // Changed from phone, still optional
  date: z.date({ required_error: "Por favor, selecciona una fecha."}),
  time: z.string({ required_error: "Por favor, selecciona una hora."}),
  automationGoal: z.string().min(10, "Describe brevemente qué quieres automatizar (mínimo 10 caracteres)."), // Replaced service
  message: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  subject: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function submitAppointment(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  // Convert date string to Date object
  if (rawData.date && typeof rawData.date === 'string') {
    rawData.date = new Date(rawData.date);
  }
  
  const validatedFields = appointmentSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validación. Revisa los campos marcados.",
    };
  }

  // Simulate API call or database save
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Llamada agendada:", validatedFields.data);

  return {
    message: "¡Llamada agendada con éxito! Nos pondremos en contacto contigo pronto para confirmar.",
    data: validatedFields.data,
  };
}

export async function submitContactForm(formData: FormData) {
  const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validación.",
    };
  }

  // Simulate API call or database save
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Mensaje de contacto recibido:", validatedFields.data);

  return {
    message: "¡Mensaje enviado con éxito! Te responderemos lo antes posible.",
    data: validatedFields.data,
  };
}
