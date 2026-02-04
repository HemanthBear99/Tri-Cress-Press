import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with dynamic API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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

        // Map cart items to Stripe line items
        const line_items = items.map((item: { title: string; image?: string; price: number; quantity: number }) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                    // Only include images if they're valid URLs
                    ...(item.image && item.image.startsWith('http') ? { images: [item.image] } : {}),
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        }));

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3005"}/shop?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3005"}/shop?canceled=1`,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[CHECKOUT_ERROR]", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
