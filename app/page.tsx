"use client";

import { useState } from "react";

export default function AndulkaSite() {
const [active, setActive] = useState(null);

  return (
    <div className="bg-white text-black">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6 border-b">
        <h1 className="text-xl tracking-widest font-semibold">
          GRUPO ANDULKA
        </h1>
      </header>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center bg-gray-200">
        <h2 className="text-4xl">Arquitectura que construye identidad</h2>
      </section>

      {/* PROYECTOS */}
      <section className="px-10 py-24">
        <h3 className="text-2xl mb-10">Proyectos</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} onClick={() => setActive(i)} className="cursor-pointer">
              <img
                src={`/proyecto${i}.jpg`}
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>

          <img
            src={`/proyecto${active}.jpg`}
            className="max-h-full max-w-full"
          />
        </div>
      )}

    </div>
  );
}