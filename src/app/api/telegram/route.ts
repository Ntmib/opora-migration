import { NextResponse } from "next/server";

export const revalidate = 3600;

interface TelegramPost {
  id: string;
  date: string;
  text: string;
  link: string;
}

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

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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

    if (idMatch && textMatch && dateMatch) {
      const text = textMatch[1]
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      if (text.length > 10) {
        posts.push({
          id: idMatch[1],
          date: dateMatch[1].split("T")[0],
          text: text.slice(0, 500),
          link: `https://t.me/trud_migr/${idMatch[1]}`,
        });
      }
    }
  }

  return posts.reverse().slice(0, 20);
}
