import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/Reveal";
import { Tilt3D } from "@/components/Tilt3D";

import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/comunidad")({
  head: () => ({
    meta: [
      { title: "Comunidad y debate — NutriHierro" },
      {
        name: "description",
        content:
          "Comparte tu experiencia con la anemia, lee comentarios de otras personas y participa en el debate de NutriHierro.",
      },
      { property: "og:title", content: "Comunidad y debate — NutriHierro" },
      {
        property: "og:description",
        content: "Comentarios, experiencias y debate sobre la anemia y la alimentación con hierro.",
      },
    ],
  }),
  component: Comunidad,
});

type Comment = { id: string; author: string; text: string; date: string; likes: number };

const SEED: Comment[] = [
  {
    id: "s1",
    author: "Marisol",
    text: "Mi hija salió con hemoglobina baja y empezamos con sangrecita dos veces por semana más limonada. En tres meses subió 1.8 puntos. ¡Sí funciona la constancia!",
    date: "hace 3 días",
    likes: 24,
  },
  {
    id: "s2",
    author: "Dr. Ramírez",
    text: "Recuerden separar el café y el té al menos una hora de las comidas principales: son los mayores bloqueadores de la absorción del hierro.",
    date: "hace 5 días",
    likes: 41,
  },
  {
    id: "s3",
    author: "Kevin",
    text: "Soy vegetariano y pensé que no podría. Lentejas + pimiento rojo + semillas de zapallo me cambiaron el nivel de energía por completo.",
    date: "hace 1 semana",
    likes: 18,
  },
  {
    id: "s4",
    author: "Ana Lucía",
    text: "¿Alguien más sintió molestias al tomar el suplemento de hierro? A mí me ayudó tomarlo después del almuerzo y no en ayunas.",
    date: "hace 2 semanas",
    likes: 12,
  },
];

const STORAGE = "nutrihierro.comentarios";

function Comunidad() {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(SEED);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setComments([...(JSON.parse(raw) as Comment[]), ...SEED]);
    } catch {
      /* ignore */
    }
  }, []);

  function publicar() {
    const clean = text.trim();
    if (clean.length < 3) return;
    const nuevo: Comment = {
      id: `${Date.now()}`,
      author: user ?? "Invitado",
      text: clean,
      date: "ahora mismo",
      likes: 0,
    };
    const propios = [nuevo, ...comments.filter((c) => !SEED.some((s) => s.id === c.id))];
    setComments([...propios, ...SEED]);
    setText("");
    try {
      localStorage.setItem(STORAGE, JSON.stringify(propios));
    } catch {
      /* ignore */
    }
  }

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-secondary/60 to-transparent">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 animate-float rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 animate-float rounded-full bg-leaf/15 blur-3xl [animation-delay:1.5s]" />
        <div className="relative mx-auto max-w-5xl animate-fade-up px-5 py-16">
          <span className="inline-flex animate-pop items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ring-out rounded-full bg-primary" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Sección 6
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold text-3d aurora-text md:text-5xl">
            Comunidad y debate
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Un espacio para compartir experiencias, resolver dudas y animarse mutuamente. Escribe con
            respeto: aquí nadie diagnostica, solo acompañamos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <Reveal>
          <div className="glow-border glass-card p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4 animate-bob text-primary" />
              Escribe como <span className="text-primary">{user ?? "Invitado"}</span>
            </div>
            <Textarea
              value={text}
              maxLength={600}
              rows={4}
              placeholder="Comparte tu experiencia, una receta o una pregunta…"
              onChange={(e) => setText(e.target.value)}
              className="mt-4 resize-none rounded-xl bg-card/70 transition-shadow focus-visible:shadow-[var(--shadow-glow)]"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{text.length}/600</span>
              <Button
                onClick={publicar}
                disabled={text.trim().length < 3}
                className="shine rounded-full transition-transform hover:scale-105"
              >
                Publicar comentario
              </Button>
            </div>
          </div>
        </Reveal>


      <div className="mt-10 space-y-4">
        {comments.map((c, i) => (
          <Reveal key={c.id} delay={i * 60}>
            <Tilt3D max={7} className="rounded-3xl">
              <article className="glass-card glow-border p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-iron font-semibold text-primary-foreground shadow-[var(--shadow-glow)]">
                    {c.author.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium">{c.author}</p>
                    <p className="text-xs text-muted-foreground">{c.date}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{c.text}</p>
                <button
                  onClick={() => setLiked((l) => ({ ...l, [c.id]: !l[c.id] }))}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary"
                >
                  <Heart
                    className={`h-3.5 w-3.5 transition-transform ${liked[c.id] ? "scale-125 fill-primary text-primary" : ""}`}
                  />
                  {c.likes + (liked[c.id] ? 1 : 0)}
                </button>
              </article>
            </Tilt3D>
          </Reveal>

        ))}
      </div>
      </section>
    </main>

  );
}