"use client";
import { deleteBanner } from "@/app/actions";
import SubmitBtn from "@/components/dashboard/SubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/utils/db";
import Link from "next/link";

interface DeleteRoutePorp {
  params: { id: string };
}

const DeletRoute = ({ params: { id } }: DeleteRoutePorp) => {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            Banner and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant={"secondary"} asChild>
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={id} />
            <SubmitBtn variant={"destructive"} text={"Delete Banner"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeletRoute;
