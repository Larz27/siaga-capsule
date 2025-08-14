"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export const description = "A vertical word cloud showing obstacles with varying sizes based on frequency";

// Color palette for obstacles - warm to cool transition
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

interface ObstaclesWordCloudProps {
  initialData: Submission[];
}

export function ObstaclesWordCloud({ initialData }: ObstaclesWordCloudProps) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Process obstacles data for word cloud
  const obstaclesData = React.useMemo(() => {
    if (!submissions) return [];

    // Extract all obstacles from submissions
    const allObstacles = submissions.flatMap((s) => s.obstacles);
    
    // Count occurrences of each obstacle
    const obstacleCounts = allObstacles.reduce((acc, obstacle) => {
      acc[obstacle] = (acc[obstacle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count (descending)
    const sortedObstacles = Object.entries(obstacleCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([obstacle, count], index) => ({
        name: obstacle,
        count,
        color: COLORS[index % COLORS.length],
      }));

    return sortedObstacles;
  }, [submissions]);

  // Calculate font sizes based on count
  const getFontSize = (count: number, maxCount: number, minCount: number) => {
    // Scale font size between 16px (min) and 48px (max)
    const minSize = 16;
    const maxSize = 48;
    
    if (maxCount === minCount) return maxSize;
    
    const normalized = (count - minCount) / (maxCount - minCount);
    return minSize + (maxSize - minSize) * normalized;
  };

  const maxCount = Math.max(...obstaclesData.map(d => d.count));
  const minCount = Math.min(...obstaclesData.map(d => d.count));
  const totalSubmissions = submissions?.length || 0;

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Obstacles Word Cloud</CardTitle>
        <CardDescription>
          Most frequently mentioned challenges - size represents frequency ({totalSubmissions} total submissions)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 p-6 min-h-[400px] justify-center">
          {obstaclesData.length > 0 ? (
            obstaclesData.map((obstacle, index) => {
              const fontSize = getFontSize(obstacle.count, maxCount, minCount);
              const percentage = totalSubmissions > 0 
                ? ((obstacle.count / obstaclesData.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)
                : 0;
              
              return (
                <div
                  key={obstacle.name}
                  className="transition-all duration-300 hover:scale-110 cursor-pointer group relative"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: obstacle.color,
                    fontWeight: fontSize > 30 ? 'bold' : fontSize > 24 ? 'semibold' : 'medium',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  {obstacle.name}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {obstacle.count} mentions ({percentage}% of all obstacles)
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-500 text-center">
              No obstacles data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
