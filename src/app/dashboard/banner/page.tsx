import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/utils/db";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  const data = await prisma.banners.findMany();
  if (!data) {
    return notFound();
  }
  return data;
}

const BannerRoute = async () => {
  noStore();
  const data = await getData();
  return (
    <>
      <div className=" flex items-center justify-end mb-5">
        <Button asChild className=" flex gap-x-2">
          <Link href={"/dashboard/banner/create"}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Image
                      src={banner.imageString}
                      alt="image Banner"
                      width={100}
                      height={100}
                      priority={true}
                    />
                  </TableCell>
                  <TableCell className=" font-medium">{banner.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${banner.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default BannerRoute;
