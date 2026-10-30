export type Project = {
  slug: string;
  title: string;
  dates: string;
  tagline: string;
  color: "violet" | "cyan" | "amber" | "rose";
  stack: string[];
  summary: string[];
  highlights: { title: string; detail: string }[];
  lessons: string[];
  images?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "school-connect",
    title: "School Connect + Web Admin Portal",
    dates: "May – Sep 2026",
    tagline:
      "A multi-tenant school management platform spanning a React Native mobile app and a separate web admin portal — built, broken, diagnosed, and re-secured in public view.",
    color: "violet",
    stack: ["React Native", "Expo / Expo Router", "TypeScript", "Firebase Auth", "Firestore", "Firebase Storage", "React Query", "React", "Vite"],
    summary: [
      "School Connect started as a mobile app with separate Parent, Teacher, and Admin experiences — attendance, classes, calendar, lunch menus, fee management, messaging — and grew into a multi-school platform with a Super Admin layer once a second school came on board.",
      "A hard rule carried through the whole build: never weaken Firestore security while fixing a feature. That constraint shaped almost every fix, including a full tenant-integrity diagnostic pass when a school-ID mismatch started causing permission errors across the Admin dashboard.",
      "In July the platform split in two: the mobile app stayed as-is for day-to-day use, and a new web-based Admin Portal (React + Vite) was built on the same Firebase backend for the administrative work a phone screen doesn't suit — without creating a second, divergent data model.",
    ],
    highlights: [
      {
        title: "Multi-tenant architecture under load",
        detail:
          "Introduced school selection, tenant-aware Firestore rules, and a Super Admin role that manages schools, admins, teachers, and billing across tenants — built incrementally so existing single-school behaviour never broke.",
      },
      {
        title: "Diagnosed a silent permission failure",
        detail:
          "Admin users started seeing 'Missing or insufficient permissions' errors system-wide. Traced it to inconsistent schoolId values and incomplete profiles, then wrote diagnose/repair scripts rather than patching the symptom — and standardised the canonical school ID going forward.",
      },
      {
        title: "Web Admin Portal, not a mobile port",
        detail:
          "Built as its own React/Vite app reusing the same Firebase project and auth, with its own authorization pipeline for School Admins. A later refactor of that pipeline caused a login regression — fixed the same day by tracing the auth/tenant provider chain rather than reverting the whole change.",
      },
      {
        title: "Mobile-specific correctness",
        detail:
          "Fixed UI overlap with Android status bars, gesture areas, and notches with a reusable safe-area component used across every screen — the kind of fix that's invisible when it works and visible on every device when it doesn't.",
      },
    ],
    lessons: [
      "A security rule is a promise to every tenant on the platform — 'don't weaken Firestore rules' held even under deadline pressure.",
      "A permission error reported as one bug is often several — schoolId drift, stale profiles, and inconsistent paths all surfaced from the same symptom.",
      "Splitting a mobile app and a web admin portal only works if they share one backend truth, not two parallel data models.",
    ],
    images: [
      { src: "/images/projects/school-connect/01-admin-dashboard.jpg", alt: "School Connect Admin dashboard" },
      { src: "/images/projects/school-connect/02-teacher-portal.jpg", alt: "School Connect Teacher portal" },
      { src: "/images/projects/school-connect/03-parent-portal.jpg", alt: "School Connect Parent portal" },
      { src: "/images/projects/school-connect/04-lunch-menu.jpg", alt: "School Connect lunch menu screen" },
      { src: "/images/projects/school-connect/05-webadmin-signin.jpg", alt: "Web Admin Portal sign-in screen" },
      { src: "/images/projects/school-connect/06-webadmin-dashboard.jpg", alt: "Web Admin Portal dashboard" },
      { src: "/images/projects/school-connect/07-webadmin-usermgmt.jpg", alt: "Web Admin Portal user management" },
    ],
  },
  {
    slug: "pdt-alumni-platform",
    title: "PDT Alumni Management Platform",
    dates: "Jun – Jul 2026",
    tagline:
      "An alumni CRM for Precision Drone Training — imports, licence/medical expiry tracking, birthdays, dashboards, and reporting — built from a blank Firebase project to a responsive PWA in about six weeks.",
    color: "cyan",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Firebase Auth", "Firestore", "Firebase Storage", "React Router", "React Hook Form"],
    summary: [
      "Built from Phase 1 — authentication, an alumni database, forms, birthdays, licence/medical expiry tracking, document storage, and a dashboard — into a fuller CRM with campaign/reminder infrastructure and industry-specific reporting for training-area breakdowns.",
      "The import pipeline was the platform's hardest problem: Excel/CSV data from training records doesn't arrive clean, and Firestore's batch writes reject documents with undefined fields outright rather than writing partial data.",
      "Later passes added production-readiness work most CRUD apps skip until something breaks: inactivity auto-logout, session timeout, logout confirmation, and full responsive/PWA conversion so it works as well on a tablet at the front desk as on a laptop.",
    ],
    highlights: [
      {
        title: "Fixed a Firestore batch-write failure at the root",
        detail:
          "WriteBatch.set() was rejecting entire import batches because of a single undefined field (alternativeMobile) in otherwise-valid rows. Fixed the import pipeline to sanitise and validate per-field rather than letting one bad column fail a whole batch — paired with duplicate detection on the way in.",
      },
      {
        title: "Expiry tracking that's actually usable",
        detail:
          "Licence and medical expiry views got pagination, month/location filters, dropdown-constrained fields (gender, licence category), and dashboard cards that link straight into the filtered expiry list — turning a flat table into something a non-technical admin can act on.",
      },
      {
        title: "Security and session handling",
        detail:
          "Added role-based Firestore/Storage rules for admin vs marketing roles, inactivity auto-logout with a logout-confirmation dialog, and fixed an admin-profile detection bug that was misclassifying accounts after the auth refactor.",
      },
      {
        title: "Full responsive + PWA pass",
        detail:
          "Took the whole application through a desktop/tablet/mobile responsive pass and converted it into an installable PWA, including a redesigned date/time widget that had broken on smaller screens.",
      },
    ],
    lessons: [
      "A single bad field can take down an entire import batch — validate per-record, not just per-file.",
      "Admin tools live or die on their filters: pagination and month/location filtering turned a data dump into something people actually used.",
      "Session handling (timeouts, confirmations) is a feature, not polish — it's what makes a CRM safe to leave open at a front desk.",
    ],
    images: [
      { src: "/images/projects/alumni-platform/01-dashboard.png", alt: "PDT Alumni Platform dashboard" },
    ],
  },
  {
    slug: "pdt-communications-api",
    title: "PDT Communications API",
    dates: "Aug – Sep 2026",
    tagline:
      "A Cloudflare Worker that sends every email for the PDT Alumni Platform through Resend — no servers to patch or keep awake, and a security pipeline every request has to clear first.",
    color: "amber",
    stack: ["Cloudflare Workers", "TypeScript", "Resend", "Firebase Auth", "Cloudflare R2", "Cloudflare KV", "Vitest", "zod", "jose"],
    summary: [
      "Every request passes through a layered pipeline before anything gets sent: rate limiting, bearer-token auth, Firebase ID-token verification with a live Firestore permission check, timestamp-and-nonce replay protection, then input sanitisation. A daily cron job reads Firestore every morning and sends licence-expiry reminders and birthday emails on its own.",
      "Cloudflare Workers run on a strict CPU-time budget per request, and large attachments or large text bodies could blow straight through it — with sanitisation cost scaling with size. Instead of guessing a safe limit, I measured it: 500 calls at each size until I could see exactly where the budget broke.",
      "Images were a separate problem: base64-encoding them inflated every request, and Resend's batch-send endpoint doesn't support attachments at all. Images now upload once to R2, get served from their own endpoint, and the email HTML is rewritten to reference them as inline cid: attachments instead of embedding the bytes directly.",
    ],
    highlights: [
      {
        title: "Measured, not guessed, resource limits",
        detail:
          "Plain text stayed clean to about 40KB, was 9% over budget at 100KB, and 100% over at 400KB. Base64 content stayed clean to 150KB. The shipped caps — 300KB per request body, 20,000 characters of text — came straight out of that data.",
      },
      {
        title: "Found a silent data-shape bug",
        detail:
          "Birthday emails were going out with an empty body. Older templates stored a flat body string instead of the newer structured format — the admin frontend quietly upgraded old templates the moment anyone viewed them, but the Worker reads Firestore directly and skipped that step entirely. A fix that worked perfectly in the UI never reached the backend that actually sends the mail.",
      },
      {
        title: "R2-backed inline images",
        detail:
          "Campaign images upload once to R2 (with a magic-byte content check and size cap), get served from a dedicated endpoint, and are attached to outgoing emails as cid: references — avoiding both the base64 size inflation and Resend's batch-attachment limitation.",
      },
      {
        title: "Tested inside the real runtime",
        detail:
          "185 tests across 23 files, run inside the actual Workers runtime (via @cloudflare/vitest-pool-workers) rather than a Node approximation of it — catching platform-specific CPU and API behaviour that a generic mock would miss.",
      },
    ],
    lessons: [
      "Don't guess a resource limit — measure the actual behaviour at the boundary and set the cap from data.",
      "A fix that happens silently on read (like a frontend template upgrade) can mask a bug that's still live wherever something reads the raw data directly.",
      "Serverless platforms come with hard limits — CPU time, what a batch API will and won't do — that shape the architecture, not just the code.",
      "Testing inside the actual runtime, not a generic mock, is what catches platform-specific failures before production does.",
    ],
    images: [
      { src: "/images/projects/comms-api/01-resend-logs.jpg", alt: "Resend delivery logs dashboard" },
      { src: "/images/projects/comms-api/02-resend-metrics.jpg", alt: "Resend metrics dashboard" },
      { src: "/images/projects/comms-api/03-cloudflare-metrics.jpg", alt: "Cloudflare Worker invocation and CPU metrics" },
      { src: "/images/projects/comms-api/04-cloudflare-overview.jpg", alt: "Cloudflare Worker deployment overview" },
    ],
  },
  {
    slug: "robot-build",
    title: "Robot Build & Robotics Competition",
    dates: "Sep 2026",
    tagline:
      "Away from the keyboard: a 4-wheel, Bluetooth-controlled robot built from scratch in a week, then handed to two junior students who took it to its first competition.",
    color: "rose",
    stack: ["Arduino Uno", "L298N motor driver", "HC-05 Bluetooth module", "DC geared motors", "Li-ion battery pack", "Arduino IDE", "Bluetooth Terminal (Android)"],
    summary: [
      "With the TME Education Robot Soccer Competition set for 26 September, I started building a 4-wheel robot from scratch on 17 September: an Arduino Uno, an L298N motor driver, four DC geared motors, an HC-05 Bluetooth module, and a Li-ion battery pack, controlled from a phone over Bluetooth.",
      "Tutorials got the build started but didn't cover what a specific build needs on power — motor count, battery capacity, what the driver board could actually handle. A visit to Hi Tech Electronics in Harare filled that gap. I also swapped soldering for a hot glue gun to assemble the chassis — faster, and more forgiving of a few redos.",
      "A full week of evenings later, the robot was built, programmed, and tested — with one week left before the competition, which went to training two junior students on how to actually operate it.",
    ],
    highlights: [
      {
        title: "Built two chassis to choose one",
        detail:
          "Two chassis sat on the desk at once while wiring and weight distribution were worked out, before settling on the one that made it to competition day — rather than committing to the first attempt.",
      },
      {
        title: "Verified before coding",
        detail:
          "First power-on was its own milestone: lights on, nothing driving yet, but proof the wiring was right before the code went anywhere near the motors.",
      },
      {
        title: "Bluetooth command-and-test loop",
        detail:
          "Control came through a Bluetooth Terminal Android app: commands typed on the phone went to the HC-05, which passed them to the Arduino Uno to run the motors — the same path used to test and iterate, one command at a time.",
      },
      {
        title: "Competition day, 26 Sep",
        detail:
          "At the Robot Soccer Competition marking 10 years of TME Education, held at the Eight2Five Innovation Hub in Harare, two junior students from the team took the robot onto the pitch for their first-ever match — a draw, with the result mattering less than watching two first-timers go from a pile of parts to a live match.",
      },
    ],
    lessons: [
      "Tutorials get you started, but they won't tell you what your specific build needs — a conversation with someone who sells the parts filled the gap on power requirements.",
      "New methods are worth testing mid-project — swapping solder for a hot glue gun turned out to be faster and more forgiving for this build.",
      "Don't commit to the first attempt — having two chassis on the desk at once made it possible to compare and choose.",
      "A build that works is only half the job — someone still has to learn how to run it.",
    ],
    images: [
      { src: "/images/projects/robot-build/01-parts-laid-out.jpg", alt: "All robot parts laid out before assembly" },
      { src: "/images/projects/robot-build/02-wiring-motors.jpg", alt: "Wiring the motors to the L298N driver" },
      { src: "/images/projects/robot-build/03-first-power-on.jpg", alt: "First power-on test of the robot" },
      { src: "/images/projects/robot-build/04-labeled-parts.png", alt: "Labeled diagram of all robot parts" },
      { src: "/images/projects/robot-build/05-finished-robot.jpg", alt: "The finished robot" },
      { src: "/images/projects/robot-build/07-robots-closeup.jpg", alt: "Close-up of robots on the competition pitch" },
    ],
  },
];
