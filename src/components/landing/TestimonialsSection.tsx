import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    quote: "¡Cita Fácil transformó la manera en que gestionamos nuestras citas! Es intuitivo y muy eficiente.",
    name: "Ana Pérez",
    role: "CEO, Soluciones Tech",
    avatarUrl: "https://placehold.co/100x100.png",
    aiHint: "woman smiling"
  },
  {
    quote: "El soporte al cliente es excepcional y la plataforma es increíblemente fácil de usar. Lo recomiendo ampliamente.",
    name: "Carlos López",
    role: "Director, Marketing Creativo",
    avatarUrl: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    quote: "Desde que usamos Cita Fácil, hemos visto un aumento en la satisfacción de nuestros clientes y una mejor organización interna.",
    name: "Laura Gómez",
    role: "Gerente, Bienestar Integral",
    avatarUrl: "https://placehold.co/100x100.png",
    aiHint: "person professional"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline text-primary">Lo Que Dicen Nuestros Clientes</h2>
        <p className="text-center text-lg text-foreground/70 mb-12 max-w-xl mx-auto font-body">
          Estamos orgullosos de ayudar a nuestros clientes a alcanzar sus metas. Lee sus historias.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              quote={testimonial.quote} 
              name={testimonial.name} 
              role={testimonial.role}
              avatarUrl={testimonial.avatarUrl}
              aiHint={testimonial.aiHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
