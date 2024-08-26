import { LoaddingProductCard } from "@/components/storFont/ProductCard";

export default function LoadingFile() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoaddingProductCard />
      <LoaddingProductCard />
      <LoaddingProductCard />
    </div>
  );
}
