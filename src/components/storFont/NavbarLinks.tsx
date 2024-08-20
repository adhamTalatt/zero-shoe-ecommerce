import Link from "next/link";

export const NavLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "All Products", href: "/product/all" },
  { id: 2, name: "Man", href: "/product/all" },
  { id: 3, name: "Women", href: "/product/woman" },
  { id: 4, name: "Kids", href: "/product/kids" },
];

const NavbarLinks = () => {
  return (
    <div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
      {NavLinks.map((item) => (
        <Link key={item.id} href={item.href} className="font-medium">
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
