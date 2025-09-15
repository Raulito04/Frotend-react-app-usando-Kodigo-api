import { MOCK_BOOTCAMPS } from "../mocks/bootcamps.mock";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const FORCE_MOCK = import.meta.env.VITE_FORCE_MOCK === "true";

// valida que tenga forma de JWT (tres partes base64url)
const isLikelyJwt = (t) => /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(t || "");

export const fetchBootcampsWithFallback = async () => {
  // si forzamos mock, nunca hacemos fetch → cero 401
  if (FORCE_MOCK) return MOCK_BOOTCAMPS;

  const token = (localStorage.getItem("token") || "").trim();

  // si no parece JWT, usa mock y limpia basura
  if (!isLikelyJwt(token)) {
    if (token) localStorage.removeItem("token");
    return MOCK_BOOTCAMPS;
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/bootcamps/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const rows = Array.isArray(data) ? data : data?.bootcamps || [];
    return rows.length ? rows : MOCK_BOOTCAMPS;
  } catch {
    return MOCK_BOOTCAMPS;
  }
};
