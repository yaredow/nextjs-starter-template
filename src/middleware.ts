import { betterFetch } from "@better-fetch/fetch";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch("/api/auth/get-session", {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const isLoggedIn = !!session;
  const { nextUrl } = request;

  const isApiAuthRoute = apiAuthPrefix.some((apiPrefix) =>
    nextUrl.pathname.startsWith(apiPrefix),
  );

  const isPublicRoute = publicRoutes.some((publicRoute) => {
    if (publicRoute.endsWith("*")) {
      const baseRoute = publicRoute.slice(0, -1);
      return nextUrl.pathname.startsWith(baseRoute);
    }
    return nextUrl.pathname === publicRoute;
  });

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
