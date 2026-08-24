import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de centros de salud — Los Aquijes, Ica | NutriHierro" },
      {
        name: "description",
        content:
          "Ubica postas y centros de salud en El Rosario y Los Aquijes, Ica (Perú) para tamizaje de hemoglobina y tratamiento de la anemia.",
      },
      { property: "og:title", content: "Mapa de centros de salud — NutriHierro" },
      {
        property: "og:description",
        content: "Postas y centros de salud cercanos en Los Aquijes, Ica, Perú.",
      },
    ],
  }),
  component: Mapa,
});

type Centro = {
  nombre: string;
  tipo: string;
  zona: string;
  direccion: string;
  horario: string;
  servicios: string[];
  lat: number;
  lng: number;
};

const centros: Centro[] = [
  {
    nombre: "Puesto de Salud El Rosario",
    tipo: "Puesto de salud (I-1)",
    zona: "El Rosario, Los Aquijes",
    direccion: "Centro poblado El Rosario, Los Aquijes, Ica",
    horario: "Lun a Sáb, 8:00 – 14:00",
    servicios: ["Tamizaje de hemoglobina", "Entrega de sulfato ferroso", "Control del niño sano"],
    lat: -14.1394,
    lng: -75.6786,
  },
  {
    nombre: "Centro de Salud Los Aquijes",
    tipo: "Centro de salud (I-3)",
    zona: "Los Aquijes",
    direccion: "Plaza principal de Los Aquijes, Ica",
    horario: "Lun a Dom, 7:30 – 19:00",
    servicios: ["Laboratorio", "Consulta médica", "Nutrición", "Materno infantil"],
    lat: -14.1281,
    lng: -75.6906,
  },
  {
    nombre: "Puesto de Salud San Antonio",
    tipo: "Puesto de salud (I-2)",
    zona: "San Antonio, Los Aquijes",
    direccion: "Av. Los Ángeles s/n, San Antonio, Ica",
    horario: "Lun a Vie, 8:00 – 16:00",
    servicios: ["Tamizaje de anemia", "Vacunación", "Suplementación con hierro"],
    lat: -14.1189,
    lng: -75.6852,
  },
  {
    nombre: "Centro de Salud Parcona",
    tipo: "Centro de salud (I-3)",
    zona: "Parcona, Ica",
    direccion: "Av. Los Maestros, Parcona, Ica",
    horario: "Lun a Dom, 24 horas (emergencia)",
    servicios: ["Emergencia", "Laboratorio", "Pediatría"],
    lat: -14.0508,
    lng: -75.7106,
  },
  {
    nombre: "Hospital Regional de Ica",
    tipo: "Hospital (II-2)",
    zona: "Ica ciudad",
    direccion: "Prolongación Ayabaca s/n, Ica",
    horario: "24 horas",
    servicios: ["Hematología", "Emergencia", "Hospitalización", "Análisis completos"],
    lat: -14.0755,
    lng: -75.7342,
  },
  {
    nombre: "EsSalud Hospital Augusto Hernández Mendoza",
    tipo: "Hospital EsSalud",
    zona: "Ica ciudad",
    direccion: "Av. Cutervo 104, Ica",
    horario: "24 horas",
    servicios: ["Consulta externa", "Laboratorio", "Emergencia"],
    lat: -14.0693,
    lng: -75.7286,
  },
];

const bbox = (lat: number, lng: number, d = 0.012) =>
  `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;

function Mapa() {
  const [activo, setActivo] = useState(0);
  const c = centros[activo] ?? centros[0]!;

  return (
    <main>
      <section className="border-b border-border/70 bg-gradient-to-br from-secondary/60 to-transparent">
        <div className="mx-auto max-w-6xl animate-fade-up px-5 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Sección 4</p>
          <h1 className="mt-3 font-display text-4xl font-semibold aurora-text">
            Mapa de centros de salud
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Postas, centros de salud y hospitales cerca de El Rosario y Los Aquijes (Ica, Perú)
            donde puedes hacerte el descarte de anemia, recoger sulfato ferroso y recibir
            orientación nutricional.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-3">
          {centros.map((centro, i) => (
            <button
              key={centro.nombre}
              onClick={() => setActivo(i)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                i === activo
                  ? "border-primary/50 bg-primary/10 shadow-[var(--shadow-glow)]"
                  : "border-border bg-card/70 hover:bg-secondary"
              }`}
            >
              <p className="font-display text-lg font-semibold">{centro.nombre}</p>
              <p className="text-xs uppercase tracking-widest text-primary">{centro.tipo}</p>
              <p className="mt-1 text-sm text-muted-foreground">{centro.zona}</p>
            </button>
          ))}
        </Reveal>

        <Reveal className="glass-card overflow-hidden">
          <iframe
            key={c.nombre}
            title={`Mapa de ${c.nombre}`}
            className="h-80 w-full border-0"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox(c.lat, c.lng)}&layer=mapnik&marker=${c.lat}%2C${c.lng}`}
          />
          <div className="p-6">
            <h2 className="font-display text-2xl font-semibold">{c.nombre}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Dirección</dt>
                <dd>{c.direccion}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Horario</dt>
                <dd>{c.horario}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Servicios</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {c.servicios.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <Button asChild className="mt-6 transition-transform hover:scale-105">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Las ubicaciones son referenciales. Confirma horarios llamando al establecimiento o en
              la municipalidad de Los Aquijes antes de acudir.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
