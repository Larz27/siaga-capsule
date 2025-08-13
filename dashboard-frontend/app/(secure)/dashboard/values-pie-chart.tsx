"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export const description = "A pie chart showing the distribution of values mentioned in submissions";

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
    const allValues = submissions.flatMap(s => s.values);
    
    // Count occurrences of each value
    const valueCounts = allValues.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count (descending)
    const sortedValues = Object.entries(valueCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([value, count], index) => ({
        name: value,
        value: count,
        color: COLORS[index % COLORS.length],
        // Show label for top 4 values, hide for others
        showLabel: index < 4,
      }));

    return sortedValues;
  }, [submissions]);

  // Calculate total submissions for percentage display
  const totalSubmissions = submissions?.length || 0;
  
  // Calculate total value mentions for percentage calculation
  const totalValueMentions = valuesData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: {
    active: boolean;
    payload: {
      payload: {
        name: string;
        value: number;
      };
    }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalValueMentions > 0 ? ((data.value / totalValueMentions) * 100).toFixed(1) : 0;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">
            {data.value} mentions ({percentage}% of all values)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend content
  const CustomLegend = () => (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {valuesData.slice(0, 8).map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">
            {entry.name} ({entry.value})
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Values Distribution</CardTitle>
        <CardDescription>
          Most commonly mentioned values in submissions ({totalSubmissions} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={valuesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, showLabel, percent }) => {
                  // Only show labels for top values or when percentage is significant
                  if (showLabel || percent > 0.05) {
                    return `${name}`;
                  }
                  return "";
                }}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {valuesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* @ts-expect-error - recharts types are not up to date? */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <CustomLegend />
      </CardContent>
    </Card>
  );
}
