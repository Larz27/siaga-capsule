"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Submission } from "@/lib/types";

interface AgeGroupChartProps {
  submissions: Submission[];
}

const chartConfig = {
  "18-24": {
    label: "18-24",
    color: "var(--color-violet-500)",
  },
  "25-34": {
    label: "25-34",
    color: "var(--color-violet-700)",
  },
  "35+": {
    label: "35+",
    color: "var(--color-violet-900)",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--color-violet-500)",
  "var(--color-violet-700)",
  "var(--color-violet-900)",
];

export function AgeGroupChart({ submissions }: AgeGroupChartProps) {
  const ageCounts = submissions.reduce((acc, s) => {
    const ageGroup = s.age < 25 ? "18-24" : s.age < 35 ? "25-34" : "35+";
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(ageCounts).map(([ageGroup, count]) => ({
    name: ageGroup,
    ageGroup,
    count,
    percentage: Math.round((count / submissions.length) * 100),
  }));

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active: boolean;
    payload: {
      name: string;
      dataKey: string;
      payload: Record<string, string | number>;
      type?: string;
      value: number;
    }[];
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-2 shadow-md">
          <p className="text-sm font-medium">{data.ageGroup}</p>
          <p className="text-sm text-muted-foreground">
            {data.count} submissions ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Group Distribution</CardTitle>
        <CardDescription>
          Breakdown of submissions by age groups ({submissions.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ ageGroup, percentage }) =>
                  `${ageGroup} (${percentage}%)`
                }
                outerRadius={80}
                fill="var(--color-violet-300)"
                dataKey="count"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              {/* @ts-expect-error not sure why this is not working */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
