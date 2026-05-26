import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, description, userId, telegramId } = body;

    const plategaKey = process.env.PLATEGA_API_KEY;
    if (!plategaKey) {
      return NextResponse.json({ error: "Platega not configured" }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexus-ai-web.vercel.app";

    const res = await fetch("https://api.platega.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${plategaKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "RUB",
        description: description || "Nexus AI — пополнение баланса",
        metadata: {
          userId,
          telegramId,
          source: "web",
        },
        success_url: `${appUrl}/pay/success`,
        cancel_url: `${appUrl}/pay/cancel`,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Payment creation failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({ paymentUrl: data.payment_url, paymentId: data.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
