
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StudentInfo = () => {
  return (
    <Card className="glass card-hover animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Student Project Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
            <p className="font-semibold">Nasiru Hassana Danjuma</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
            <p className="font-semibold">Computer Science</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Matric Number</h3>
            <p className="font-semibold">U21CS1051</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Project Title</h3>
            <p className="font-semibold">Phishing Email Detection Using Machine Learning</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground italic">
          Email Guardian runs in the background to monitor emails and provide real-time alerts
        </p>
      </CardFooter>
    </Card>
  );
};

export default StudentInfo;
