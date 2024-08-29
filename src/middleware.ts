import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_EMAIL, DOMIAN } from "./utils/links";

async function userCheck() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await userCheck();
  if (!user) {
    if (
      request.nextUrl.pathname === "/dashboard" ||
      request.nextUrl.pathname === "/payment" ||
      request.nextUrl.pathname === "/bag"
    ) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname === "/api/auth") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (user.email !== ADMIN_EMAIL) {
      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/bag", "/payment/:path*", "/dashboard/:path*"],
};
