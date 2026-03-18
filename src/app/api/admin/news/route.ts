import { NextResponse } from "next/server";
import { getNews, saveNews } from "@/lib/data";
import type { NewsItem } from "@/lib/data";

export async function GET() {
  const news = await getNews();
  return NextResponse.json(news);
}

function validateNewsItem(item: Record<string, unknown>): string | null {
  if (!item.title || typeof item.title !== "string" || item.title.length < 3) {
    return "Заголовок обязателен (минимум 3 символа)";
  }
  if (!item.date || typeof item.date !== "string") {
    return "Дата обязательна";
  }
  if (!item.excerpt || typeof item.excerpt !== "string") {
    return "Краткое описание обязательно";
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const item: Omit<NewsItem, "id"> = await request.json();
    const error = validateNewsItem(item as unknown as Record<string, unknown>);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
    const news = await getNews();

    const newItem: NewsItem = {
      ...item,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    };

    news.unshift(newItem);
    await saveNews(news);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Create news error:", error);
    return NextResponse.json({ error: "Ошибка создания" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item: NewsItem = await request.json();
    const validationError = validateNewsItem(item as unknown as Record<string, unknown>);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    const news = await getNews();
    const idx = news.findIndex((n) => n.id === item.id);

    if (idx === -1) {
      return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
    }

    news[idx] = item;
    await saveNews(news);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update news error:", error);
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const news = await getNews();
    const filtered = news.filter((n) => n.id !== id);

    if (filtered.length === news.length) {
      return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
    }

    await saveNews(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json({ error: "Ошибка удаления" }, { status: 500 });
  }
}
