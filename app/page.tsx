"use client";

import { useState, useEffect } from "react";

export default function AndulkaSite() {
  const [active, setActive] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // INTRO
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
        <h1 className="text-white text-2xl md:text-3xl tracking-[0.6em] opacity-0 animate-fadeIn">
          GRUPO ANDULKA
        </h1>

        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; letter-spacing: 0.2em; }
            100% { opacity: 1; letter-spacing: 0.6em; }
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease forwards;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 text-white">
   <div className="relative group cursor-pointer overflow-visible">

  <h1 className="tracking-widest text-sm transition-all duration-500 group-hover:tracking-[0.3em]">
    GRUPO ANDULKA
  </h1>

  <img
    src="/PAJARITO1.png"
    className="
      absolute 
      top-0 
      left-1/2 
      -translate-x-1/2 
      w-6 
      opacity-0 
      group-hover:opacity-100 
      group-hover:-translate-y-6 
      transition-all duration-500
      pointer-events-none
    "
  />

</div>

        <nav className="space-x-6 text-sm">
          <a href="#proyectos" className="hover:opacity-60 transition">Proyectos</a>
          <a href="#contacto" className="hover:opacity-60 transition">Contacto</a>
        </nav>
      </header>

      {/* HERO VIDEO */}
      <section className="h-screen relative flex items-end text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative p-16 max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-light leading-tight">
            Arquitectura que transforma espacios
          </h2>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="px-10 py-24">
        <h3 className="text-2xl mb-16">Proyectos</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="cursor-pointer group overflow-hidden"
            >
              <img
                src={`/proyecto${i}.jpg`}
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-8 text-white text-3xl"
          >
            ✕
          </button>

          <img
            src={`/proyecto${active}.jpg`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}

      {/* CONTACTO */}
   <section id="contacto" className="px-10 py-32 bg-black text-white">
  <h3 className="text-2xl mb-6">Contacto</h3>

  <p className="opacity-70 mb-8">info@grupoandulka.com</p>

  <div className="flex gap-8">

    <a 
      href="https://instagram.com/grupoandulka/"
      target="_blank"
      className="flex items-center gap-2 hover:opacity-60 transition"
    >
      <span>Instagram</span>
      <img src="/instagram.png" className="w-5 h-5 object-contain mix-blend-lighten" />
    </a>

    <a 
      href="https://linkedin.com/company/grupo-andulka/"
      target="_blank"
      className="flex items-center gap-2 hover:opacity-60 transition"
    >
      <span>LinkedIn</span>
      <img src="/linkedin.png" className="w-5 h-5 object-contain mix-blend-lighten" />
    </a>

  </div>
</section>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/5491155672356"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <img
          src="/WAPP.png"
          className="w-14 h-14 object-contain hover:scale-110 transition"
        />
      </a>

    </div>
  );
}