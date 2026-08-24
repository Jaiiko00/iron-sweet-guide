import { useEffect, useState } from "react";
import bgPattern from "@/assets/bg-pattern.jpg";

export function AppBackground() {
  const [p, setP] = useState({ x: 50, y: 50 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setP({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* imagen de fondo muy transparente */}
      <img
        src={bgPattern}
        alt=""
        width={1920}
        height={1280}
        className="h-full w-full animate-drift object-cover opacity-[0.12]"
        style={{ transform: `translate3d(${(p.x - 50) / 30}%, ${(p.y - 50) / 30}%, 0) scale(1.06)` }}
      />
      {/* velo suave para mantener el texto legible */}
      <div className="absolute inset-0 bg-background/45" />
      {/* halo cálido que sigue al cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(28rem circle at ${p.x}% ${p.y}%, oklch(0.72 0.2 32 / 0.10), transparent 70%)`,
        }}
      />
      <div className="absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 top-1/3 h-96 w-96 animate-float rounded-full bg-leaf/10 blur-3xl [animation-delay:2s]" />
    </div>
  );
}
