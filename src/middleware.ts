import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

// Export the middleware with withAuth wrapper
export default withAuth(
  // Function that runs after authentication check
  function middleware(request) {
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
    const isAuthed = request.nextauth.token;

    // If user is authenticated and trying to access auth pages
    if (isAuthed && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true if the token exists
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
