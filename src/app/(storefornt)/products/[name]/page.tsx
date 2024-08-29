import ProductCard from "@/components/storFont/ProductCard";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import React from "react";
interface CategoryPageProps {
  params: { name: string };
}

const getData = async (Category: string) => {
  switch (Category) {
    case "all": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
        },
        orderBy: {
          cratedAt: "desc",
        },
        select: {
          name: true,
          description: true,
          price: true,
          id: true,
          images: true,
        },
      });
      return {
        title: "All Product",
        data: data,
      };
    }
    case "man": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "man",
        },
        orderBy: {
          cratedAt: "desc",
        },
        select: {
          name: true,
          description: true,
          price: true,
          id: true,
          images: true,
        },
      });
      return {
        title: "Product for Man",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "women",
        },
        orderBy: {
          cratedAt: "desc",
        },
        select: {
          name: true,
          description: true,
          price: true,
          id: true,
          images: true,
        },
      });
      return {
        title: "Product for Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        orderBy: {
          cratedAt: "desc",
        },
        select: {
          name: true,
          description: true,
          price: true,
          id: true,
          images: true,
        },
      });
      return {
        title: "Product for Kids",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
};

const CategoryPage = async ({ params: { name } }: CategoryPageProps) => {
  noStore();
  const { data, title } = await getData(name);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 h-full w-full">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            images={item.images}
          />
        ))}
        {data.length === 0 && (
          <div className="flex  w-full items-center">
            <h1 className="font-extrabold text-3xl t text-primary opacity-50">
              Not found any Product ...
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
