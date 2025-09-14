import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { type Room } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Monitor, AlertCircle, CheckCircle, Wrench } from "lucide-react";
import RoomForm from "@/components/forms/room-form";

export default function Rooms() {
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="text-accent" size={16} />;
      case "occupied":
        return <AlertCircle className="text-destructive" size={16} />;
      case "maintenance":
        return <Wrench className="text-primary" size={16} />;
      default:
        return <CheckCircle className="text-muted-foreground" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-accent";
      case "occupied":
        return "bg-destructive";
      case "maintenance":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Rooms" subtitle="Loading..." showNewButton={false} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-muted rounded"></div>
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
          title="Rooms"
          subtitle={`${rooms?.length || 0} rooms available`}
          onNewClick={() => setShowForm(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms?.map((room) => (
              <Card key={room.id} className="glass-card hover-glass transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(room.status)}
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(room.status)}`}></div>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {room.type}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>Capacity: {room.capacity}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Monitor size={16} />
                      <span>Status: {room.status}</span>
                    </div>
                    
                    {room.equipment && room.equipment.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Equipment:</p>
                        <div className="flex flex-wrap gap-1">
                          {room.equipment.slice(0, 3).map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item.replace(/_/g, ' ')}
                            </Badge>
                          ))}
                          {room.equipment.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{room.equipment.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingRoom(room);
                        setShowForm(true);
                      }}
                      data-testid={`edit-room-${room.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`book-room-${room.id}`}
                    >
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {showForm && (
        <RoomForm
          room={editingRoom}
          onClose={() => {
            setShowForm(false);
            setEditingRoom(null);
          }}
        />
      )}
    </div>
  );
}
