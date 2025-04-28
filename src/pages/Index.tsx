
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import EmailScanner from '@/components/EmailScanner';
import StudentInfo from '@/components/StudentInfo';
import Notifications from '@/components/Notifications';
import PhishingKeywords from '@/components/PhishingKeywords';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'warning' | 'info' | 'danger';
}

const Index = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState({
    scannedEmails: 0,
    phishingDetected: 0,
    securityScore: 85
  });
  
  // Generate sample notifications on load
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        title: "Email Guardian Active",
        message: "Email Guardian is now actively monitoring your emails for phishing attempts.",
        time: "Just now",
        read: false,
        type: 'info'
      },
      {
        id: 2,
        title: "Security Tips",
        message: "Remember to check sender addresses carefully before clicking links.",
        time: "5 minutes ago",
        read: false,
        type: 'warning'
      }
    ];
    
    setNotifications(sampleNotifications);
    setNotificationCount(2);
    
    // Set random stats update interval
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        scannedEmails: prev.scannedEmails + Math.floor(Math.random() * 3)
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleNotificationClick = () => {
    setShowNotifications(true);
  };
  
  const handleNewThreatDetected = () => {
    const newNotification: Notification = {
      id: Date.now(),
      title: "Phishing Email Detected",
      message: "A potential phishing attempt was blocked by Email Guardian.",
      time: "Just now",
      read: false,
      type: 'danger'
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setNotificationCount(prev => prev + 1);
    setStats(prev => ({
      ...prev,
      scannedEmails: prev.scannedEmails + 1,
      phishingDetected: prev.phishingDetected + 1
    }));
  };
  
  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setNotificationCount(0);
  };
  
  const handleClearNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6">
      <div className="max-w-5xl w-full">
        <Header 
          notificationCount={notificationCount} 
          onNotificationClick={handleNotificationClick}
        />
        
        <Dashboard 
          scannedEmails={stats.scannedEmails} 
          phishingDetected={stats.phishingDetected}
          securityScore={stats.securityScore}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <EmailScanner onNewThreatDetected={handleNewThreatDetected} />
            
            <div className="h-8 md:hidden"></div>
          </div>
          
          <div className="space-y-6">
            <StudentInfo />
            <PhishingKeywords />
          </div>
        </div>
        
        <Notifications
          open={showNotifications}
          onOpenChange={setShowNotifications}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onClear={handleClearNotifications}
        />
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Email Guardian | Phishing Detection System</p>
          <p className="mt-1">Developed by Nasiru Hassana Danjuma (U21CS1051)</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
