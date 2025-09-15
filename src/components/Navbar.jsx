import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: "1px solid var(--border)",
      background: "var(--surface)"
    }}>
      <div className="container" style={{
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0"
      }}>
        <Link to="/" style={{ fontWeight: 700, color: "var(--text)" }}>
          KodigoApp
        </Link>
        <div style={{ display:"flex", gap:"14px" }}>
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
