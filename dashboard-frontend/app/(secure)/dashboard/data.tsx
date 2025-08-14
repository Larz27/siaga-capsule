"use client";
import { DailySubmissionsChart } from "./daily-submissions-chart";
import { ValuesPieChart } from "./values-pie-chart";
import { ObstaclesPieChart } from "./obstacles-pie-chart";
import { SectionCards } from "./section-cards";

import { getSubmissions } from "./query";
import { SiteHeader } from "@/components/site-header";
import { useQuery } from "@tanstack/react-query";
import type { Submission, Testimonial } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { RealtimeWrapper } from "@/components/realtime-wrapper";
import { useMemo } from "react";
import { TestimonialSection } from "./testimonial-section";
import { ObstaclesWordCloud } from "./obstacles-word-cloud";
import { OccupationsRadarChart } from "./occupations-radar-chart";

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
  const testimonials = useMemo(() => {
    return data
      .filter((o) => !o.isPrivate && o.isFeatured)
      .map((submission) => ({
        quote: submission.question1Highlighted || submission.question1,
        occupation:
          submission.occupationStatus === "Other"
            ? submission.otherOccupation
            : submission.occupationStatus,
        sector:
          submission.sectorInterest === "Other"
            ? submission.otherSector
            : submission.sectorInterest,
      })) as Testimonial[];
  }, [data]);
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
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-3 pt-3">
            <TestimonialSection testimonials={testimonials} />
          </div>

          <div className="col-span-4 md:col-span-1 md:pt-6">
            <SectionCards initialData={data} />
          </div>

          {/* Pie Charts Row */}
          <div className="px-4 lg:px-6 col-span-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <ValuesPieChart initialData={data} />
                <OccupationsRadarChart initialData={data} />
              </div>
              {/* <ObstaclesPieChart initialData={data} /> */}
              <ObstaclesWordCloud initialData={data} />
            </div>
          </div>

          {/* Daily Submissions Chart */}
          <div className="px-4 lg:px-6 col-span-4">
            <DailySubmissionsChart initialData={data} />
          </div>
        </div>
      </div>
    </RealtimeWrapper>
  );
}
