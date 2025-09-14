import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import TimetableGrid from "@/components/timetable/timetable-grid";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentActivity from "@/components/dashboard/recent-activity";
import { type Teacher, type Room } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [showClassForm, setShowClassForm] = useState(false);

  const { data: teachers } = useQuery<Teacher[]>({
    queryKey: ["/api/teachers"],
  });

  const { data: rooms } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const activeTeachers = teachers?.filter(t => t.isActive).slice(0, 3) || [];
  const roomsByStatus = rooms?.reduce((acc, room) => {
    acc[room.status] = (acc[room.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Dashboard Overview"
          subtitle={new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          onNewClick={() => setShowClassForm(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timetable View */}
            <div className="lg:col-span-2">
              <TimetableGrid />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <QuickActions
                onCreateClass={() => setShowClassForm(true)}
                onAddTeacher={() => {/* TODO: Open teacher form */}}
                onBookRoom={() => {/* TODO: Open room booking */}}
                onScheduleEvent={() => {/* TODO: Open event form */}}
              />

              <RecentActivity />

              {/* Teacher Profiles */}
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Active Teachers</h3>
                <div className="space-y-4">
                  {activeTeachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center gap-3">
                      <img
                        src={teacher.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face`}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full status-online"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{teacher.name}</p>
                        <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                      </div>
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Status */}
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Room Status</h3>
                <div className="space-y-3">
                  {rooms?.slice(0, 4).map((room) => (
                    <div key={room.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            room.status === "available"
                              ? "bg-accent"
                              : room.status === "occupied"
                              ? "bg-destructive"
                              : "bg-primary"
                          }`}
                        ></div>
                        <span className="text-sm">{room.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {room.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-8 right-8 floating-action w-14 h-14 rounded-full text-primary-foreground shadow-lg transition-all duration-300 z-50"
        size="icon"
        onClick={() => setShowClassForm(true)}
        data-testid="floating-action-button"
      >
        <Plus size={24} />
      </Button>
    </div>
  );
}
