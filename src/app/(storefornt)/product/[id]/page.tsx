import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/components/SubmitBtn";
import FeaturedProducts from "@/components/storFont/FeaturedProducts";
import ImageSlider from "@/components/storFont/ImageSlider";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound, redirect } from "next/navigation";

interface PrductIdRouterProps {
  params: { id: string };
}

async function getData(ProductId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await prisma.product.findUnique({
    where: { id: ProductId },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
const PrductIdRouter = async ({ params: { id } }: PrductIdRouterProps) => {
  const data = await getData(id);
  const addProductShoppingCart = addItem.bind(null, data.id);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">EGP {data.price}</p>
          <div className=" mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>
          <form action={addProductShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>
      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
};

export default PrductIdRouter;
