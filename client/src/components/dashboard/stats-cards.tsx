import { Users, BookOpen, UserCheck, DoorOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type DashboardStats } from "@shared/schema";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-lg p-6 animate-pulse">
            <div className="h-16 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Classes",
      value: stats.totalClasses,
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "+12%",
      changeText: "from last month",
    },
    {
      title: "Active Teachers",
      value: stats.activeTeachers,
      icon: UserCheck,
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+3",
      changeText: "new this week",
    },
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      change: "+89",
      changeText: "new enrollments",
    },
    {
      title: "Room Utilization",
      value: `${stats.roomUtilization}%`,
      icon: DoorOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: "",
      changeText: "Optimal usage",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div
          key={card.title}
          className="glass-card hover-glass rounded-lg p-6 transition-all duration-200 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          data-testid={`stat-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">{card.title}</p>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            </div>
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <card.icon className={card.color} size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {card.change && (
              <span className="text-accent text-sm font-medium">{card.change}</span>
            )}
            <span className="text-muted-foreground text-sm">{card.changeText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
