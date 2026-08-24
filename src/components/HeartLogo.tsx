import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** muestra los anillos de pulso alrededor del corazón */
  rings?: boolean;
  title?: string;
};

/** Logo de NutriHierro: corazón vectorial animado (latido + brillo + anillos). */
export function HeartLogo({ className, rings = false, title = "NutriHierro" }: Props) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      {rings && (
        <>
          <span className="absolute inset-0 animate-ring-out rounded-full bg-primary/30" />
          <span className="absolute inset-0 animate-ring-out rounded-full bg-primary/20 [animation-delay:1.2s]" />
        </>
      )}
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label={title}
        className="relative h-full w-full animate-heartbeat drop-shadow-[0_6px_16px_rgba(200,40,40,0.35)]"
      >
        <defs>
          <linearGradient id="nh-heart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.21 30)" />
            <stop offset="55%" stopColor="oklch(0.48 0.2 18)" />
            <stop offset="100%" stopColor="oklch(0.38 0.16 12)" />
          </linearGradient>
          <linearGradient id="nh-leaf" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.52 0.11 145)" />
            <stop offset="100%" stopColor="oklch(0.72 0.15 130)" />
          </linearGradient>
        </defs>

        <path
          d="M32 56S6 40.5 6 23.5C6 14.4 13.2 8 21.4 8c5 0 9 2.4 10.6 6.1C33.6 10.4 37.6 8 42.6 8 50.8 8 58 14.4 58 23.5 58 40.5 32 56 32 56Z"
          fill="url(#nh-heart)"
        />
        {/* brillo superior */}
        <path
          d="M18 18c2.6-3.4 7.4-4.6 10.8-2.6"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* latido / electrocardiograma */}
        <path
          d="M12 30h9l4-8 6 16 5-10 3 4h13"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-shimmer"
          style={{ strokeDasharray: 90, strokeDashoffset: 0 }}
        />
        {/* hojita: nutrición */}
        <path
          d="M44 12c5 .4 8.6 4.4 8.2 9.4-4.6.8-8.8-2.4-9.4-6.6-.1-1 .3-2 1.2-2.8Z"
          fill="url(#nh-leaf)"
        />
        <circle cx="52" cy="45" r="2.4" fill="white" opacity="0.85" className="animate-sparkle" />
        <circle
          cx="11"
          cy="41"
          r="1.7"
          fill="white"
          opacity="0.7"
          className="animate-sparkle [animation-delay:0.8s]"
        />
      </svg>
    </span>
  );
}
