import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('auth_token')?.value;
    const isAuth = Boolean(token);

    const pathname = request.nextUrl.pathname;

    const protectedRoutes = ["/projects", "/todos", "/socials", "/settings"];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !isAuth) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/projects/:path*", "/todos/:path*", "/socials/:path*", "/settings/:path*"],
};
