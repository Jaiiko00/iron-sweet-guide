import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircleHeart, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askAssistant } from "@/lib/chat.functions";
import logo from "@/assets/logo-heart.png";

type Msg = { role: "user" | "assistant"; content: string };

const SUGERENCIAS = [
  "¿Qué es la anemia?",
  "¿Cómo uso el medidor?",
  "Dame comidas con hierro",
];

export function ChatBot() {
  const ask = useServerFn(askAssistant);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Hierrito, tu guía de NutriHierro. Pregúntame sobre la anemia o dime qué quieres hacer y te llevo a la sección correcta.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, pending]);

  async function send(value: string) {
    const content = value.trim();
    if (!content || pending) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setText("");
    setPending(true);
    try {
      const res = await ask({ data: { messages: next.slice(-12) } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Ups, hubo un problema de conexión. Inténtalo otra vez." },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-iron text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
        {open ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircleHeart className="relative h-6 w-6 animate-heartbeat" />
        )}
      </button>

      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] animate-scale-in flex-col overflow-hidden glass-card">
          <div className="flex items-center gap-3 gradient-iron px-4 py-3 text-primary-foreground">
            <img src={logo} alt="" width={816} height={816} className="h-8 w-8 animate-heartbeat" />
            <div>
              <p className="text-sm font-semibold">Hierrito · Asistente IA</p>
              <p className="text-xs opacity-80">Te guío por NutriHierro</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex animate-fade-up ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {pending ? (
              <div className="flex gap-1 px-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-primary/70"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 ? (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => void send(s)}
                  className="animate-pop rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="flex items-center gap-2 border-t border-border/70 px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(text);
            }}
          >
            <Input
              value={text}
              maxLength={500}
              placeholder="Escribe tu pregunta…"
              onChange={(e) => setText(e.target.value)}
              className="h-9 rounded-full"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0 rounded-full" disabled={pending}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : null}
    </>
  );
}