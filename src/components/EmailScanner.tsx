
import React, { useState, useEffect } from 'react';
import { Mail, ShieldAlert, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EmailScannerProps {
  onNewThreatDetected: () => void;
}

const EmailScanner: React.FC<EmailScannerProps> = ({ onNewThreatDetected }) => {
  const [emailContent, setEmailContent] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    isSafe: boolean;
    detectedWords: string[];
    highlightedContent: string;
  } | null>(null);
  const { toast } = useToast();
  
  // List of phishing keywords to detect
  const phishingKeywords = [
    'urgent', 'account suspended', 'verify your account', 'bank details', 
    'login information', 'security alert', 'password expired', 'verify now',
    'unusual activity', 'confirm your identity', 'gift card', 'lottery winner',
    'free offer', 'act now', 'limited time', 'payment information', 'click here',
    'unauthorized access', 'update your information', 'suspicious activity'
  ];
  
  const scanEmail = () => {
    if (!emailContent.trim()) {
      toast({
        title: "Empty Content",
        description: "Please enter some email content to scan.",
        variant: "destructive"
      });
      return;
    }
    
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const detectedWords: string[] = [];
      let content = emailContent;
      
      // Check for phishing keywords
      phishingKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        if (regex.test(emailContent)) {
          detectedWords.push(keyword);
          
          // Replace keywords with marked spans for highlighting
          content = content.replace(regex, match => 
            `<span class="detection-marker bg-red-100 text-red-800 px-1 rounded">${match}</span>`);
        }
      });
      
      const isSafe = detectedWords.length === 0;
      
      setScanResult({
        isSafe,
        detectedWords,
        highlightedContent: content
      });
      
      if (!isSafe) {
        onNewThreatDetected();
        toast({
          title: "Phishing Detected!",
          description: `Detected ${detectedWords.length} suspicious elements in this email.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Email is Safe",
          description: "No phishing elements detected.",
          variant: "default"
        });
      }
      
      setIsScanning(false);
    }, 1500);
  };
  
  return (
    <Card className="glass overflow-hidden animate-scale-in mb-8">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5 text-primary" /> 
          Email Scanner
        </CardTitle>
        <CardDescription>
          Check your emails for potential phishing threats
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Textarea
          placeholder="Paste email content here to scan for phishing attempts..."
          className="min-h-[150px] mb-4"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        
        <div className="flex justify-center mb-4">
          <Button 
            onClick={scanEmail} 
            disabled={isScanning} 
            className="w-full sm:w-auto"
          >
            {isScanning ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" /> 
                Scanning...
              </>
            ) : (
              <>Scan Email</>
            )}
          </Button>
        </div>
        
        {scanResult && (
          <div className="mt-6 animate-fade-in border rounded-lg overflow-hidden">
            <div className={`p-4 flex items-center ${scanResult.isSafe ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {scanResult.isSafe ? (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="font-medium">This email appears to be safe</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Phishing detected: {scanResult.detectedWords.length} suspicious elements found
                  </span>
                </>
              )}
            </div>
            
            {!scanResult.isSafe && (
              <div className="p-4 bg-white">
                <h4 className="font-medium mb-2">Detected suspicious elements:</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {scanResult.detectedWords.map((word, i) => (
                    <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      {word}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Highlighted Content:</h4>
                  <div 
                    className="p-3 bg-gray-50 rounded text-sm border"
                    dangerouslySetInnerHTML={{ __html: scanResult.highlightedContent }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailScanner;
