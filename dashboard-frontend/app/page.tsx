import { getSubmissions } from "./query";
import { SubmissionsTable } from "@/components/submissions-table";
import { DailySubmissionsChart } from "@/components/daily-submissions-chart";
import { StatisticsCards } from "@/components/statistics-cards";
import { AgeGroupChart } from "@/components/age-group-chart";
import { OccupationChart } from "@/components/occupation-chart";

export default async function Home() {
  const submissions = await getSubmissions();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Analytics and insights from submission data
          </p>
        </div>
        
        <StatisticsCards submissions={submissions} />
        
        <DailySubmissionsChart submissions={submissions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AgeGroupChart submissions={submissions} />
          <OccupationChart submissions={submissions} />
        </div>
        
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
}
