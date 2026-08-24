import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HeartLogo } from "@/components/HeartLogo";

const links = [
  { to: "/", label: "Sobre la anemia" },
  { to: "/medidor", label: "Medidor de anemia" },
  { to: "/calendario", label: "Recetario" },
  { to: "/mapa", label: "Centros de salud" },
  { to: "/mitos", label: "Mitos y verdades" },
  { to: "/comunidad", label: "Comunidad" },
] as const;

export function SiteHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 animate-fade-in border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <HeartLogo className="h-9 w-9 icon-3d" />
          <span className="font-display text-xl font-semibold aurora-text">NutriHierro</span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="nav-3d rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-muted-foreground sm:inline">Hola, {user}</span>
          <Button variant="outline" size="sm" className="btn-3d" onClick={logout}>
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        <p className="flex items-center gap-2 font-display text-lg aurora-text">
          <HeartLogo className="h-6 w-6 icon-3d" />
          NutriHierro
        </p>
        <p className="mt-2 max-w-2xl">
          Contenido educativo sobre anemia ferropénica y alimentación rica en hierro. No sustituye
          la consulta médica ni un análisis de sangre.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} NutriHierro</p>
      </div>
    </footer>
  );
}