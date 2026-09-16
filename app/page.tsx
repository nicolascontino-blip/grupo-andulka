"use client";

import { useEffect, useRef, useState } from "react";

type Proyecto = {
  id: number;
  nombre: string;
  categoria: string;
  año: string;
  portada: string;
  imagenes: string[];
  descripcion: string;
  video?: string;
};

const proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "VALO",
    categoria: "Arquitectura Corporativa",
    año: "2025",
    portada: "/valo1.jpg",
    imagenes: [
      "/valo1.jpg", "/valo2.jpg", "/valo3.jpg", "/valo4.jpg", "/valo5.jpg",
      "/valo6.jpg", "/valo7.jpg", "/valo8.jpg", "/valo9.jpg",
    ],
    descripcion:
      "Arquitectura e interiorismo corporativo concebidos como una experiencia integral de trabajo, identidad y encuentro.",
  },
  {
    id: 2,
    nombre: "CEBALLOS & CEBALLOS",
    categoria: "Arquitectura Corporativa",
    año: "2022",
    portada: "/ceballos1.jpg",
    imagenes: [
      "/ceballos1.jpg", "/ceballos2.jpg", "/ceballos3.jpg", "/ceballos4.jpg", "/ceballos5.jpg",
      "/ceballos6.jpeg", "/ceballos7.jpeg", "/ceballos8.jpeg", "/ceballos9.jpeg",
    ],
    descripcion:
      "Una oficina donde madera, vidrio, iluminación y piezas de arte construyen una atmósfera cálida, sobria y contemporánea.",
  },
  {
    id: 3,
    nombre: "LA EUROPEA",
    categoria: "Arquitectura Corporativa",
    año: "2022",
    portada: "/europea6.jpg",
    imagenes: [
      "/europea6.jpg", "/europea1.jpg", "/europea2.jpg",
      "/europea3.png", "/europea4.jpg", "/europea5.jpg",
    ],
    descripcion:
      "Proyecto de interiorismo corporativo que articula espacios de trabajo, encuentro y exhibición a través del color, la materialidad y el diseño de equipamiento.",
    video: "/europea-video.mp4",
  },
  {
    id: 4,
    nombre: "SS SERVICIOS",
    categoria: "Arquitectura Corporativa",
    año: "",
    portada: "/ssservicios1.png",
    imagenes: ["/ssservicios1.png", "/ssservicios2.png"],
    descripcion:
      "Proyecto de arquitectura e interiorismo corporativo desarrollado a partir de una imagen contemporánea, funcional y coherente con la identidad de la empresa.",
  },
];

export default function AndulkaSite() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Proyecto | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active, menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openProject = (p: Proyecto) => {
    setActive(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
          *{box-sizing:border-box}
          body{margin:0;background:#f3f0eb}
          @keyframes intro {
            0%{opacity:0;letter-spacing:.45em}
            30%{opacity:1;letter-spacing:.28em}
            72%{opacity:1;letter-spacing:.28em}
            100%{opacity:0;letter-spacing:.38em}
          }
          .intro{
            position:fixed;inset:0;display:grid;place-items:center;
            background:#f3f0eb;color:#171717;font-family:'DM Sans',sans-serif;
          }
          .intro span{font-size:12px;font-weight:500;animation:intro 1.8s ease forwards}
        `}</style>
        <div className="intro"><span>GRUPO ANDULKA</span></div>
      </>
    );
  }

  if (active) {
    const index = proyectos.findIndex((p) => p.id === active.id);
    const next = proyectos[(index + 1) % proyectos.length];

    return (
      <>
        <GlobalStyles />
        <main className="project-page">
          <header className="project-header">
            <button className="text-button" onClick={() => setActive(null)}>← Volver</button>
            <button className="brand-button" onClick={() => setActive(null)}>GRUPO ANDULKA</button>
            <span className="project-year">{active.año}</span>
          </header>

          <section className="project-intro">
            <div>
              <p className="eyebrow">{active.categoria}</p>
              <h1>{active.nombre}</h1>
            </div>
            <p className="project-description">{active.descripcion}</p>
          </section>

          <section className="project-hero">
            <img src={active.portada} alt={active.nombre} />
          </section>

          {active.video && (
            <section className="project-video">
              <video autoPlay loop muted playsInline controls>
                <source src={active.video} type="video/mp4" />
              </video>
            </section>
          )}

          <section className="project-gallery">
            {active.imagenes.slice(1).map((src, i) => {
              const mode = i % 5;
              if (mode === 1 && active.imagenes[i + 2]) {
                return null;
              }
              if (mode === 2) {
                const prev = active.imagenes[i];
                return (
                  <div className="gallery-pair" key={`${src}-${i}`}>
                    <figure><img src={prev} alt="" loading="lazy" /></figure>
                    <figure><img src={src} alt="" loading="lazy" /></figure>
                  </div>
                );
              }
              return (
                <figure className={mode === 3 ? "gallery-wide inset" : "gallery-wide"} key={`${src}-${i}`}>
                  <img src={src} alt="" loading="lazy" />
                </figure>
              );
            })}
          </section>

          <section className="next-project" onClick={() => setActive(next)}>
            <p className="eyebrow">Siguiente proyecto</p>
            <div className="next-row">
              <h2>{next.nombre}</h2>
              <span>↗</span>
            </div>
            <div className="next-image">
              <img src={next.portada} alt={next.nombre} />
            </div>
          </section>

          <footer className="minimal-footer">
            <span>© {new Date().getFullYear()} Grupo Andulka</span>
            <span>Buenos Aires, Argentina</span>
          </footer>
        </main>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />

      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <nav className="desktop-nav">
          <a href="#proyectos">Proyectos</a>
          <a href="#estudio">Estudio</a>
        </nav>

        <a className="brand" href="#top">GRUPO ANDULKA</a>

        <a className="desktop-contact" href="#contacto">Contacto</a>
        <button className="menu-button" onClick={() => setMenuOpen(true)}>Menú</button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <span>GRUPO ANDULKA</span>
            <button onClick={() => setMenuOpen(false)}>Cerrar</button>
          </div>
          <nav>
            <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
            <a href="#estudio" onClick={() => setMenuOpen(false)}>Estudio</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </nav>
        </div>
      )}

      <main id="top">
        <section className="hero">
          <video autoPlay loop muted playsInline>
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <div className="hero-copy">
            <p>Arquitectura · Interiorismo · Workplace</p>
            <h1>Espacios que<br />transforman.</h1>
            <a href="#proyectos" className="hero-scroll">Ver proyectos ↓</a>
          </div>
        </section>

        <section id="proyectos" className="projects">
          <div className="projects-heading">
            <p className="eyebrow">Proyectos seleccionados</p>
            <h2>Arquitectura pensada<br />desde la experiencia.</h2>
          </div>

          {proyectos.map((p, i) => (
            <article
              key={p.id}
              className={`project-card project-card-${i + 1}`}
              onClick={() => openProject(p)}
            >
              <div className="project-cover">
                <img src={p.portada} alt={p.nombre} />
                <div className="project-cover-shade" />
                <div className="project-overlay">
                  <div>
                    <p>{p.categoria}</p>
                    <h3>{p.nombre}</h3>
                  </div>
                  <div className="project-meta">
                    <span>{p.año}</span>
                    <span>Ver proyecto ↗</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="estudio" className="studio">
          <p className="eyebrow">Grupo Andulka</p>
          <div className="studio-grid">
            <h2>Diseñamos espacios<br />para nuevas formas<br />de habitar y trabajar.</h2>
            <div className="studio-copy">
              <p>
                Somos un estudio de arquitectura con sede en Buenos Aires.
                Desarrollamos proyectos de arquitectura e interiorismo con una
                mirada contemporánea, combinando identidad, funcionalidad y materialidad.
              </p>
              <p>
                Entendemos cada proyecto como una oportunidad para transformar
                la experiencia cotidiana de quienes lo habitan.
              </p>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact">
          <p className="eyebrow">Contacto</p>
          <h2>Hablemos de<br />tu próximo proyecto.</h2>
          <a className="big-email" href="mailto:info@grupoandulka.com">
            info@grupoandulka.com ↗
          </a>
          <div className="contact-bottom">
            <div>
              <a href="https://instagram.com/grupoandulka/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://linkedin.com/company/grupo-andulka/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
            <span>Buenos Aires, Argentina</span>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/5491155672356"
        target="_blank"
        rel="noreferrer"
        className="whatsapp"
        aria-label="WhatsApp"
      >
        <img src="/WAPP.png" alt="" />
      </a>
    </>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

      :root{--paper:#f3f0eb;--ink:#151515;--line:rgba(21,21,21,.16)}
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'DM Sans',sans-serif;background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased}
      button,a{font:inherit}
      button{color:inherit}
      img{display:block;width:100%}
      a{color:inherit}

      .eyebrow{font-size:11px;letter-spacing:.16em;text-transform:uppercase}
      .site-header{position:fixed;z-index:1000;top:0;left:0;right:0;height:74px;padding:0 30px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;color:#fff;transition:.35s ease}
      .site-header.scrolled{height:62px;background:rgba(243,240,235,.92);backdrop-filter:blur(16px);color:var(--ink);border-bottom:1px solid var(--line)}
      .desktop-nav{display:flex;gap:28px}
      .desktop-nav a,.desktop-contact,.brand{text-decoration:none;font-size:12px}
      .brand{font-weight:500;letter-spacing:.22em}
      .desktop-contact{justify-self:end}
      .desktop-nav a,.desktop-contact{transition:opacity .2s}
      .desktop-nav a:hover,.desktop-contact:hover{opacity:.5}
      .menu-button{display:none;border:0;background:none}

      .hero{height:100svh;min-height:650px;position:relative;overflow:hidden;background:#111}
      .hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .hero-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,.05) 45%,rgba(0,0,0,.42))}
      .hero-copy{position:absolute;inset:0;padding:110px 30px 34px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff}
      .hero-copy>p{position:absolute;top:105px;left:30px;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
      .hero-copy h1{font-size:clamp(58px,10.8vw,170px);font-weight:300;letter-spacing:-.055em;line-height:.82}
      .hero-scroll{align-self:flex-end;margin-top:-22px;text-decoration:none;font-size:12px}

      .projects{padding:150px 30px 30px}
      .projects-heading{display:grid;grid-template-columns:1fr 2fr;margin-bottom:120px}
      .projects-heading h2{font-size:clamp(42px,6vw,92px);font-weight:300;line-height:.96;letter-spacing:-.045em}

      .project-card{cursor:pointer;margin-bottom:30px}
      .project-cover{position:relative;overflow:hidden;background:#ddd}
      .project-card-1 .project-cover{height:88vh;min-height:600px}
      .project-card-2{width:82%;margin-left:auto;margin-top:130px}
      .project-card-2 .project-cover{height:82vh;min-height:580px}
      .project-card-3{width:66%;margin-top:130px}
      .project-card-3 .project-cover{height:70vh;min-height:520px}
      .project-cover>img{height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
      .project-card:hover .project-cover>img{transform:scale(1.025)}
      .project-cover-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.48));transition:background .3s}
      .project-overlay{position:absolute;left:0;right:0;bottom:0;padding:30px;color:white;display:flex;justify-content:space-between;align-items:flex-end}
      .project-overlay p{font-size:10px;text-transform:uppercase;letter-spacing:.14em;margin-bottom:8px}
      .project-overlay h3{font-size:clamp(34px,5.2vw,82px);font-weight:300;line-height:.95;letter-spacing:-.045em}
      .project-meta{display:flex;gap:32px;font-size:11px}

      .studio{padding:190px 30px 180px;border-top:1px solid var(--line);margin-top:170px}
      .studio-grid{display:grid;grid-template-columns:1.5fr .7fr;gap:10vw;margin-top:70px}
      .studio h2{font-size:clamp(48px,7.2vw,108px);font-weight:300;line-height:.93;letter-spacing:-.05em}
      .studio-copy{padding-top:10px;max-width:470px}
      .studio-copy p{font-size:17px;line-height:1.65;font-weight:300}
      .studio-copy p+p{margin-top:28px}

      .contact{background:#171717;color:#f4f1ec;padding:120px 30px 34px;min-height:82vh;display:flex;flex-direction:column}
      .contact h2{font-size:clamp(55px,9vw,140px);font-weight:300;line-height:.88;letter-spacing:-.055em;margin-top:45px}
      .big-email{font-size:clamp(20px,3.2vw,50px);font-weight:300;text-decoration:none;margin-top:auto;padding:70px 0 30px;border-bottom:1px solid rgba(255,255,255,.25)}
      .contact-bottom{display:flex;justify-content:space-between;padding-top:26px;font-size:11px}
      .contact-bottom div{display:flex;gap:22px}
      .contact-bottom a{text-decoration:none}

      .whatsapp{position:fixed;z-index:800;right:24px;bottom:22px;width:48px;height:48px;transition:transform .25s}
      .whatsapp:hover{transform:scale(1.08)}
      .whatsapp img{width:100%;height:100%;object-fit:contain}

      .project-page{background:var(--paper);min-height:100vh}
      .project-header{height:72px;padding:0 30px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(243,240,235,.93);backdrop-filter:blur(16px);z-index:50}
      .text-button,.brand-button{border:0;background:none;cursor:pointer;font-size:11px}
      .brand-button{font-weight:500;letter-spacing:.22em}
      .project-year{justify-self:end;font-size:11px}
      .project-intro{padding:100px 30px 75px;display:grid;grid-template-columns:1.5fr .55fr;gap:10vw;align-items:end}
      .project-intro h1{font-size:clamp(58px,10vw,150px);font-weight:300;line-height:.85;letter-spacing:-.06em;margin-top:24px;max-width:1100px}
      .project-description{font-size:15px;line-height:1.65;font-weight:300;max-width:420px}
      .project-hero{height:92vh;min-height:620px;padding:0 30px}
      .project-hero img{height:100%;object-fit:cover}
      .project-video{padding:30px 30px 0}
      .project-video video{display:block;width:100%;max-height:92vh;object-fit:cover;background:#111}
      .project-gallery{padding:30px}
      .gallery-wide{margin:0 0 30px}
      .gallery-wide img{width:100%;max-height:92vh;object-fit:cover}
      .gallery-wide.inset{width:74%;margin:140px auto}
      .gallery-pair{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin:140px 0}
      .gallery-pair figure{height:72vh}
      .gallery-pair img{height:100%;object-fit:cover}
      .next-project{padding:180px 30px 30px;border-top:1px solid var(--line);cursor:pointer}
      .next-row{display:flex;justify-content:space-between;align-items:flex-end;margin:35px 0 70px}
      .next-row h2{font-size:clamp(54px,9vw,135px);font-weight:300;line-height:.9;letter-spacing:-.055em}
      .next-row span{font-size:40px;font-weight:300}
      .next-image{height:65vh;overflow:hidden}
      .next-image img{height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.16,1,.3,1)}
      .next-project:hover .next-image img{transform:scale(1.02)}
      .minimal-footer{display:flex;justify-content:space-between;padding:28px 30px;font-size:10px;border-top:1px solid var(--line);margin-top:30px}

      .mobile-menu{position:fixed;inset:0;background:var(--paper);z-index:2000;padding:22px 20px;display:flex;flex-direction:column}
      .mobile-menu-top{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.14em}
      .mobile-menu-top button{border:0;background:none}
      .mobile-menu nav{margin-top:auto;margin-bottom:50px;display:flex;flex-direction:column}
      .mobile-menu nav a{font-size:14vw;line-height:1.05;letter-spacing:-.05em;text-decoration:none;font-weight:300}

      @media(max-width:768px){
        .site-header{height:60px;padding:0 18px;display:flex;justify-content:space-between}
        .desktop-nav,.desktop-contact{display:none}
        .menu-button{display:block;color:inherit}
        .brand{font-size:10px}
        .hero{min-height:620px}
        .hero-copy{padding:90px 18px 22px}
        .hero-copy>p{top:88px;left:18px}
        .hero-copy h1{font-size:17vw;line-height:.86}
        .hero-scroll{margin-top:35px;align-self:flex-start}
        .projects{padding:95px 18px 18px}
        .projects-heading{display:block;margin-bottom:65px}
        .projects-heading h2{font-size:11vw;margin-top:25px}
        .project-card,.project-card-2,.project-card-3{width:100%;margin:0 0 18px}
        .project-card-1 .project-cover,.project-card-2 .project-cover,.project-card-3 .project-cover{height:72svh;min-height:520px}
        .project-overlay{padding:18px;display:block}
        .project-overlay h3{font-size:10vw}
        .project-meta{justify-content:space-between;margin-top:16px}
        .studio{padding:110px 18px 100px;margin-top:90px}
        .studio-grid{display:block;margin-top:42px}
        .studio h2{font-size:12vw}
        .studio-copy{margin-top:55px}
        .contact{padding:90px 18px 24px;min-height:78svh}
        .contact h2{font-size:14vw}
        .big-email{font-size:5vw}
        .contact-bottom{gap:25px;flex-direction:column}
        .project-header{height:60px;padding:0 18px}
        .brand-button{font-size:9px}
        .project-intro{padding:70px 18px 45px;display:block}
        .project-intro h1{font-size:15vw}
        .project-description{margin-top:45px}
        .project-hero{height:72svh;min-height:500px;padding:0 18px}
        .project-video{padding:18px 18px 0}
        .project-video video{max-height:72svh}
        .project-gallery{padding:18px}
        .gallery-wide{margin-bottom:18px}
        .gallery-wide.inset{width:100%;margin:70px 0}
        .gallery-pair{grid-template-columns:1fr;gap:18px;margin:70px 0}
        .gallery-pair figure{height:62svh}
        .next-project{padding:100px 18px 18px}
        .next-row{margin:25px 0 45px}
        .next-row h2{font-size:13vw}
        .next-image{height:55svh}
        .minimal-footer{padding:24px 18px}
        .whatsapp{right:16px;bottom:16px;width:44px;height:44px}
      }
    `}</style>
  );
}
