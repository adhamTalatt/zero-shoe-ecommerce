import ProductCard from "@/components/storFont/ProductCard";
import prisma from "@/utils/db";

import { notFound } from "next/navigation";

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
  const { data, title } = await getData(name);
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
      </div>
      {data.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <h1 className="font-extrabold text-3xl t text-primary opacity-50">
            Not found any Product ...
          </h1>
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
