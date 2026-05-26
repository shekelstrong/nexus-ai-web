import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { telegramData } = body;

    if (!telegramData) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    // Verify Telegram WebApp data
    // In production: verify hash with HMAC-SHA256 using BOT_TOKEN
    // For now: parse and return user info
    const parsed = new URLSearchParams(telegramData);
    const userJson = parsed.get("user");
    
    if (!userJson) {
      return NextResponse.json({ error: "No user data" }, { status: 400 });
    }

    const user = JSON.parse(userJson);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        photoUrl: user.photo_url,
      },
      token: `web_${user.id}_${Date.now()}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
