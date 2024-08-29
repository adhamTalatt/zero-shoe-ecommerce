"use server";
import { ADMIN_EMAIL, DOMIAN } from "@/utils/links";
import { bannerSchema, productSchema } from "@/utils/zodValidtionShemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import prisma from "@/utils/db";
import { redis } from "@/utils/redis";
import { Cart } from "@/utils/interdaces";

import { revalidatePath } from "next/cache";
import { stripe } from "@/utils/stripe";
import Stripe from "stripe";

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect(`${DOMIAN}/`);
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
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
    schema: productSchema,
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

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/");
  }
  const submissin = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submissin.status !== "success") {
    return submissin.reply();
  }

  await prisma.banners.create({
    data: {
      title: submissin.value.title,
      imageString: submissin.value.imageString,
    },
  });
  redirect(`${DOMIAN}/dashboard/banner`);
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect(`${DOMIAN}/`);
  }

  const bannerId = formData.get("bannerId") as string;

  await prisma.banners.delete({
    where: { id: bannerId },
  });
  redirect(`${DOMIAN}/dashboard/banner`);
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect(`${DOMIAN}/api/auth/login`);
  }
  let cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const selectedProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });
  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user?.id as string,
      items: [
        {
          price: selectedProduct.price,
          name: selectedProduct.name,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageString: selectedProduct.images[0],
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user?.id}`, myCart);
  // for not save in cashe
  revalidatePath("/", "layout");
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };
    await redis.set(`cart-${user.id}`, updateCart);
  }
  // for not save in cashe
  revalidatePath("/bag", "page");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect(`${DOMIAN}/api/auth/login`);
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://zero-show.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/cancel"
          : "https://zero-show.vercel.app/payment/cancel",
      metadata: {
        userId: user.id,
      },
    });

    return redirect(session.url as string);
  }
}
