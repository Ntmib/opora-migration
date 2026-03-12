import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Контактная информация Комитета «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу миграционных процессов.",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
