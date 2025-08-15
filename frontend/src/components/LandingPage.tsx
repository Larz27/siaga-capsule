import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight, BarChart3 } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";
import type { PageType } from "@/pages/Index";

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png"
            alt="Siaga Capsule Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-xl text-gray-800">Siaga Capsule</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => onNavigate("insights")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          <BarChart3 className="w-4 h-4" />
          Coming Soon
        </Button>
      </header>

      {/* UVP Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center py-3 px-4">
        <p className="text-sm md:text-base font-medium">
          🚀 Send a message to your 2035 self & help shape Brunei's future •
          Opens January 1, 2035
        </p>
      </div>

      {/* Hero Section */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100/80 to-cyan-100/80 rounded-full px-4 py-2 shadow-sm border border-purple-200/50">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    Hari Belia Kebangsaan 2025
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src="/qr-code.png" alt="QR Code" className="size-32" />
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                      A message to your{" "}
                      <span className="text-gradient">future self</span>
                    </h1>
                  </div>

                  <p className="text-xl md:text-2xl text-gray-700 font-medium">
                    Guided by what truly matters to you today.
                  </p>
                </div>

                <Card className="p-6 bg-gradient-to-br from-white/80 to-purple-50/30 backdrop-blur-sm border-purple-200/30 shadow-lg">
                  <p className="text-gray-700 leading-relaxed">
                    Not your typical "Dear Future Me" — this is a guided
                    reflection on your dreams, obstacles, and values. Your
                    answers will be delivered back to you in 2035, and
                    contribute to shaping Brunei's future.
                  </p>
                </Card>
              </div>

              {/* Countdown */}
              <div className="py-4">
                <CountdownTimer />
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => onNavigate("form")}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                Start Your Capsule
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Private & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Opens in 2035</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span>Free Forever</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/40 via-cyan-400/40 to-blue-400/40 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <img
                  src="/lovable-uploads/62fd884a-6d2a-416a-b5f7-08dfa1d91935.png"
                  alt="Diverse group of Bruneian youth representing different backgrounds and aspirations"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border-4 border-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
