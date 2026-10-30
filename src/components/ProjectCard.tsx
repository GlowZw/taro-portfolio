import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

const colorMap: Record<Project["color"], { text: string; border: string; bg: string; chip: string }> = {
  violet: {
    text: "text-violet-soft",
    border: "hover:border-violet",
    bg: "from-violet/20",
    chip: "bg-violet/15 text-violet-soft",
  },
  cyan: {
    text: "text-cyan",
    border: "hover:border-cyan",
    bg: "from-cyan/20",
    chip: "bg-cyan/15 text-cyan",
  },
  amber: {
    text: "text-amber",
    border: "hover:border-amber",
    bg: "from-amber/20",
    chip: "bg-amber/15 text-amber",
  },
  rose: {
    text: "text-rose",
    border: "hover:border-rose",
    bg: "from-rose/20",
    chip: "bg-rose/15 text-rose",
  },
};

export default function ProjectCard({ project }: { project: Project }) {
  const c = colorMap[project.color];
  const cover = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition ${c.border}`}
    >
      <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${c.bg} to-transparent`}>
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className={`font-display text-3xl font-bold ${c.text}`}>{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-bold">{project.title}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${c.chip}`}>
            {project.dates}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-card-border px-2 py-1 text-xs text-muted"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md border border-card-border px-2 py-1 text-xs text-muted">
              +{project.stack.length - 4} more
            </span>
          )}
        </div>

        <span className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold ${c.text}`}>
          Read the case study
          <span className="transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
