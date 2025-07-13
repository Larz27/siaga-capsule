
import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { FormFlow } from "@/components/FormFlow";
import { ConfirmationPage } from "@/components/ConfirmationPage";
import { LiveInsights } from "@/components/LiveInsights";

export type PageType = 'landing' | 'form' | 'confirmation' | 'insights';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [submissionData, setSubmissionData] = useState<any>(null);

  const navigateToPage = (page: PageType, data?: any) => {
    setCurrentPage(page);
    if (data) setSubmissionData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-teal-50">
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateToPage} />
      )}
      {currentPage === 'form' && (
        <FormFlow 
          onComplete={(data) => navigateToPage('confirmation', data)}
          onBack={() => navigateToPage('landing')}
        />
      )}
      {currentPage === 'confirmation' && (
        <ConfirmationPage 
          data={submissionData}
          onNavigate={navigateToPage}
        />
      )}
      {currentPage === 'insights' && (
        <LiveInsights onBack={() => navigateToPage('landing')} />
      )}
    </div>
  );
};

export default Index;
