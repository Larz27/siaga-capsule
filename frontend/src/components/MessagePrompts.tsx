
import { Card } from "@/components/ui/card";
import { Lightbulb, Heart, Map, Star } from "lucide-react";

export const MessagePrompts = () => {
  const prompts = [
    {
      icon: Star,
      text: "What are you proud of — even if it seems small?",
      bgClass: "gradient-bg-primary"
    },
    {
      icon: Map,
      text: "What kind of Brunei do you want to live in?",
      bgClass: "gradient-bg-secondary"
    },
    {
      icon: Lightbulb,
      text: "What advice would help you in the future?",
      bgClass: "gradient-bg-primary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6">
            <Heart className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Guided Reflection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            What do you want your future self to remember about who you are today?
          </h2>
          
          <p className="text-xl text-gray-600 mb-12">
            Not sure where to start? These prompts might help spark your thoughts:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <Card 
              key={index} 
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-white/30 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${prompt.bgClass} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <prompt.icon className="w-6 h-6 text-white" />
              </div>
              
              <p className="text-gray-700 font-medium leading-relaxed">
                {prompt.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
