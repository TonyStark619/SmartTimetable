import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNewClick?: () => void;
  showNewButton?: boolean;
}

export default function Header({ 
  title, 
  subtitle, 
  onNewClick, 
  showNewButton = true 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="glass-effect border-b border-border p-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            type="text"
            placeholder="Search classes, teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg w-80"
            data-testid="search-input"
          />
        </div>
        
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover-glass transition-all duration-200"
          data-testid="notifications-button"
        >
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-destructive-foreground">
            3
          </div>
        </Button>
        
        {/* Quick Actions */}
        {showNewButton && onNewClick && (
          <Button
            onClick={onNewClick}
            className="floating-action text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200"
            data-testid="new-button"
          >
            <Plus size={16} className="mr-2" />
            New
          </Button>
        )}
      </div>
    </header>
  );
}
