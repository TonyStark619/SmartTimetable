import { Plus, User, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "class_created",
    title: "New class created",
    description: "Math 101 - Advanced Calculus",
    time: "2 hours ago",
    icon: Plus,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    type: "teacher_updated",
    title: "Teacher profile updated",
    description: "Dr. Smith updated availability",
    time: "4 hours ago",
    icon: User,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: 3,
    type: "conflict_detected",
    title: "Schedule conflict",
    description: "Room A1 double booking detected",
    time: "6 hours ago",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

export default function RecentActivity() {
  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`w-8 h-8 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={activity.iconColor} size={14} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
