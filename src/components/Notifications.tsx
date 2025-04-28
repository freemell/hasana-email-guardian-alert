
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Mail, ShieldX, Circle, Check, Bell } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'warning' | 'info' | 'danger';
}

interface NotificationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClear: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ 
  open, 
  onOpenChange, 
  notifications, 
  onMarkAllRead,
  onClear
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass min-w-[350px] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary animate-pulse-slow" /> 
            Notifications
          </DialogTitle>
          <DialogDescription>
            Real-time security alerts from Email Guardian
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between mb-4">
          <Button variant="outline" size="sm" onClick={onMarkAllRead}>
            <Check className="h-4 w-4 mr-1" /> Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={onClear}>
            Clear all
          </Button>
        </div>
        
        <ScrollArea className="h-[350px] rounded-md border">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4">
              <Mail className="h-10 w-10 mb-2 opacity-50" />
              <p>No notifications yet</p>
              <p className="text-xs">You'll be alerted when suspicious emails are detected</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${notification.read ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                      {notification.type === 'info' && <Mail className="h-5 w-5 text-blue-500" />}
                      {notification.type === 'danger' && <ShieldX className="h-5 w-5 text-red-500" />}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <Circle className="h-2 w-2 fill-primary text-primary ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;
