import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © 2026 {profile.name}
        </p>
        <p>Built with Next.js, deployed on Vercel.</p>
      </div>
    </footer>
  );
}
