import { GripVertical } from "lucide-react";
import type { PointerEvent } from "react";
import { cn } from "@/lib";

interface DragHandleProps {
  onPointerDown?: (e: PointerEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function DragHandle({ onPointerDown, className }: DragHandleProps) {
  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      aria-label="Drag to reorder"
      className={cn(
        "flex size-6 shrink-0 cursor-grab touch-none items-center justify-center text-muted-foreground hover:text-foreground active:cursor-grabbing",
        className,
      )}
    >
      <GripVertical className="size-4" aria-hidden="true" />
    </button>
  );
}

export default DragHandle;
