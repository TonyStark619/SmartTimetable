import { Link, useLocation } from "wouter";
import { 
  Calendar, 
  Table, 
  Users, 
  UserCheck, 
  GraduationCap, 
  DoorOpen, 
  Settings, 
  BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Calendar },
  { name: "Timetable", href: "/timetable", icon: Table },
  { name: "Classes", href: "/classes", icon: BookOpen },
  { name: "Teachers", href: "/teachers", icon: UserCheck },
  { name: "Students", href: "/students", icon: GraduationCap },
  { name: "Rooms", href: "/rooms", icon: DoorOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 glass-effect border-r border-border p-6">
      {/* Logo and Branding */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
          <GraduationCap className="text-primary-foreground" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-xl">SmartClass</h1>
          <p className="text-xs text-muted-foreground">Schedule Manager</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b332995c?w=100&h=100&fit=crop&crop=face"
            alt="User Avatar"
            className="w-10 h-10 rounded-full status-online"
          />
          <div>
            <p className="font-medium text-sm">Sarah Johnson</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
