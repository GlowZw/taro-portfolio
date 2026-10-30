import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-cyan">
          Projects
        </h2>
        <p className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Things I&apos;ve shipped, broken, fixed, and shipped again.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
