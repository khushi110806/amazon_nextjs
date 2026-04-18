"use client"

import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Banner } from "../components/Banner";
import { ProductFeed } from "../components/product-feed";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch:", err));
  }, []);

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