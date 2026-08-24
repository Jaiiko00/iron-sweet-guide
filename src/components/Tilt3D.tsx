import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** Máxima inclinación en grados */
  max?: number;
  /** Brillo que sigue al cursor */
  glare?: boolean;
};

export function Tilt3D({ children, className, max = 12, glare = true }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg) scale(1.03)`,
    });
    setPos({ x: px * 100, y: py * 100, active: true });
  }

  function onLeave() {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)" });
    setPos((p) => ({ ...p, active: false }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={cn(
        "relative transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: pos.active ? 1 : 0,
            background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, white 45%, transparent), transparent 65%)`,
            mixBlendMode: "soft-light",
          }}
        />
      )}
    </div>
  );
}
