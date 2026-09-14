"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const interests = [
  "Chickens",
  "Garden Beds",
  "Bees / Flow Hive",
  "Mini Cow or Milking Sheep",
  "Full Ecosystem Package",
];

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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    suburbState: "",
    backyardSize: "",
    interests: [] as string[],
    ownerStatus: "",
    paymentPreference: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div
          className="w-px h-16 bg-[#D4A24C] mx-auto mb-8"
          style={{ opacity: 0.5 }}
        />
        <h3
          className="text-[#3D2B1F] mb-4"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 300,
            fontSize: "1.8rem",
            fontStyle: "italic",
          }}
        >
          Message received.
        </h3>
        <p
          className="text-[#3D2B1F]/50 text-sm leading-relaxed max-w-xs mx-auto"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
        >
          We&apos;ll be in touch within one business day to chat about your
          backyard transformation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            required
            placeholder="Jane Smith"
            style={inputStyle}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            required
            placeholder="jane@example.com"
            style={inputStyle}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      {/* Phone + Suburb */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            placeholder="04XX XXX XXX"
            style={inputStyle}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>Suburb & State *</label>
          <input
            type="text"
            required
            placeholder="Springfield, QLD"
            style={inputStyle}
            value={formData.suburbState}
            onChange={(e) => setFormData({ ...formData, suburbState: e.target.value })}
          />
        </div>
      </div>

      {/* Backyard size */}
      <div>
        <label style={labelStyle}>Approximate Backyard Size *</label>
        <select
          required
          style={{ ...inputStyle, cursor: "pointer" }}
          value={formData.backyardSize}
          onChange={(e) => setFormData({ ...formData, backyardSize: e.target.value })}
        >
          <option value="">Select size...</option>
          <option value="under-200">Under 200m²</option>
          <option value="200-500">200 – 500m²</option>
          <option value="500-quarter-acre">500m² – ¼ acre</option>
          <option value="quarter-acre-plus">¼ acre or more</option>
        </select>
      </div>

      {/* Interests */}
      <div>
        <label style={labelStyle}>What interests you most?</label>
        <div className="flex flex-wrap gap-2 mt-3">
          {interests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className="text-xs tracking-wide px-4 py-2 transition-all"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                border: formData.interests.includes(interest)
                  ? "1px solid #D4A24C"
                  : "1px solid rgba(61,43,31,0.2)",
                color: formData.interests.includes(interest)
                  ? "#D4A24C"
                  : "rgba(61,43,31,0.5)",
                backgroundColor: "transparent",
              }}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Renter / Homeowner */}
      <div>
        <label style={labelStyle}>Are you a renter or homeowner? *</label>
        <div className="flex gap-6 mt-3">
          {["Homeowner", "Renter"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ownerStatus"
                value={opt}
                required
                checked={formData.ownerStatus === opt}
                onChange={(e) => setFormData({ ...formData, ownerStatus: e.target.value })}
                style={{ accentColor: "#D4A24C" }}
              />
              <span
                className="text-sm text-[#3D2B1F]/60"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment preference */}
      <div>
        <label style={labelStyle}>Payment preference</label>
        <div className="flex flex-wrap gap-6 mt-3">
          {["Buy Outright", "Payment Plan", "Rental", "Not Sure Yet"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentPreference"
                value={opt}
                checked={formData.paymentPreference === opt}
                onChange={(e) => setFormData({ ...formData, paymentPreference: e.target.value })}
                style={{ accentColor: "#D4A24C" }}
              />
              <span
                className="text-sm text-[#3D2B1F]/60"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Message / Anything else</label>
        <textarea
          rows={4}
          placeholder="Tell us about your backyard and what you're dreaming of..."
          style={{ ...inputStyle, resize: "none" }}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {error && (
        <p
          className="text-red-600 text-xs"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all disabled:opacity-40"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          border: "1px solid rgba(61,43,31,0.3)",
          color: "#3D2B1F",
          backgroundColor: "transparent",
          cursor: submitting ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = "#D4A24C";
          (e.target as HTMLButtonElement).style.color = "#D4A24C";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.borderColor = "rgba(61,43,31,0.3)";
          (e.target as HTMLButtonElement).style.color = "#3D2B1F";
        }}
      >
        {submitting ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}
