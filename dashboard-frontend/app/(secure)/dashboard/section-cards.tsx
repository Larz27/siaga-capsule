"use client";

import { IconMapPin, IconCalendar } from "@tabler/icons-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export function SectionCards({ initialData }: { initialData: Submission[] }) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Calculate unique districts and prepare chart data
  const districtCounts =
    submissions?.reduce((acc, s) => {
      acc[s.district] = (acc[s.district] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
  const uniqueDistricts = Object.keys(districtCounts).length;

  // Get top 8 districts for the chart
  const topDistricts = Object.entries(districtCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  // Create chart config with district colors
  const chartConfig = {
    count: {
      label: "Submissions",
    },
    ...topDistricts.reduce((config, [district], index) => {
      const colorKeys = [
        "chart-1",
        "chart-2",
        "chart-3",
        "chart-4",
        "chart-5",
        "primary",
        "secondary",
        "muted",
      ];
      const safeDistrictKey = district
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase();
      config[safeDistrictKey] = {
        label: district,
        color: `var(--${colorKeys[index % colorKeys.length]})`,
      };
      return config;
    }, {} as Record<string, { label: string; color: string }>),
  } satisfies ChartConfig;

  // Prepare chart data using the proper format
  const chartData = topDistricts.map(([district, count]) => {
    const safeDistrictKey = district
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    return {
      district: district.length > 12 ? district.slice(0, 12) + "..." : district,
      count,
      fullName: district,
      fill: `var(--color-${safeDistrictKey})`,
    };
  });

  // Calculate age distribution by ranges (Brunei youth age is 35)
  const validAges = submissions?.filter((s) => s.age && s.age > 0) || [];

  const ageRanges = [
    { range: "Under 18", label: "Minors", min: 0, max: 17 },
    { range: "18-35", label: "Youth", min: 18, max: 35 },
    { range: "36-55", label: "Adults", min: 36, max: 55 },
    { range: "56+", label: "Seniors", min: 56, max: 150 },
  ];

  // Count submissions in each age range
  const ageDistribution = ageRanges.map(({ range, label, min, max }) => {
    const count = validAges.filter((s) => s.age >= min && s.age <= max).length;
    return {
      range,
      label,
      count,
      fill: `var(--color-${range.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()})`,
    };
  });

  // Create age chart config
  const ageChartConfig = {
    count: { label: "People" },
    under_18: { label: "Minors (Under 18)", color: "var(--chart-1)" },
    "18_35": { label: "Youth (18-35)", color: "var(--chart-2)" },
    "36_55": { label: "Adults (36-55)", color: "var(--chart-3)" },
    "56_": { label: "Seniors (56+)", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 gap-4 px-6 md:pl-0">
      {/* Geographic Coverage Chart */}
      <Card className="@container/card gap-0">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconMapPin className="size-4" />
            Districts
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 12,
                right: 16,
                top: 8,
                bottom: 8,
              }}
            >
              <YAxis
                dataKey="district"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-xs"
                width={80}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                formatter={(value, _, props) => [`${value} submission`]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground text-xs"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Age Distribution Chart */}
      <Card className="@container/card gap-0">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconCalendar className="size-4" />
            Age Distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={ageChartConfig} className="h-[150px] w-full">
            <BarChart
              accessibilityLayer
              data={ageDistribution}
              layout="vertical"
              margin={{
                left: 12,
                right: 16,
                top: 8,
                bottom: 8,
              }}
            >
              <YAxis
                dataKey="range"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-xs"
                width={60}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                formatter={(value, _, props) => [`${value} submission`]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground text-xs"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
