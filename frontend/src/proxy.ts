import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/features"]);

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth();

    if (!userId && !isPublicRoute(request)) {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/(.*)",
    ],
};
