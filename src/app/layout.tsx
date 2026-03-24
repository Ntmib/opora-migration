import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import OrganizationSchema from "@/components/OrganizationSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Комитет ОПОРЫ РОССИИ по развитию национального рынка труда",
    template: "%s | Комитет ОПОРЫ РОССИИ",
  },
  description:
    "Комитет «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу миграционных процессов. Поддержка предпринимателей, законотворческие инициативы, развитие миграционной инфраструктуры.",
  keywords: [
    "ОПОРА РОССИИ",
    "рынок труда",
    "миграция",
    "миграционная политика",
    "малый бизнес",
    "предпринимательство",
    "комитет",
    "трудовая миграция",
  ],
  openGraph: {
    title: "Комитет ОПОРЫ РОССИИ по развитию национального рынка труда",
    description:
      "Комитет по развитию национального рынка труда и мониторингу миграционных процессов",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
