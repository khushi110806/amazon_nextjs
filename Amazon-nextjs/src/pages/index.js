import Head from "next/head";
import { Header } from "../components/header";
import { Banner } from "../components/Banner";

export default function Home() {
  return (
    <div className="bg-grey-100 h-screen">
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
      </main>
    </div>
  );
}
