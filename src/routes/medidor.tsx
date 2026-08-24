import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import testImg from "@/assets/test.jpg";
import hbTestImg from "@/assets/hb-test.jpg";
import labImg from "@/assets/lab-tubes.jpg";
import bloodImg from "@/assets/blood-cells.jpg";
import { Tilt3D } from "@/components/Tilt3D";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/medidor")({
  head: () => ({
    meta: [
      { title: "Medidor de anemia — NutriHierro" },
      {
        name: "description",
        content:
          "Calcula tu nivel de riesgo de anemia según tus síntomas y tu hemoglobina, y conoce los valores normales.",
      },
      { property: "og:title", content: "Medidor de anemia — NutriHierro" },
      {
        property: "og:description",
        content: "Evalúa tu riesgo de anemia con síntomas y hemoglobina.",
      },
    ],
  }),
  component: Medidor,
});

const preguntas = [
  "Me siento cansado o sin fuerzas casi todos los días",
  "Noto la piel, los labios o las encías pálidas",
  "Me falta el aire al hacer esfuerzos leves",
  "Tengo mareos o dolores de cabeza frecuentes",
  "Se me cae el cabello o tengo las uñas quebradizas",
  "Tengo antojo de hielo, tierra o cosas no comestibles",
  "Tengo sangrados abundantes (menstruación, nariz, digestivos)",
  "Como carnes, pescado o menudencias menos de 2 veces por semana",
];

const referencias = [
  ["Niños de 6 meses a 5 años", "11,0 g/dL"],
  ["Niños de 5 a 11 años", "11,5 g/dL"],
  ["Mujeres adultas no gestantes", "12,0 g/dL"],
  ["Mujeres gestantes", "11,0 g/dL"],
  ["Hombres adultos", "13,0 g/dL"],
];

function Medidor() {
  const [marcadas, setMarcadas] = useState<boolean[]>(() => preguntas.map(() => false));
  const [hb, setHb] = useState("");
  const [enviado, setEnviado] = useState(false);

  const resultado = useMemo(() => {
    const sintomas = marcadas.filter(Boolean).length;
    let puntos = Math.round((sintomas / preguntas.length) * 70);
    const valor = parseFloat(hb.replace(",", "."));
    let notaHb: string | null = null;

    if (!Number.isNaN(valor) && valor > 2 && valor < 25) {
      if (valor < 8) {
        puntos += 30;
        notaHb = `Hemoglobina de ${valor} g/dL: nivel muy bajo, acude a un servicio de salud pronto.`;
      } else if (valor < 11) {
        puntos += 22;
        notaHb = `Hemoglobina de ${valor} g/dL: por debajo de lo normal en casi todos los grupos.`;
      } else if (valor < 12.5) {
        puntos += 12;
        notaHb = `Hemoglobina de ${valor} g/dL: límite; puede ser baja según tu edad y sexo.`;
      } else {
        notaHb = `Hemoglobina de ${valor} g/dL: dentro de rangos habituales.`;
      }
    }

    puntos = Math.min(100, puntos);
    const nivel =
      puntos >= 60 ? "Riesgo alto" : puntos >= 30 ? "Riesgo moderado" : "Riesgo bajo";
    const consejo =
      puntos >= 60
        ? "Solicita un análisis de hemoglobina y ferritina lo antes posible y sigue el plan alimentario mientras tanto."
        : puntos >= 30
          ? "Refuerza tu alimentación con hierro y vitamina C, y considera un control de hemoglobina en las próximas semanas."
          : "Tus señales son pocas. Mantén una alimentación variada y un control anual.";

    return { puntos, nivel, consejo, notaHb, sintomas };
  }, [marcadas, hb]);

  return (
    <main>
      <section className="border-b border-border/70 bg-secondary/30 backdrop-blur">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Sección 2</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-3d aurora-text">
              Medidor de anemia
            </h1>
            <p className="mt-4 text-muted-foreground">
              Este medidor combina tus síntomas con tu último valor de hemoglobina para estimar un
              nivel de riesgo. Es una guía educativa: solo un análisis de sangre y un profesional
              de salud pueden dar un diagnóstico.
            </p>
          </div>
          <Tilt3D max={10} className="rounded-2xl">
          <img
            src={testImg}
            alt="Profesional de salud midiendo la hemoglobina de una paciente"
            width={1200}
            height={800}
            loading="lazy"
            className="animate-scale-in rounded-2xl border border-border object-cover shadow-[var(--shadow-card)]"
          />
          </Tilt3D>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_1fr]">
        <form
          className="animate-fade-up rounded-2xl glass-card p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
        >
          <h2 className="font-display text-2xl font-semibold">Marca lo que sientes</h2>
          <ul className="mt-5 space-y-3">
            {preguntas.map((p, i) => (
              <li key={p} style={{ animationDelay: `${i * 50}ms` }} className="animate-fade-up">
                <label className="nav-3d flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card/60 p-3 text-sm hover:bg-secondary/60">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
                    checked={marcadas[i]}
                    onChange={(e) =>
                      setMarcadas((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)))
                    }
                  />
                  <span>{p}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2">
            <Label htmlFor="hb">Hemoglobina de tu último análisis (g/dL) — opcional</Label>
            <Input
              id="hb"
              inputMode="decimal"
              maxLength={5}
              placeholder="Ej. 11.4"
              value={hb}
              onChange={(e) => setHb(e.target.value.replace(/[^0-9.,]/g, ""))}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              type="submit"
              className="btn-3d gradient-iron text-primary-foreground"
            >
              Calcular mi riesgo
            </Button>
            <Button
              type="button"
              variant="outline"
              className="btn-3d"
              onClick={() => {
                setMarcadas(preguntas.map(() => false));
                setHb("");
                setEnviado(false);
              }}
            >
              Limpiar
            </Button>
          </div>
        </form>

        <div className="space-y-6">
          <Reveal className="rounded-2xl glass-card p-6">
            <h2 className="font-display text-2xl font-semibold">Resultado</h2>
            {enviado ? (
              <div className="animate-fade-up">
                <p className="mt-4 font-display text-5xl font-semibold aurora-text">
                  {resultado.puntos}%
                </p>
                <Progress value={resultado.puntos} className="mt-3" />
                <p className="mt-4 font-medium">{resultado.nivel}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {resultado.sintomas} de {preguntas.length} señales marcadas.
                </p>
                {resultado.notaHb ? (
                  <p className="mt-3 rounded-lg bg-secondary p-3 text-sm">{resultado.notaHb}</p>
                ) : null}
                <p className="mt-4 text-sm text-muted-foreground">{resultado.consejo}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Completa el formulario y presiona “Calcular mi riesgo” para ver tu estimación.
              </p>
            )}
          </Reveal>

          <Reveal delay={120} className="rounded-2xl glass-card p-6">
            <h2 className="font-display text-xl font-semibold">Hemoglobina mínima normal</h2>
            <dl className="mt-4 divide-y divide-border text-sm">
              {referencias.map(([g, v]) => (
                <div key={g} className="flex justify-between gap-4 py-2">
                  <dt className="text-muted-foreground">{g}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              Valores de referencia a nivel del mar; en altura los umbrales se ajustan hacia arriba.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [hbTestImg, "Prueba rápida de hemoglobina en el dedo"],
            [labImg, "Tubos de muestra de sangre en el laboratorio"],
            [bloodImg, "Glóbulos rojos vistos de cerca"],
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

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <Reveal as="h2" className="font-display text-3xl font-semibold">
          Cómo se mide la anemia
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Hemoglobina", "Mide el oxígeno que transporta tu sangre. Es la prueba de tamizaje básica."],
            ["Hematocrito", "Porcentaje del volumen de sangre ocupado por glóbulos rojos."],
            ["Ferritina", "Indica tus reservas de hierro; baja antes que la hemoglobina."],
          ].map(([t, d], i) => (
            <Reveal
              as="article"
              key={t}
              delay={i * 80}
              className="rounded-xl glass-card card-3d p-5"
            >
              <h3 className="font-medium">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}