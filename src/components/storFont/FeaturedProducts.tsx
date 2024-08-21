import prisma from "@/utils/db";
import ProductCard from "./ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      cratedAt: "desc",
    },
  });
  if (!data) {
    throw new Error("something worng in loading");
  }
  return data;
}

const FeaturedProducts = async () => {
  const data = await getData();
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <div className=" mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.images}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
};

export default FeaturedProducts;
