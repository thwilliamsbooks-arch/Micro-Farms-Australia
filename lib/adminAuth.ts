import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "mfa_admin_session";

function getSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable is not set.");
  }
  return password;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string): boolean {
  return safeEqual(password, getSecret());
}

export function createSessionToken(): string {
  return createHmac("sha256", getSecret()).update("mfa-admin-session").digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  return safeEqual(token, createSessionToken());
}
