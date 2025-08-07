
export function FinalCallToActionSection() {
  return (
    <section id="contacto-final" className="py-16 md:py-24 bg-[#0e0e15]">
      <div className="max-w-[1140px] mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#e0e0f5]">
          ¿Listo para ganar tiempo y optimizar tu negocio?
        </h2>
        <p className="text-center text-slate-400 max-w-xl mx-auto mb-8 text-base md:text-lg">
          Agenda una llamada rápida para conocernos, entender tus necesidades y mostrarte cómo la automatización puede transformar tu día a día.
        </p>
        <div className="flex justify-center">
          <a 
            href="#agenda" 
            className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            Agendar Llamada Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
