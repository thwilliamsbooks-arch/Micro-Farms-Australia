import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export interface Lead {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  backyardSize: string;
  interests: string[];
  ownerStatus: string;
  packagePreference: string;
  bestTimeToContact: string;
  message: string;
}

// Serializes writes so concurrent submissions can't clobber each other's read-modify-write.
let writeQueue: Promise<unknown> = Promise.resolve();

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function getLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export async function saveLead(
  lead: Omit<Lead, "id" | "submittedAt">
): Promise<Lead> {
  const record: Lead = {
    ...lead,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  const task = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const leads = await readLeads();
    leads.push(record);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  });
  writeQueue = task.catch(() => {});
  await task;

  return record;
}
