import { skills } from "@/data/profile";

const accent = ["border-violet/40", "border-cyan/40", "border-amber/40", "border-rose/40", "border-violet-soft/40"];

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-cyan">
          Skills
        </h2>
        <p className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          What I actually build with.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, items], i) => (
            <div
              key={group}
              className={`rounded-2xl border bg-card p-6 ${accent[i % accent.length]}`}
            >
              <h3 className="font-display text-base font-bold">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-background-alt px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
