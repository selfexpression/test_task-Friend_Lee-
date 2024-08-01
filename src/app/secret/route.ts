import { NextRequest, NextResponse } from "next/server";
import io from "socket.io-client";

export const GET = async (req: NextRequest) => {
  const socket = io("http://localhost:3000");
  const key = req.nextUrl.searchParams.get("key");

  if (key) {
    socket.emit("key", key);

    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("key", key);

    return NextResponse.redirect(redirectUrl);
  }

  return new NextResponse("Bad Request", { status: 400 });
};
