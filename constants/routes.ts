export const ROUTES = {
  home: "/",
  about: "/about",
  work: "/work",
  contact: "/contact",
  cvLab: "/cv-lab",
  cvLabCoverLetter: "/cv-lab/cover-letter",
} as const;

/** Legacy unlock entry. Redirects to the public CV Lab. */
export const PRIVATE_ROUTES = {
  cvLab: ROUTES.cvLab,
  cvLabCoverLetter: ROUTES.cvLabCoverLetter,
  cvUnlock: "/cv-unlock",
} as const;
