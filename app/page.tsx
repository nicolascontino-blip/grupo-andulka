"use client";

import React, { useState, useRef } from "react";

export default function AndulkaSite() {
  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState("Todos");
  const timeoutRef = useRef<any>(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  const proyectos = [
    { id: 1, nombre: "Oficina Central", tipo: "Oficinas", img: "/proyecto1.jpg" },
    { id: 2, nombre: "Local Comercial", tipo: "Locales", img: "/proyecto2.jpg" },
    { id: 3, nombre: "Casa Moderna", tipo: "Viviendas", img: "/1.jpeg" },
    { id: 4, nombre: "Workspace", tipo: "Oficinas", img: "/proyecto1.jpg" },
    { id: 5, nombre: "Tienda Urbana", tipo: "Locales", img: "/proyecto2.jpg" },
    { id: 6, nombre: "Casa Minimal", tipo: "Viviendas", img: "/1.jpeg" },
  ];

  const filtrados = categoria === "Todos"
    ? proyectos
    : proyectos.filter((p) => p.tipo === categoria);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-6 border-b relative">
        <h1 className="text-2xl font-bold tracking-tight relative group cursor-pointer">
          GRUPO ANDULKA
          <img src="/PAJARITO1.png" className="absolute left-0 -top-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-40 transition-all duration-700 w-10" />
        </h1>

        <nav className="space-x-6 text-sm flex items-center">
          <div
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="cursor-pointer font-medium">Proyectos</div>

            <div
              className={`absolute top-full left-0 mt-2 bg-white shadow-xl border rounded-xl p-4 w-44 transition-all duration-300 transform ${
                open ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <ul className="space-y-2">
                {["Todos", "Oficinas", "Locales", "Viviendas"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCategoria(item);
                      setOpen(false);
                      document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-gray-500 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })}
          >
            Nosotros
          </div>

          <div
            className="cursor-pointer"
            onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
          >
            Servicios
          </div>

          <div
            className="cursor-pointer"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contacto
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Arquitectura contemporánea con identidad
        </h2>
        <p className="mt-6 max-w-xl text-gray-600">
          Diseñamos espacios que combinan estética, funcionalidad y sostenibilidad.
        </p>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="px-8 py-20">
        <h3 className="text-3xl font-semibold mb-4">Proyectos</h3>
        <p className="text-gray-500 mb-8">Categoría: {categoria}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {filtrados.map((item) => (
            <div key={item.id} className="rounded-2xl overflow-hidden group cursor-pointer">
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{item.nombre}</h4>
                <p className="text-sm text-gray-500">{item.tipo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="px-8 py-20 bg-gray-50">
        <h3 className="text-3xl font-semibold mb-6">Nosotros</h3>
        <p className="text-gray-600 max-w-2xl">
          Grupo Andulka es un estudio de arquitectura enfocado en el diseño integral.
        </p>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-8 py-20">
        <h3 className="text-3xl font-semibold mb-6">Servicios</h3>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-8 py-20 bg-gray-100">
        <h3 className="text-3xl font-semibold mb-6">Contacto</h3>
        <p className="text-gray-600 mb-4">info@grupoandulka.com</p>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/5491155672356"
        target="_blank"
        className="fixed bottom-6 right-6 z-50"
      >
        <img src="/WAPP.png" className="w-16 h-16 object-contain" />
      </a>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t">
        © {new Date().getFullYear()} Grupo Andulka
      </footer>
    </div>
  );
}
