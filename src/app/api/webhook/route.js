import { NextResponse } from "next/server";
import Stripe from "stripe";
import * as admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

// ---- Firebase Admin Init (singleton-safe) ----
if (!admin.apps.length) {
  const serviceAccount = require("../../../../permissions.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ---- Fulfill Order ----
const fulfillOrder = async (session) => {
  console.log("Fulfilling order:", session.id);

  if (!session.metadata?.email) {
    throw new Error("Missing customer email in metadata");
  }

  return db
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: (session.amount_total ?? 0) / 100,
      amount_shipping: (session.total_details?.amount_shipping ?? 0) / 100,
      images: JSON.parse(session.metadata.images ?? "[]"),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
};

// ---- POST Handler ----
export async function POST(req) {
  const body = await req.text(); // RAW BODY (critical)
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }
  // ---- Handle event ----
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await fulfillOrder(session);
      console.log("Order saved:", session.id);
    } catch (err) {
      console.error("Order fulfillment failed:", err.message);
      return new NextResponse("Order fulfillment failed", { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
