# Micro Farms Australia

> **Bring the Farm Home** — We transform suburban backyards into thriving micro farm ecosystems.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Resend · Netlify

---

## Quick Start

### 1. Configure environment variables

Copy `.env.local` and fill in your keys:

```
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your@email.com
XAI_API_KEY=your_xai_api_key_here
```

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
| `/` | Home — hero, farm features, journey strip, packages, mini cow, testimonials |
| `/packages` | Three package tiers (Own It, Grow Into It, Experience It) + FAQ |
| `/about` | Mission, story, values, team |
| `/contact` | Enquiry form (submits via Resend) |
| `/api/contact` | Server-side email handler |

---

## Deploy to Netlify

1. Push to GitHub
2. Connect repo in Netlify
3. Set environment variables in Netlify dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy — `netlify.toml` handles the rest

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, SSG + SSR for API route)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (scroll-triggered, hover lifts)
- **Fonts:** Playfair Display · Lato · Caveat (Google Fonts)
- **Email:** Resend API
- **Image generation:** xAI (grok-2-image model)
- **Deployment:** Netlify

---

## Image Generation

Run `npm run generate-images` with your `XAI_API_KEY` set. The script:

- Generates 11 images via the xAI API (hero, mini-cow, chickens, garden, bees, journey-1 through journey-6)
- Saves to `public/images/`
- Skips any images that already exist
- Falls back gracefully — all image slots have emoji placeholders until real images are added
