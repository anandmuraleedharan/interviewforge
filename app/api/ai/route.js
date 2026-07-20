import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const { prompt, systemInstruction, temperature = 0.7 } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Primary: Gemini 2.5 API
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemInstruction || "You are InterviewForge AI, a top technical career coach and interview assessor.",
            temperature,
          },
        });

        if (response.text) {
          return NextResponse.json({ result: response.text, provider: "gemini-2.5-flash" });
        }
      } catch (geminiErr) {
        console.warn("Gemini API error, triggering OpenRouter fallback:", geminiErr.message);
      }
    }

    // Fallback: OpenRouter Free Models Cascade
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterKey || "free"}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        messages: [
          { role: "system", content: systemInstruction || "You are InterviewForge AI." },
          { role: "user", content: prompt },
        ],
        temperature,
      }),
    });

    if (openRouterResponse.ok) {
      const data = await openRouterResponse.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return NextResponse.json({ result: reply, provider: "openrouter/llama-3.3-70b" });
      }
    }

    return NextResponse.json(
      { error: "AI services unavailable. Please check API keys." },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
