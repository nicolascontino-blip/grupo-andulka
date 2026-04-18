"use client";

import { useState } from "react";

export default function AndulkaSite() {
  const [active, setActive] = useState<number | null>(null);
  const [index, setIndex] = useState(0);

  const proyectos = {
    1: ["/proyecto1.jpg", "/proyecto1b.jpg", "/proyecto1c.jpg"],
    2: ["/proyecto2.jpg", "/proyecto2b.jpg", "/proyecto2c.jpg"],
    3: ["/proyecto3.jpg", "/proyecto3b.jpg", "/proyecto3c.jpg"],
  };

  const next = () => {
    if (active) {
      setIndex((prev) => (prev + 1) % proyectos[active].length);
    }
  };

  const prev = () => {
    if (active) {
      setIndex((prev) => (prev - 1 + proyectos[active].length) % proyectos[active].length);
    }
  };

  return (
    <div className="bg-white text-black">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6 border-b">
        <h1 className="text-xl tracking-widest font-semibold cursor-pointer">
          GRUPO ANDULKA
        </h1>

        <nav className="space-x-6 text-sm">
          <a href="#proyectos">Proyectos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="h-screen relative flex items-center justify-center text-white">
        <img src="/hero.jpg" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <h2 className="relative text-5xl md:text-7xl font-light text-center px-6 max-w-4xl">
          Arquitectura que construye identidad
        </h2>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="px-16 py-32">
        <h3 className="text-2xl mb-10">Proyectos</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => {
                setActive(i);
                setIndex(0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`/proyecto${i}.jpg`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm">Proyecto {i}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA FULLSCREEN */}
      {active && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <button
            onClick={prev}
            className="absolute left-6 text-white text-3xl"
          >
            ‹
          </button>

          <img
            src={proyectos[active][index]}
            className="max-h-full max-w-full object-contain"
          />

          <button
            onClick={next}
            className="absolute right-6 text-white text-3xl"
          >
            ›
          </button>
        </div>
      )}

      {/* NOSOTROS */}
      <section id="nosotros" className="px-10 py-24 bg-gray-50">
        <h3 className="text-2xl mb-6">Nosotros</h3>
        <p className="max-w-xl text-gray-600">
          Grupo Andulka es un estudio de arquitectura enfocado en el desarrollo
          de proyectos contemporáneos.
        </p>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-10 py-24">
        <h3 className="text-2xl mb-6">Contacto</h3>
        <p>info@grupoandulka.com</p>
      </section>

    </div>
  );
}
