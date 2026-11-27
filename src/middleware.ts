import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const pathname = url.pathname;

  const isAdminSubdomain =
    hostname.startsWith("admin.kuntl.me") ||
    hostname.startsWith("admin.localhost");

  // If visiting /blog* on the admin subdomain, redirect to the main site origin
  if (isAdminSubdomain && pathname.startsWith("/blog")) {
    const mainUrl = req.nextUrl.clone();
    mainUrl.host = hostname.replace(/^admin\./, "");
    return NextResponse.redirect(mainUrl);
  }

  // Protect /api/admin/* endpoints (except login/logout)
  if (pathname.startsWith("/api/admin")) {
    if (
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/logout"
    ) {
      return NextResponse.next();
    }

    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const isAdminPath = isAdminSubdomain || pathname.startsWith("/admin");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  // Normalize target internal pathname for admin routes
  let targetPath = pathname;
  if (isAdminSubdomain) {
    if (!pathname.startsWith("/admin")) {
      targetPath = `/admin${pathname === "/" ? "" : pathname}`;
    }
  }

  const isLoginRoute = targetPath === "/admin/login";
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = isAdminSubdomain ? "/login" : "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginRoute) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = isAdminSubdomain ? "/" : "/admin";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  if (isAdminSubdomain && targetPath !== pathname) {
    url.pathname = targetPath;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
