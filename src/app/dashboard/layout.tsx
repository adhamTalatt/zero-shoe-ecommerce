import { ReactNode } from "react";
import { NavDashboard } from "@/components/dashboard/NavDashboard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { unstable_noStore as noStore } from "next/cache";
import { ADMIN_EMAIL } from "@/utils/links";
import Link from "next/link";
import { date } from "zod";
import prisma from "@/utils/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getData() {
  const data = await prisma.user.findUnique({
    where: { id: "kp_5fa38088ac1c4197880b94511836069b" },
    select: {
      firstName: true,
      porfileImage: true,
    },
  });
  return data;
}
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  noStore();
  const data = await getData();
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
        <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavDashboard />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              variant="outline"
              size="icon"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
              <NavDashboard />
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10">
              <AvatarImage src={data?.porfileImage} alt="User Image" />
              <AvatarFallback>
                {data?.firstName.slice(0, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hi {data?.firstName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Go To Store</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="my-5">{children}</main>
    </div>
  );
}
