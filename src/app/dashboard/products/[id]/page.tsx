import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "./EditForm";

interface EditProductProps {
  params: { id: string };
}

async function getData(prductId: string) {
  const data = await prisma.product.findUnique({
    where: { id: prductId },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const EditProductRoute = async ({ params: { id } }: EditProductProps) => {
  const data = await getData(id);
  return (
    <div>
      <EditForm data={data} />
    </div>
  );
};

export default EditProductRoute;
