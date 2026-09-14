"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const interestOptions = [
  "Chickens",
  "Garden Beds",
  "Bees/Flow Hive",
  "Mini Cow or Milking Sheep",
  "Full Ecosystem Package",
  "Not sure yet",
];

const backyardSizeOptions = [
  { value: "under-200", label: "Under 200m²" },
  { value: "200-500", label: "200 – 500m²" },
  { value: "500-quarter-acre", label: "500m² – ¼ acre" },
  { value: "quarter-acre-plus", label: "¼ acre or more" },
];

const packageOptions = [
  { value: "buy-outright", label: "Buy Outright" },
  { value: "payment-plan", label: "Payment Plan" },
  { value: "rental", label: "Rental" },
  { value: "not-sure", label: "Not sure yet" },
];

const timeOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
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

const radioLabelStyle: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontWeight: 300,
};

interface FormState {
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

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  suburb: "",
  backyardSize: "",
  interests: [],
  ownerStatus: "",
  packagePreference: "",
  bestTimeToContact: "",
  message: "",
};

export default function FreeInspectionForm() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
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
      const res = await fetch("/api/free-inspection", {
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
        className="py-16 text-center"
      >
        <div
          className="w-px h-16 bg-[#D4A24C] mx-auto mb-8"
          style={{ opacity: 0.5 }}
        />
        <p
          className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
        >
          You&apos;re booked in
        </p>
        <h3
          className="text-[#3D2B1F] mb-6"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 300,
            fontSize: "2.2rem",
            fontStyle: "italic",
          }}
        >
          Your free assessment is on its way.
        </h3>
        <p
          className="text-[#3D2B1F]/60 text-sm leading-relaxed max-w-sm mx-auto mb-10"
          style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
        >
          Check your inbox — we&apos;ve sent a confirmation with what happens
          next. We&apos;ll be in touch within 24 hours to book your visit and
          start designing your perfect micro farm.
        </p>
        <div className="flex flex-col gap-4 max-w-xs mx-auto text-left">
          {[
            "We'll call or email to book a time that suits you",
            "We visit (or assess remotely) and look at your space",
            "We design your micro farm and send a no-obligation quote",
          ].map((step, i) => (
            <div key={step} className="flex gap-4 items-start">
              <span
                className="text-[#D4A24C] text-xs mt-0.5"
                style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic" }}
              >
                {i + 1}
              </span>
              <span
                className="text-[#3D2B1F]/60 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
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
          <label style={labelStyle}>Phone *</label>
          <input
            type="tel"
            required
            placeholder="04XX XXX XXX"
            style={inputStyle}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label style={labelStyle}>Suburb *</label>
          <input
            type="text"
            required
            placeholder="Springfield, QLD"
            style={inputStyle}
            value={formData.suburb}
            onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
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
          {backyardSizeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Interests */}
      <div>
        <label style={labelStyle}>What are you interested in?</label>
        <div className="flex flex-wrap gap-2 mt-3">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
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
        <label style={labelStyle}>Renting or homeowner? *</label>
        <div className="flex gap-6 mt-3">
          {["Homeowner", "Renting"].map((opt) => (
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
              <span className="text-sm text-[#3D2B1F]/60" style={radioLabelStyle}>
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferred package type */}
      <div>
        <label style={labelStyle}>Preferred package type</label>
        <div className="flex flex-wrap gap-6 mt-3">
          {packageOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="packagePreference"
                value={opt.value}
                checked={formData.packagePreference === opt.value}
                onChange={(e) =>
                  setFormData({ ...formData, packagePreference: e.target.value })
                }
                style={{ accentColor: "#D4A24C" }}
              />
              <span className="text-sm text-[#3D2B1F]/60" style={radioLabelStyle}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Best time to contact */}
      <div>
        <label style={labelStyle}>Best time to contact you</label>
        <div className="flex flex-wrap gap-6 mt-3">
          {timeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="bestTimeToContact"
                value={opt.value}
                checked={formData.bestTimeToContact === opt.value}
                onChange={(e) =>
                  setFormData({ ...formData, bestTimeToContact: e.target.value })
                }
                style={{ accentColor: "#D4A24C" }}
              />
              <span className="text-sm text-[#3D2B1F]/60" style={radioLabelStyle}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Anything else?</label>
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
          border: "1px solid #D4A24C",
          color: "#FAF6EE",
          backgroundColor: "#D4A24C",
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Booking your assessment..." : "Get my free assessment"}
      </button>
    </form>
  );
}
