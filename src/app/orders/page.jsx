import { Header } from "../../components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import * as admin from "firebase-admin";
import moment from "moment";
import Stripe from "stripe";
import Order from "../../components/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!admin.apps.length) {
    const serviceAccount = require("../../../permissions.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();

  if (!session) {
    return (
      <div>
        <Header />
        <main className="max-w-screen-lg mx-auto p-10">
          <h1 className="text-3xl border-b-2 border-yellow-400 pb-2 mb-4">
            Your Orders
          </h1>
          <h2>Please sign in to see your orders</h2>
        </main>
      </div>
    );
  }

  // 🔹 Firebase orders
  const stripeOrdersSnapshot = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // 🔹 Enrich with Stripe line items
  const orders = await Promise.all(
    stripeOrdersSnapshot.docs.map(async (doc) => {
      const data = doc.data();

      const lineItems = await stripe.checkout.sessions.listLineItems(doc.id, {
        limit: 100,
      });

      return {
        id: doc.id,
        amount: data.amount,
        amountShipping: data.amount_shipping,
        images: data.images,
        timestamp: moment(data.timestamp.toDate()).unix(),
        items: lineItems.data,
      };
    }),
  );

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b-2 border-yellow-400 pb-2 mb-4">
          Your Orders
        </h1>

        <h2>{orders.length} Orders</h2>

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            ),
          )}
        </div>
      </main>
    </div>
  );
}
