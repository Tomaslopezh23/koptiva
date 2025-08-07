import { Briefcase, ClipboardCheck, Users } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    icon: Briefcase,
    title: "Consultoría Estratégica",
    description: "Te ayudamos a definir y alcanzar tus objetivos de negocio con estrategias personalizadas.",
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Consultoría de negocios",
    aiHint: "business meeting"
  },
  {
    icon: ClipboardCheck,
    title: "Gestión de Proyectos",
    description: "Organizamos y gestionamos tus proyectos para asegurar entregas puntuales y eficientes.",
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Gestión de proyectos",
    aiHint: "team collaboration"
  },
  {
    icon: Users,
    title: "Soporte Personalizado",
    description: "Ofrecemos atención y soporte adaptado a tus necesidades específicas y las de tus clientes.",
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Soporte al cliente",
    aiHint: "customer support"
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline text-primary">Nuestros Servicios</h2>
        <p className="text-center text-lg text-foreground/70 mb-12 max-w-xl mx-auto font-body">
          Descubre cómo podemos ayudarte a crecer y optimizar tu negocio con nuestras soluciones expertas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
              imageUrl={service.imageUrl}
              imageAlt={service.imageAlt}
              aiHint={service.aiHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
