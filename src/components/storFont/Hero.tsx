import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import prisma from "@/utils/db";
import Image from "next/image";
async function getData() {
  const data = await prisma.banners.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!data) {
    throw new Error("banner in wrong..");
  }
  return data;
}
const Hero = async () => {
  const data = await getData();
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className=" relative h-[60vh] lg:h-[80vh]">
              <Image
                src={item.imageString}
                alt="Banner Image"
                fill
                className=" object-scale-down  w-full h-full rounded-xl"
              />
              <div className=" absolute top-6 left-6 bg-opacity-75 bg-black text-white p-2 lg:p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-200  ">
                <h1 className="text-sm lg:text-3xl font-bold">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
};

export default Hero;
