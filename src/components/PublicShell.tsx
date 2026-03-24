"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingTelegram from "@/components/FloatingTelegram";
import CookieBanner from "@/components/CookieBanner";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isBrochure = pathname.startsWith("/brochure");

  if (isAdmin || isBrochure) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <FloatingTelegram />
      <CookieBanner />
    </>
  );
}
