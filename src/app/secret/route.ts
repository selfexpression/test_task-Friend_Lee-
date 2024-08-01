import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get("key");

  if (key) {
    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("key", key);

    return NextResponse.redirect(redirectUrl);
  }

  return new NextResponse("Bad Request", { status: 400 });
};
