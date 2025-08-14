"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Label, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export const description =
  "A pie chart showing the distribution of values mentioned in submissions";

// Color palette for the pie chart segments
const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#84cc16", // Lime
  "#f97316", // Orange
  "#ec4899", // Pink
  "#6366f1", // Indigo
];

// Chart configuration for the pie chart
const chartConfig = {
  values: {
    label: "Values",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ValuesPieChartProps {
  initialData: Submission[];
}

export function ValuesPieChart({ initialData }: ValuesPieChartProps) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Process submissions data to count values
  const valuesData = React.useMemo(() => {
    if (!submissions) return [];

    // Extract all values from submissions
    const allValues = submissions.flatMap((s) => s.values);

    // Count occurrences of each value
    const valueCounts = allValues.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count (descending)
    const sortedValues = Object.entries(valueCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([value, count], index) => ({
        name: value,
        value: count,
        fill: COLORS[index % COLORS.length],
      }));

    return sortedValues;
  }, [submissions]);

  // Calculate total submissions for percentage display
  const totalSubmissions = submissions?.length || 0;

  // The highest contributor is automatically the first item (already sorted)
  const activeIndex = 0;

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Values Distribution</CardTitle>
        <CardDescription>
          Most commonly mentioned values in submissions ({totalSubmissions}{" "}
          total)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <PieChart
            margin={{
              top: 0,
              right: 20,
              bottom: 0,
              left: 20,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={valuesData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                if (percent > 0.05) {
                  // Calculate label position
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text 
                      x={x} 
                      y={y} 
                      fill="white" 
                      textAnchor={x > cx ? 'start' : 'end'} 
                      dominantBaseline="central"
                      style={{ 
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {name}
                    </text>
                  );
                }
                return null;
              }}
              labelLine={false}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              {valuesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSubmissions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Submissions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
