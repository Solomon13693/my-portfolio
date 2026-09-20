"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";
import { ROUTES } from "@/constants";

const TABS = [
  { href: ROUTES.cvLab, label: "Resume" },
  { href: ROUTES.cvLabCoverLetter, label: "Cover Letter" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5 border-b border-line">
      {TABS.map((tab) => {
        const active =
          pathname === tab.href ||
          (tab.href !== ROUTES.cvLab && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "cursor-pointer border-b-2 pb-3 -mb-px font-mono text-xs tracking-wider uppercase transition-colors",
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default NavTabs;
