import { Product } from "./product";

export const ProductFeed = ({ products }) => {
  return (
    <div className="grid gid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, category, image, price, description }) => (
          <Product
            key={id}
            title={title}
            description={description}
            category={category}
            image={image}
            price={price}
          />
        ))}

      <img
        className="md:col-span-full"
        src={"https://links.papareact.com/dyz"}
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, category, image, price, description }) => (
            <Product
              key={id}
              title={title}
              description={description}
              category={category}
              image={image}
              price={price}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ id, title, category, image, price, description }) => (
          <Product
            key={id}
            title={title}
            description={description}
            category={category}
            image={image}
            price={price}
          />
        ))}
    </div>
  );
};
