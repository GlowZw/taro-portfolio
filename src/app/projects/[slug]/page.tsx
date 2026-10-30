import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const colorText: Record<string, string> = {
  violet: "text-violet-soft",
  cyan: "text-cyan",
  amber: "text-amber",
  rose: "text-rose",
};

const colorChip: Record<string, string> = {
  violet: "bg-violet/15 text-violet-soft",
  cyan: "bg-cyan/15 text-cyan",
  amber: "bg-amber/15 text-amber",
  rose: "bg-rose/15 text-rose",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#projects"
            className="text-sm font-medium text-muted transition hover:text-foreground"
          >
            ← Back to projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorChip[project.color]}`}>
              {project.dates}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className={`mt-4 text-lg font-medium ${colorText[project.color]}`}>
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-card-border px-2.5 py-1 text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.images.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-video overflow-hidden rounded-xl border border-card-border bg-background-alt"
                >
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 space-y-5 text-lg leading-relaxed text-muted">
            {project.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold">Highlights</h2>
          <div className="mt-6 space-y-6">
            {project.highlights.map((h) => (
              <div key={h.title} className="rounded-2xl border border-card-border bg-card p-6">
                <h3 className={`font-display text-base font-bold ${colorText[project.color]}`}>
                  {h.title}
                </h3>
                <p className="mt-2 text-muted">{h.detail}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold">Lessons learnt</h2>
          <ul className="mt-6 space-y-3">
            {project.lessons.map((l, i) => (
              <li key={i} className="flex gap-3 text-muted">
                <span className={colorText[project.color]}>✦</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap gap-4 border-t border-card-border pt-8">
            <Link
              href="/#projects"
              className="rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold transition hover:border-violet-soft hover:text-violet-soft"
            >
              ← All projects
            </Link>
            <Link
              href="/#contact"
              className="rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
