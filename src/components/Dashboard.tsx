
import React from 'react';
import { CheckCircle, ShieldCheck, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  scannedEmails: number;
  phishingDetected: number;
  securityScore: number;
}

const Dashboard: React.FC<DashboardProps> = ({ scannedEmails, phishingDetected, securityScore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
      <Card className="glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Eye className="mr-2 h-4 w-4 text-primary" /> Emails Scanned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scannedEmails}</div>
          <p className="text-xs text-muted-foreground">Last updated just now</p>
        </CardContent>
      </Card>
      
      <Card className="glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <ShieldCheck className="mr-2 h-4 w-4 text-destructive" /> Phishing Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{phishingDetected}</div>
          <p className="text-xs text-muted-foreground">Protected from threats</p>
        </CardContent>
      </Card>
      
      <Card className="glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Security Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{securityScore}%</div>
          <Progress value={securityScore} className="h-2 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
