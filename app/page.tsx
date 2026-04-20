"use client";

import { useState, useEffect } from "react";

export default function AndulkaSite() {
  const [active, setActive] = useState<number | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(true);

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

  // CAMBIO DE IMAGEN
  const nextImage = () => {
    if (!proyectoActivo) return;
    setCurrentImg((prev) =>
      prev === proyectoActivo.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!proyectoActivo) return;
    setCurrentImg((prev) =>
      prev === 0 ? proyectoActivo.imagenes.length - 1 : prev - 1
    );
  };

  // INTRO
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <h1 className="text-white text-4xl md:text-6xl tracking-[0.6em] animate-fadeIn">
          GRUPO ANDULKA
        </h1>

        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
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

        <h1 className="tracking-widest text-sm">
          GRUPO ANDULKA
        </h1>

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
          <source src="/hero.mp4" />
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
          Grupo Andulka desarrolla proyectos de arquitectura corporativa con foco en identidad,
          funcionalidad y diseño contemporáneo.
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

      {/* MODAL NUEVO */}
      {active && proyectoActivo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

          {/* CERRAR */}
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-8 text-white text-3xl z-50"
          >
            ✕
          </button>

          {/* CLICK IZQUIERDA */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
            onClick={prevImage}
          />

          {/* CLICK DERECHA */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
            onClick={nextImage}
          />

          {/* IMAGEN CON ANIMACIÓN */}
          <img
            key={currentImg}
            src={proyectoActivo.imagenes[currentImg]}
            className="max-h-[80vh] max-w-[80vw] object-contain rounded-xl animate-fadeImage"
          />

          {/* BOTONES VISUALES */}
          <div className="absolute bottom-10 flex gap-6">

            <button
              onClick={prevImage}
              className="text-white px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition"
            >
              ←
            </button>

            <button
              onClick={nextImage}
              className="text-white px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition"
            >
              →
            </button>

          </div>

          {/* ANIMACIÓN */}
          <style jsx>{`
            @keyframes fadeImage {
              0% { opacity: 0; transform: scale(0.97); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-fadeImage {
              animation: fadeImage 0.4s ease;
            }
          `}</style>

        </div>
      )}

      {/* CONTACTO */}
      <section id="contacto" className="px-10 py-32 bg-black text-white">
        <h3 className="text-2xl mb-6">Contacto</h3>

        <p className="opacity-70 mb-8">info@grupoandulka.com</p>

        <div className="flex gap-8">
          <a href="https://instagram.com/grupoandulka/" target="_blank" className="flex items-center gap-2 hover:opacity-60">
            <span>Instagram</span>
            <img src="/instagram.png" className="w-5 h-5 mix-blend-lighten" />
          </a>

          <a href="https://linkedin.com/company/grupo-andulka/" target="_blank" className="flex items-center gap-2 hover:opacity-60">
            <span>LinkedIn</span>
            <img src="/linkedin.png" className="w-5 h-5 mix-blend-lighten" />
          </a>
        </div>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/5491155672356"
        target="_blank"
        className="fixed bottom-6 right-6 z-50"
      >
        <img
          src="/WAPP.png"
          className="w-14 h-14 hover:scale-110 transition"
        />
      </a>

    </div>
  );
}