
import { Card } from "@/components/ui/card";
import { Heart, Users, Sparkles } from "lucide-react";

export const AboutPurpose = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">Our Purpose</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
            For Every Young Bruneian
          </h2>
        </div>

        <Card className="p-12 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl mb-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
            This platform is for all youth, from all walks of life — riders, artists, students, volunteers, 
            entrepreneurs, dreamers, and changemakers. Every voice matters. Every story counts. 
            Every dream deserves to be remembered.
          </p>
          
          <div className="gradient-bg-primary p-0.5 rounded-2xl">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-center text-gradient leading-relaxed">
                "Belia adalah aset negara. We are not just the leaders of tomorrow — we are the builders of today."
              </blockquote>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-white/60 backdrop-blur-sm border-white/30 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 gradient-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gradient mb-2">Inclusive</h3>
            <p className="text-gray-600 text-sm">Every background, every dream, every voice welcomed</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/60 backdrop-blur-sm border-white/30 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gradient mb-2">Safe</h3>
            <p className="text-gray-600 text-sm">Your thoughts and dreams protected with care</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/60 backdrop-blur-sm border-white/30 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 gradient-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gradient mb-2">Hopeful</h3>
            <p className="text-gray-600 text-sm">Building bridges to a brighter tomorrow</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
