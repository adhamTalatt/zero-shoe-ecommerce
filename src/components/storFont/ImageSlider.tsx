"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/utils";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handerbtnNext = () => {
    setMainImageIndex((nextIndex) =>
      nextIndex === images.length - 1 ? 0 : nextIndex + 1
    );
  };

  const handerbtnPrev = () => {
    setMainImageIndex((prvrIndex) =>
      prvrIndex === 0 ? images.length - 1 : prvrIndex - 1
    );
  };
  const headleImageClick = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className=" relative overflow-hidden rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="Product"
          width={600}
          height={600}
          className=" object-cover w-[600px] h-[600px] "
          priority
        />
        <div className=" absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handerbtnPrev} variant={"ghost"} size={"icon"}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button variant={"ghost"} onClick={handerbtnNext} size={"icon"}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              headleImageClick(index);
            }}
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              " relative overflow-hidden rounded-lg cursor-pointer"
            )}
          >
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className={`object-cover w-[100px] h-[100px]`}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
