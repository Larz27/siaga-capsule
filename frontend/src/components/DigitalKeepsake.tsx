
import { Card } from "@/components/ui/card";
import { Badge, Calendar, Star } from "lucide-react";

export const DigitalKeepsake = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-100/50 to-blue-100/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Your Digital Keepsake
          </h2>
          <p className="text-xl text-gray-600">
            After submitting, you'll receive a beautiful digital card to treasure
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-white/50 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Decorative elements */}
            <div className="flex justify-between items-start mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-2">
                Siaga Capsule
              </h3>
              <p className="text-gray-600 text-sm">Time Capsule Certificate</p>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-8">
              <div className="text-center">
                <p className="text-gray-700 mb-2">This certifies that</p>
                <p className="text-xl font-bold text-gradient">[Your Name]</p>
                <p className="text-gray-600 text-sm">Age [Your Age] from [Your District]</p>
              </div>
              
              <div className="text-center py-4 border-t border-b border-gray-200">
                <p className="text-gray-700 mb-1">Has entrusted their hopes and dreams</p>
                <p className="text-gray-700">to the future on</p>
                <p className="font-bold text-gradient">{new Date().toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            {/* Seal */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 gradient-bg-primary rounded-full mb-3 relative">
                <Badge className="w-10 h-10 text-white" />
                <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
              </div>
              <p className="text-xs text-gray-600 font-medium">TO BE OPENED IN 2035</p>
              <p className="text-xs text-gray-500">Wawasan Brunei 2035</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
