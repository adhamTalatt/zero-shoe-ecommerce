export const navlinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Banner Picture",
    href: "/dashboard/banner",
  },
];

export const DOMIAN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://zero-show.vercel.app";

export const ADMIN_EMAIL = "adhamtalattzakaria.one@gmail.com";
