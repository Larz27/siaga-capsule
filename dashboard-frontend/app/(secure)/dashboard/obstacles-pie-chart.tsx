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

export const description = "A pie chart showing the distribution of obstacles mentioned in submissions";

// Color palette for the pie chart segments (different from values to avoid confusion)
const COLORS = [
  "#dc2626", // Red
  "#ea580c", // Orange
  "#d97706", // Amber
  "#ca8a04", // Yellow
  "#65a30d", // Lime
  "#16a34a", // Green
  "#0d9488", // Teal
  "#0891b2", // Cyan
  "#0284c7", // Blue
  "#7c3aed", // Violet
];

// Chart configuration for the pie chart
const chartConfig = {
  obstacles: {
    label: "Obstacles",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface ObstaclesPieChartProps {
  initialData: Submission[];
}

export function ObstaclesPieChart({ initialData }: ObstaclesPieChartProps) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Process submissions data to count obstacles
  const obstaclesData = React.useMemo(() => {
    if (!submissions) return [];

    // Extract all obstacles from submissions
    const allObstacles = submissions.flatMap(s => s.obstacles);
    
    // Count occurrences of each obstacle
    const obstacleCounts = allObstacles.reduce((acc, obstacle) => {
      acc[obstacle] = (acc[obstacle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count (descending)
    const sortedObstacles = Object.entries(obstacleCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([obstacle, count], index) => ({
        name: obstacle,
        value: count,
        color: COLORS[index % COLORS.length],
        // Show label for top 4 obstacles, hide for others
        showLabel: index < 4,
      }));

    return sortedObstacles;
  }, [submissions]);

  // Calculate total submissions for percentage display
  const totalSubmissions = submissions?.length || 0;
  
  // Calculate total obstacle mentions for percentage calculation
  const totalObstacleMentions = obstaclesData.reduce((sum, item) => sum + item.value, 0);

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
      const percentage = totalObstacleMentions > 0 ? ((data.value / totalObstacleMentions) * 100).toFixed(1) : 0;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600">
            {data.value} mentions ({percentage}% of all obstacles)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend content
  const CustomLegend = () => (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {obstaclesData.slice(0, 8).map((entry) => (
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
        <CardTitle>Obstacles Distribution</CardTitle>
        <CardDescription>
          Most frequently mentioned challenges in submissions ({totalSubmissions} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={obstaclesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, showLabel, percent }) => {
                  // Only show labels for top obstacles or when percentage is significant
                  if (showLabel || percent > 0.05) {
                    return `${name}`;
                  }
                  return "";
                }}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {obstaclesData.map((entry, index) => (
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
