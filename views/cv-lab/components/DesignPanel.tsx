"use client";

import { CV_FONT_OPTIONS } from "@/data";
import { Input, Select } from "@/components/ui/form";
import { useResumeDraft } from "@/hooks";
import type { ResumeFontId, ResumeTheme } from "@/types";

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-9 cursor-pointer border border-line bg-background p-0.5"
          aria-label={label}
        />
        <Input
          name={label}
          radius="none"
          formGroupClass="mb-0 flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function DesignPanel() {
  const { draft, updateDraft } = useResumeDraft();
  const theme = draft.theme;

  const setTheme = (patch: Partial<ResumeTheme>) => {
    updateDraft((prev) => ({ ...prev, theme: { ...prev.theme, ...patch } }));
  };

  const setSkeleton = (skeletonId: typeof draft.skeletonId) => {
    updateDraft((prev) => ({ ...prev, skeletonId }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Layout skeleton
        </p>
        <Select
          name="skeleton"
          radius="none"
          formGroupClass="mt-2 mb-0"
          value={draft.skeletonId}
          onChange={(e) =>
            setSkeleton(e.target.value as typeof draft.skeletonId)
          }
        >
          <option value="single-column">Single column</option>
          <option value="sidebar-left">Sidebar left</option>
          <option value="sidebar-right">Sidebar right</option>
        </Select>
      </div>

      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Fonts
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Heading font"
            name="headingFont"
            radius="none"
            value={theme.headingFontId}
            onChange={(e) =>
              setTheme({ headingFontId: e.target.value as ResumeFontId })
            }
          >
            {CV_FONT_OPTIONS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.label}
              </option>
            ))}
          </Select>
          <Select
            label="Body font"
            name="bodyFont"
            radius="none"
            value={theme.bodyFontId}
            onChange={(e) =>
              setTheme({ bodyFontId: e.target.value as ResumeFontId })
            }
          >
            {CV_FONT_OPTIONS.map((font) => (
              <option key={font.id} value={font.id}>
                {font.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Colors
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ColorField
            label="Heading"
            value={theme.headingColor}
            onChange={(headingColor) => setTheme({ headingColor })}
          />
          <ColorField
            label="Body"
            value={theme.bodyColor}
            onChange={(bodyColor) => setTheme({ bodyColor })}
          />
          <ColorField
            label="Accent"
            value={theme.accentColor}
            onChange={(accentColor) => setTheme({ accentColor })}
          />
          <ColorField
            label="Muted"
            value={theme.mutedColor}
            onChange={(mutedColor) => setTheme({ mutedColor })}
          />
        </div>
      </div>

      <div>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Spacing & size
        </p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Font size"
            name="fontSize"
            radius="none"
            value={theme.fontSize}
            onChange={(e) =>
              setTheme({ fontSize: e.target.value as ResumeTheme["fontSize"] })
            }
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </Select>
          <Select
            label="Line height"
            name="lineHeight"
            radius="none"
            value={theme.lineHeight}
            onChange={(e) =>
              setTheme({
                lineHeight: e.target.value as ResumeTheme["lineHeight"],
              })
            }
          >
            <option value="tight">Tight</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
          </Select>
          <Select
            label="Section gap"
            name="sectionGap"
            radius="none"
            value={theme.sectionGap}
            onChange={(e) =>
              setTheme({
                sectionGap: e.target.value as ResumeTheme["sectionGap"],
              })
            }
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </Select>
          <Select
            label="Density"
            name="density"
            radius="none"
            value={theme.density}
            onChange={(e) =>
              setTheme({ density: e.target.value as ResumeTheme["density"] })
            }
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </Select>
          <Select
            label="Page size"
            name="pageSize"
            radius="none"
            value={theme.pageSize}
            onChange={(e) =>
              setTheme({ pageSize: e.target.value as ResumeTheme["pageSize"] })
            }
          >
            <option value="A4">A4</option>
            <option value="Letter">Letter</option>
          </Select>
          <Select
            label="Heading style"
            name="headingStyle"
            radius="none"
            value={theme.headingStyle}
            onChange={(e) =>
              setTheme({
                headingStyle: e.target.value as ResumeTheme["headingStyle"],
              })
            }
          >
            <option value="uppercase">Uppercase</option>
            <option value="title">Title case</option>
            <option value="underline">Underline</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!theme.showAccentBar}
            onChange={(e) => setTheme({ showAccentBar: e.target.checked })}
          />
          Accent top bar
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!theme.showTimelineRail}
            onChange={(e) => setTheme({ showTimelineRail: e.target.checked })}
          />
          Timeline rail
        </label>
      </div>
    </div>
  );
}

export default DesignPanel;
