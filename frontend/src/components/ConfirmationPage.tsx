// frontend/src/components/ConfirmationPage.tsx
import React from "react";
import { Button }          from "@/components/ui/button";
import { Download }        from "lucide-react";
import { DigitalKeepsake } from "@/components/DigitalKeepsake";
import { PageType }        from "@/pages/Index";

export interface SubmissionData {
  email:       string;
  submittedAt: { toDate: () => Date };
}

interface ConfirmationPageProps {
  /** Passed from Index.tsx when you navigate to 'confirmation' */
  data: SubmissionData | null;
  /** If you need to go back or navigate elsewhere */
  onNavigate: (page: PageType, data?: any) => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  data,
  onNavigate
}) => {
  // If there’s no data prop, bail out immediately
  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        Submission not found.
      </div>
    );
  }

  // Download the PNG directly
  const downloadKeepsakeImage = () => {
    const link = document.createElement("a");
    link.href = "/SiagaCapsule_Cert.png";  
    link.download = `siaga-capsule-${data.email.split("@")[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Download button */}
      <Button
        onClick={downloadKeepsakeImage}
        className="gradient-bg-primary hover:opacity-90 flex items-center gap-2 mb-8"
      >
        <Download className="w-4 h-4" />
        Download Your Certificate
      </Button>

      {/* Render the dynamic cert */}
      <DigitalKeepsake
        email={data.email}
        submittedAt={data.submittedAt.toDate().toISOString()}
      />
    </div>
  );
};

export default ConfirmationPage;
