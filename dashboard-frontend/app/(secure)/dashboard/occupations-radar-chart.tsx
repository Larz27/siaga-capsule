"use client";

import * as React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export const description = "A radar chart showing occupation distribution";

const chartConfig = {
  count: {
    label: "Count",
    color: "#3b82f6", // Blue - consistent with values chart
  },
} satisfies ChartConfig;

interface OccupationsRadarChartProps {
  initialData: Submission[];
}

export function OccupationsRadarChart({
  initialData,
}: OccupationsRadarChartProps) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Process occupation data for radar chart
  const occupationData = React.useMemo(() => {
    if (!submissions) return [];

    // Count occupations, grouping "other" categories
    const occupationCounts = submissions.reduce((acc, submission) => {
      let occupation = submission.occupationStatus;

      // Group all "other" variations into one category
      if (
        submission.occupationStatus.toLowerCase().includes("other") ||
        submission.occupationStatus.toLowerCase().includes("lain") ||
        submission.otherOccupation
      ) {
        occupation = "Other";
      }

      acc[occupation] = (acc[occupation] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to radar chart format and sort by count
    const radarData = Object.entries(occupationCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8) // Limit to top 8 for better visualization
      .map(([occupation, count]) => ({
        occupation:
          occupation.length > 20
            ? occupation.substring(0, 20) + "..."
            : occupation,
        fullOccupation: occupation,
        count,
      }));

    return radarData;
  }, [submissions]);

  const totalSubmissions = submissions?.length || 0;

  return (
    <Card className="gap-0">
      <CardHeader className="items-center">
        <CardTitle>🎒 Occupations of the Youth</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart
            data={occupationData}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => [
                    `${value} submissions`,
                    
                  ]}
                />
              }
            />
            <PolarAngleAxis
              dataKey="occupation"
              tick={{ fontSize: 11 }}
              className="fill-muted"
            />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-count)"
              fillOpacity={0.1}
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
