import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ingredientOptions, recipes, weeklyPlan, recipeById, type Recipe } from "@/lib/recipes";
import weeklyImg from "@/assets/weekly.jpg";
import stewImg from "@/assets/recipe-stew.jpg";
import marketImg from "@/assets/market-iron.jpg";
import cookingImg from "@/assets/cooking-family.jpg";
import heroFoods from "@/assets/hero-foods.jpg";
import { Reveal } from "@/components/Reveal";
import { Tilt3D } from "@/components/Tilt3D";

export const Route = createFileRoute("/calendario")({
  head: () => ({
    meta: [
      { title: "Recetario interactivo contra la anemia — NutriHierro" },
      {
        name: "description",
        content:
          "Elige los ingredientes que tienes en casa y obtén al instante recetas económicas y ricas en hierro, más un calendario semanal variado.",
      },
      { property: "og:title", content: "Recetario interactivo — NutriHierro" },
      {
        property: "og:description",
        content: "Filtro inteligente de recetas contra la anemia y plan semanal de comidas.",
      },
    ],
  }),
  component: Recetario,
});

function score(r: Recipe, selected: string[]) {
  if (selected.length === 0) return 0;
  return r.ingredients.filter((i) => selected.includes(i)).length;
}

function Recetario() {
  const [selected, setSelected] = useState<string[]>([]);
  const [maxMin, setMaxMin] = useState(60);
  const [soloEconomicas, setSoloEconomicas] = useState(false);
  const [abierta, setAbierta] = useState<string | null>(null);
  const [dia, setDia] = useState(0);

  const toggle = (ing: string) =>
    setSelected((s) => (s.includes(ing) ? s.filter((x) => x !== ing) : [...s, ing]));

  const resultados = useMemo(() => {
    return recipes
      .filter((r) => r.minutes <= maxMin)
      .filter((r) => (soloEconomicas ? r.cost === "Económica" : true))
      .map((r) => ({ r, s: score(r, selected) }))
      .filter(({ s }) => (selected.length === 0 ? true : s > 0))
      .sort((a, b) => b.s - a.s || a.r.minutes - b.r.minutes)
      .map(({ r, s }) => ({ ...r, coincidencias: s }));
  }, [selected, maxMin, soloEconomicas]);

  const plan = weeklyPlan[dia] ?? weeklyPlan[0]!;

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/70">
        <img
          src={weeklyImg}
          alt="Bowls con comidas ricas en hierro preparadas para la semana"
          width={1200}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 animate-drift object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="relative mx-auto max-w-6xl animate-fade-up px-5 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Recetario</p>
          <h1 className="mt-3 font-display text-4xl font-semibold aurora-text">
            Recetario interactivo para combatir la anemia
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Marca lo que tienes en casa y el filtro inteligente te arma al instante recetas
            económicas, nutritivas y rápidas. Abajo encontrarás además un calendario semanal muy
            variado.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [stewImg, "Guiso de lentejas con hígado, espinaca y limón"],
            [marketImg, "Puesto de mercado con menestras, verduras verdes y cítricos"],
            [cookingImg, "Familia cocinando junta una comida rica en hierro"],
            [heroFoods, "Alimentos ricos en hierro sobre una mesa"],
          ].map(([src, alt], i) => (
            <Tilt3D key={alt} max={10} className="rounded-2xl">
              <img
                src={src}
                alt={alt}
                width={1200}
                height={800}
                loading="lazy"
                style={{ animationDelay: `${i * 80}ms` }}
                className="h-44 w-full animate-fade-up rounded-2xl border border-border object-cover shadow-[var(--shadow-card)]"
              />
            </Tilt3D>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-5 py-14">
        <Reveal className="glass-card p-6">
          <h2 className="font-display text-2xl font-semibold">¿Qué tienes en casa?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecciona uno o varios ingredientes. Las recetas se actualizan solas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {ingredientOptions.map((ing) => {
              const on = selected.includes(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggle(ing)}
                  aria-pressed={on}
                  className={`rounded-full border px-3.5 py-1.5 text-sm capitalize transition-all duration-300 hover:-translate-y-0.5 ${
                    on
                      ? "border-transparent gradient-iron text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "border-border bg-card/70 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {ing}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Tiempo máximo</span>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={maxMin}
                onChange={(e) => setMaxMin(Number(e.target.value))}
                className="accent-[hsl(var(--primary))]"
              />
              <span className="font-medium">{maxMin} min</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={soloEconomicas}
                onChange={(e) => setSoloEconomicas(e.target.checked)}
              />
              Solo recetas económicas
            </label>
            {selected.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setSelected([])}>
                Limpiar ingredientes
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl font-semibold">
              {resultados.length} receta{resultados.length === 1 ? "" : "s"} para ti
            </h2>
            <p className="text-sm text-muted-foreground">
              Ordenadas por cuántos de tus ingredientes usan.
            </p>
          </div>

          {resultados.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
              No hay recetas con esa combinación. Prueba quitando un ingrediente o subiendo el
              tiempo máximo.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resultados.map((r, i) => (
                <article
                  key={r.id}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="flex animate-fade-up flex-col glass-card p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      {r.meal}
                    </span>
                    <span className="text-muted-foreground">
                      {r.minutes} min · {r.cost}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                          selected.includes(ing)
                            ? "bg-primary/15 text-primary"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {[
                      ["Hierro", r.iron],
                      ["Energía", `${r.kcal} kcal`],
                      ["Proteína", r.protein],
                      ["Vitamina C", r.vitaminC],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg bg-secondary/50 px-3 py-2">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {abierta === r.id && (
                    <div className="mt-4 animate-fade-in rounded-lg bg-accent/50 p-4 text-sm">
                      <ol className="list-decimal space-y-1 pl-4">
                        {r.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                      <p className="mt-3 text-xs text-accent-foreground">Consejo: {r.tip}</p>
                    </div>
                  )}

                  <div className="mt-auto flex gap-2 pt-5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setAbierta(abierta === r.id ? null : r.id)}
                    >
                      {abierta === r.id ? "Ocultar pasos" : "Ver preparación"}
                    </Button>
                    <Button size="sm" asChild>
                      <a href={r.video} target="_blank" rel="noopener noreferrer">
                        Video
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-3xl font-semibold">Calendario semanal variado</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Desayuno, almuerzo y cena distintos para cada día de la semana.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {weeklyPlan.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setDia(i)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  i === dia
                    ? "border-transparent gradient-iron text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border bg-card/70 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>

          <div key={plan.day} className="mt-6 grid animate-fade-in gap-4 md:grid-cols-3">
            {(["desayuno", "almuerzo", "cena"] as const).map((slot) => {
              const r = recipeById(plan[slot]);
              return (
                <article key={slot} className="glass-card p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{slot}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-3 text-sm font-medium">{r.iron}</p>
                  <Button size="sm" variant="outline" asChild className="mt-4">
                    <a href={r.video} target="_blank" rel="noopener noreferrer">
                      Ver receta
                    </a>
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="mt-8 overflow-x-auto glass-card">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <thead>
                <tr className="gradient-iron text-primary-foreground">
                  <th className="px-4 py-3 font-semibold">Día</th>
                  <th className="px-4 py-3 font-semibold">Desayuno</th>
                  <th className="px-4 py-3 font-semibold">Almuerzo</th>
                  <th className="px-4 py-3 font-semibold">Cena</th>
                </tr>
              </thead>
              <tbody>
                {weeklyPlan.map((d, i) => (
                  <tr
                    key={d.day}
                    onClick={() => setDia(i)}
                    style={{ animationDelay: `${i * 60}ms` }}
                    className={`animate-fade-up cursor-pointer border-t border-border/60 transition-colors hover:bg-primary/5 ${
                      i === dia ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium uppercase tracking-widest text-primary">
                      {d.day}
                    </td>
                    {(["desayuno", "almuerzo", "cena"] as const).map((slot) => {
                      const r = recipeById(d[slot]);
                      return (
                        <td key={slot} className="px-4 py-3">
                          <p className="font-medium">{r.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{r.iron}</p>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
