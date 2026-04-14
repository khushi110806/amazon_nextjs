import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, email } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Items are missing or invalid" },
        { status: 400 }
      );
    }

    const transformedItems = items.map((item) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      shipping_options: [
        {
          shipping_rate: "shr_1SqwIDRYygPS4rfJedLMpqKe",
        },
      ],

      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },

      line_items: transformedItems,
      mode: "payment",

      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,

      metadata: {
        email,
        images: JSON.stringify(items.map(item => item.image)),
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("STRIPE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Stripe failed" },
      { status: 500 }
    );
  }
}