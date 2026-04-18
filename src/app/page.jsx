export const dynamic = 'force-dynamic'; // ← add this as first line

import { Header } from "../components/header";
import { Banner } from "../components/Banner";
import { ProductFeed } from "../components/product-feed";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0"  // ← some APIs block non-browser requests
      }
    });

    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();

  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}