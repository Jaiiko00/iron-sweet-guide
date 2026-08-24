import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/mitos")({
  head: () => ({
    meta: [
      { title: "Mitos y verdades sobre la anemia — NutriHierro" },
      {
        name: "description",
        content:
          "Descubre qué es mito y qué es verdad sobre la anemia y el hierro: beterraga, leche, café, sangrecita, suplementos y más.",
      },
      { property: "og:title", content: "Mitos y verdades sobre la anemia — NutriHierro" },
      {
        property: "og:description",
        content: "Aclaramos las creencias más comunes sobre la anemia con evidencia.",
      },
    ],
  }),
  component: Mitos,
});

type Item = { afirmacion: string; esVerdad: boolean; explicacion: string };

const items: Item[] = [
  {
    afirmacion: "La beterraga cura la anemia porque es de color rojo.",
    esVerdad: false,
    explicacion:
      "La beterraga aporta muy poco hierro. Ayuda por su vitamina C y folatos, pero no reemplaza alimentos como sangrecita, hígado o carnes rojas.",
  },
  {
    afirmacion: "El hierro de la carne se absorbe mucho mejor que el de las plantas.",
    esVerdad: true,
    explicacion:
      "El hierro hemo (carnes, vísceras, sangrecita) se absorbe entre 15% y 35%; el hierro no hemo de vegetales apenas 2% a 10%.",
  },
  {
    afirmacion: "Tomar café o té con las comidas no afecta el hierro.",
    esVerdad: false,
    explicacion:
      "Los taninos y polifenoles del café, té e infusiones pueden reducir hasta 60% la absorción del hierro. Espera al menos una hora.",
  },
  {
    afirmacion: "La vitamina C mejora la absorción del hierro vegetal.",
    esVerdad: true,
    explicacion:
      "Limón, naranja, pimiento o tomate junto a lentejas o espinaca pueden multiplicar hasta por tres el hierro que aprovechas.",
  },
  {
    afirmacion: "Si me siento bien, no puedo tener anemia.",
    esVerdad: false,
    explicacion:
      "La anemia leve suele ser silenciosa. Solo un análisis de hemoglobina confirma el diagnóstico.",
  },
  {
    afirmacion: "La leche en exceso puede favorecer la anemia en niños.",
    esVerdad: true,
    explicacion:
      "El calcio compite con el hierro y un consumo muy alto de leche desplaza alimentos ricos en hierro de la dieta.",
  },
  {
    afirmacion: "Los suplementos de hierro se pueden tomar sin control médico.",
    esVerdad: false,
    explicacion:
      "El exceso de hierro es tóxico para el hígado. La dosis y duración las indica el personal de salud según tu hemoglobina.",
  },
  {
    afirmacion: "La sangrecita es uno de los alimentos con más hierro disponible.",
    esVerdad: true,
    explicacion:
      "Aporta alrededor de 29 mg de hierro por 100 g, es barata y se absorbe muy bien; por eso se promueve en programas contra la anemia.",
  },
  {
    afirmacion: "La anemia solo le da a los niños.",
    esVerdad: false,
    explicacion:
      "También afecta a gestantes, mujeres con menstruaciones abundantes, adultos mayores, deportistas y personas con dietas restrictivas.",
  },
  {
    afirmacion: "Cocinar en olla de hierro puede aportar algo de hierro a la comida.",
    esVerdad: true,
    explicacion:
      "Sobre todo en preparaciones ácidas y de cocción larga, como guisos con tomate; es un aporte pequeño pero real.",
  },
];

function Mitos() {
  const [abierto, setAbierto] = useState<number | null>(0);
  const [filtro, setFiltro] = useState<"todos" | "mito" | "verdad">("todos");

  const visibles = items.filter((i) =>
    filtro === "todos" ? true : filtro === "verdad" ? i.esVerdad : !i.esVerdad,
  );

  return (
    <main>
      <section className="border-b border-border/70 bg-gradient-to-br from-secondary/60 to-transparent">
        <div className="mx-auto max-w-6xl animate-fade-up px-5 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Sección 5</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-3d aurora-text">
            Mitos y verdades
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Alrededor de la anemia circulan muchas creencias. Toca cada tarjeta para ver si es mito
            o verdad y por qué.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <Reveal className="flex flex-wrap gap-2">
          {(
            [
              ["todos", "Todos"],
              ["verdad", "Verdades"],
              ["mito", "Mitos"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFiltro(k)}
              className={`nav-3d rounded-full border px-4 py-2 text-sm ${
                filtro === k
                  ? "border-transparent gradient-iron text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border bg-card/70 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 space-y-4">
          {visibles.map((item, i) => {
            const idx = items.indexOf(item);
            const open = abierto === idx;
            return (
              <Reveal key={item.afirmacion} delay={i * 60}>
                <article className="glass-card panel-3d overflow-hidden">
                  <button
                    onClick={() => setAbierto(open ? null : idx)}
                    className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-primary/5"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-bold ${
                        item.esVerdad
                          ? "bg-accent text-accent-foreground"
                          : "bg-destructive/10 text-destructive"
                      }`}
                      aria-hidden
                    >
                      {item.esVerdad ? "✓" : "✕"}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold">
                        {item.afirmacion}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-primary">
                        {item.esVerdad ? "Verdad" : "Mito"}
                      </span>
                    </span>
                    <span
                      className={`text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                  {open && (
                    <p className="animate-fade-in border-t border-border/60 bg-secondary/40 p-5 text-sm text-muted-foreground">
                      {item.explicacion}
                    </p>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
