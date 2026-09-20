/** Shared horizontal shell for CV Lab pages / keep Header aligned with content. */
export const CV_LAB_SHELL_CLASS =
  "w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10" as const;

export function isCvLabPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (
    pathname === "/cv-lab" ||
    pathname.startsWith("/cv-lab/") ||
    pathname === "/cv-unlock"
  );
}
