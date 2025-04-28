
import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ notificationCount, onNotificationClick }) => {
  return (
    <header className="w-full py-3 px-5 flex justify-between items-center glass rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <img 
          src="/lovable-uploads/6bc40461-36ef-474a-b724-9a6653b13832.png"
          alt="School Logo" 
          className="h-14 animate-pulse-slow"
        />
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Email Guardian
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">Phishing Detection System</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive animate-bounce-subtle" 
              variant="destructive"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
