import { profile } from "@/data/profile";
import { publicFileExists } from "@/lib/publicFile";
import ContactForm from "./ContactForm";

export default function Contact() {
  const hasResume = publicFileExists(profile.resumePath);

  const links = [
    profile.email && { label: profile.email, href: `mailto:${profile.email}`, icon: "✉" },
    profile.phone && { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: "☎" },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin, icon: "in" },
    profile.github && { label: "GitHub", href: profile.github, icon: "⌁" },
  ].filter(Boolean) as { label: string; href: string; icon: string }[];

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 rounded-3xl border border-card-border bg-card p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-cyan">
              Contact
            </h2>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight">
              Let&apos;s build something.
            </p>
            <p className="mt-4 text-muted">
              Open to software development, data/AI, and internship or graduate roles. I reply
              fastest by email.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm font-medium text-muted transition hover:text-foreground"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border text-xs">
                    {l.icon}
                  </span>
                  {l.label}
                </a>
              ))}
              {links.length === 0 && (
                <p className="text-sm text-muted">
                  Add your email, LinkedIn, and GitHub in{" "}
                  <code className="rounded bg-background-alt px-1.5 py-0.5">src/data/profile.ts</code>.
                </p>
              )}
            </div>

            <div className="mt-8">
              {hasResume ? (
                <a
                  href={profile.resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold transition hover:border-violet-soft hover:text-violet-soft"
                >
                  Download résumé ↓
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold text-muted/60">
                  Résumé coming soon
                </span>
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
