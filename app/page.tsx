"use client";

import { useState, useEffect, useRef } from "react";

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

  // 🔥 NAVEGACIÓN TECLADO (FIX REAL)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (active === null) return;

      if (e.key === "ArrowRight" || e.code === "Space") {
        e.preventDefault();
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      }

      if (e.key === "Escape") {
        setActive(null);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [active, currentImg]);

  // 🔥 HOOK ANIMACIÓN
  const useFadeIn = () => {
    const ref = useRef<any>(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("show");
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    return ref;
  };

  const heroRef = useFadeIn();
  const nosotrosRef = useFadeIn();
  const proyectosRef = useFadeIn();
  const contactoRef = useFadeIn();

  // INTRO
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <h1 className="text-white text-4xl md:text-6xl tracking-[0.6em] font-medium animate-fadeIn">
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
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 md:py-6 z-50 text-white">
        <div className="relative group cursor-pointer">
          <h1 className="tracking-[0.3em] text-xs md:text-sm font-medium transition-all duration-500 group-hover:tracking-[0.45em]">
            GRUPO ANDULKA
          </h1>

          <img
            src="/PAJARITO1.png"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-5 md:w-6 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-500 pointer-events-none"
          />
        </div>

        <nav className="flex gap-2 md:gap-3 text-xs md:text-sm">
          {["proyectos","nosotros","contacto"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition font-medium tracking-wide"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="fade-section h-screen relative flex items-end text-white overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/hero.mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative p-6 md:p-16 max-w-3xl">
          <h2 className="text-3xl md:text-7xl leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Arquitectura que transforma espacios
          </h2>
        </div>
      </section>

      {/* NOSOTROS */}
      <section ref={nosotrosRef} id="nosotros" className="fade-section px-6 md:px-10 py-20 md:py-32">
        <h3 className="text-xl md:text-2xl mb-6 font-medium tracking-wide">Nosotros</h3>
        <p className="max-w-2xl text-gray-600 text-sm md:text-base leading-relaxed">
          Grupo Andulka desarrolla proyectos de arquitectura corporativa con foco en identidad,
          funcionalidad y diseño contemporáneo.
        </p>
      </section>

      {/* PROYECTOS */}
      <section ref={proyectosRef} id="proyectos" className="fade-section px-6 md:px-10 py-20 md:py-24">
        <h3 className="text-xl md:text-2xl mb-12 md:mb-16 font-medium tracking-wide">Proyectos</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
                className="h-64 md:h-80 w-full object-cover group-hover:scale-105 transition rounded-2xl"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-4 md:p-6 rounded-2xl">
                <div className="flex justify-between w-full items-end text-sm md:text-base">
                  <h4 className="text-white font-medium tracking-wide">{p.nombre}</h4>

                  <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition text-white text-xs md:text-sm font-medium">
                    VER PROYECTO
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {active && proyectoActivo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button onClick={() => setActive(null)} className="absolute top-6 right-6 md:right-8 text-white text-2xl md:text-3xl z-50">✕</button>

          <div className="absolute left-0 w-1/2 h-full" onClick={prevImage}/>
          <div className="absolute right-0 w-1/2 h-full" onClick={nextImage}/>

          <img
            key={currentImg}
            src={proyectoActivo.imagenes[currentImg]}
            className="max-h-[70vh] md:max-h-[80vh] max-w-[90vw] md:max-w-[80vw] object-contain rounded-xl animate-fadeImage"
          />

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
      <section ref={contactoRef} id="contacto" className="fade-section px-6 md:px-10 py-24 md:py-32 bg-black text-white">
        <h3 className="text-xl md:text-2xl mb-6 font-medium tracking-wide">Contacto</h3>

        <p className="opacity-70 mb-8 text-sm md:text-base leading-relaxed">
          info@grupoandulka.com
        </p>

        <div className="flex gap-6 md:gap-8 text-sm">
          <a href="https://instagram.com/grupoandulka/" target="_blank" className="flex items-center gap-2 hover:opacity-60">
            <span>Instagram</span>
            <img src="/instagram.png" className="w-4 md:w-5 mix-blend-lighten" />
          </a>

          <a href="https://linkedin.com/company/grupo-andulka/" target="_blank" className="flex items-center gap-2 hover:opacity-60">
            <span>LinkedIn</span>
            <img src="/linkedin.png" className="w-4 md:w-5 mix-blend-lighten" />
          </a>
        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me/5491155672356" target="_blank" className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
        <img src="/WAPP.png" className="w-12 md:w-14 hover:scale-110 transition" />
      </a>

      {/* ANIMACIÓN */}
    

    </div>
  );
}