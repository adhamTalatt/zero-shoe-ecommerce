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

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
          <>
            <Button>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </>
        ) : (
          <>
            <p>{user.email}</p>
            <Button>
              <LogoutLink>Log out</LogoutLink>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
