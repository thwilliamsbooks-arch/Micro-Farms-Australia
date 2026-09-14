import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/adminAuth";
import { getLeads } from "@/lib/leads";
import AdminLoginForm from "@/components/AdminLoginForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const sizeLabels: Record<string, string> = {
  "under-200": "Under 200m²",
  "200-500": "200 – 500m²",
  "500-quarter-acre": "500m² – ¼ acre",
  "quarter-acre-plus": "¼ acre or more",
};

export default async function AdminLeadsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidSessionToken(token)) {
    return <AdminLoginForm />;
  }

  const leads = await getLeads();

  return (
    <div style={{ backgroundColor: "#FAF6EE" }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p
              className="text-[#D4A24C] text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
            >
              Admin
            </p>
            <h1
              className="text-[#3D2B1F]"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              }}
            >
              Free inspection leads
            </h1>
            <p
              className="text-[#3D2B1F]/50 text-sm mt-2"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
            >
              {leads.length} {leads.length === 1 ? "lead" : "leads"} total, newest first
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {leads.length === 0 ? (
          <p
            className="text-[#3D2B1F]/50 text-sm"
            style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
          >
            No leads yet — submissions from /free-inspection will show up here.
          </p>
        ) : (
          <div className="overflow-x-auto border border-[#3D2B1F]/10 rounded-lg">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr
                  className="border-b border-[#3D2B1F]/10"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {["Date", "Name", "Suburb", "Contact", "Backyard Size", "Interests"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-[#8B6F47] text-xs tracking-[0.15em] uppercase font-normal px-5 py-4"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-[#3D2B1F]/8 align-top"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300 }}
                  >
                    <td className="px-5 py-4 text-[#3D2B1F]/70 text-sm whitespace-nowrap">
                      {new Date(lead.submittedAt).toLocaleString("en-AU", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-4 text-[#3D2B1F] text-sm font-medium">
                      {lead.fullName}
                      <div className="text-[#3D2B1F]/50 text-xs mt-1">{lead.ownerStatus}</div>
                    </td>
                    <td className="px-5 py-4 text-[#3D2B1F]/70 text-sm">{lead.suburb}</td>
                    <td className="px-5 py-4 text-[#3D2B1F]/70 text-sm">
                      <a
                        href={`mailto:${lead.email}`}
                        className="block hover:text-[#D4A24C] transition-colors"
                      >
                        {lead.email}
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="block hover:text-[#D4A24C] transition-colors"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-[#3D2B1F]/70 text-sm whitespace-nowrap">
                      {sizeLabels[lead.backyardSize] || lead.backyardSize}
                    </td>
                    <td className="px-5 py-4 text-[#3D2B1F]/70 text-sm">
                      {lead.interests.length ? lead.interests.join(", ") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
