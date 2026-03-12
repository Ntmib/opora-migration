import { NextResponse } from "next/server";

export const revalidate = 3600;

interface TelegramPost {
  id: string;
  date: string;
  text: string;
  fullText: string;
  link: string;
  image: string | null;
}

const MAX_CHANNEL_URL = "https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc";

export async function GET() {
  try {
    const res = await fetch("https://t.me/s/trud_migr", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Telegram channel" },
        { status: 502 }
      );
    }

    const html = await res.text();
    const posts = parseTelegramPosts(html);

    return NextResponse.json({ posts, maxChannelUrl: MAX_CHANNEL_URL });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function cleanTelegramText(rawHtml: string): string {
  let text = rawHtml;

  // Remove hashtag links
  text = text.replace(/<a[^>]*class="[^"]*hashtag[^"]*"[^>]*>([^<]*)<\/a>/gi, "");

  // Replace <a> links with just the visible text
  text = text.replace(/<a[^>]*>([^<]*)<\/a>/gi, "$1");

  // Remove tg-emoji custom tags, keep inner text
  text = text.replace(/<tg-emoji[^>]*>([\s\S]*?)<\/tg-emoji>/gi, "$1");

  // br → newline
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  text = decodeHtmlEntities(text);

  // Remove all MAX/channel promo lines (various spellings)
  text = text.replace(/\n*.*[Мм]ой канал в (MAX|МАХ|Max)[^\n]*/gi, "");
  text = text.replace(/\n*.*[Пп]одписывайтесь в (MAX|МАХ|Max)[^\n]*/gi, "");
  text = text.replace(/\n*.*канале? на (MAX|МАХ|Max)[^\n]*/gi, "");
  text = text.replace(/\n*.*[Чч]то вы получите в моём канале[^\n]*/gi, "");
  text = text.replace(/\n*.*резервный канал для тех[^\n]*/gi, "");
  text = text.replace(/\n*.*остаюсь активным.*MAX[^\n]*/gi, "");
  text = text.replace(/\n*Национальный рынок труда\s*\|?\s*Экспертиза и решения\s*/gi, "");
  text = text.replace(/\n*Национальный рынок труда\s*$/gim, "");
  text = text.replace(/\n*Будущее рынка труда строится сегодня\.\s*$/gim, "");

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  return text;
}

function parseTelegramPosts(html: string): TelegramPost[] {
  const posts: TelegramPost[] = [];

  const messageBlocks = html.split("tgme_widget_message_wrap");

  for (const block of messageBlocks.slice(1)) {
    const idMatch = block.match(/data-post="trud_migr\/(\d+)"/);
    const textMatch = block.match(
      /tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const dateMatch = block.match(/datetime="([^"]+)"/);
    const imageMatch = block.match(
      /background-image:url\('(https:\/\/cdn[^']+)'\)/
    );

    if (idMatch && textMatch && dateMatch) {
      const fullText = cleanTelegramText(textMatch[1]);

      if (fullText.length > 10) {
        const firstLine = fullText.split("\n")[0].trim();
        const title =
          firstLine.length > 120
            ? firstLine.slice(0, 120) + "…"
            : firstLine;

        posts.push({
          id: idMatch[1],
          date: dateMatch[1].split("T")[0],
          text: title,
          fullText: fullText,
          link: `https://t.me/trud_migr/${idMatch[1]}`,
          image: imageMatch ? "/api/image?url=" + encodeURIComponent(imageMatch[1]) : null,
        });
      }
    }
  }

  return posts.reverse().slice(0, 20);
}
