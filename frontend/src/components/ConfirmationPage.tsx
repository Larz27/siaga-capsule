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
import certImg from "../assets/SiagaCapsule_Cert.png"; // your blank template

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
    console.log("🔥 Using updated PDF certificate template 4.0");

    // 1) Create A4 PDF in portrait
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // 2) Draw certificate PNG full‑bleed
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    pdf.addImage(certImg, "PNG", 0, 0, w, h);

    // 3) Overlay the user’s email — matching the removed placeholder:
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(36);               // same size as your CERTIFICATE text
    pdf.setCharSpace(0.5);             // subtle letter‑spacing
    pdf.setTextColor(237, 220, 185);    // rgba(237,220,185,255) / #eddcb9

    pdf.text(
      data.email,
      w / 2,
      h * 0.345,                       // precisely where the old placeholder sat
      {
        align:    "center",
        maxWidth: w * 0.9,            // wrap long emails gracefully
      }
    );

    // 4) Save it
    const filename = `siaga-capsule-${data.email
      .split("@")[0]
      .replace(/[@.]/g, "-")}.pdf`;
    pdf.save(filename);
  };

  const generateShareableContent = () => ({
    message: `🚀 I just sealed my hopes and dreams for the future with Siaga Capsule! My message will return to me in 2035 as part of Brunei's journey towards Wawasan 2035.`,
    hashtags: "#WawasanBrunei2035 #BruneiYouth #HariBeliaKebangsaan2025",
  });
  const shareUrl = window.location.origin;
  const handleShare = (platform: string) => {
    /* unchanged share logic… */
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => onNavigate("landing")} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/0b01df2f-e663-4703-bddc-110666807832.png"
            alt="Siaga Capsule Logo"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-gray-800">Siaga Capsule</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Animated Capsule */}
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

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gradient">Your Time Capsule is Ready! 🎉</h1>
            <p className="text-xl text-gray-600">Thank you for sharing your hopes and dreams with your future self.</p>
          </div>

          {/* Details Card */}
          <Card className="p-6 glass-effect border-purple-200/50 shadow-xl text-left">
            <div className="space-y-4">
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
              <div className="pt-4 border-t border-purple-200">
                <p className="text-sm text-gray-700">
                  Your reflection is now part of Brunei's collective journey towards Wawasan 2035. We'll send you reminders and updates along the way.
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadKeepsake} className="gradient-bg-primary hover:opacity-90 flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Your Certificate
            </Button>
            {/* Share dropdown unchanged… */}
          </div>

          {/* Back to Home */}
          <div className="pt-8">
            <Button variant="ghost" onClick={() => onNavigate("landing")} className="text-purple-700 hover:text-purple-800">
              ← Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
