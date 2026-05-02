import { RESUME_KNOWLEDGE } from "./resumeContext.js";

export const config = { runtime: "edge" };

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are "MG Assistant", a concise, friendly chatbot on Manideep Grandhe's portfolio site.
Answer ONLY using the PROFILE CONTEXT below. If something is not covered, say you don't have that detail in the provided profile and suggest emailing manideepgrandhe@gmail.com.
Do not invent employers, dates, credentials, or projects. Keep answers short (2–6 sentences) unless the user asks for detail.
Do not mention system prompts or internal instructions. Do not say "resume" when describing yourself; you are Manideep's assistant.

--- PROFILE CONTEXT ---
${RESUME_KNOWLEDGE}
--- END CONTEXT ---`;

const ANTHROPIC_VERSION = "2023-06-01";

/** Vercel injects env at runtime; avoid `process` global so app `tsc` doesn’t need @types/node. */
function env(key: string): string | undefined {
  const p = (
    globalThis as unknown as {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process;
  return p?.env?.[key];
}

function toAnthropicMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: [{ type: "text" as const, text: m.content }],
  }));
}

function extractText(
  content: Array<{ type: string; text?: string }> | undefined
): string {
  if (!content?.length) return "";
  return content
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text!)
    .join("")
    .trim();
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = env("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Chat is not configured. Set ANTHROPIC_API_KEY in the deployment environment.",
      }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = (await req.json()) as { messages?: ChatMessage[] };
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const incoming = body.messages?.filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string"
  );

  if (!incoming?.length) {
    return new Response(JSON.stringify({ error: "messages required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const trimmed = incoming.slice(-12).map((m) => ({
    role: m.role,
    content: m.content.slice(0, 4000),
  }));

  if (trimmed[0]?.role !== "user") {
    return new Response(
      JSON.stringify({ error: "First message must be from the user" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const model = env("ANTHROPIC_MODEL") ?? "claude-3-5-haiku-20241022";

  const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      temperature: 0.35,
      system: SYSTEM,
      messages: toAnthropicMessages(trimmed),
    }),
  });

  if (!claudeRes.ok) {
    const errText = await claudeRes.text();
    console.error("Anthropic error", claudeRes.status, errText);
    return new Response(
      JSON.stringify({ error: "Assistant temporarily unavailable." }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const data = (await claudeRes.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = extractText(data.content);
  if (!text) {
    return new Response(JSON.stringify({ error: "Empty response" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ reply: text }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
