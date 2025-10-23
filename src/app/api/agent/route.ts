import { NextResponse } from "next/server";

const ASI1_API_KEY = process.env.ASI1_API_KEY!;
const MODEL = process.env.ASI1_MODEL || "asi1-mini";
const ASI1_BASE = "https://api.asi1.ai/v1/chat/completions";

// optional: keep a user-specific session id if you have auth
function sessionId() {
  return `sess_${Date.now()}`;
}

type Action = "generate" | "analyze" | "replicate";

function toUserPrompt(action: Action, input: any) {
  switch (action) {
    case "generate":
      return `Create a tight YouTube Shorts script (≈25–35s) about: ${input}`;
    case "analyze":
      return `Analyze tone, pacing, energy, rhetorical devices, and delivery for this transcript. Return a structured summary:\n\n${input}`;
    case "replicate":
      return `Using this tone summary:\n${input?.previousTone}\n\nGenerate a Shorts script on: ${input?.newTopic}`;
    default:
      return "Hello";
  }
}

export async function POST(req: Request) {
  try {
    if (!ASI1_API_KEY) {
      return NextResponse.json({ error: "Server missing ASI1_API_KEY" }, { status: 500 });
    }

    const { action, input } = (await req.json()) as { action: Action; input: any };

    const messages = [
      {
        role: "system",
        content:
          "You are a YouTube Shorts script generator and analyzer. Prefer concise, high-energy, timestamped beats.",
      },
      { role: "user", content: toUserPrompt(action, input) },
    ];

    const r = await fetch(ASI1_BASE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ASI1_API_KEY}`,
        "Content-Type": "application/json",
        "x-session-id": sessionId(),
      },
      body: JSON.stringify({
        model: MODEL,      // e.g., "asi1-mini" or "asi1-fast-agentic"
        messages,
        temperature: 0.7,
        max_tokens: 800,
        stream: false,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("ASI:One API error:", r.status, text);
      return NextResponse.json(
        { error: `ASI:One ${r.status}`, details: text },
        { status: 502 }
      );
    }

    const data = await r.json();
    const content: string =
      data?.choices?.[0]?.message?.content ??
      data?.message ??
      JSON.stringify(data);

    const normalized =
      action === "analyze" ? { analysis: content } : { script: content };

    return NextResponse.json({ success: true, data: normalized });
  } catch (e: any) {
    console.error("API /agent error:", e);
    return NextResponse.json(
      { error: "Failed to reach ASI:One", details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
