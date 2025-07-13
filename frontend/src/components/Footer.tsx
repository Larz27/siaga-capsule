
import { Heart, Mail, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="gradient-bg-secondary text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-white">
            Siaga Capsule
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Part of Hari Belia Kebangsaan 2025 – Belia Siaga Masa Depan
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Heart className="w-5 h-5 text-red-300" />
            <span className="text-sm font-medium">Led by Youth, For Youth</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white/90">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white/80">siagacapsule@youth.bn</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-white/90">Follow Our Journey</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-white/70 text-sm mb-4">
            Every message is a seed planted today for tomorrow's garden
          </p>
          <p className="text-white/60 text-xs">
            © 2025 Siaga Capsule. A digital time capsule initiative for Brunei's youth. 
            Messages will be delivered in alignment with Wawasan Brunei 2035.
          </p>
        </div>
      </div>
    </footer>
  );
};
