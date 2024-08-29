import prisma from "@/utils/db";
import ProductCard, { LoaddingProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
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

const FeaturedProducts = () => {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
      <Suspense fallback={<LoadinnRows />}>
        <LoadingFeaturedProducts />
      </Suspense>
    </>
  );
};

export default FeaturedProducts;

async function LoadingFeaturedProducts() {
  noStore();
  const data = await getData();
  return (
    <>
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
}

function LoadinnRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoaddingProductCard />
      <LoaddingProductCard />
      <LoaddingProductCard />
    </div>
  );
}
