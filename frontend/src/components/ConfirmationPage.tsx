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
// ← your blank cert PNG must live here:
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
    console.log("🔥 Using updated PDF certificate template 3.0");

    // 1) Create an A4 PDF in portrait
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // 2) Draw your certificate PNG full‑bleed
    const w = pdf.internal.pageSize.getWidth();
    const h = pdf.internal.pageSize.getHeight();
    pdf.addImage(certImg, "PNG", 0, 0, w, h);

    // 3) Overlay the user’s email — bigger, gold, centered
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(32);             // one step smaller than PARTICIPATION
    pdf.setCharSpace(1);             // subtle letter‑spacing
    pdf.setTextColor(248, 168, 1);   // #f8a801 gold

    pdf.text(
      data.email,
      w / 2,
      h * 0.38,                     // adjust if you need to nudge vertically
      {
        align:    "center",
        maxWidth: w * 0.9,          // wrap if the email is long
      }
    );

    // 4) Save the PDF
    const fileName = `siaga-capsule-certificate-${data.email
      .split("@")[0]
      .replace(/[@.]/g, "-")}.pdf`;
    pdf.save(fileName);
  };

  const generateShareableContent = () => ({
    message: `🚀 I just sealed my hopes and dreams for the future with Siaga Capsule! My message will return to me in 2035 as part of Brunei's journey towards Wawasan 2035.`,
    hashtags: "#WawasanBrunei2035 #BruneiYouth #HariBeliaKebangsaan2025",
  });
  const shareUrl = window.location.origin;
  const handleShare = (platform: string) => {
    const { message, hashtags } = generateShareableContent();
    const fullMessage = `${message} ${shareUrl}\n\n${hashtags}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const encodedUrl = encodeURIComponent(shareUrl);
    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(
          message + " " + hashtags
        )}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(fullMessage);
        alert(
          "Certificate details copied! Download your certificate, screenshot it, and paste this caption in your Instagram post."
        );
        return;
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        break;
      case "telegram":
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
          message + " " + hashtags
        )}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodeURIComponent(
          message
        )}`;
        break;
      case "tiktok":
        navigator.clipboard.writeText(message + " " + shareUrl + " " + hashtags);
        alert(
          "Caption copied! Create your TikTok video showing your certificate and paste this caption."
        );
        return;
      default:
        if (navigator.share) {
          navigator
            .share({
              title: "Siaga Capsule - My Future Message",
              text: message,
              url: shareUrl,
            })
            .catch(() => {
              navigator.clipboard.writeText(fullMessage);
            });
        } else {
          navigator.clipboard.writeText(fullMessage);
        }
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

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
            <h1 className="text-4xl font-bold text-gradient">
              Your Time Capsule is Ready! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for sharing your hopes and dreams with your future
              self.
            </p>
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
                  Your reflection is now part of Brunei's collective journey
                  towards Wawasan 2035. We'll send you reminders and updates
                  along the way.
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownloadKeepsake}
              className="gradient-bg-primary hover:opacity-90 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Your Certificate
            </Button>

            {/* Share Dropdown */}
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
                  {/* … share buttons … */}
                </div>
              )}
            </div>
          </div>

          {/* Back to Home */}
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
