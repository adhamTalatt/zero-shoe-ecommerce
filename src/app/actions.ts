"use server";
import { ADMIN_EMAIL, DOMIAN } from "@/utils/links";
import { productSchena } from "@/utils/zodValidtionShemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { parseWithZod } from "@conform-to/zod";
import prisma from "@/utils/db";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect(`${DOMIAN}/`);
  }

  const submission = parseWithZod(formData, {
    schema: productSchena,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const flatTenUrl = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flatTenUrl,
      category: submission.value.categery,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect(`${DOMIAN}/dashboard/products`);
}

export async function updateProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchena,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const flatTenUrl = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flatTenUrl,
      category: submission.value.categery,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });

  redirect(`${DOMIAN}/dashboard/products`);
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/");
  }
  const productId = formData.get("productId") as string;

  await prisma.product.delete({
    where: { id: productId },
  });
  redirect(`${DOMIAN}/dashboard/products`);
}
