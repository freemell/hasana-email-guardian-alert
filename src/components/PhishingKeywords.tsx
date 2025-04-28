
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from 'lucide-react';

const PhishingKeywords = () => {
  const keywordCategories = [
    {
      category: "Urgency",
      words: ["urgent", "act now", "immediate action", "expiration", "deadline", "limited time"],
      color: "bg-red-100 text-red-800"
    },
    {
      category: "Financial",
      words: ["bank details", "payment information", "gift card", "lottery winner", "free offer"],
      color: "bg-amber-100 text-amber-800"
    },
    {
      category: "Security",
      words: ["verify account", "login information", "security alert", "password expired", "suspicious activity"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      category: "Action",
      words: ["click here", "confirm identity", "update information", "verify now", "access document"],
      color: "bg-purple-100 text-purple-800"
    }
  ];
  
  return (
    <Card className="glass card-hover animate-scale-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Common Phishing Keywords
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keywordCategories.map((category, index) => (
            <div key={index}>
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-1 text-primary" />
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.words.map((word, i) => (
                  <span 
                    key={i} 
                    className={`text-xs px-2 py-1 rounded ${category.color} inline-block animate-bounce-subtle`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PhishingKeywords;
