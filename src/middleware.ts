import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname
	console.log(pathName)
	const protectedPaths = ['/feed', '/post', '/profile', '/admin']
	const isPathProtected = protectedPaths.some((path) => pathName === path)

	if (isPathProtected) {
		if (!request.cookies.get('token') && !request.cookies.get('token')?.value) {
			const url = new URL('/login', request.url)
			return NextResponse.redirect(url)
		}
	}

	return NextResponse.next()
}
