import { bio } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-cyan">
          About
        </h2>
        <div className="mt-4 space-y-5 text-lg leading-relaxed text-muted">
          {bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
