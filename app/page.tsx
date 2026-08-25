import type { Metadata } from "next";
import { HomeView } from "@/views";
import { ROUTES, getPageMetadata } from "@/constants";

export const metadata: Metadata = getPageMetadata(ROUTES.home);

export default function Home() {
  return <HomeView />;
}
