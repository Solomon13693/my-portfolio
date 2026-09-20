export interface NavLink {
  id: string;
  label: string;
  href: string;
  description: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    id: "about",
    label: "About",
    href: "/about",
    description: "Who I am, in more detail",
  },
  {
    id: "work",
    label: "Projects",
    href: "/work",
    description: "Shipped products",
  },
  {
    id: "cv-lab",
    label: "CV Lab",
    href: "/cv-lab",
    description: "Build a resume & cover letter",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    description: "Let's talk",
  },
];

export const SITE_NAME = "Solomon Adeoye";
