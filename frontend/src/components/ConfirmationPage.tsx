import React, { useEffect, useState } from "react";
import { Button }                       from "@/components/ui/button";
import { Download }                     from "lucide-react";
import { DigitalKeepsake }              from "@/components/DigitalKeepsake";
import { getDoc, doc }                  from "firebase/firestore";
import { db }                           from "@/lib/firebase"; 
// (adjust your import path for your initialized Firestore `db`)

interface SubmissionData {
  email:       string;
  submittedAt: { toDate: () => Date };
}

export const ConfirmationPage: React.FC<{ submissionId: string }> = ({
  submissionId,
}) => {
  const [data, setData] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "submissions", submissionId));
      if (snap.exists()) {
        setData(snap.data() as SubmissionData);
      }
      setLoading(false);
    })();
  }, [submissionId]);

  if (loading) {
    return <div>Loading…</div>;
  }
  if (!data) {
    return <div>Submission not found.</div>;
  }

  // simple link to download the PNG
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
      {/* Button to download as image */}
      <Button
        onClick={downloadKeepsakeImage}
        className="gradient-bg-primary hover:opacity-90 flex items-center gap-2 mb-8"
      >
        <Download className="w-4 h-4" />
        Download Your Certificate
      </Button>

      {/* Render the dynamic certificate */}
      <DigitalKeepsake
        email={data.email}
        submittedAt={data.submittedAt.toDate().toISOString()}
      />
    </div>
  );
};
