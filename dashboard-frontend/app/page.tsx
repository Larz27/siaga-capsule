"use client";
import { getSubmissions } from "./query";
import { SubmissionsTable } from "@/components/submissions-table";
import { DailySubmissionsChart } from "@/components/daily-submissions-chart";
import { StatisticsCards } from "@/components/statistics-cards";
import { AgeGroupChart } from "@/components/age-group-chart";
import { OccupationChart } from "@/components/occupation-chart";
import { RealtimeWrapper } from "@/components/realtime-wrapper";
import {
  StatisticsCardsLoading,
  ChartLoading,
  TableLoading,
} from "@/components/loading-placeholders";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const {
    data: submissions,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
  });

  return (
    <RealtimeWrapper onRefresh={() => refetch()}>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-[120px_1fr] gap-4">
            <Image
              src="/images/qr-code.png"
              width={120}
              height={120}
              alt="QR Code"
              className="rounded-md cols-auto"
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-muted"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
              <p className="text-muted-foreground">
                Analytics and insights from submission data
              </p>
            </div>
          </div>

          {isLoading ? (
            <StatisticsCardsLoading />
          ) : (
            <StatisticsCards submissions={submissions || []} />
          )}

          {isLoading ? (
            <ChartLoading />
          ) : (
            <DailySubmissionsChart submissions={submissions || []} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isLoading ? (
              <>
                <ChartLoading />
                <ChartLoading />
              </>
            ) : (
              <>
                <AgeGroupChart submissions={submissions || []} />
                <OccupationChart submissions={submissions || []} />
              </>
            )}
          </div>

          {isLoading ? (
            <TableLoading />
          ) : (
            <SubmissionsTable submissions={submissions || []} />
          )}
        </div>
      </div>
    </RealtimeWrapper>
  );
}
