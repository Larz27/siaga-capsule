
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Mail } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse">
          <Sparkles className="w-8 h-8 text-yellow-400/30" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Clock className="w-6 h-6 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <Mail className="w-7 h-7 text-blue-400/30" />
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Logo/Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg border border-white/20">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Hari Belia Kebangsaan 2025</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
          Siaga Capsule
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium animate-fade-in">
          "Write to your future self. Open in 2035."
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Join thousands of young Bruneians in creating a digital time capsule. 
          Share your hopes, dreams, and wisdom with your future self as we build towards Wawasan Brunei 2035.
        </p>

        {/* Countdown Timer */}
        <div className="mb-12 animate-fade-in">
          <CountdownTimer />
        </div>

        {/* CTA Button */}
        <Button 
          onClick={scrollToForm}
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
        >
          <Mail className="w-5 h-5 mr-2" />
          Start My Message
        </Button>

        {/* Floating indicators */}
        <div className="mt-16 animate-bounce">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-transparent mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
