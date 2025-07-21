
import { Card } from "@/components/ui/card";
import { Heart, PenTool, Gift } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Heart,
      title: "Reflect",
      description: "Choose a prompt that feels right",
      detail: "Take a moment to think about who you are today and what matters most to you."
    },
    {
      icon: PenTool,
      title: "Write",
      description: "Share a message to your future self",
      detail: "Pour your heart out. Share your dreams, fears, hopes, and the wisdom you've gained."
    },
    {
      icon: Gift,
      title: "Receive",
      description: "Get a digital keepsake now, and your message will return in 2035",
      detail: "Receive a beautiful digital card immediately, and we'll deliver your full message in 2035."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to connect with your future self
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/60 backdrop-blur-sm border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 gradient-bg-primary rounded-full mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-400">0{index + 1}</span>
                <h3 className="text-2xl font-bold text-gradient">{step.title}</h3>
              </div>
              
              <p className="text-lg font-medium text-gray-700 mb-3">
                {step.description}
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                {step.detail}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
