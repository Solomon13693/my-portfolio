"use client";

import { useEffect, useDeferredValue, useMemo } from "react";
import { useResumeDraft } from "@/hooks";
import {
  themeToCssVars,
  googleFontUrlsForTheme,
  PREVIEW_FONT_SIZE_PX,
} from "@/lib";
import { SingleColumnPreview } from "./templates/SingleColumnPreview";
import { SidebarPreview } from "./templates/SidebarPreview";

/** Screen preview widths ≈ PDF page at 96dpi (keeps paper from stretching on wide monitors). */
function paperMaxWidthPx(skeletonId: string, pageSize: "A4" | "Letter") {
  if (skeletonId.startsWith("sidebar")) return 980;
  return pageSize === "Letter" ? 816 : 794;
}

export function ResumePreview() {
  const { draft } = useResumeDraft();
  // Keep typing snappy / preview can lag a frame behind heavy edits.
  const deferredDraft = useDeferredValue(draft);
  const theme = deferredDraft.theme;
  const cssVars = useMemo(
    () => ({
      ...themeToCssVars(theme),
      ["--cv-font-size" as string]: `${PREVIEW_FONT_SIZE_PX[theme.fontSize]}px`,
      ["--cv-page-padding" as string]: "clamp(1.5rem, 3vw, 2.25rem)",
    }),
    [theme],
  );
  const fontUrls = useMemo(() => googleFontUrlsForTheme(theme), [theme]);

  useEffect(() => {
    for (const url of fontUrls) {
      const id = `cv-font-${btoa(url).replace(/=+/g, "")}`;
      if (document.getElementById(id)) continue;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [fontUrls]);

  const maxWidth = paperMaxWidthPx(deferredDraft.skeletonId, theme.pageSize);
  const pageRatio = theme.pageSize === "Letter" ? 11 / 8.5 : 297 / 210;
  const pageMinHeight = Math.round(maxWidth * pageRatio);

  const paper =
    deferredDraft.skeletonId === "sidebar-left" ? (
      <SidebarPreview draft={deferredDraft} side="left" />
    ) : deferredDraft.skeletonId === "sidebar-right" ? (
      <SidebarPreview draft={deferredDraft} side="right" />
    ) : (
      <div
        className="h-full w-full overflow-visible"
        style={{ padding: "var(--cv-page-padding)" }}
      >
        <SingleColumnPreview draft={deferredDraft} />
      </div>
    );

  return (
    <div
      className="flex w-full justify-center border border-line bg-neutral-300/50 p-2 sm:p-3"
      style={{ colorScheme: "light" }}
    >
      <div
        className="w-full min-w-0 overflow-visible bg-white shadow-md"
        style={{
          ...cssVars,
          maxWidth,
          color: theme.bodyColor,
          fontFamily: "var(--cv-body-font)",
          fontSize: "var(--cv-font-size)",
          lineHeight: "var(--cv-line-height)",
          minHeight: pageMinHeight,
        }}
      >
        {paper}
      </div>
    </div>
  );
}

export default ResumePreview;
