import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MIN_RATING = 1;
const MAX_RATING = 5;

export const Currency = ({ price }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return <span>{formatted}</span>;
};

export const Product = ({ id, price, title, description, category, image }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const [hasPrime, setHasPrime] = useState(false);
  const addItemToBasket = () => {
    const product = {
      id,
      price,
      title,
      description,
      category,
      image,
      hasPrime,
      rating
    };

    dispatch(addToBasket(product));
  };

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    setHasPrime(Math.random() < 0.5);
  }, []);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-8">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="flex justify-center items-center">
        <Image
          src={image}
          height={200}
          width={200}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency price={price} />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTls3DBPuXnMOaD9Ng1S_qjAZNrt6NxekBJFA&s"
            }
            alt=""
            width={100}
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
};
