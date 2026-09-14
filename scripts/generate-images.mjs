import { writeFileSync, readFileSync, existsSync, mkdirSync, unlinkSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

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

// Photography realism suffix appended to every prompt
const PHOTO_SUFFIX =
  ", professional editorial photography, shot on a Sony A7IV with an 85mm lens, natural golden hour lighting, shallow depth of field, magazine quality, hyper-realistic, NOT illustration, NOT cartoon, NOT clipart, NOT 3D render";

const images = [
  {
    filename: "hero.jpg",
    prompt:
      "Wide shot of a suburban Australian backyard fully transformed into a thriving micro farm ecosystem, raised timber garden beds overflowing with vegetables, a timber chicken coop, a Flow Hive beehive, family silhouette in background, warm dusk golden light, lush and abundant",
  },
  {
    filename: "story-1.jpg",
    prompt:
      "Empty plain suburban Australian backyard, just a flat lawn and a timber fence, slightly overcast gentle light, quiet before feeling, nobody home",
  },
  {
    filename: "story-2.jpg",
    prompt:
      "Fresh raised garden beds being built in a suburban backyard, dark rich soil being shovelled into new timber frames, a pair of hands working in frame, warm afternoon light, sawdust and earth on the ground",
  },
  {
    filename: "story-3.jpg",
    prompt:
      "Flourishing suburban vegetable garden in raised timber beds, close-up on lush tomato plants, leafy greens and herbs, soft bokeh background of a wooden fence, morning dew on leaves",
  },
  {
    filename: "story-4.jpg",
    prompt:
      "Free-range chickens moving through a lush thriving suburban backyard garden, golden late-afternoon light, motion-blurred wings, rustic timber coop visible in background, warm and alive scene",
  },
  {
    filename: "story-5.jpg",
    prompt:
      "Close-up of a Flow Hive beehive frame with live bees crawling on golden honeycomb, soft garden background blurred behind, warm backlit honey glow, a few bees in flight",
  },
  {
    filename: "story-6.jpg",
    prompt:
      "Wide scene of a complete suburban micro farm at dusk, lush vegetable garden beds, timber chicken coop with chickens, a Flow Hive beehive, a small fluffy miniature Highland cow, an Australian family of four harvesting vegetables together, warm golden hour light, joyful and quiet mood",
  },
  {
    filename: "mini-cow-closeup.jpg",
    prompt:
      "Intimate portrait of a miniature Highland cow with a fluffy reddish-brown coat, looking gently toward camera, soft warm natural light, suburban timber fence softly blurred in background, gentle and kind expression, close composition",
  },
  {
    filename: "eggs.jpg",
    prompt:
      "A small wicker basket of fresh brown eggs resting on a rustic weathered timber surface, soft diffused window light from the side, a few loose feathers nearby, clean and intimate",
  },
  {
    filename: "honey.jpg",
    prompt:
      "Raw honey dripping slowly from a wooden honey dipper into a clear glass jar, warm golden backlight making the honey glow amber, blurred garden visible through a window behind",
  },
  {
    filename: "dairy.jpg",
    prompt:
      "Fresh milk being poured from a small jug into a glass on a rustic timber kitchen counter, beside a small round of handmade butter and a piece of fresh cheese on a board, warm morning kitchen light",
  },
  {
    filename: "vegetables.jpg",
    prompt:
      "Pair of hands gently harvesting ripe tomatoes from a lush raised garden bed, close and intimate framing, warm afternoon sun creating lens flare, earth still on fingertips",
  },
];

// Delete old images that are no longer used in the new design
const oldImages = [
  "mini-cow.jpg",
  "chickens.jpg",
  "garden.jpg",
  "bees.jpg",
  "journey-1.jpg",
  "journey-2.jpg",
  "journey-3.jpg",
  "journey-4.jpg",
  "journey-5.jpg",
  "journey-6.jpg",
];

for (const old of oldImages) {
  const p = join(OUTPUT_DIR, old);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log(`Removed old image: ${old}`);
  }
}

async function generateImage(filename, prompt) {
  const outputPath = join(OUTPUT_DIR, filename);
  if (existsSync(outputPath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return;
  }

  console.log(`Generating ${filename}...`);

  const fullPrompt = prompt + PHOTO_SUFFIX;

  const response = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-imagine-image",
      prompt: fullPrompt,
      n: 1,
      response_format: "b64_json",
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
      writeFileSync(outputPath, buffer);
      console.log(`Saved ${filename} (from URL)`);
      return;
    }
    throw new Error(`No image data returned for ${filename}`);
  }

  const buffer = Buffer.from(b64, "base64");
  writeFileSync(outputPath, buffer);
  console.log(`Saved ${filename}`);
}

async function main() {
  console.log(`\nMicro Farms Australia — Image Generator (Redesign)`);
  console.log(`Generating ${images.length} photorealistic images...\n`);

  for (const { filename, prompt } of images) {
    try {
      await generateImage(filename, prompt);
      await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
      console.error(`Failed ${filename}: ${err.message}`);
    }
  }

  console.log(`\nDone. Run npm run dev to preview.\n`);
}

main();
