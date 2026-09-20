"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { DragHandle } from "@/components/reusable";
import { Input, TextArea, Checkbox } from "@/components/ui/form";
import Button from "@/components/ui/button";
import type {
  TimelineEntry,
  TimelineResumeSection,
  TimelineRole,
} from "@/types";
import { newId } from "./templates/shared";
import { AiImproveButton } from "./AiImproveButton";

function BulletRow({
  bullet,
  onChange,
  onRemove,
  onImprove,
}: {
  bullet: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  onImprove: (text: string) => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={bullet}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-start gap-2 bg-background"
    >
      <div className="pt-2">
        <DragHandle onPointerDown={(e) => dragControls.start(e)} />
      </div>
      <TextArea
        name="bullet"
        radius="none"
        className="h-16"
        formGroupClass="mb-0 flex-1"
        fullWidth
        value={bullet}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="mt-2 flex flex-col gap-1">
        <AiImproveButton
          action="improve"
          iconOnly
          payload={{ text: bullet, context: "resume bullet" }}
          onResult={onImprove}
          disabled={!bullet.trim()}
        />
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer text-muted-foreground hover:text-foreground"
          aria-label="Remove bullet"
        >
          <X className="size-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

function ToolChips({
  tools,
  onChange,
}: {
  tools: string[];
  onChange: (tools: string[]) => void;
}) {
  const [value, setValue] = useState("");

  const addTool = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onChange([...tools, trimmed]);
    setValue("");
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {tools.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="inline-flex items-center gap-1 border border-line px-2 py-1 text-xs"
          >
            {tool}
            <button
              type="button"
              onClick={() => onChange(tools.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${tool}`}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>
      <Input
        name="add-tool"
        radius="none"
        inputSize="sm"
        placeholder="Add a tool, press Enter"
        formGroupClass="mt-2 mb-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTool();
          }
        }}
      />
    </div>
  );
}

function RoleBlock({
  role,
  onChange,
  onRemove,
}: {
  role: TimelineRole;
  onChange: (role: TimelineRole) => void;
  onRemove: () => void;
}) {
  const dragControls = useDragControls();
  const setBullets = (bullets: string[]) => onChange({ ...role, bullets });

  return (
    <Reorder.Item
      value={role}
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
            label="Role title"
            name="title"
            radius="none"
            value={role.title}
            onChange={(e) => onChange({ ...role, title: e.target.value })}
          />
          <Input
            label="Period"
            name="period"
            radius="none"
            value={role.period}
            onChange={(e) => onChange({ ...role, period: e.target.value })}
          />
          <Input
            label="Duration"
            name="duration"
            radius="none"
            value={role.duration ?? ""}
            onChange={(e) => onChange({ ...role, duration: e.target.value })}
          />
          <div className="flex items-end gap-3 pb-3">
            <Checkbox
              name="current"
              label="Current"
              checked={!!role.current}
              onChange={(e) => onChange({ ...role, current: e.target.checked })}
              formGroupClass="mb-0"
            />
            <Checkbox
              name="visible"
              label="Visible"
              checked={role.visible}
              onChange={(e) => onChange({ ...role, visible: e.target.checked })}
              formGroupClass="mb-0"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="mt-2 cursor-pointer text-muted-foreground hover:text-foreground"
          aria-label="Remove role"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div className="mt-3">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Bullets
        </p>
        <Reorder.Group
          axis="y"
          values={role.bullets}
          onReorder={setBullets}
          className="mt-2 space-y-2"
        >
          {role.bullets.map((bullet, index) => (
            <BulletRow
              key={`${role.id}-bullet-${index}`}
              bullet={bullet}
              onChange={(value) =>
                setBullets(
                  role.bullets.map((b, i) => (i === index ? value : b)),
                )
              }
              onRemove={() =>
                setBullets(role.bullets.filter((_, i) => i !== index))
              }
              onImprove={(text) =>
                setBullets(role.bullets.map((b, i) => (i === index ? text : b)))
              }
            />
          ))}
        </Reorder.Group>
        <Button
          size="sm"
          variant="light"
          className="mt-2 rounded-none"
          onClick={() => setBullets([...role.bullets, ""])}
          startContent={<Plus className="size-3.5" />}
        >
          Add bullet
        </Button>
      </div>

      <div className="mt-3">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Tools
        </p>
        <div className="mt-2">
          <ToolChips
            tools={role.tools}
            onChange={(tools) => onChange({ ...role, tools })}
          />
        </div>
      </div>
    </Reorder.Item>
  );
}

function OrgBlock({
  entry,
  onChange,
  onRemove,
}: {
  entry: TimelineEntry;
  onChange: (entry: TimelineEntry) => void;
  onRemove: () => void;
}) {
  const dragControls = useDragControls();
  const setRoles = (roles: TimelineRole[]) => onChange({ ...entry, roles });

  const addRole = () => {
    setRoles([
      ...entry.roles,
      {
        id: newId("role"),
        title: "New role",
        period: "",
        bullets: [""],
        tools: [],
        visible: true,
      },
    ]);
  };

  return (
    <Reorder.Item
      value={entry}
      dragListener={false}
      dragControls={dragControls}
      className="border border-line bg-muted/20 p-4"
    >
      <div className="flex items-center gap-2">
        <DragHandle onPointerDown={(e) => dragControls.start(e)} />
        <Input
          label="Organization / company"
          name="organization"
          radius="none"
          formGroupClass="mb-0 flex-1"
          fullWidth
          value={entry.organization}
          onChange={(e) => onChange({ ...entry, organization: e.target.value })}
        />
        <Checkbox
          name="org-visible"
          label="Visible"
          checked={entry.visible}
          onChange={(e) => onChange({ ...entry, visible: e.target.checked })}
          formGroupClass="mb-0"
        />
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer text-muted-foreground hover:text-foreground"
          aria-label="Remove organization"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <p className="mt-3 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
        Roles at this organization
      </p>
      <Reorder.Group
        axis="y"
        values={entry.roles}
        onReorder={setRoles}
        className="mt-2 space-y-3"
      >
        {entry.roles.map((role) => (
          <RoleBlock
            key={role.id}
            role={role}
            onChange={(next) =>
              setRoles(entry.roles.map((r) => (r.id === role.id ? next : r)))
            }
            onRemove={() =>
              setRoles(entry.roles.filter((r) => r.id !== role.id))
            }
          />
        ))}
      </Reorder.Group>

      <Button
        size="sm"
        variant="light"
        className="mt-3 rounded-none"
        onClick={addRole}
        startContent={<Plus className="size-3.5" />}
      >
        Add role
      </Button>
    </Reorder.Item>
  );
}

export function TimelineSectionEditor({
  section,
  onChange,
}: {
  section: TimelineResumeSection;
  onChange: (section: TimelineResumeSection) => void;
}) {
  const setEntries = (entries: TimelineEntry[]) =>
    onChange({ ...section, entries });

  const addOrg = () => {
    setEntries([
      ...section.entries,
      {
        id: newId("org"),
        organization: "New organization",
        visible: true,
        roles: [],
      },
    ]);
  };

  return (
    <div>
      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {section.title}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        LinkedIn-style: one organization, multiple roles underneath.
      </p>

      <Reorder.Group
        axis="y"
        values={section.entries}
        onReorder={setEntries}
        className="mt-3 space-y-3"
      >
        {section.entries.map((entry) => (
          <OrgBlock
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
        onClick={addOrg}
        startContent={<Plus className="size-3.5" />}
      >
        Add organization
      </Button>
    </div>
  );
}

export default TimelineSectionEditor;
