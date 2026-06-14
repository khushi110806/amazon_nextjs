import React from "react";
import { Header } from "../../components/header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Success = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-screen-xs mx-auto mt-10 px-4">
        <div className="flex flex-col bg-white p-8 rounded shadow-md">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-2xl font-semibold">
              Thank you, your order has been confirmed!
            </h1>
          </div>

          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has shipped. If you'd like to check the status of your
            order(s), please click the link below.
          </p>

          <Link href={"/orders"}>
            <button className="w-full sm:w-auto button mt-8">
              Go to my orders
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Success;
