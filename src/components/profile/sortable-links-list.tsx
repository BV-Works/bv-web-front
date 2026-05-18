'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPlatformLabel } from '@/components/profile/link-button';
import type { Link } from '@/types';

interface SortableLinkItemProps {
  link: Link;
  onEdit: (link: Link) => void;
}

function SortableLinkItem({ link, onEdit }: SortableLinkItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-md border p-3 bg-background ${
        isDragging ? 'shadow-lg ring-2 ring-primary' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing p-1 -m-1 hover:bg-muted rounded"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{link.title}</p>
        <p className="text-xs text-muted-foreground">
          {getPlatformLabel(link.platform)}
          {!link.is_visible && ' (hidden)'}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onEdit(link)}>
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface SortableLinksListProps {
  links: Link[];
  onReorder: (links: Link[]) => void;
  onEdit: (link: Link) => void;
}

export function SortableLinksList({ links, onReorder, onEdit }: SortableLinksListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sortedLinks = [...links].sort((a, b) => a.position - b.position);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = sortedLinks.findIndex((link) => link.id === active.id);
      const newIndex = sortedLinks.findIndex((link) => link.id === over.id);

      const reorderedLinks = arrayMove(sortedLinks, oldIndex, newIndex).map((link, index) => ({
        ...link,
        position: index,
      }));

      onReorder(reorderedLinks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedLinks.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sortedLinks.map((link) => (
            <SortableLinkItem key={link.id} link={link} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
