"use client";

import { usePathname } from "next/navigation";

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

export default function OrganizationSchema() {
  const pathname = usePathname();

  if (pathname.startsWith("/brochure")) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
