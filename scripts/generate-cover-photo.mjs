import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images");

// Load .env.local
const envPath = join(__dirname, "../.env.local");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const API_KEY = process.env.XAI_API_KEY;
if (!API_KEY) {
  console.error("XAI_API_KEY is not set. Add it to your .env.local file.");
  process.exit(1);
}

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const RAW_PATH = join(OUTPUT_DIR, "facebook-cover.jpg");
const CROPPED_PATH = join(OUTPUT_DIR, "facebook-cover-1640x624.jpg");
const FINAL_PATH = join(OUTPUT_DIR, "facebook-cover-final.jpg");

const COVER_WIDTH = 1640;
const COVER_HEIGHT = 624;

const PROMPT =
  "A warm, joyful Australian family in their suburban backyard micro farm at golden hour — parents and children together, one child holding a basket of fresh eggs, a thriving vegetable garden with raised beds in the background, a chicken coop with hens roaming nearby, soft golden sunset light, genuine candid lifestyle photography feel, wide horizontal composition, professional editorial photography, shot on a Sony A7iv, natural lighting, shallow depth of field, magazine quality, hyper-realistic, NOT illustration, NOT cartoon, NOT clipart, NOT 3D render";

async function generateRawImage() {
  console.log("Generating cover photo source image via xAI...");

  const response = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-imagine-image",
      prompt: PROMPT,
      n: 1,
      response_format: "b64_json",
      // 20:9 is the widest aspect ratio the Imagine API supports, at the
      // highest available resolution tier.
      aspect_ratio: "20:9",
      resolution: "2k",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const b64 = data.data?.[0]?.b64_json;

  if (!b64) {
    const url = data.data?.[0]?.url;
    if (url) {
      const imgRes = await fetch(url);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      writeFileSync(RAW_PATH, buffer);
      console.log(`Saved ${RAW_PATH} (from URL)`);
      return;
    }
    throw new Error("No image data returned from xAI API");
  }

  const buffer = Buffer.from(b64, "base64");
  writeFileSync(RAW_PATH, buffer);
  console.log(`Saved ${RAW_PATH}`);
}

async function cropForFacebook() {
  console.log(`Cropping to ${COVER_WIDTH}x${COVER_HEIGHT}...`);

  await sharp(RAW_PATH)
    .resize(COVER_WIDTH, COVER_HEIGHT, {
      fit: "cover",
      // Attention-based cropping keeps the most visually salient region
      // (the family / subjects) in frame instead of a naive center crop.
      position: sharp.strategy.attention,
    })
    .jpeg({ quality: 92 })
    .toFile(CROPPED_PATH);

  console.log(`Saved ${CROPPED_PATH}`);
}

function buildOverlaySvg() {
  // Text sits in the lower-right, clear of Facebook's profile-picture
  // circle which overlaps the lower-left corner of the cover photo.
  // A "to-left" dark gradient (matching the site's warm brown overlay
  // style used elsewhere) sits behind the text for legibility.
  return `
<svg width="${COVER_WIDTH}" height="${COVER_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textBg" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="rgba(42,31,20,0.88)" />
      <stop offset="55%" stop-color="rgba(42,31,20,0.35)" />
      <stop offset="100%" stop-color="rgba(42,31,20,0)" />
    </linearGradient>
    <linearGradient id="textBgV" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="rgba(42,31,20,0.55)" />
      <stop offset="100%" stop-color="rgba(42,31,20,0)" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${COVER_WIDTH}" height="${COVER_HEIGHT}" fill="url(#textBgV)" />
  <rect x="${COVER_WIDTH * 0.42}" y="0" width="${COVER_WIDTH * 0.58}" height="${COVER_HEIGHT}" fill="url(#textBg)" />
  <text
    x="${COVER_WIDTH - 56}"
    y="${COVER_HEIGHT - 78}"
    text-anchor="end"
    font-family="Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-weight="400"
    font-size="64"
    letter-spacing="-0.5"
    fill="#FAF6EE"
  >Bring the Farm Home</text>
</svg>`;
}

async function addTextOverlay() {
  console.log("Adding text overlay...");

  const svg = buildOverlaySvg();

  await sharp(CROPPED_PATH)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile(FINAL_PATH);

  console.log(`Saved ${FINAL_PATH}`);
}

async function main() {
  console.log("\nMicro Farms Australia — Facebook Cover Photo Generator\n");

  if (existsSync(RAW_PATH)) {
    console.log(`Skipping generation, ${RAW_PATH} already exists.`);
  } else {
    await generateRawImage();
  }

  await cropForFacebook();
  await addTextOverlay();

  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
