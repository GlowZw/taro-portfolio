# Taro Kaseke — Portfolio

Built with Next.js + Tailwind CSS. Four case studies: School Connect + Web
Admin Portal, PDT Alumni Management Platform, PDT Communications API, and
the Robot Build & Robotics Competition.

## Before you deploy

Edit `src/data/profile.ts`:

- `email`, `phone`, `linkedin`, `github` — fill in whatever you want shown.
  Leave any as `""` to hide it.
- `formspreeId` — optional. Sign up free at https://formspree.io, create a
  form, and paste its ID here to get a working contact form with no backend.
  If left blank, the form falls back to opening the visitor's email client
  addressed to you.
- Drop your headshot at `public/images/headshot.jpg` (any image works, the
  path just needs to match `photoPath` in profile.ts).
- Drop your résumé PDF at `public/resume.pdf`. The download button appears
  automatically once the file exists — no code change needed.

Edit `src/data/projects.ts` if any facts/dates need tweaking.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel (free)

**Option A — GitHub import (recommended):**

1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com → "Add New… → Project" → import that repo.
3. Leave all defaults (Vercel auto-detects Next.js) → Deploy.
4. You get a free `your-project.vercel.app` URL. Add a custom domain later
   from the project's Settings → Domains if you want one.

**Option B — Vercel CLI, no GitHub needed:**

```bash
npm install -g vercel
vercel login
vercel        # first deploy, follow the prompts
vercel --prod # promote to your production URL
```

Either way, redeploying after an edit is automatic (GitHub: every push;
CLI: run `vercel --prod` again).
