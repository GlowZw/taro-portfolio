// Edit this file to update your contact info, headline, and bio.
// Leave a value as "" to hide that item on the site.

export const profile = {
  name: "Taropafadzwa Isaiah Kaseke",
  shortName: "Taro Kaseke",
  headline: "Software & AI Developer | Data Analyst | Data Science Instructor",
  tagline:
    "I build production software — mobile apps, admin platforms, serverless APIs — and direct AI coding tools to get there faster, without skipping the engineering.",
  location: "Harare, Zimbabwe",
  affiliation: "Industrial Attachment Student, Africa University — at Zimbabwe Flying Labs",

  // --- Contact / links. Fill these in; leave "" to hide. ---
  email: "", // e.g. "taro.kaseke@example.com"
  phone: "", // e.g. "+263 7X XXX XXXX"
  linkedin: "", // e.g. "https://www.linkedin.com/in/your-handle"
  github: "", // e.g. "https://github.com/your-handle"

  // Formspree form id (free tier: https://formspree.io). Leave "" to fall back
  // to a mailto link for the contact form.
  formspreeId: "",

  // Path under /public to the resume PDF. If the file doesn't exist yet,
  // the download button will show "Resume coming soon" automatically.
  resumePath: "/resume.pdf",

  // Path under /public to the headshot photo.
  photoPath: "/images/headshot.jpg",
};

export const bio = [
  "I'm an industrial attachment student in Computer Science at Africa University, currently placed at Zimbabwe Flying Labs, where I work across software development, data analysis, and data science instruction.",
  "Over this placement I've shipped a multi-tenant school management platform, a drone-training alumni CRM, a serverless email API handling the platform's production mail, and — away from the keyboard — built and fielded a 4-wheel Bluetooth-controlled robot at a national schools robotics competition.",
  "I use AI coding tools (Claude Code, Codex) deliberately: directing them, reviewing their output, and reverting what doesn't hold up — not handing them the keys. Alongside development, I teach Python and Power BI to high school students as part of the attachment's data science training track.",
];

export const skills = {
  "Frontend / Mobile": [
    "React",
    "React Native (Expo)",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "Responsive & PWA UI",
  ],
  "Backend / Cloud": [
    "Firebase (Auth, Firestore, Storage)",
    "Cloudflare Workers",
    "Node.js",
    "Python / FastAPI",
    "REST APIs & webhooks",
  ],
  "Data & AI": [
    "Power BI",
    "Python (DataCamp curriculum)",
    "AI-directed development (Claude Code, Codex)",
    "Data import/validation pipelines",
  ],
  "Architecture & Practice": [
    "Multi-tenant security design",
    "Role-based access control",
    "Firestore security rules",
    "Automated testing (Vitest)",
    "Non-regression, incremental delivery",
  ],
  "Hardware": ["Arduino", "Motor drivers (L298N)", "Bluetooth (HC-05)", "Basic electronics assembly"],
};
