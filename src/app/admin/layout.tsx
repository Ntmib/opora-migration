import type { ReactNode } from "react";

export const metadata = {
  title: "Админ-панель | ОПОРА Миграция",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
