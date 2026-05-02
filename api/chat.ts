import { PROFILE_CHUNKS } from "./resumeContext.js";

export const config = { runtime: "edge" };

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Expand short tokens toward chunk-relevant vocabulary (no LLM, $0). */
const SYNONYM_GROUPS = [
  ["email", "mail", "gmail", "contact", "reach", "message"],
  ["phone", "call", "number", "mobile", "telephone", "703"],
  ["location", "address", "where", "live", "based", "northlake", "texas", "tx"],
  ["linkedin", "profile", "social"],
  ["skill", "skills", "stack", "tech", "technologies", "tools", "languages"],
  ["education", "degree", "university", "college", "gpa", "masters", "ms", "btech", "jntu", "missouri"],
  ["experience", "work", "job", "career", "employer", "company", "role"],
  ["oracle", "ojet", "jet", "apex"],
  ["cerner", "vista", "deloitte"],
  ["react", "typescript", "javascript", "rails", "ruby", "spring", "java"],
  ["healthcare", "scheduling", "revenue", "clinical", "hie", "exchange"],
  ["test", "testing", "junit", "rspec", "playwright", "selenium"],
  ["wcag", "accessibility", "a11y", "ui", "frontend", "front-end"],
  ["docker", "kubernetes", "k8s", "jenkins", "ci", "git"],
];

function tokenize(text: string): Set<string> {
  const raw = text.toLowerCase().match(/[a-z0-9+]{2,}/g) ?? [];
  const set = new Set<string>();
  for (const w of raw) {
    set.add(w);
    for (const group of SYNONYM_GROUPS) {
      if (group.includes(w)) {
        for (const g of group) set.add(g);
        break;
      }
    }
  }
  return set;
}

function scoreChunk(query: Set<string>, title: string, body: string): number {
  const titleWords = tokenize(title);
  const bodyWords = tokenize(body);
  let score = 0;
  for (const t of query) {
    if (titleWords.has(t)) score += 3;
    if (bodyWords.has(t)) score += 1;
  }
  return score;
}

function lastUserQuery(messages: ChatMessage[]): string {
  const users = messages.filter((m) => m.role === "user").slice(-3);
  return users.map((m) => m.content).join(" ");
}

const OFF_TOPIC =
  "I only share what’s on Manideep’s public profile here. Try asking about his work history, tech stack, education, or how to contact him — or email manideepgrandhe@gmail.com.";

const HELP =
  "Ask about jobs at Oracle, Cerner, or Vista, skills (React, Rails, Spring, etc.), degrees, or contact details. I match your question to his profile — no outside knowledge.";

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

  const queryText = lastUserQuery(trimmed);
  const query = tokenize(queryText);

  if (query.size === 0) {
    return new Response(JSON.stringify({ reply: HELP }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const minScore =
    query.size >= 4 ? 3 : query.size >= 2 ? 2 : 1;

  const ranked = PROFILE_CHUNKS.map((chunk, i) => ({
    i,
    s: scoreChunk(query, chunk.title, chunk.body),
  })).sort((a, b) => b.s - a.s);

  const top = ranked[0]!;
  if (top.s < minScore) {
    return new Response(JSON.stringify({ reply: OFF_TOPIC }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const primary = PROFILE_CHUNKS[top.i]!;
  const parts: string[] = [
    `${primary.title}\n\n${primary.body.trim()}`,
  ];

  const second = ranked[1];
  if (
    second &&
    second.i !== top.i &&
    second.s >= minScore &&
    top.s - second.s <= 2
  ) {
    const c = PROFILE_CHUNKS[second.i]!;
    parts.push(`${c.title}\n\n${c.body.trim()}`);
  }

  const reply = parts.join("\n\n---\n\n");

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
