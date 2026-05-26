import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-platega-signature");
    const body = await req.json();

    // Verify webhook signature (production: add HMAC verification)
    const secret = process.env.PLATEGA_WEBHOOK_SECRET;
    if (secret && signature !== secret) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const { event, data } = body;

    if (event === "payment.success") {
      // Forward to bot webhook for balance update
      const botWebhookUrl = process.env.BOT_WEBHOOK_URL;
      if (botWebhookUrl) {
        await fetch(botWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment_success",
            userId: data.metadata?.userId,
            telegramId: data.metadata?.telegramId,
            amount: data.amount,
            paymentId: data.id,
            source: "web",
          }),
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
