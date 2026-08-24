import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartLogo } from "@/components/HeartLogo";
import heroFoods from "@/assets/hero-foods.jpg";
import { HeartPulse, Sparkles } from "lucide-react";

export function LoginScreen() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
      <img
        src={heroFoods}
        alt=""
        aria-hidden
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full scale-110 animate-drift object-cover blur-2xl"
      />
      <div className="absolute inset-0 bg-background/75" />
      <div className="absolute -left-24 top-0 h-80 w-80 animate-float rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-96 w-96 animate-float rounded-full bg-leaf/20 blur-3xl [animation-delay:2s]" />

      <div className="relative w-full max-w-md animate-scale-in glass-card glow-border p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <HeartLogo className="h-24 w-24 animate-bob" rings />
          <p className="mt-4 font-display text-4xl font-semibold aurora-text">NutriHierro</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Salud · Hierro · Energía
          </p>
        </div>

        <div className="mt-8 animate-fade-up">
          <h1 className="font-display text-2xl font-semibold">Inicia sesión</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa tu nombre y una contraseña para acceder al medidor de anemia y al calendario
            semanal de comidas.
          </p>
        </div>

          <form
            className="mt-6 space-y-4 animate-fade-up [animation-delay:120ms]"
            onSubmit={(e) => {
              e.preventDefault();
              const res = login(name, password);
              if (!res.ok) setError(res.error ?? "Datos inválidos");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                maxLength={40}
                autoComplete="username"
                placeholder="Ana Pérez"
                className="h-11 rounded-xl bg-card/70"
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                maxLength={64}
                autoComplete="current-password"
                placeholder="••••••"
                className="h-11 rounded-xl bg-card/70"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
              />
            </div>
            {error ? <p className="animate-pop text-sm text-destructive">{error}</p> : null}
            <Button
              type="submit"
              className="h-11 w-full rounded-xl shine gradient-iron text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-[1.02]"
            >
              <HeartPulse className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Acceso demostrativo: la sesión se guarda solo en este dispositivo.
        </p>
      </div>
    </div>
  );
}