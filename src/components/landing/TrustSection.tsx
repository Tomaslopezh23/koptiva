
import { HeartHandshake } from "lucide-react";

export function TrustSection() {
  return (
    <section id="confianza" className="py-16 md:py-24 bg-[#0e0e15]">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <HeartHandshake className="h-12 w-12 mb-6 text-[#e0e0f5] mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#e0e0f5] mb-4">
            Confianza y Cercanía: Automatización con Rostro Humano
          </h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto mb-6 text-lg">
            En <span className="text-white font-semibold">Koptiva</span> creemos en la automatización que <span className="text-white">simplifica</span>, no que complica.
            Estamos para ayudarte a trabajar mejor y liberar tu tiempo, para que te enfoques en lo importante.
          </p>
          <p className="text-center text-green-400 text-base font-medium italic mb-4">
            Nuestros clientes nos eligen por nuestra rapidez, compromiso y cercanía real.
          </p>
          <p className="text-center text-slate-400 text-sm max-w-xl mx-auto">
            No somos solo proveedores de tecnología — somos tus aliados estratégicos para escalar sin perder tu esencia.
          </p>
        </div>
      </div>
    </section>
  );
}
