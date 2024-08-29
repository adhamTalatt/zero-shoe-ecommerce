import prisma from "@/utils/db";
import { DOMIAN } from "@/utils/links";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
/**
 * @method GET
 * @route http://localhost:3000/api/creation
 * @desc auth for user
 * @access public
 */

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      { massage: "Something went wrong... " },
      { status: 404 }
    );
  }

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name || "",
        lastName: user.family_name || "",
        porfileImage:
          user.picture || `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(`${DOMIAN}/`);
}
