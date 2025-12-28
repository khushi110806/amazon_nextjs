import { useSelector } from "react-redux";
import { Header } from "../components/header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { CheckoutProduct } from "../components/checkout-product";
import { Currency } from "../components/product";
import { useSession } from "next-auth/react";
const Checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {!items.length
                ? "Your Amazon Basket Is Empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                description={item.description}
                title={item.title}
                price={item.price}
                category={item.category}
                hasPrime={item.hasPrime}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency price={total} />
                </span>
              </h2>
              <button className="button mt-2 cursor-not-allowed">
                {!session ? "Sign in to checkout" : "Proceed checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
