// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // token login yang kamu simpan
  const url = req.nextUrl.clone();

  // cek kalau URL mengarah ke dashboard
  if (url.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "/login"; // redirect ke login kalau belum login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// middleware hanya berlaku untuk route ini
export const config = {
  matcher: ["/dashboard/:path*"], // semua route di /dashboard
};
