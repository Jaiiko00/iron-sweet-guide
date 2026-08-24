import { useEffect, useState } from "react";
import bgAurora from "@/assets/bg-aurora.jpg";

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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img
        src={bgAurora}
        alt=""
        width={1920}
        height={1280}
        className="h-full w-full scale-110 animate-drift object-cover blur-2xl saturate-150"
        style={{ transform: `translate3d(${(p.x - 50) / 14}%, ${(p.y - 50) / 14}%, 0) scale(1.16)` }}
      />
      {/* velo cálido, deja pasar el color */}
      <div className="absolute inset-0 bg-background/55" />
      {/* malla de color viva */}
      <div
        className="absolute inset-0 opacity-80 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(45rem 30rem at 12% 18%, oklch(0.62 0.22 25 / 0.55), transparent 60%), radial-gradient(40rem 28rem at 88% 22%, oklch(0.7 0.16 140 / 0.5), transparent 60%), radial-gradient(38rem 26rem at 50% 92%, oklch(0.78 0.17 65 / 0.5), transparent 60%)",
        }}
      />
      {/* halo que sigue al cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(26rem circle at ${p.x}% ${p.y}%, oklch(0.72 0.2 32 / 0.22), transparent 70%)`,
        }}
      />
      <div className="absolute -left-24 top-10 h-80 w-80 animate-float rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-20 top-1/3 h-96 w-96 animate-float rounded-full bg-leaf/25 blur-3xl [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-bob rounded-full bg-[oklch(0.8_0.17_70_/_0.25)] blur-3xl" />
      {/* rejilla sutil para dar profundidad */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)",
        }}
      />
    </div>
  );
}
