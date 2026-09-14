"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "transparent",
  borderBottom: "1px solid rgba(61,43,31,0.2)",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  paddingTop: "10px",
  paddingBottom: "10px",
  color: "#3D2B1F",
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 300,
  fontSize: "0.9rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "rgba(61,43,31,0.5)",
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 400,
};

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Incorrect password.");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#FAF6EE" }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <form onSubmit={handleSubmit} className="max-w-sm w-full">
        <p
          className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4 text-center"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
        >
          Micro Farms Australia
        </p>
        <h1
          className="text-[#3D2B1F] text-center mb-10"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "2rem",
          }}
        >
          Admin access
        </h1>

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          required
          autoFocus
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p
            className="text-red-600 text-xs mt-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-10 py-4 text-xs tracking-[0.25em] uppercase transition-all disabled:opacity-40"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            border: "1px solid #D4A24C",
            color: "#FAF6EE",
            backgroundColor: "#D4A24C",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
