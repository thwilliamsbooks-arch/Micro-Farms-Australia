"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-xs tracking-[0.2em] uppercase text-[#8B6F47] hover:text-[#3D2B1F] transition-colors"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400 }}
    >
      Log out
    </button>
  );
}
