import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#E8DCC8", borderTop: "1px solid rgba(61,43,31,0.1)" }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-[#3D2B1F] mb-3"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 400,
                fontSize: "1.1rem",
              }}
            >
              Micro Farms Australia
            </p>
            <p
              className="text-[#8B6F47] text-sm leading-relaxed mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              Bringing the farm home to Australian backyards — one family at a
              time.
            </p>
            <p
              className="text-[#8B6F47]/60 text-xs"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              ABN: XX XXX XXX XXX
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              className="text-[#3D2B1F] text-xs tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Pages
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/packages", label: "Our Packages" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8B6F47] text-sm hover:text-[#3D2B1F] transition-colors"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p
              className="text-[#3D2B1F] text-xs tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Follow along
            </p>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-[#8B6F47] text-sm hover:text-[#3D2B1F] transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                Instagram
              </a>
              <a
                href="#"
                className="block text-[#8B6F47] text-sm hover:text-[#3D2B1F] transition-colors"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(61,43,31,0.1)" }}
        >
          <p
            className="text-[#8B6F47]/50 text-xs"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
          >
            &copy; {new Date().getFullYear()} Micro Farms Australia. All rights
            reserved.
          </p>
          <p
            className="text-[#8B6F47]/40 text-xs"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Built with love for the Australian backyard.
          </p>
        </div>
      </div>
    </footer>
  );
}
