import { Header } from "../components/header";
import { Banner } from "../components/Banner";
import { ProductFeed } from "../components/product-feed";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store", // same as getServerSideProps
  });

  return res.json();
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