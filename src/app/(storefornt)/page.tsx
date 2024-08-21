import CategoriesSelection from "@/components/storFont/CategoriesSelection";
import FeaturedProducts from "@/components/storFont/FeaturedProducts";
import Hero from "@/components/storFont/Hero";

export default async function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
