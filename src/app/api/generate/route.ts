import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, category, prompt, messages, imageUrl, videoParams } = body;

    const apiKey = process.env.POLZA_AI_API_KEY || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Determine endpoint and payload based on category
    let url: string;
    let payload: any;
    let headers: Record<string, string> = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nexus-ai-web.vercel.app",
      "X-Title": "Nexus AI Web",
    };

    if (category === "gen_text" || category === "gen_search") {
      // Text via OpenRouter or Polza Chat API
      url = "https://openrouter.ai/api/v1/chat/completions";
      payload = {
        model,
        messages: messages.slice(-20), // Keep last 20 messages for context
        temperature: 0.7,
        max_tokens: 4000,
      };
    } else if (category === "gen_image" || category === "gen_nano_banana") {
      // Image via Polza AI Media API
      url = "https://polza.ai/api/v1/media";
      payload = {
        model,
        input: {
          prompt,
          aspect_ratio: "1:1",
          max_images: 1,
        },
        async: false,
      };
    } else if (category === "gen_video") {
      // Video via Polza AI Media API
      url = "https://polza.ai/api/v1/media";
      payload = {
        model,
        input: {
          prompt,
          resolution: videoParams?.resolution || "720p",
          duration: videoParams?.duration || "5s",
          aspect_ratio: videoParams?.aspect_ratio || "16:9",
          multi_shots: videoParams?.multi_shots || false,
          ...(imageUrl ? { images: [{ type: "url", data: imageUrl }] } : {}),
        },
        async: false,
      };
    } else {
      return NextResponse.json({ error: "Unknown category" }, { status: 400 });
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || `API Error ${res.status}` },
        { status: res.status }
      );
    }

    // Extract result based on category
    let result: any = {};

    if (category === "gen_text" || category === "gen_search") {
      result.text = data.choices?.[0]?.message?.content || "";
    } else if (category === "gen_image" || category === "gen_nano_banana") {
      // Extract image URL from Polza response
      const url = extractMediaUrl(data);
      result.imageUrl = url;
    } else if (category === "gen_video") {
      const url = extractMediaUrl(data);
      result.videoUrl = url;
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}

function extractMediaUrl(data: any): string | undefined {
  if (!data || typeof data !== "object") return undefined;

  for (const key of ["url", "video_url", "audio_url", "image_url"]) {
    const val = data[key];
    if (typeof val === "string" && val.startsWith("http")) return val;
  }

  for (const key of ["video", "audio", "image", "file"]) {
    const val = data[key];
    if (val?.url) return val.url;
  }

  for (const key of ["images", "videos", "data", "output"]) {
    const val = data[key];
    if (Array.isArray(val) && val[0]) {
      const first = val[0];
      if (typeof first === "string" && first.startsWith("http")) return first;
      if (first?.url) return first.url;
      if (first?.video_url) return first.video_url;
      if (first?.image_url) return first.image_url;
    }
  }

  return undefined;
}
