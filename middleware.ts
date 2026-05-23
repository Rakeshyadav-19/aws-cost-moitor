// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  // Protect all routes under /dashboard and /setup
  matcher: ["/dashboard/:path*", "/setup/:path*"],
};
