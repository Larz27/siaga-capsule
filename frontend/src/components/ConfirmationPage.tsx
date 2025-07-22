// frontend/src/components/ConfirmationPage.tsx
import React, { useEffect, useState } from "react";
import { useParams }                     from "react-router-dom";
import { Button }                        from "@/components/ui/button";
import { Download }                      from "lucide-react";
import { getDoc, doc }                   from "firebase/firestore";
import { db }                            from "@/lib/firebase"; 
import { DigitalKeepsake }               from "@/components/DigitalKeepsake";

interface SubmissionData {
  email:       string;
  submittedAt: { toDate: () => Date };
}

const ConfirmationPage: React.FC = () => {
  // 1) grab the ID from the URL
  const { submissionId } = useParams<{ submissionId: string }>();

  const [data, setData]       = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);

  // 2) load the Firestore doc
  useEffect(() => {
    if (!submissionId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const snap = await getDoc(doc(db, "submissions", submissionId));
        if (snap.exists()) {
          setData(snap.data() as SubmissionData);
        }
      } catch (err) {
        console.error("Failed to load submission:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [submissionId]);

  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }
  if (!submissionId || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        Submission not found.
      </div>
    );
  }

  // 3) simple link-triggered download of the PNG
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
