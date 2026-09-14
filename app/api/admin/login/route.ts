import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (typeof password !== "string" || !password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
