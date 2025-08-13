"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Submission } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getSubmissions } from "./query";

export const description = "An interactive area chart showing daily submissions over time";

// Chart configuration for public vs private submissions with vibrant colors
const chartConfig = {
  public: {
    label: "Public",
    color: "#10b981", // Emerald green for public
  },
  private: {
    label: "Private", 
    color: "#8b5cf6", // Purple for private
  },
} satisfies ChartConfig;

export function DailySubmissionsChart({
  initialData,
}: {
  initialData: Submission[];
}) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });
  
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("14d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // Process submissions data to create daily counts
  const dailyData = React.useMemo(() => {
    if (!submissions) return [];

    // Group submissions by date and count public vs private
    const dailyCounts = submissions.reduce((acc, submission) => {
      if (!submission.submittedAt) return acc;

      const date = submission.submittedAt.split("T")[0];

      if (!acc[date]) {
        acc[date] = { date, public: 0, private: 0 };
      }

      if (submission.isPrivate) {
        acc[date].private += 1;
      } else {
        acc[date].public += 1;
      }

      return acc;
    }, {} as Record<string, { date: string; public: number; private: number }>);

    // Convert to array and sort by date
    return Object.values(dailyCounts)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));
  }, [submissions]);

  // Filter data based on selected time range and fill in missing dates
  const filteredData = React.useMemo(() => {
    if (dailyData.length === 0) return [];

    const referenceDate = new Date();
    let daysToSubtract = 90;
    
    if (timeRange === "14d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    
    // Create a complete date range with all dates
    const completeDateRange = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= referenceDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = dailyData.find(item => item.date === dateString);
      
      if (existingData) {
        completeDateRange.push(existingData);
      } else {
        // Add entry with zero counts for dates without data
        completeDateRange.push({
          date: dateString,
          public: 0,
          private: 0,
          displayDate: currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return completeDateRange;
  }, [dailyData, timeRange]);

  // Calculate total submissions for the selected time range
  const totalSubmissions = filteredData.reduce(
    (sum, day) => sum + day.public + day.private,
    0
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Daily Submissions</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Submissions per day, differentiated by privacy setting ({totalSubmissions} total)
          </span>
          <span className="@[540px]/card:hidden">
            Daily submissions ({totalSubmissions} total)
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="14d">Last 14 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a time range"
            >
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="14d" className="rounded-lg">
                Last 14 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillPublic" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillPrivate" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="displayDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value, index) => {
                  // Show every 3rd tick for better readability
                  if (timeRange === "7d") return value;
                  if (timeRange === "14d" && index % 3 === 0) return value;
                  if (timeRange === "30d" && index % 7 === 0) return value;
                  return "";
                }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      // Find the original date from the display date
                      const item = filteredData.find(d => d.displayDate === value);
                      return item ? new Date(item.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : value;
                    }}
                    indicator="dot"
                  />
                }
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  paddingBottom: "10px"
                }}
              />
              <Area
                dataKey="private"
                type="monotone"
                fill="url(#fillPrivate)"
                stroke="#8b5cf6"
                strokeWidth={2}
                stackId="a"
                name="Private"
              />
              <Area
                dataKey="public"
                type="monotone"
                fill="url(#fillPublic)"
                stroke="#10b981"
                strokeWidth={2}
                stackId="a"
                name="Public"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
