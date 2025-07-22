// frontend/src/components/ConfirmationPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Gift,
  Download,
  Share2,
  ArrowLeft,
  Mail,
  Calendar,
} from "lucide-react";
import type { PageType } from "@/pages/Index";
import jsPDF from "jspdf";
// ← import your new blank template PNG here:
import certImg from "../assets/SiagaCapsule_Cert.png";

interface ConfirmationPageProps {
  data: any;
  onNavigate: (page: PageType) => void;
}

export const ConfirmationPage = ({
  data,
  onNavigate,
}: ConfirmationPageProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleDownloadKeepsake = () => {
    console.log("🔥 Using new PDF certificate template");
  
    // 1) Create A4 PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit:        "pt",
      format:      "a4",
    });
  
    // 2) Draw your certificate PNG full‑bleed
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    pdf.addImage(certImg, "PNG", 0, 0, w, h);
  
    // 3) Style your text for the email overlay
    pdf.setFont("helvetica", "bold");   // use a bolder font
    pdf.setFontSize(24);                // larger size
    pdf.setCharSpace(1);                // subtle letter‑spacing
    pdf.setTextColor(255, 255, 255);    // white so it pops
  
    // 4) Draw the email centered at ~38% down the page
    pdf.text(
      data.email,
      w / 2,
      h * 0.38,
      { align: "center" }
    );
  
    // 5) Save the result
    const fileName = `siaga-capsule-certificate-${data.email
      .split("@")[0]
      .replace(/[@.]/g, "-")}.pdf`;
    pdf.save(fileName);
  };
  
  const shareUrl = window.location.origin;
  const handleShare = (platform: string) => { /* … */ };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png"
            alt="Siaga Capsule Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-gray-800">
            Siaga Capsule
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Animated capsule */}
          <div className="relative">
            <div
              className={`mx-auto w-32 h-32 gradient-bg-primary rounded-full flex items-center justify-center shadow-2xl ${
                isAnimating ? "animate-bounce" : ""
              }`}
              onAnimationEnd={() => setIsAnimating(false)}
            >
              <Gift className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>

          {/* Success */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gradient">
              Your Time Capsule is Ready! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for sharing your hopes and dreams with your future self.
            </p>
          </div>

          {/* Details card */}
          <Card className="p-6 glass-effect border-purple-200/50 shadow-xl text-left">
            {/* … message destination & date info … */}
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">Message Destination</p>
                <p className="text-sm text-gray-600">{data?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">Delivery Date</p>
                <p className="text-sm text-gray-600">January 1, 2035</p>
              </div>
            </div>
            {/* … footer text … */}
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownloadKeepsake}
              className="gradient-bg-primary hover:opacity-90 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Your Certificate
            </Button>

            {/* Share dropdown (unchanged) */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="border-purple-300 text-purple-700 hover:bg-purple-50 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Your Journey
              </Button>
              {showShareOptions && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-purple-200 p-4 z-10 min-w-[240px]">
                  {/* … your share buttons … */}
                </div>
              )}
            </div>
          </div>

          {/* Back */}
          <div className="pt-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate("landing")}
              className="text-purple-700 hover:text-purple-800"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
