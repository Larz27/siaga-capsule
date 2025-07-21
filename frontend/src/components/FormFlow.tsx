import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User, MapPin, Briefcase, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormFlowProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const VALUES_OPTIONS = [
  'Growth', 'Belonging', 'Stability', 'Creativity', 'Family', 'Adventure', 'Peace', 'Success'
];

const OBSTACLES_OPTIONS = [
  "I'm not sure where to start",
  "I'm afraid of failing", 
  "I don't have transport or internet",
  "I struggle with mental health",
  "I'm expected to focus on other responsibilities",
  "I don't see enough opportunities around me", 
  "I don't feel heard or included",
  "Other"
];

const DISTRICTS = ['Brunei-Muara', 'Belait', 'Tutong', 'Temburong'];

const OCCUPATION_STATUS = [
  'Student', 'Working', 'Unemployed', 'Entrepreneur', 'Other'
];

const SECTORS = [
  'Creative Arts', 'STEM', 'Business', 'Education', 'Public Sector', 'Other'
];

export const FormFlow = ({ onComplete, onBack }: FormFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    question1: '',
    obstacles: [] as string[],
    otherObstacle: '',
    values: [] as string[],
    otherValue: '',
    email: '',
    age: '',
    district: '',
    occupationStatus: '',
    otherOccupation: '',
    sectorInterest: '',
    otherSector: '',
    isPrivate: false
  });
  const [loading, setLoading] = useState(false);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleValueToggle = (value: string) => {
    const newValues = formData.values.includes(value)
      ? formData.values.filter(v => v !== value)
      : formData.values.length < 3 
        ? [...formData.values, value]
        : formData.values;
    
    setFormData({ ...formData, values: newValues });
  };

  const handleObstacleToggle = (obstacle: string) => {
    const newObstacles = formData.obstacles.includes(obstacle)
      ? formData.obstacles.filter(o => o !== obstacle)
      : [...formData.obstacles, obstacle];
    
    setFormData({ ...formData, obstacles: newObstacles });
  };

  const handleSubmit = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address to continue.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "submissions"), {
        ...formData,
        submittedAt: Timestamp.now(),
     });

      toast({
        title: "Message Sent! 🎉",
        description: "Your time capsule has been created successfully!",
      });

      if (onComplete) onComplete(formData); // optional: still call parent if passed

      setFormData({
        question1: '',
        obstacles: [],
        otherObstacle: '',
        values: [],
        otherValue: '',
        email: '',
        age: '',
        district: '',
        occupationStatus: '',
        otherOccupation: '',
        sectorInterest: '',
        otherSector: '',
        isPrivate: false,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Firestore submit error:", error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.question1.trim().length > 0;
      case 2: return formData.obstacles.length > 0 && (!formData.obstacles.includes('Other') || formData.otherObstacle.trim().length > 0);
      case 3: return formData.values.length > 0;
      case 4: return formData.email.trim().length > 0;
      case 5: return formData.age && formData.district && formData.occupationStatus && formData.sectorInterest && 
                     (!formData.occupationStatus.includes('Other') || formData.otherOccupation.trim().length > 0) &&
                     (!formData.sectorInterest.includes('Other') || formData.otherSector.trim().length > 0);
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 hover:bg-purple-100">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png" 
            alt="Siaga Capsule Logo" 
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-gray-800">Siaga Capsule</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-purple-200/50 shadow-2xl rounded-3xl">
          {/* Step 1: Question 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  If you had the freedom, support, and resources to start anything — what would you do?
                </h2>
                <p className="text-gray-600">
                  Share something you'd like to try, change, create, or explore — even if you're still figuring it out.
                </p>
              </div>
              <Textarea
                placeholder="E.g. More trees in my neighbourhood, Bike lanes, Podcast ..."
                value={formData.question1}
                onChange={(e) => setFormData({ ...formData, question1: e.target.value })}
                className="min-h-[150px] bg-white/80 border-purple-200/50 focus:border-purple-400"
                required
              />
            </div>
          )}

          {/* Step 2: Obstacles */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  What's getting in the way right now?
                </h2>
                <p className="text-gray-600">
                  Select anything that's holding you back, big or small.
                </p>
              </div>
              <div className="space-y-3">
                {OBSTACLES_OPTIONS.map((obstacle) => (
                  <div
                    key={obstacle}
                    onClick={() => handleObstacleToggle(obstacle)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                      formData.obstacles.includes(obstacle)
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-cyan-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={formData.obstacles.includes(obstacle)}
                      />
                      <Label className="cursor-pointer font-medium">{obstacle}</Label>
                    </div>
                  </div>
                ))}
              </div>
              {formData.obstacles.includes('Other') && (
                <div className="space-y-2">
                  <Label>Please specify:</Label>
                  <Input
                    placeholder="What else is holding you back?"
                    value={formData.otherObstacle}
                    onChange={(e) => setFormData({ ...formData, otherObstacle: e.target.value })}
                    className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Values */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  What really matters to you these days?
                </h2>
                <p className="text-gray-600">
                  Pick up to 3 values that resonate with you most right now.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {VALUES_OPTIONS.map((value) => (
                  <div
                    key={value}
                    onClick={() => handleValueToggle(value)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                      formData.values.includes(value)
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-cyan-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={formData.values.includes(value)}
                      />
                      <Label className="cursor-pointer font-medium">{value}</Label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Other (optional)</Label>
                <Input
                  placeholder="Add your own value..."
                  value={formData.otherValue}
                  onChange={(e) => setFormData({ ...formData, otherValue: e.target.value })}
                  className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                />
              </div>
            </div>
          )}

          {/* Step 4: Email */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Where should we send your message in 2035?
                </h2>
                <p className="text-gray-600">
                  We'll use this email to deliver your time capsule message and send you a digital keepsake now.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 5: Demographics */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Tell us a bit about yourself
                </h2>
                <p className="text-gray-600">
                  This helps us understand the voices in our time capsule collection.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" />
                    Age
                  </Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    District
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, district: value })} required>
                    <SelectTrigger className="bg-white/80 border-purple-200/50 focus:border-purple-400">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                    Occupation/Status
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, occupationStatus: value })} required>
                    <SelectTrigger className="bg-white/80 border-purple-200/50 focus:border-purple-400">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {OCCUPATION_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.occupationStatus === 'Other' && (
                    <Input
                      placeholder="Please specify your occupation"
                      value={formData.otherOccupation}
                      onChange={(e) => setFormData({ ...formData, otherOccupation: e.target.value })}
                      className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                      required
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                    Sector of Interest
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, sectorInterest: value })} required>
                    <SelectTrigger className="bg-white/80 border-purple-200/50 focus:border-purple-400">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.sectorInterest === 'Other' && (
                    <Input
                      placeholder="Please specify your sector of interest"
                      value={formData.otherSector}
                      onChange={(e) => setFormData({ ...formData, otherSector: e.target.value })}
                      className="bg-white/80 border-purple-200/50 focus:border-purple-400"
                      required
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Privacy */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Privacy Settings
                </h2>
                <p className="text-gray-600">
                  Choose how you'd like your reflection to be handled.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="private"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked as boolean })}
                  />
                  <Label htmlFor="private" className="text-sm">
                    Keep my reflection completely private
                  </Label>
                </div>
                <p className="text-sm text-gray-600">
                  {formData.isPrivate 
                    ? "Your message will be kept completely confidential and only delivered to you in 2035."
                    : "Anonymous insights from your reflection may be shared publicly to inspire others, but your personal details will never be revealed."
                  }
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Create Time Capsule
                <img 
                  src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png" 
                  alt="Rocket" 
                  className="w-4 h-4"
                />
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};
