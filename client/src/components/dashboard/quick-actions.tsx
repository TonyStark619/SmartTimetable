import { Plus, UserPlus, DoorOpen, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onCreateClass?: () => void;
  onAddTeacher?: () => void;
  onBookRoom?: () => void;
  onScheduleEvent?: () => void;
}

export default function QuickActions({
  onCreateClass,
  onAddTeacher,
  onBookRoom,
  onScheduleEvent,
}: QuickActionsProps) {
  const actions = [
    {
      title: "Create New Class",
      icon: Plus,
      color: "text-primary",
      onClick: onCreateClass,
      testId: "quick-action-create-class",
    },
    {
      title: "Add Teacher",
      icon: UserPlus,
      color: "text-accent",
      onClick: onAddTeacher,
      testId: "quick-action-add-teacher",
    },
    {
      title: "Book Room",
      icon: DoorOpen,
      color: "text-destructive",
      onClick: onBookRoom,
      testId: "quick-action-book-room",
    },
    {
      title: "Schedule Event",
      icon: CalendarPlus,
      color: "text-primary",
      onClick: onScheduleEvent,
      testId: "quick-action-schedule-event",
    },
  ];

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="ghost"
            className="w-full justify-start gap-3 p-3 hover-glass transition-all duration-200"
            onClick={action.onClick}
            data-testid={action.testId}
          >
            <action.icon className={action.color} size={18} />
            <span>{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
