
import { MessageSquare, DatabaseZap, BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card"; 
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: MessageSquare,
    title: "Conversaciones personalizadas. Clientes satisfechos.",
    description: "Responde en segundos con mensajes inteligentes, 24/7.\nAtención constante, sin que tú estés presente.",
    bgColor: "#1C2233",
  },
  {
    icon: DatabaseZap,
    title: "Todos tus datos. Un solo lugar.",
    description: "Conecta formularios, CRM y canales en una sola fuente confiable.\nDecide con claridad, actúa con velocidad.",
    bgColor: "#2A2339",
  },
  {
    icon: BrainCircuit,
    title: "Acompaña a tus prospectos, incluso cuando duermes.",
    description: "Envía mensajes en el momento justo y guía cada contacto por tu embudo.\nSin olvidos. Sin esfuerzos manuales.",
    bgColor: "#1E2C26",
  },
];

export function UseCasesSection() {
  return (
    <section id="casos-de-uso" className="py-16 md:py-24 bg-[#0e0e15]">
      <div className="max-w-[1140px] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e0e0f5] text-center mb-4">
          ¿Qué podemos automatizar por ti?
        </h2>
         <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
          Desde la atención al cliente hasta la gestión de datos y el seguimiento de ventas, transformamos tus procesos manuales en sistemas eficientes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4 h-full"
              style={{ 
                backgroundColor: useCase.bgColor,
                border: '3px solid rgba(255, 255, 255, 0.08)' 
              }}
            >
              <div className="bg-[#2f2f3a] p-3 rounded-full">
                <useCase.icon className={cn("h-7 w-7 text-[#5de4c7]")} />
              </div>
              <h3 className="text-white font-semibold text-lg whitespace-pre-line">
                {useCase.title}
              </h3>
              <p className="text-slate-400 text-sm leading-snug whitespace-pre-line">
                {useCase.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
