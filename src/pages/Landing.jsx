import { useEffect, useState } from "react";
import BootcampCard from "../components/BootcampCard";
import { fetchBootcampsWithFallback } from "../services/KodigoApi";
import { bootcampImagesByName, fallbackBootcampImage } from "../assets/bootcampImages";
import heroImg from "../assets/react.svg";

export default function Landing() {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const rows = await fetchBootcampsWithFallback();

      const withImages = rows.map((b) => ({
        ...b,
        imageUrl: bootcampImagesByName[b.name] || fallbackBootcampImage,
      }));

      if (!mounted) return;
      setBootcamps(withImages);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="badge">Nuevas convocatorias 2025</span>
            <h1 className="hero__title">
              Impulsa tu carrera con los <span>Kodigo Bootcamps</span>
            </h1>
            <p className="hero__subtitle">
              Aprende tecnologías en demanda con proyectos reales y mentoría personalizada.
            </p>

            <div className="hero__cta">
              <a href="#" className="btn btn--primary">Conocer programas</a>
              <a href="#" className="btn btn--ghost">Hablar con admisiones</a>
            </div>

            <p className="hero__note">
              * Si no has iniciado sesión, verás un catálogo de ejemplo.
            </p>

            <ul className="hero__features">
              <li>✔ Proyectos reales</li>
              <li>✔ Mentoría 1:1</li>
              <li>✔ Comunidad activa</li>
            </ul>
          </div>

          <div className="hero__media">
            <img src={heroImg} alt="Kodigo" />
          </div>
        </div>
        <div className="hero__blur hero__blur--1"></div>
        <div className="hero__blur hero__blur--2"></div>
      </section>

      {/* CATÁLOGO */}
      <section className="catalog">
        <div className="container">
          <div className="catalog__head">
            <div>
              <h2 className="section__title">Bootcamps disponibles</h2>
              <p className="section__subtitle">Explora los programas y sus tecnologías.</p>
            </div>
            {!loading && <span className="chip">{bootcamps.length} programas</span>}
          </div>

          {loading ? (
            <div className="skeleton__grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="skeleton__card" key={i} />
              ))}
            </div>
          ) : (
            <div className="cards__grid">
              {bootcamps.map((b) => (
                <BootcampCard
                  key={b.id || b._id || b.name}
                  name={b.name}
                  description={b.description}
                  technologies={b.technologies}
                  imageUrl={b.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__grid">
          <p>© {new Date().getFullYear()} Kodigo. Todos los derechos reservados.</p>
          <nav className="footer__links">
            <a href="#">Inicio</a>
            <a href="#">Contacto</a>
            <a href="#">Soporte</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
