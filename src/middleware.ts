import { NextResponse, NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const key = req.nextUrl.searchParams.get("key");

  if (url.pathname === "/" && !key) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)"],
};
