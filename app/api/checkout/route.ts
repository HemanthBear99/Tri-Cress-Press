import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with explicit API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-11-15' });

export async function POST(req: Request) {
    try {
        // Check if Stripe key is configured
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("[CHECKOUT_ERROR] STRIPE_SECRET_KEY not configured");
            return new NextResponse("Stripe not configured", { status: 500 });
        }

        const { items } = await req.json();

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 });
        }

        // Strictly validate and sanitize incoming items
        const line_items = items.map((item: { title: string; image?: string; price?: number; quantity?: number }) => {
            const quantity = Math.max(1, Math.min(10, Math.floor(Number(item.quantity) || 1)));
            const rawPrice = Number(item.price) || 0;
            const unitAmount = Math.max(0, Math.round(rawPrice * 100));

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: String(item.title || "Untitled"),
                        ...(item.image && typeof item.image === 'string' && item.image.startsWith('http') ? { images: [item.image] } : {}),
                    },
                    unit_amount: unitAmount,
                },
                quantity,
            };
        });

        // Create Checkout Session
        const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${baseUrl}/shop?success=1`,
            cancel_url: `${baseUrl}/shop?canceled=1`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[CHECKOUT_ERROR]", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
