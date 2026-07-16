// Base path the app is served under (e.g. "/Portfolio" on GitHub Pages, "" elsewhere).
// next/image and next/link prefix this automatically; raw URLs (window.open, <a href>,
// metadata images) do not — use `withBase` for those.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (path: string) => `${BASE_PATH}${path}`;
