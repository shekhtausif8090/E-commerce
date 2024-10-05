import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export const apiAuthPrefix = "/api/auth";
export const apiBackendPrefix = "/api/:path*";
export const DEFAULT_LOGIN_REDIRECT = "/";
export const authRoutes = ["/auth/sign-in", "/auth/sign-up"];
export const publicRoutes = "/";

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(isLoggedIn);

  const isApiPublicRoute = nextUrl.pathname.startsWith(publicRoutes);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isBackendRoute = nextUrl.pathname.startsWith(apiBackendPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(isAuthRoute);

  // if (isApiPublicRoute) {
  //   return null;
  // }
  if (isApiAuthRoute) {
    return null;
  }
  if (isBackendRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  // if (!isLoggedIn && !isAuthRoute && !isApiAuthRoute) {
  //   return Response.redirect(new URL("/auth/sign-in", nextUrl));
  // }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
