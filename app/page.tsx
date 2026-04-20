"use client";

import { useState, useEffect } from "react";

export default function AndulkaSite() {
  const [active, setActive] = useState<number | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(true);

  const [startX, setStartX] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);

  const proyectos = [
    {
      id: 1,
      nombre: "VALO",
      imagenes: ["/valo1.jpg","/valo2.jpg","/valo3.jpg","/valo4.jpg","/valo5.jpg"],
    },
    {
      id: 2,
      nombre: "CEBALLOS & CEBALLOS",
      imagenes: ["/ceballos1.jpg","/ceballos2.jpg","/ceballos3.jpg","/ceballos4.jpg","/ceballos5.jpg"],
    },
    {
      id: 3,
      nombre: "PROYECTO 3",
      imagenes: ["/proyecto3.jpg"],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const proyectoActivo = proyectos.find((p) => p.id === active);

  // SWIPE REAL
  const handleStart = (x: number) => {
    setStartX(x);
  };

  const handleMove = (x: number) => {
    if (startX === null) return;
    setDragX(x - startX);
  };

  const handleEnd = () => {
    if (startX === null || !proyectoActivo) return;

    if (dragX > 80) {
      setCurrentImg((prev) =>
        prev === 0 ? proyectoActivo.imagenes.length - 1 : prev - 1
      );
    }

    if (dragX < -80) {
      setCurrentImg((prev) =>
        prev === proyectoActivo.imagenes.length - 1 ? 0 : prev + 1
      );
    }

    setStartX(null);
    setDragX(0);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <h1 className="text-white text-2xl tracking-[0.6em] animate-fadeIn">
          GRUPO ANDULKA
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">

      {/* HEADER APPLE */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 text-white">

        <div className="relative group cursor-pointer">
          <h1 className="tracking-widest text-sm transition-all duration-500 group-hover:tracking-[0.3em]">
            GRUPO ANDULKA
          </h1>

          <img
            src="/PAJARITO1.png"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-6 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-500"
          />
        </div>

        <nav className="flex gap-3">
          {["proyectos","nosotros","contacto"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section className="h-screen relative flex items-end text-white overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative p-16 max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-light">
            Arquitectura que transforma espacios
          </h2>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="px-10 py-32">
        <h3 className="text-2xl mb-6">Nosotros</h3>
        <p className="max-w-2xl text-gray-600">
          Grupo Andulka desarrolla proyectos de arquitectura corporativa con una mirada contemporánea,
          combinando diseño, identidad y funcionalidad.
        </p>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="px-10 py-24">
        <h3 className="text-2xl mb-16">Proyectos</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {proyectos.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setActive(p.id);
                setCurrentImg(0);
              }}
              className="cursor-pointer group relative overflow-hidden rounded-2xl"
            >
              <img
                src={p.imagenes[0]}
                className="h-80 w-full object-cover group-hover:scale-105 transition rounded-2xl"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-6 rounded-2xl">
                <div className="flex justify-between w-full items-end">
                  <h4 className="text-white">{p.nombre}</h4>

                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition text-white text-sm">
                    VER PROYECTO
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL SWIPE REAL */}
      {active && proyectoActivo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center overflow-hidden"
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >

          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-8 text-white text-3xl z-50"
          >
            ✕
          </button>

          {/* SLIDER */}
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentImg * 100}% + ${dragX}px))`,
            }}
          >
            {proyectoActivo.imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-screen max-h-[80vh] object-contain flex-shrink-0"
              />
            ))}
          </div>

        </div>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="px-10 py-32 bg-black text-white">
        <h3 className="text-2xl mb-6">Contacto</h3>
        <p className="opacity-70 mb-8">info@grupoandulka.com</p>
      </section>

    </div>
  );
}