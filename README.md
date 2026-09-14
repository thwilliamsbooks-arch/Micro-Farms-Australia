# Micro Farms Australia

> **Bring the Farm Home** — We transform suburban backyards into thriving micro farm ecosystems.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Resend · Vercel

---

## Quick Start

### 1. Configure environment variables

Copy `.env.example` to `.env.local` and fill in values:

```
RESEND_API_KEY=     # Resend API key — sends contact + free-inspection emails
CONTACT_EMAIL=      # Inbox that receives form submissions
ADMIN_PASSWORD=     # Password for /admin/leads
```

`XAI_API_KEY` is only needed locally for `npm run generate-images`. It is not used in production.

None of these are required for `npm run build`. Set them in the Vercel project (Production / Preview / Development) before relying on forms or the admin dashboard.

### 2. Generate site images (requires xAI API key)

```bash
npm run generate-images
```

This calls the xAI image generation API to create all 11 site images and saves them to `public/images/`. Images that already exist are skipped automatically.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Note:** Requires Node.js 20+. If you have nvm: `nvm use 20`

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, story sequence, product spread, packages, mini cow, testimonials |
| `/packages` | Three package tiers (Own It, Grow Into It, Experience It) + FAQ |
| `/about` | Mission, story, values, team |
| `/contact` | Enquiry form (submits via Resend) |
| `/free-inspection` | Free backyard assessment form (email + local lead store) |
| `/admin/leads` | Password-protected lead list |
| `/api/contact` | Contact form email handler |
| `/api/free-inspection` | Inspection form handler (persist lead + owner/customer email) |
| `/api/admin/login` | Admin session cookie |
| `/api/admin/logout` | Clear admin session |

---

## Deploy to Vercel

1. Import the GitHub repo in Vercel (Framework Preset: Next.js).
2. Set environment variables in the Vercel project:
   - `RESEND_API_KEY` — required for forms to send mail
   - `CONTACT_EMAIL` — destination inbox for submissions
   - `ADMIN_PASSWORD` — required to open `/admin/leads`
3. Deploy. `next.config.ts` is default (local images only; no remote image domains). Node 20+ is required.

`netlify.toml` remains for the previous Netlify setup and is unused on Vercel.

On Vercel, `/admin/leads` file storage is ephemeral (writes go to `/tmp`). Emails from Resend are the durable record of submissions.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSG + SSR for API route)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (scroll-triggered, hover lifts)
- **Fonts:** Playfair Display · Lato · Caveat (Google Fonts)
- **Email:** Resend API
- **Image generation:** xAI (grok-2-image model)
- **Deployment:** Vercel

---

## Image Generation

Run `npm run generate-images` with your `XAI_API_KEY` set. The script:

- Generates 11 images via the xAI API (hero, mini-cow, chickens, garden, bees, journey-1 through journey-6)
- Saves to `public/images/`
- Skips any images that already exist
- Falls back gracefully — all image slots have emoji placeholders until real images are added
