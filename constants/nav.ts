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
    label: "Work",
    href: "/work",
    description: "Selected projects",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    description: "Let's talk",
  },
];

export const SITE_NAME = "Solomon Adeoye";
