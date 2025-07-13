
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Rocket, Sparkles } from "lucide-react";

interface LiveInsightsProps {
  onBack: () => void;
}

export const LiveInsights = ({ onBack }: LiveInsightsProps) => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-4 flex items-center justify-between glass-effect border-b border-purple-200">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png" 
            alt="Siaga Capsule Logo" 
            className="w-6 h-6"
          />
          <span className="font-bold text-lg text-gray-800">Live Insights</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Animated Icon */}
          <div className="relative">
            <div className="mx-auto w-32 h-32 gradient-bg-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Rocket className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>

          {/* Coming Soon Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gradient">
              Live Insights Coming Soon! 🚀
            </h1>
            <p className="text-xl text-gray-600">
              We're building something amazing to show real-time insights from all the time capsules.
            </p>
          </div>

          {/* Features Card */}
          <Card className="p-6 glass-effect border-purple-200/50 shadow-xl text-left">
            <h3 className="text-lg font-bold text-gradient-secondary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              What's Coming
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p>Real-time statistics from all submitted time capsules</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <p>Most common hopes and dreams shared by Bruneian youth</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p>Geographic distribution across all four districts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p>Trending words and themes in messages</p>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="pt-8">
            <p className="text-gray-600 mb-4">
              Ready to add your voice to this collection?
            </p>
            <Button 
              onClick={onBack}
              className="gradient-bg-primary hover:opacity-90"
            >
              Create Your Time Capsule
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
