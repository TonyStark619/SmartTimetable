import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type ClassWithDetails } from "@shared/schema";
import { AlertTriangle } from "lucide-react";
import { useDragDrop } from "@/hooks/use-drag-drop";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const dayNames = ["MON", "TUE", "WED", "THU", "FRI"];

export default function TimetableGrid() {
  const [viewMode, setViewMode] = useState<"week" | "day" | "month">("week");
  
  const { data: classes, isLoading } = useQuery<ClassWithDetails[]>({
    queryKey: ["/api/classes"],
  });

  const { dragItem, dragOverSlot, handleDragStart, handleDragOver, handleDrop } = useDragDrop();

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-6 gap-2">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getClassesForSlot = (dayIndex: number, timeSlot: string) => {
    if (!classes) return [];
    return classes.filter(
      (cls) => cls.dayOfWeek === dayIndex + 1 && cls.startTime === timeSlot
    );
  };

  const hasConflict = (dayIndex: number, timeSlot: string) => {
    const slotClasses = getClassesForSlot(dayIndex, timeSlot);
    return slotClasses.length > 1;
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Weekly Timetable</h3>
        <div className="flex items-center gap-2">
          {["week", "day", "month"].map((mode) => (
            <button
              key={mode}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setViewMode(mode as any)}
              data-testid={`view-mode-${mode}`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Headers */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="text-xs text-muted-foreground p-2"></div>
            {dayNames.map((day) => (
              <div key={day} className="text-xs text-muted-foreground p-2 text-center font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-xs text-muted-foreground p-2 font-medium">
                {timeSlot}
              </div>
              {dayNames.map((_, dayIndex) => {
                const slotClasses = getClassesForSlot(dayIndex, timeSlot);
                const conflict = hasConflict(dayIndex, timeSlot);
                
                return (
                  <div
                    key={`${dayIndex}-${timeSlot}`}
                    className={`time-slot p-2 border border-border rounded min-h-[60px] relative transition-all duration-200 ${
                      dragOverSlot?.day === dayIndex && dragOverSlot?.time === timeSlot
                        ? "bg-primary/20 border-primary"
                        : ""
                    }`}
                    onDragOver={(e) => handleDragOver(e, dayIndex, timeSlot)}
                    onDrop={(e) => handleDrop(e, dayIndex, timeSlot)}
                    data-testid={`time-slot-${dayIndex}-${timeSlot}`}
                  >
                    {slotClasses.map((cls, index) => (
                      <div
                        key={cls.id}
                        className={`class-block rounded p-2 text-xs text-primary-foreground h-full cursor-grab transition-all duration-200 ${
                          conflict ? "border-2 border-destructive" : ""
                        }`}
                        style={{
                          background: cls.color || "#06b6d4",
                          opacity: dragItem?.id === cls.id ? 0.5 : 1,
                          zIndex: index + 1,
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, cls)}
                        data-testid={`class-block-${cls.id}`}
                      >
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-xs opacity-80">{cls.teacher.name}</div>
                        <div className="text-xs opacity-60">{cls.room.name}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Conflict Detection Alert */}
      {classes?.some((cls, index) => 
        classes.some((other, otherIndex) => 
          index !== otherIndex &&
          cls.dayOfWeek === other.dayOfWeek &&
          cls.startTime === other.startTime &&
          (cls.teacherId === other.teacherId || cls.roomId === other.roomId)
        )
      ) && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-destructive mt-1" size={16} />
            <div>
              <h4 className="font-medium text-destructive">Schedule Conflict Detected</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Multiple classes are scheduled at the same time with overlapping resources. Please resolve these conflicts.
              </p>
              <button className="text-destructive text-sm font-medium mt-2 hover:underline">
                Resolve Conflicts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
