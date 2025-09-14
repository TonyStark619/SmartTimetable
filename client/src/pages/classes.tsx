import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { type ClassWithDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, MapPin } from "lucide-react";
import ClassForm from "@/components/forms/class-form";

export default function Classes() {
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassWithDetails | null>(null);

  const { data: classes, isLoading } = useQuery<ClassWithDetails[]>({
    queryKey: ["/api/classes"],
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Classes" subtitle="Loading..." showNewButton={false} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-24 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Classes"
          subtitle={`${classes?.length || 0} classes total`}
          onNewClick={() => setShowForm(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes?.map((classItem) => (
              <Card key={classItem.id} className="glass-card hover-glass transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: (classItem.color || "#06b6d4") + "20", color: classItem.color || "#06b6d4" }}
                    >
                      {classItem.subject}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen size={16} />
                      <span>{classItem.teacher.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span>{classItem.room.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      <span>{dayNames[classItem.dayOfWeek]} {classItem.startTime} - {classItem.endTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>{classItem.enrollmentCount}/{classItem.maxStudents} students</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingClass(classItem);
                        setShowForm(true);
                      }}
                      data-testid={`edit-class-${classItem.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`view-enrollments-${classItem.id}`}
                    >
                      Enrollments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {showForm && (
        <ClassForm
          classData={editingClass}
          onClose={() => {
            setShowForm(false);
            setEditingClass(null);
          }}
        />
      )}
    </div>
  );
}
