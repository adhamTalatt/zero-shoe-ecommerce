import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductCard = ({
  name,
  description,
  price,
  images,
  id,
}: ProductCardProps) => {
  return (
    <div className=" rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={item}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className=" inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
      <Button className="w-full mt-5">
        <Link href={`/products/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
