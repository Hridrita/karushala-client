import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = [
  "/dashboard",
  "/add-craft",
  "/manage-crafts",
  "settings",
  "/profile"
];

// demo user ei route gulate dhukte parbe na (dashboard view kora allowed thakbe)
const demoRestrictedRoutes = [
  "/add-craft",
  "/manage-crafts",
  "/dashboard",
  "/settings",
  "/profile"
];

const DEMO_EMAILS = ["demo@karushala.com", "demo@example.com", "test@karushala.com"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/auth/auth_page", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isDemoRestricted = demoRestrictedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isDemoRestricted) {
    try {
      const sessionRes = await fetch(
        `${process.env.BETTER_AUTH_URL}/api/auth/get-session`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        }
      );

      if (sessionRes.ok) {
        const session = await sessionRes.json();
        const email: string | undefined = session?.user?.email;

        if (email && DEMO_EMAILS.includes(email.toLowerCase())) {
          const redirectUrl = new URL("/dashboard", request.url);
          redirectUrl.searchParams.set("demoRestricted", "1");
          return NextResponse.redirect(redirectUrl);
        }
      }
    } catch (error) {
      console.error("Proxy demo-check failed:", error);
      // fail-safe: session check e error hoile block na kore pass hote dilam
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/add-craft",
    "/manage-crafts",
    "/manage-crafts/:path*",
    "/settings",
    "/profile"
  ],
};