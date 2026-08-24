import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

const SYSTEM = `Eres "Hierrito", el asistente virtual de NutriHierro, una web educativa sobre la anemia.
Respondes SIEMPRE en español, con lenguaje claro, cálido y breve (máximo 6 líneas).
Puedes: 1) explicar qué es la anemia, sus causas, síntomas, tipos y alimentación rica en hierro;
2) guiar por la web indicando la sección correcta:
- "Sobre la anemia" (inicio, /): descripción, síntomas, tipos y preguntas frecuentes.
- "Medidor de anemia" (/medidor): cuestionario de síntomas y hemoglobina que estima el riesgo.
- "Calendario de comidas" (/calendario): plan de lunes a domingo con recetas en video y valor nutricional.
- "Comunidad" (/comunidad): debate y comentarios de otras personas.
Nunca das diagnósticos ni recetas médicas: recuerda consultar a un profesional y hacerse un análisis de sangre.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("Falta LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, ...data.messages],
      }),
    });

    if (res.status === 429) {
      return { reply: "Estoy recibiendo muchas consultas ahora mismo. Inténtalo en un minuto." };
    }
    if (!res.ok) {
      return { reply: "No pude responder en este momento. Vuelve a intentarlo, por favor." };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return {
      reply:
        json.choices?.[0]?.message?.content?.trim() ??
        "No pude generar una respuesta. ¿Puedes reformular tu pregunta?",
    };
  });