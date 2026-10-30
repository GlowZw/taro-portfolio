"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const hasFormspree = Boolean(profile.formspreeId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!hasFormspree) return; // let the mailto fallback form submit normally
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-card-border bg-background-alt px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition focus:border-violet";

  if (!hasFormspree && !profile.email) {
    return (
      <p className="text-sm text-muted">
        Contact form isn&apos;t configured yet — add a Formspree form ID or an email in{" "}
        <code className="rounded bg-background-alt px-1.5 py-0.5">src/data/profile.ts</code>.
      </p>
    );
  }

  return (
    <form
      action={
        hasFormspree
          ? undefined
          : profile.email
          ? `mailto:${profile.email}`
          : undefined
      }
      method={hasFormspree ? undefined : "post"}
      encType={hasFormspree ? undefined : "text/plain"}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className={inputClass}
        />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="What are you looking to build, or what's the role?"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "sent" && (
        <p className="text-sm font-medium text-cyan">Thanks — I&apos;ll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-rose">
          Something went wrong — email me directly at {profile.email || "the address above"}.
        </p>
      )}
      {!hasFormspree && (
        <p className="text-xs text-muted">
          This opens your email client addressed to {profile.email}.
        </p>
      )}
    </form>
  );
}
