"use client";

import { Reorder, useDragControls } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { DragHandle } from "@/components/reusable";
import { Input, TextArea, Checkbox } from "@/components/ui/form";
import Button from "@/components/ui/button";
import type { ListEntry, ListResumeSection } from "@/types";
import { newId } from "./templates/shared";

function EntryRow({
  entry,
  onChange,
  onRemove,
}: {
  entry: ListEntry;
  onChange: (entry: ListEntry) => void;
  onRemove: () => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={entry}
      dragListener={false}
      dragControls={dragControls}
      className="border border-line bg-background p-3"
    >
      <div className="flex items-start gap-2">
        <DragHandle
          onPointerDown={(e) => dragControls.start(e)}
          className="mt-2"
        />
        <div className="grid flex-1 grid-cols-1 gap-x-4 sm:grid-cols-2">
          <Input
            label="Title"
            name="title"
            radius="none"
            value={entry.title}
            onChange={(e) => onChange({ ...entry, title: e.target.value })}
          />
          <Input
            label="Subtitle"
            name="subtitle"
            radius="none"
            value={entry.subtitle ?? ""}
            onChange={(e) => onChange({ ...entry, subtitle: e.target.value })}
          />
          <Input
            label="Meta"
            name="meta"
            radius="none"
            value={entry.meta ?? ""}
            onChange={(e) => onChange({ ...entry, meta: e.target.value })}
          />
          <Input
            label="Link"
            name="href"
            radius="none"
            value={entry.href ?? ""}
            onChange={(e) => onChange({ ...entry, href: e.target.value })}
          />
          <TextArea
            label="Description"
            name="description"
            radius="none"
            className="min-h-16"
            formGroupClass="sm:col-span-2"
            fullWidth
            value={entry.description ?? ""}
            onChange={(e) =>
              onChange({ ...entry, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col items-end gap-2 pt-1">
          <Checkbox
            name="visible"
            label="Visible"
            checked={entry.visible}
            onChange={(e) => onChange({ ...entry, visible: e.target.checked })}
            formGroupClass="mb-0"
          />
          <button
            type="button"
            onClick={onRemove}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            aria-label="Remove entry"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
}

export function ListSectionEditor({
  section,
  onChange,
}: {
  section: ListResumeSection;
  onChange: (section: ListResumeSection) => void;
}) {
  const setEntries = (entries: ListEntry[]) =>
    onChange({ ...section, entries });

  return (
    <div>
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {section.title}
      </p>
      <Reorder.Group
        axis="y"
        values={section.entries}
        onReorder={setEntries}
        className="mt-3 space-y-2"
      >
        {section.entries.map((entry) => (
          <EntryRow
            key={entry.id}
            entry={entry}
            onChange={(next) =>
              setEntries(
                section.entries.map((e) => (e.id === entry.id ? next : e)),
              )
            }
            onRemove={() =>
              setEntries(section.entries.filter((e) => e.id !== entry.id))
            }
          />
        ))}
      </Reorder.Group>
      <Button
        size="sm"
        variant="bordered"
        className="mt-3 rounded-none"
        onClick={() =>
          setEntries([
            ...section.entries,
            { id: newId("list"), title: "New item", visible: true },
          ])
        }
        startContent={<Plus className="size-3.5" />}
      >
        Add item
      </Button>
    </div>
  );
}

export default ListSectionEditor;
