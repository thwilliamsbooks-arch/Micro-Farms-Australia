"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FAF6EE" }}>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Our story
            </p>
            <h1
              className="text-[#3D2B1F] leading-[1.1] mb-6"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              We believe every family deserves a farm.
            </h1>
            <p
              className="text-[#3D2B1F]/50 text-sm leading-[1.85]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              Micro Farms Australia was born from a simple observation: millions
              of Australians dream of the country life but can&apos;t afford
              acreage. The land isn&apos;t the barrier — the knowledge and access
              is. We exist to bridge that gap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ backgroundColor: "#E8DCC8", borderTop: "1px solid rgba(61,43,31,0.08)" }}
        className="py-16 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "200+", label: "Backyards transformed" },
            { value: "6", label: "States & territories" },
            { value: "~15,000", label: "Eggs produced monthly" },
            { value: "100%", label: "Animal welfare first" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-[#3D2B1F] mb-1"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-[#8B6F47] text-xs"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              How it started
            </p>
            <h2
              className="text-[#3D2B1F] mb-10"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              The story behind the farm.
            </h2>

            <div
              className="space-y-6 text-[#3D2B1F]/60 text-sm leading-[1.9]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              <p>
                Trent Williams didn&apos;t grow up on a farm. He grew up on the
                Gold Coast, in the kind of small suburban yard most Australians
                know well — a patch of lawn, a Hills hoist, not much room to
                dream bigger.
              </p>
              <p>
                In 2020, Trent and his wife Linda made the move out to
                Jimboomba, chasing more space and a different pace of life.
                What started as a bit of extra room quickly became something
                more. They began raising animals, growing their own food, and
                living something close to the country life Trent had never had
                growing up. Fresh eggs each morning. A garden that actually fed
                the family. A different kind of quiet.
              </p>
              <p>
                It didn&apos;t take long for Trent to realise something: this
                life shouldn&apos;t be reserved for people who already had
                acreage. The peace, the self-sufficiency, the connection to
                real food — most Australian families want that. They just
                don&apos;t think it&apos;s possible in a normal suburban
                backyard.
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "rgba(61,43,31,0.75)",
                  fontWeight: 300,
                }}
              >
                &ldquo;You don&apos;t need to move to the country. We can bring
                the country to you.&rdquo; — Trent Williams
              </p>
              <p>
                Micro Farms Australia was built to prove it&apos;s possible.
                You don&apos;t need Jimboomba. You don&apos;t need a quarter
                acre (though it helps, for the mini cows). You need someone
                who&apos;s actually lived it, and knows how to bring it home to
                yours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        style={{ backgroundColor: "#E8DCC8", borderTop: "1px solid rgba(61,43,31,0.08)" }}
        className="py-24 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            What we stand for
          </p>
          <h2
            className="text-[#3D2B1F] mb-14"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Our values.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                name: "Natural Living",
                body: "We believe humans thrive when connected to the natural cycles of growing, harvesting, and nurturing. Micro farming restores that connection in everyday suburban life.",
              },
              {
                name: "Self-Sufficiency",
                body: "There is something deeply satisfying about feeding your family food you grew yourself. We help families take meaningful steps toward real self-sufficiency.",
              },
              {
                name: "Community",
                body: "A backyard micro farm has a way of bringing neighbourhoods together. Extra eggs shared over the fence. Honey jars at Christmas. Gardens that spark conversation.",
              },
              {
                name: "Animal Welfare",
                body: "Every animal we place is hand-selected for temperament and health. We prioritise the wellbeing of our animals above all else — they deserve a loving, appropriate home.",
              },
            ].map((v) => (
              <div key={v.name} className="border-t border-[#3D2B1F]/12 pt-8">
                <h3
                  className="text-[#3D2B1F] mb-3"
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "1.15rem",
                  }}
                >
                  {v.name}
                </h3>
                <p
                  className="text-[#3D2B1F]/55 text-sm leading-[1.8]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
          >
            The people
          </p>
          <h2
            className="text-[#3D2B1F] mb-14"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Meet the team.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#3D2B1F]/10">
            {[
              {
                name: "Trent Williams",
                role: "Founder & Head of Installations",
                bio: "Trent leads every install personally, bringing the hands-on experience of building his own family's micro farm in Jimboomba to every backyard Micro Farms Australia transforms.",
              },
              {
                name: "Linda Williams",
                role: "Head of Animal Care",
                bio: "Linda oversees the wellbeing of every animal that joins a Micro Farms Australia family — from chickens to mini cows — ensuring every family is set up to care for their new additions with confidence.",
              },
              {
                name: "Our Install Crew",
                role: "Tradespeople & Animal Handlers",
                bio: "Our growing crew of tradespeople and animal handlers who bring every micro farm to life on installation day.",
              },
            ].map((m) => (
              <div
                key={m.name}
                className="px-0 md:px-10 first:pl-0 last:pr-0 py-8 md:py-0 first:pt-0 last:pb-0"
              >
                <div
                  className="w-8 h-px mb-6"
                  style={{ backgroundColor: "#D4A24C" }}
                />
                <h3
                  className="text-[#3D2B1F] mb-1"
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                  }}
                >
                  {m.name}
                </h3>
                <p
                  className="text-[#D4A24C] text-xs tracking-wide uppercase mb-4"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
                >
                  {m.role}
                </p>
                <p
                  className="text-[#3D2B1F]/55 text-sm leading-[1.75]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
