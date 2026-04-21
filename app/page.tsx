"use client";

import { useState, useEffect } from "react";

export default function AndulkaSite() {
  const [active, setActive] = useState<number | null>(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const proyectos = [
    {
      id: 1,
      nombre: "VALO",
      categoria: "Arquitectura Corporativa",
      año: "2024",
      imagenes: ["/valo1.jpg","/valo2.jpg","/valo3.jpg","/valo4.jpg","/valo5.jpg"],
    },
    {
      id: 2,
      nombre: "CEBALLOS & CEBALLOS",
      categoria: "Interiorismo Comercial",
      año: "2024",
      imagenes: ["/ceballos1.jpg","/ceballos2.jpg","/ceballos3.jpg","/ceballos4.jpg","/ceballos5.jpg"],
    },
    {
      id: 3,
      nombre: "PROYECTO 3",
      categoria: "Diseño de Espacios",
      año: "2023",
      imagenes: ["/proyecto3.jpg"],
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const proyectoActivo = proyectos.find((p) => p.id === active);

  const nextImage = () => {
    if (!proyectoActivo) return;
    setCurrentImg((p) => (p === proyectoActivo.imagenes.length - 1 ? 0 : p + 1));
  };
  const prevImage = () => {
    if (!proyectoActivo) return;
    setCurrentImg((p) => (p === 0 ? proyectoActivo.imagenes.length - 1 : p - 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "ArrowRight" || e.code === "Space") { e.preventDefault(); nextImage(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prevImage(); }
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, currentImg]);

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes fadeIn { from{opacity:0}to{opacity:1} }
          .intro { animation: fadeIn 1s ease forwards; }
        `}</style>
        <div className="intro" style={{ fontFamily:"'DM Sans',sans-serif", position:"fixed", inset:0, background:"#F9F7F5", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
          <p style={{ fontSize:"13px", fontWeight:400, letterSpacing:"0.28em", color:"#1a1a1a", textTransform:"uppercase" }}>
            GRUPO ANDULKA
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:#F9F7F5;color:#1a1a1a;-webkit-font-smoothing:antialiased}

        .site-header{
          position:fixed;top:0;left:0;right:0;z-index:900;
          display:flex;align-items:center;justify-content:space-between;
          padding:22px 32px;
          transition:background 0.4s,backdrop-filter 0.4s,border-color 0.4s;
        }
        .site-header.scrolled{
          background:rgba(249,247,245,0.9);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(26,26,26,0.08);
        }
        .header-logo{
          position:absolute;left:50%;transform:translateX(-50%);
          font-size:13px;font-weight:500;letter-spacing:0.22em;
          text-decoration:none;transition:color 0.3s;
        }
        .nav-link{
          font-size:13px;font-weight:400;text-decoration:none;
          letter-spacing:0.01em;transition:opacity 0.25s;
        }
        .nav-link:hover{opacity:0.5}

        .hero{position:relative;width:100%;height:100vh;overflow:hidden;background:#111}
        .hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.78}
        .hero-text{
          position:absolute;inset:0;
          display:flex;flex-direction:column;justify-content:space-between;
          padding:5.7rem 2.4rem 2.4rem;
        }
        .hero-h1{
          font-size:clamp(52px,10.5vw,168px);
          font-weight:400;line-height:0.93;
          color:white;letter-spacing:-0.02em;
        }
        .hero-bottom{display:flex;justify-content:space-between;align-items:flex-end}
        .hero-pill{
          display:inline-flex;align-items:center;gap:8px;
          padding:14px 26px;
          border:1px solid rgba(255,255,255,0.55);
          border-radius:999px;
          font-size:14px;font-weight:400;color:white;
          cursor:pointer;text-decoration:none;white-space:nowrap;
          margin-bottom:6px;
          transition:background 0.25s,color 0.25s,border-color 0.25s;
        }
        .hero-pill:hover{background:white;color:#1a1a1a;border-color:white}

        .section{padding:100px 32px;max-width:1400px;margin:0 auto}
        .section-label{font-size:11px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:#999;margin-bottom:18px}
        .section-title{font-size:clamp(36px,5vw,72px);font-weight:400;line-height:1.02;letter-spacing:-0.02em}

        .grid-proyectos{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-top:56px}
        .p-item{cursor:pointer;overflow:hidden;border-radius:6px;background:#e8e4de}
        .p-item:nth-child(1){grid-column:span 7}
        .p-item:nth-child(2){grid-column:span 5}
        .p-item:nth-child(3){grid-column:span 5}
        .p-imgwrap{overflow:hidden;aspect-ratio:4/3}
        .p-item:nth-child(1) .p-imgwrap{aspect-ratio:16/10}
        .p-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.7s cubic-bezier(0.16,1,0.3,1)}
        .p-item:hover .p-img{transform:scale(1.04)}
        .p-info{display:flex;justify-content:space-between;align-items:flex-end;padding:12px 14px 14px;background:#F9F7F5}
        .p-nombre{font-size:13px;font-weight:400}
        .p-meta{font-size:12px;color:#999}

        .nosotros-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-top:56px}
        .nosotros-body{font-size:18px;font-weight:300;line-height:1.75;color:#444}
        .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px 32px;margin-top:0}
        .stat-num{font-size:clamp(40px,5vw,64px);font-weight:300;line-height:1;letter-spacing:-0.02em}
        .stat-label{font-size:12px;color:#999;margin-top:6px;letter-spacing:0.04em}

        .divider{height:1px;background:rgba(26,26,26,0.1);margin:0 32px}

        .contacto-email{
          font-size:clamp(24px,4.5vw,60px);font-weight:400;letter-spacing:-0.02em;
          color:#1a1a1a;text-decoration:none;display:inline-block;
          border-bottom:1.5px solid rgba(26,26,26,0.25);padding-bottom:3px;
          transition:border-color 0.3s;
        }
        .contacto-email:hover{border-color:#1a1a1a}
        .social-link{
          font-size:12px;font-weight:400;color:#999;text-decoration:none;
          letter-spacing:0.12em;text-transform:uppercase;
          border-bottom:1px solid transparent;padding-bottom:2px;
          transition:color 0.25s,border-color 0.25s;
        }
        .social-link:hover{color:#1a1a1a;border-color:#1a1a1a}

        .site-footer{
          border-top:1px solid rgba(26,26,26,0.1);
          padding:28px 32px;
          display:flex;justify-content:space-between;align-items:center;
        }
        .footer-copy{font-size:12px;color:#aaa}
        .footer-brand{font-size:12px;letter-spacing:0.18em;color:#bbb;text-transform:uppercase}

        .modal-bg{position:fixed;inset:0;background:rgba(8,8,8,0.97);z-index:9998;display:flex;align-items:center;justify-content:center}
        .modal-bar{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:22px 32px}
        .modal-title{font-size:14px;font-weight:400;color:white;letter-spacing:0.04em}
        .modal-counter{font-size:12px;color:rgba(255,255,255,0.4);margin-top:3px}
        .modal-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.55);font-size:22px;transition:color 0.2s;line-height:1}
        .modal-close:hover{color:white}
        .modal-img{max-height:80vh;max-width:88vw;object-fit:contain;animation:fadeUp 0.3s ease forwards}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .modal-arrows{position:absolute;bottom:32px;right:32px;display:flex;gap:10px}
        .modal-arrow{background:none;border:1px solid rgba(255,255,255,0.2);color:white;cursor:pointer;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-size:16px;transition:border-color 0.2s,background 0.2s}
        .modal-arrow:hover{border-color:white;background:rgba(255,255,255,0.06)}
        .modal-zone{position:absolute;top:0;height:100%;width:50%}
        .modal-zone-l{left:0;cursor:w-resize}
        .modal-zone-r{right:0;cursor:e-resize}

        .wapp-float{position:fixed;bottom:28px;right:28px;z-index:500;transition:transform 0.3s}
        .wapp-float:hover{transform:scale(1.1)}

        @media(max-width:768px){
          .site-header{padding:18px 20px}
          .hero-text{padding:5rem 20px 20px}
          .section{padding:72px 20px}
          .divider{margin:0 20px}
          .nosotros-grid{grid-template-columns:1fr;gap:40px}
          .grid-proyectos{grid-template-columns:1fr;gap:14px}
          .p-item:nth-child(n){grid-column:span 1}
          .site-footer{padding:24px 20px;flex-direction:column;gap:8px;text-align:center}
        }
      `}</style>

      {/* HEADER */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <nav style={{ display:"flex", gap:"32px" }}>
          <a href="#proyectos" className="nav-link" style={{ color: scrolled ? "#1a1a1a" : "white" }}>Proyectos</a>
          <a href="#nosotros"  className="nav-link" style={{ color: scrolled ? "#1a1a1a" : "white" }}>Nosotros</a>
        </nav>

        <a href="#" className="header-logo" style={{ color: scrolled ? "#1a1a1a" : "white" }}>
          GRUPO ANDULKA
        </a>

        <a href="#contacto" className="nav-link" style={{ color: scrolled ? "#1a1a1a" : "white" }}>
          Contacto
        </a>
      </header>

      {/* HERO */}
      <section className="hero">
        <video autoPlay loop muted playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-text">
          <div>
            <h1 className="hero-h1">Creamos<br />espacios</h1>
          </div>
          <div className="hero-bottom">
            <h1 className="hero-h1">que<br />transforman</h1>
            <a href="#proyectos" className="hero-pill">Ver proyectos ↗</a>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <div id="proyectos" className="section">
        <p className="section-label">Proyectos</p>
        <h2 className="section-title">Nuestro trabajo</h2>
        <div className="grid-proyectos">
          {proyectos.map((p) => (
            <div key={p.id} className="p-item" onClick={() => { setActive(p.id); setCurrentImg(0); }}>
              <div className="p-imgwrap">
                <img src={p.imagenes[0]} className="p-img" alt={p.nombre} />
              </div>
              <div className="p-info">
                <span className="p-nombre">{p.nombre}</span>
                <span className="p-meta">{p.categoria} · {p.año}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* NOSOTROS */}
      <div id="nosotros" className="section">
        <p className="section-label">Estudio</p>
        <h2 className="section-title">Sobre nosotros</h2>
        <div className="nosotros-grid">
          <p className="nosotros-body">
            Grupo Andulka es un estudio de arquitectura corporativa con sede en Buenos Aires.
            Desarrollamos proyectos de arquitectura e interiorismo con foco en identidad,
            funcionalidad y diseño contemporáneo.
            <br /><br />
            Creemos que cada espacio tiene el potencial de transformar la forma en que las
            personas trabajan, crean y se relacionan.
          </p>
          <div className="stats-grid">
            {[["15+","Años de trayectoria"],["80+","Proyectos realizados"],["12","Clientes activos"],["3","Países"]].map(([n,l]) => (
              <div key={l}>
                <p className="stat-num">{n}</p>
                <p className="stat-label">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* CONTACTO */}
      <div id="contacto" className="section">
        <p className="section-label">Contacto</p>
        <a href="mailto:info@grupoandulka.com" className="contacto-email">
          info@grupoandulka.com
        </a>
        <div style={{ display:"flex", gap:"28px", marginTop:"48px" }}>
          <a href="https://instagram.com/grupoandulka/" target="_blank" className="social-link">Instagram ↗</a>
          <a href="https://linkedin.com/company/grupo-andulka/" target="_blank" className="social-link">LinkedIn ↗</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <span className="footer-copy">© {new Date().getFullYear()} Grupo Andulka</span>
        <span className="footer-brand">Arquitectura Corporativa · Buenos Aires</span>
      </footer>

      {/* MODAL */}
      {active && proyectoActivo && (
        <div className="modal-bg" onClick={() => setActive(null)}>
          <div className="modal-bar" onClick={e => e.stopPropagation()}>
            <div>
              <p className="modal-title">{proyectoActivo.nombre}</p>
              <p className="modal-counter">{currentImg + 1} / {proyectoActivo.imagenes.length}</p>
            </div>
            <button className="modal-close" onClick={() => setActive(null)}>✕</button>
          </div>
          <div className="modal-zone modal-zone-l" onClick={e => { e.stopPropagation(); prevImage(); }} />
          <div className="modal-zone modal-zone-r" onClick={e => { e.stopPropagation(); nextImage(); }} />
          <img key={currentImg} src={proyectoActivo.imagenes[currentImg]} className="modal-img" alt="" onClick={e => e.stopPropagation()} />
          {proyectoActivo.imagenes.length > 1 && (
            <div className="modal-arrows" onClick={e => e.stopPropagation()}>
              <button className="modal-arrow" onClick={prevImage}>←</button>
              <button className="modal-arrow" onClick={nextImage}>→</button>
            </div>
          )}
        </div>
      )}

      {/* WHATSAPP */}
      <a href="https://wa.me/5491155672356" target="_blank" className="wapp-float">
        <img src="/WAPP.png" style={{ width:"52px" }} alt="WhatsApp" />
      </a>
    </>
  );
}
