"use client";

import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlinks } from "@/utils/links";

export function NavDashboard() {
  const pathname = usePathname();
  return (
    <>
      {navlinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
