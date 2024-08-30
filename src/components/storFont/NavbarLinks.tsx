"use client";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/products/all" },
  { id: 2, name: "Man", href: "/products/man" },
  { id: 3, name: "Women", href: "/products/women" },
  { id: 4, name: "Kids", href: "/products/kids" },
];

const NavbarLinks = () => {
  const location = usePathname();
  return (
    <>
      {NavLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group p-2 font-medium rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
