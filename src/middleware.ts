import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = req.cookies.get("session")
  // console.log(session)

  //Take User Bavck to login page if session is not found
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/chat/:path*"],
}
