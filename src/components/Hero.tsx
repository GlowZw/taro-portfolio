import Image from "next/image";
import { profile } from "@/data/profile";
import { publicFileExists } from "@/lib/publicFile";

export default function Hero() {
  const hasPhoto = publicFileExists(profile.photoPath);

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      {/* background blobs */}
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet/30 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-cyan/20 blur-3xl"
        style={{ animationDelay: "4s" }}
      />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose/20 blur-3xl"
        style={{ animationDelay: "8s" }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5 text-sm font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-cyan" />
            {profile.affiliation}
          </p>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-xl font-semibold text-gradient sm:text-2xl">
            {profile.headline}
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted md:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-card-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-violet-soft hover:text-violet-soft"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative shrink-0">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-violet via-cyan to-amber opacity-70 blur-2xl" />
          <div className="glow-ring relative h-56 w-56 overflow-hidden rounded-[2rem] border border-card-border bg-card sm:h-64 sm:w-64 md:h-72 md:w-72">
            {hasPhoto ? (
              <Image
                src={profile.photoPath}
                alt={profile.name}
                fill
                sizes="288px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                <span className="text-5xl font-display font-bold text-gradient">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="text-xs">Photo coming soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
