import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth_token"); // Replace with your actual auth check
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

  // If user is not authenticated and trying to access dashboard
  if (!isAuthenticated && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // If user is authenticated and trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
