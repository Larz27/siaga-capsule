
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Lock, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    district: "",
    email: "",
    message: "",
    isPrivate: false,
    allowAnonymousShare: false
  });

  const districts = [
    "Brunei-Muara", "Belait", "Tutong", "Temburong"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent! 🎉",
      description: "Your time capsule message has been safely stored. Check your email for your digital keepsake!",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="submission-form" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Message Awaits
          </h2>
          <p className="text-xl text-gray-600">
            Take your time. Your future self will thank you for your honesty.
          </p>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="mt-2 bg-white/60"
                  placeholder="What should we call you?"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="age" className="text-gray-700 font-medium">Age</Label>
                <Input 
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="mt-2 bg-white/60"
                  placeholder="How old are you?"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district" className="text-gray-700 font-medium">District</Label>
                <Select onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger className="mt-2 bg-white/60">
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-2 bg-white/60"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-gray-700 font-medium">Your Message to 2035</Label>
              <Textarea 
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="mt-2 min-h-[200px] bg-white/60"
                placeholder="Dear future me..."
                required
              />
            </div>

            <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="private"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => handleInputChange('isPrivate', checked as boolean)}
                />
                <Label htmlFor="private" className="text-sm text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Keep my message completely private
                </Label>
              </div>
              
              {!formData.isPrivate && (
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="share"
                    checked={formData.allowAnonymousShare}
                    onCheckedChange={(checked) => handleInputChange('allowAnonymousShare', checked as boolean)}
                  />
                  <Label htmlFor="share" className="text-sm text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    I'm okay with sharing a quote anonymously to inspire others
                  </Label>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Send to Future Me
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
