import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthState = {
  user: string | null;
  ready: boolean;
  login: (name: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const STORAGE_KEY = "nutrihierro.user";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setUser(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((name: string, password: string) => {
    const clean = name.trim();
    if (clean.length < 3) return { ok: false, error: "El nombre debe tener al menos 3 caracteres." };
    if (clean.length > 40) return { ok: false, error: "El nombre es demasiado largo." };
    if (password.length < 4) return { ok: false, error: "La contraseña debe tener al menos 4 caracteres." };
    try {
      localStorage.setItem(STORAGE_KEY, clean);
    } catch {
      /* ignore */
    }
    setUser(clean);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}