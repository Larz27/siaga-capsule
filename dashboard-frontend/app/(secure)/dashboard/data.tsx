"use client";
import { DailySubmissionsChart } from "./daily-submissions-chart";
import { ValuesPieChart } from "./values-pie-chart";
import { ObstaclesPieChart } from "./obstacles-pie-chart";
import { SectionCards } from "./section-cards";

import { getSubmissions } from "./query";
import { SiteHeader } from "@/components/site-header";
import { useQuery } from "@tanstack/react-query";
import { Submission } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { RealtimeWrapper } from "@/components/realtime-wrapper";

export default function Data({
  initialSubmissions,
}: {
  initialSubmissions: Submission[];
}) {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData: initialSubmissions,
  });
  return (
    <RealtimeWrapper onRefresh={() => refetch()}>
      <SiteHeader
        header={
          <h1 className="text-base font-medium flex items-center gap-2">
            <span>Dashboard</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCcw
                className={cn("size-4", isRefetching && "animate-spin")}
              />
            </Button>
          </h1>
        }
      />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards initialData={data} />

          {/* Pie Charts Row */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ValuesPieChart initialData={data} />
              <ObstaclesPieChart initialData={data} />
            </div>
          </div>

          {/* Daily Submissions Chart */}
          <div className="px-4 lg:px-6">
            <DailySubmissionsChart initialData={data} />
          </div>
        </div>
      </div>
    </RealtimeWrapper>
  );
}
