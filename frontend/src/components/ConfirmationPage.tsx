// frontend/src/components/ConfirmationPage.tsx
import React from "react";
import { Button }          from "@/components/ui/button";
import { Download }        from "lucide-react";
import { DigitalKeepsake } from "@/components/DigitalKeepsake";

export interface SubmissionData {
  email:       string;
  submittedAt: { toDate: () => Date };
}

interface ConfirmationPageProps {
  /** Passed from Index.tsx when you finish the form */
  data: SubmissionData | null;
  onNavigate: (page: string, data?: any) => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  data,
  onNavigate,
}) => {
  // If Index.tsx called navigateToPage('confirmation', null) or data is missing:
  if (!data) {
    return (
      <div className="p-8 text-center text-red-500">
        Submission not found.
      </div>
    );
  }

  // Simple PNG download link
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
      <Button
        onClick={downloadKeepsakeImage}
        className="gradient-bg-primary hover:opacity-90 flex items-center gap-2 mb-8"
      >
        <Download className="w-4 h-4" />
        Download Your Certificate
      </Button>

      <DigitalKeepsake
        email={data.email}
        submittedAt={data.submittedAt.toDate().toISOString()}
      />
    </div>
  );
};

export default ConfirmationPage;
