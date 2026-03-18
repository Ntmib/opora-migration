import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Комитет ОПОРЫ РОССИИ по развитию национального рынка труда и мониторингу миграционных процессов",
  url: "https://opora-migration.ru",
  email: "migratsiya_opora@mail.ru",
  telephone: "+7-495-212-90-17",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
    streetAddress:
      "внутренняя территория поселения Мосренген, 21 км по Киевскому шоссе, здание «ДВЛД 3», строение 1, офис 404",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "ОПОРА РОССИИ",
    url: "https://opora.ru/",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
