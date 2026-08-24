import { useEffect, useState } from "react";
import { HeartLogo } from "@/components/HeartLogo";

const mensajes = [
  "Preparando tu espacio saludable…",
  "Cargando recetas ricas en hierro…",
  "Ubicando centros de salud cercanos…",
  "Todo listo, ¡vamos!",
];

export function LoadingScreen({ name }: { name?: string | null }) {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPaso((p) => Math.min(p + 1, mensajes.length - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 animate-float rounded-full bg-leaf/20 blur-3xl [animation-delay:2s]" />
      <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_60%)]" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <HeartLogo className="h-28 w-28 animate-bob" rings />
        <p className="mt-8 font-display text-4xl font-semibold aurora-text">NutriHierro</p>
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Salud · Hierro · Energía
        </p>

        {name ? (
          <p className="mt-6 animate-fade-in text-lg text-foreground">
            Hola, <span className="font-semibold text-primary">{name}</span>
          </p>
        ) : null}

        <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full gradient-iron transition-all duration-1000 ease-out"
            style={{ width: `${((paso + 1) / mensajes.length) * 100}%` }}
          />
        </div>
        <p key={paso} className="mt-4 animate-fade-in text-sm text-muted-foreground">
          {mensajes[paso]}
        </p>
      </div>
    </div>
  );
}
