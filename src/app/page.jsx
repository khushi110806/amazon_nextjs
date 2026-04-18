import { Header } from "../components/header";
import { Banner } from "../components/Banner";
import { ProductFeed } from "../components/product-feed";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API failed with status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // ← return empty array so page still renders
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