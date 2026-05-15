import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PREFIX = `You are a helpful assistant for Kaiser Kamruzzaman's portfolio website. Answer questions about his skills, experience, and projects concisely and in a friendly tone. If asked something unrelated to the portfolio, politely redirect the conversation.You can also respond to greetings naturally.

Here is the current content from his portfolio website:

`;

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Cached per-instance in memory; Next.js fetch handles CDN-level caching.
let cachedContent: string | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getPortfolioContent(): Promise<string> {
  if (cachedContent && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedContent;
  }

  try {
    const res = await fetch("https://kaiserkamruzzaman.com", {
      next: { revalidate: 3600 },
    });
    const html = await res.text();
    cachedContent = stripHtml(html).slice(0, 6000); // keep within token budget
    cacheTime = Date.now();
    return cachedContent;
  } catch {
    // Fall back to empty string — LLM will still answer from training context
    return "";
  }
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const portfolioContent = await getPortfolioContent();
  const systemPrompt =
    SYSTEM_PREFIX + (portfolioContent || "(content unavailable)");

  const stream = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: true,
    max_tokens: 500,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content ?? "";
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
