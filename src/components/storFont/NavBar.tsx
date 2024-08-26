import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import { ShoppingBagIcon } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { redis } from "@/utils/redis";
import { Cart } from "@/utils/interdaces";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const tutal = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Zero<span className=" text-primary">ShoW</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>
      <div className=" flex items-center">
        {!user ? (
          <div className=" hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button asChild variant={"ghost"}>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button asChild variant={"ghost"}>
              <RegisterLink>Creat Acount</RegisterLink>
            </Button>
          </div>
        ) : (
          <>
            <Link href={"/bag"} className=" group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-200" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {tutal}
              </span>
            </Link>
            <UserDropdown
              userImage={user.picture as string}
              name={user.given_name as string}
              email={
                user.email ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
