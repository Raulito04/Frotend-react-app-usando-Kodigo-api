import { useEffect, useState } from "react";
import BootcampCard from "../components/BootcampCard"; 
import { fetchBootcampsWithFallback } from "../services/KodigoApi"; 
import { bootcampImagesByName, fallbackBootcampImage } from "../assets/bootcampImages";

export default function Dashboard() {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // Llamada a la API (con token JWT, porque es dashboard protegido)
        const rows = await fetchBootcampsWithFallback();

        //  Agregamos imágenes según el nombre o una de fallback
        const withImages = rows.map((b) => ({
          ...b,
          imageUrl: bootcampImagesByName[b.name] || fallbackBootcampImage,
        }));

        if (!mounted) return;
        setBootcamps(withImages);
      } catch (err) {
        console.error("Error cargando bootcamps", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
 <main>
  {/* HEADER DEL DASHBOARD */}
  <section className="dashboard-hero py-5 bg-gray-100">
    <div className="container">
      <h1 className="text-center mb-3"> Bienvenido a tu Dashboard</h1>
      <p className="text-center text-secondary mb-4">
        Explora todos los bootcamps disponibles en Kodigo. Aquí tienes un resumen general.
      </p>

      {/* RESUMEN DE BOOTCAMPS */}
      {bootcamps.length > 0 && (
        <div className="row text-center">
          
          {/* Total de Bootcamps */}
          <div className="col-6 col-md-3 mb-3">
            <div className="card bg-info.bg-gradient text-white shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">Total de Bootcamps</p>
                <h3 className="card-title">{bootcamps.length}</h3>
              </div>
            </div>
          </div>

          {/* Duración Promedio */}
          <div className="col-6 col-md-3 mb-3">
            <div className="card bg-info.bg-gradient text-white shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">Duración Promedio (meses)</p>
                <h3 className="card-title">
                  {Math.round(
                    bootcamps.reduce((sum, b) => sum + (b.duration || 6), 0) / bootcamps.length
                  )}
                </h3>
              </div>
            </div>
          </div>

          {/* Requisito */}
          <div className="col-6 col-md-3 mb-3">
            <div className="card bg-info.bg-gradient text-white shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">Requisito</p>
                <h3 className="card-title">Bachillerato</h3>
              </div>
            </div>
          </div>

          {/* Estudiantes Totales */}
          <div className="col-6 col-md-3 mb-3">
            <div className="card bg-info.bg-gradient text-white shadow-sm h-100">
              <div className="card-body">
                <p className="card-text">Estudiantes Totales</p>
                <h3 className="card-title">
                  {bootcamps.reduce((sum, b) => sum + (b.studentsCount || 120), 0)}
                </h3>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  </section>


      {/* CATÁLOGO DE BOOTCAMPS */}
      <section className="catalog">
        <div className="container">
          <div className="catalog__head">
            <div>
              <h2 className="section__title">Tus Bootcamps</h2>
              <p className="section__subtitle">Explora los detalles de cada programa.</p>
            </div>
            {!loading && <span className="chip">{bootcamps.length} programas</span>}
          </div>

          {loading ? (
            // 📌 Loading con skeleton
            <div className="skeleton__grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="skeleton__card" key={i} />
              ))}
            </div>
          ) : (
            //  Cards de bootcamps
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

      {/* FOOTER DEL DASHBOARD */}
      <footer className="footer">
        <div className="container footer__grid">
           <p>© {new Date().getFullYear()} Kodigo. Todos los derechos reservados.</p>
          <nav className="footer__links">
          </nav>
        </div>
      </footer>
    </main>
  );
}
