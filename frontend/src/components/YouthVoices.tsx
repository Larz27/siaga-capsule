
import { Card } from "@/components/ui/card";
import { Quote, Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export const YouthVoices = () => {
  const [counter, setCounter] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quotes = [
    "I want to be someone my younger self would be proud of.",
    "Building a Brunei where everyone feels they belong.",
    "Dreams planted today will bloom by Wawasan 2035.",
    "Creating art that speaks our generation's truth.",
    "Protecting our environment for generations to come.",
    "Using technology to connect hearts, not just minds."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const commonWords = [
    { word: "Hope", size: "text-3xl", color: "text-gradient" },
    { word: "Dreams", size: "text-2xl", color: "text-gradient-secondary" },
    { word: "Family", size: "text-lg", color: "text-gradient" },
    { word: "Future", size: "text-4xl", color: "text-gradient-secondary" },
    { word: "Brunei", size: "text-3xl", color: "text-gradient" },
    { word: "Change", size: "text-xl", color: "text-gradient-secondary" },
    { word: "Love", size: "text-2xl", color: "text-gradient" },
    { word: "Growth", size: "text-lg", color: "text-gradient-secondary" },
    { word: "Peace", size: "text-xl", color: "text-gradient" },
    { word: "Unity", size: "text-2xl", color: "text-gradient-secondary" }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Voices of Our Generation
          </h2>
          <p className="text-xl text-gray-600">
            See what young Bruneians are sharing with their future selves
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Rotating Quotes */}
          <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/30 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 gradient-bg-primary rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Latest Voices</h3>
            </div>
            
            <div className="min-h-[120px] flex items-center">
              <p className="text-gray-700 italic text-lg leading-relaxed animate-fade-in">
                "{quotes[currentQuote]}"
              </p>
            </div>
            
            <div className="flex justify-center mt-6">
              {quotes.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                    index === currentQuote ? 'gradient-bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </Card>

          {/* Word Cloud */}
          <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/30 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 gradient-bg-secondary rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient-secondary">Popular Words</h3>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-2 min-h-[120px]">
              {commonWords.map((item, index) => (
                <span 
                  key={index}
                  className={`${item.size} ${item.color} font-bold hover:scale-110 transition-transform duration-300 cursor-default`}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </Card>

          {/* Live Counter */}
          <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/30 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 gradient-bg-primary rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gradient">Join the Movement</h3>
            </div>
            
            <div className="text-center min-h-[120px] flex flex-col justify-center">
              <div className="text-5xl font-bold text-gradient mb-2 animate-pulse">
                {counter.toLocaleString()}
              </div>
              <p className="text-gray-700 text-lg">
                messages already sent to 2035
              </p>
              <p className="text-gray-600 text-sm mt-2">
                And counting...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
