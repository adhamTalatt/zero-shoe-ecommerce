import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DOMIAN } from "./utils/links";

async function userCheck() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await userCheck();
  if (!user) {
    return NextResponse.redirect(
      new URL(`${DOMIAN}/api/auth/login`, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/bag", "/payment/:path*", "/dasboard/:path*"],
};
