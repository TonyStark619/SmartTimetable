import { useState } from "react";
import { type ClassWithDetails } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface DragOverSlot {
  day: number;
  time: string;
}

export function useDragDrop() {
  const [dragItem, setDragItem] = useState<ClassWithDetails | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<DragOverSlot | null>(null);
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, classItem: ClassWithDetails) => {
    setDragItem(classItem);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, day: number, time: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverSlot({ day, time });
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = async (e: React.DragEvent, day: number, time: string) => {
    e.preventDefault();
    setDragOverSlot(null);

    if (!dragItem) return;

    // Convert day index to day of week (0 = Sunday, but we use 1 = Monday)
    const dayOfWeek = day + 1;

    try {
      // Here you would typically update the class schedule
      // For now, we'll just show a success message
      toast({
        title: "Class Moved",
        description: `${dragItem.name} has been moved to ${time} on day ${dayOfWeek}`,
      });

      // TODO: Implement actual API call to update class schedule
      // await updateClass(dragItem.id, { dayOfWeek, startTime: time });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDragItem(null);
    }
  };

  const handleDragEnd = () => {
    setDragItem(null);
    setDragOverSlot(null);
  };

  return {
    dragItem,
    dragOverSlot,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}
