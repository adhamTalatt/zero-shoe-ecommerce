import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import {
  MenuIcon,
  ShoppingBagIcon,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import UserDropdown from "./UserDropdown";
import { redis } from "@/utils/redis";
import { Cart } from "@/utils/interdaces";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ADMIN_EMAIL, DOMIAN } from "@/utils/links";

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

        <div className="hidden md:flex justify-center items-center gap-x-2 ml-8">
          <NavbarLinks />
        </div>
      </div>
      <div className="hidden md:flex  items-center">
        {!user ? (
          <div className="  md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
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
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" variant="outline" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex  items-center">
            {!user ? (
              <div className="  md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
                <Button asChild variant={"ghost"}>
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <span className="h-6 w-px bg-gray-200"></span>
                <Button asChild variant={"ghost"}>
                  <RegisterLink>Creat Acount</RegisterLink>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <div className=" flex justify-between items-center  pr-3 ">
                  <div className=" flex flex-row items-center justify-center gap-3">
                    <Avatar className="h-10 w-10 ">
                      <AvatarImage
                        src={user.picture as string}
                        alt="User Image"
                      />
                      <AvatarFallback>
                        {user.given_name?.slice(0, 3).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span>hi ..{user.given_name}</span>
                      <p className=" hidden md:flex text-xs text-muted-foreground">
                        {(user.email?.length as number) >= 30
                          ? user.email?.slice(0, 30) + "..."
                          : user.email}
                      </p>
                    </div>
                  </div>
                  <Link href={"/bag"} className=" group p-2 flex items-center">
                    <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-200" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {tutal}
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col gap-3 text-lg font-medium mt-6">
                  {user.email === ADMIN_EMAIL ? (
                    <Button
                      asChild
                      variant={"ghost"}
                      className=" flex flex-row items-center gap-3 w-full justify-start p-2"
                    >
                      <Link
                        href={`${DOMIAN}/dashboard`}
                        className=" flex flex-row items-center gap-3"
                      >
                        <LayoutDashboard />
                        Dashboard
                      </Link>
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button
                    asChild
                    variant={"ghost"}
                    className=" flex flex-row items-center gap-3 w-full justify-start p-2"
                  >
                    <LogoutLink className=" flex flex-row items-center gap-3">
                      <LogOut />
                      Log out
                    </LogoutLink>
                  </Button>
                  <div className="w-full h-[1px] border border-dashed border-gray-500 " />
                </div>
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium mt-6">
            <NavbarLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
