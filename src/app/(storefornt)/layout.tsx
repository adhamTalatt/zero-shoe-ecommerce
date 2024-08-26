import { ReactNode } from "react";
import Navbar from "@/components/storFont/NavBar";
import Footer from "@/components/storFont/Footer";
const storeForntLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-[100%] ">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default storeForntLayout;
