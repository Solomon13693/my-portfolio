"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/form";
import Button from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useResumeDraft } from "@/hooks";
import { newId } from "./templates/shared";
import type { ResumeProfileLink } from "@/types";

export function ProfileForm() {
  const { draft, updateDraft } = useResumeDraft();
  const [editing, setEditing] = useState(false);

  const setField = (
    field: "name" | "headline" | "email" | "phone" | "location",
    value: string,
  ) => {
    updateDraft((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const setLinks = (links: ResumeProfileLink[]) => {
    updateDraft((prev) => ({ ...prev, profile: { ...prev.profile, links } }));
  };

  if (!editing) {
    return (
      <div className="relative border border-line bg-background p-4">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="absolute top-3 right-3 cursor-pointer text-muted-foreground hover:text-foreground"
          aria-label="Edit profile"
        >
          <Pencil className="size-4" />
        </button>
        <div className="flex gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line bg-muted text-lg font-semibold">
            {draft.profile.name
              .split(/\s+/)
              .slice(0, 2)
              .map((p) => p[0])
              .join("")
              .toUpperCase() || "?"}
          </div>
          <div className="min-w-0 pr-6">
            <p className="truncate font-semibold">
              {draft.profile.name || "Your name"}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {draft.profile.headline || "Headline"}
            </p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {draft.profile.email}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {[draft.profile.phone, draft.profile.location]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Personal information
        </p>
        <Button
          size="sm"
          variant="light"
          className="rounded-none"
          onClick={() => setEditing(false)}
        >
          Done
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          radius="none"
          value={draft.profile.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <Input
          label="Headline"
          name="headline"
          radius="none"
          value={draft.profile.headline}
          onChange={(e) => setField("headline", e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          radius="none"
          value={draft.profile.email}
          onChange={(e) => setField("email", e.target.value)}
        />
        <Input
          label="Phone"
          name="phone"
          radius="none"
          value={draft.profile.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
        <Input
          label="Location"
          name="location"
          radius="none"
          formGroupClass="sm:col-span-2"
          value={draft.profile.location}
          onChange={(e) => setField("location", e.target.value)}
        />
      </div>

      <p className="mt-4 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        Links
      </p>
      <div className="mt-2 space-y-2">
        {draft.profile.links.map((link) => (
          <div key={link.id} className="flex items-start gap-2">
            <Input
              name={`${link.id}-label`}
              radius="none"
              placeholder="Label"
              formGroupClass="mb-0 w-28"
              value={link.label}
              onChange={(e) =>
                setLinks(
                  draft.profile.links.map((l) =>
                    l.id === link.id ? { ...l, label: e.target.value } : l,
                  ),
                )
              }
            />
            <Input
              name={`${link.id}-url`}
              radius="none"
              placeholder="URL"
              formGroupClass="mb-0 flex-1"
              fullWidth
              value={link.url}
              onChange={(e) =>
                setLinks(
                  draft.profile.links.map((l) =>
                    l.id === link.id ? { ...l, url: e.target.value } : l,
                  ),
                )
              }
            />
            <button
              type="button"
              onClick={() =>
                setLinks(draft.profile.links.filter((l) => l.id !== link.id))
              }
              className="mt-2 cursor-pointer text-muted-foreground hover:text-foreground"
              aria-label="Remove link"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <Button
        size="sm"
        variant="bordered"
        className="mt-3 rounded-none"
        onClick={() =>
          setLinks([
            ...draft.profile.links,
            { id: newId("link"), label: "Link", url: "" },
          ])
        }
        startContent={<Plus className="size-3.5" />}
      >
        Add link
      </Button>
    </div>
  );
}

export default ProfileForm;
