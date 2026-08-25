import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import heroFoods from "@/assets/hero-foods.jpg";
import bloodCells from "@/assets/blood-cells.jpg";
import { Reveal } from "@/components/Reveal";
import { HeartLogo } from "@/components/HeartLogo";
import { Tilt3D } from "@/components/Tilt3D";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¿Qué es la anemia? — NutriHierro" },
      {
        name: "description",
        content:
          "Qué es la anemia, sus causas, síntomas, tipos y preguntas frecuentes explicadas de forma clara y sencilla.",
      },
      { property: "og:title", content: "¿Qué es la anemia? — NutriHierro" },
      {
        property: "og:description",
        content: "Causas, síntomas, tipos y preguntas frecuentes sobre la anemia.",
      },
    ],
  }),
  component: Index,
});

const sintomas = [
  { t: "Cansancio constante", d: "Fatiga que no mejora aunque duermas bien." },
  { t: "Piel y encías pálidas", d: "Menos hemoglobina, menos color en la piel y mucosas." },
  { t: "Mareos y dolor de cabeza", d: "El cerebro recibe menos oxígeno del necesario." },
  { t: "Falta de aire", d: "Agitación al subir escaleras o caminar rápido." },
  { t: "Uñas frágiles y caída del cabello", d: "Señal frecuente de falta de hierro." },
  { t: "Poca concentración", d: "En niños afecta el aprendizaje y el rendimiento escolar." },
];

const tipos = [
  {
    t: "Ferropénica",
    d: "Por falta de hierro. Es la más común en el mundo y la que mejor responde a la alimentación.",
  },
  {
    t: "Megaloblástica",
    d: "Por deficiencia de vitamina B12 o ácido fólico; los glóbulos rojos crecen mal.",
  },
  { t: "Por pérdida de sangre", d: "Menstruaciones abundantes, úlceras o parásitos intestinales." },
  {
    t: "Por enfermedad crónica",
    d: "Infecciones prolongadas, enfermedad renal o inflamación sostenida.",
  },
];

const faqs = [
  {
    q: "¿La anemia se cura?",
    a: "La anemia por falta de hierro suele corregirse en 2 a 4 meses con alimentación adecuada y, cuando el médico lo indica, suplementos de hierro. Lo importante es tratar también la causa (por ejemplo sangrados o parásitos).",
  },
  {
    q: "¿Cómo se diagnostica?",
    a: "Con un análisis de sangre: hemoglobina, hematocrito y ferritina. Un valor bajo de hemoglobina confirma la anemia y la ferritina indica cuánto hierro tienes de reserva.",
  },
  {
    q: "¿Qué alimentos aportan más hierro?",
    a: "Hierro hemo (se absorbe mejor): sangrecita, hígado, bazo, carne roja, pescado. Hierro no hemo: lentejas, frejoles, garbanzos, espinaca, quinua, semillas de zapallo.",
  },
  {
    q: "¿Por qué me recomiendan tomar jugo de naranja con las comidas?",
    a: "La vitamina C puede triplicar la absorción del hierro vegetal. Limón, naranja, pimiento rojo, brócoli o kiwi son buenos acompañantes.",
  },
  {
    q: "¿Qué cosas bloquean la absorción del hierro?",
    a: "El café, el té, las infusiones y la leche tomados junto a la comida. Sepáralos al menos una hora de tu plato principal.",
  },
  {
    q: "¿Quiénes tienen más riesgo?",
    a: "Niños menores de 3 años, adolescentes, mujeres con menstruaciones abundantes, gestantes, personas vegetarianas sin planificación y adultos mayores.",
  },
  {
    q: "¿Puedo tomar suplementos por mi cuenta?",
    a: "No es recomendable. El exceso de hierro también daña. Un profesional de salud debe indicar la dosis según tu análisis.",
  },
];

function Index() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <img
          src={heroFoods}
          alt="Alimentos ricos en hierro: espinaca, lentejas, carne, beterraga y cítricos"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute -left-24 top-6 h-80 w-80 animate-float rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-72 w-72 animate-float rounded-full bg-leaf/20 blur-3xl [animation-delay:2.5s]" />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-primary/25 bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur glow-border">
            <HeartLogo className="h-4 w-4" />
            Sección 1 · Salud con hierro
          </span>
          <h1 className="mt-5 max-w-3xl animate-fade-up text-3d font-display text-5xl font-semibold hero-title leading-[1.05] [animation-delay:100ms] sm:text-6xl">
            Entiende la anemia y{" "}
            <span className="aurora-text">recupera tu energía</span>
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up text-lg text-muted-foreground [animation-delay:200ms]">
            NutriHierro reúne información confiable sobre la anemia, un medidor de riesgo, un
            recetario interactivo, el mapa de centros de salud y mitos y verdades.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <Button asChild size="lg" className="btn-3d shine gradient-iron text-primary-foreground shadow-[var(--shadow-glow)]">
              <Link to="/medidor">Medir mi riesgo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-3d glow-border">
              <Link to="/calendario">Abrir el recetario</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl animate-fade-up grid-cols-2 gap-3 [animation-delay:400ms] sm:grid-cols-4">
            {[
              ["1 de 3", "niños en Perú"],
              ["16", "recetas con hierro"],
              ["7 días", "de menú variado"],
              ["6", "centros de salud"],
            ].map(([n, l]) => (
              <Tilt3D key={l} max={14} className="rounded-3xl">
                <div className="glass-card glow-border px-4 py-3">
                  <dt className="font-display text-2xl font-semibold aurora-text">{n}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              </Tilt3D>
            ))}
          </dl>

        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold section-title aurora-text">¿Qué es la anemia?</h2>
            <p className="mt-4 text-muted-foreground">
              La anemia ocurre cuando la sangre no tiene suficientes glóbulos rojos sanos o
              suficiente hemoglobina, la proteína que transporta el oxígeno desde los pulmones
              hacia todo el cuerpo. Con menos oxígeno disponible, los órganos y los músculos
              trabajan con dificultad y aparece el cansancio.
            </p>
            <p className="mt-4 text-muted-foreground">
              La causa más frecuente es la falta de hierro, un mineral que el cuerpo no fabrica y
              que obtenemos únicamente a través de los alimentos. Por eso la alimentación es la
              primera herramienta de tratamiento y prevención.
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["1 de cada 4", "personas en el mundo vive con anemia"],
                ["12 g/dL", "hemoglobina mínima habitual en mujeres adultas"],
                ["13 g/dL", "hemoglobina mínima habitual en hombres adultos"],
              ].map(([n, d]) => (
                <div key={n} className="rounded-xl glass-card card-3d p-4">
                  <dt className="font-display text-2xl font-semibold text-primary">{n}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <Tilt3D max={10} className="rounded-3xl">
              <img
                src={bloodCells}
                alt="Ilustración de glóbulos rojos sanos y glóbulos rojos pálidos"
                width={1200}
                height={800}
                loading="lazy"
                className="rounded-3xl border border-border/70 object-cover shadow-[var(--shadow-glow)]"
              />
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/20 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal as="h2" className="font-display text-3xl font-semibold section-title aurora-text">
            Síntomas más frecuentes
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sintomas.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <Tilt3D max={9} className="h-full rounded-3xl">
                  <article className="h-full glass-card glow-border p-5">
                    <h3 className="font-medium text-foreground">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  </article>
                </Tilt3D>
              </Reveal>
            ))}

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal as="h2" className="font-display text-3xl font-semibold section-title aurora-text">
          Tipos y causas
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tipos.map((t, i) => (
            <Reveal
              as="article"
              key={t.t}
              delay={i * 80}
              className="rounded-xl border-l-4 border-primary bg-card/80 p-5 shadow-[var(--shadow-card)] card-3d"
            >
              <h3 className="font-display text-xl font-semibold">Anemia {t.t.toLowerCase()}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-8">
        <Reveal as="h2" className="font-display text-3xl font-semibold section-title aurora-text">
          Preguntas frecuentes
        </Reveal>
        <Reveal className="mt-6">
          <Accordion type="single" collapsible>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </main>
  );
}
