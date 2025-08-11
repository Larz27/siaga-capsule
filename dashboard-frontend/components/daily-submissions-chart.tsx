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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Submission {
  id: string;
  submittedAt: Date | null;
  isPrivate: boolean;
}

interface DailySubmissionsChartProps {
  submissions: Submission[];
}

const chartConfig = {
  public: {
    label: "Public",
    color: "hsl(var(--chart-1))",
  },
  private: {
    label: "Private",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DailySubmissionsChart({
  submissions,
}: DailySubmissionsChartProps) {
  const dailyData = submissions.reduce((acc, submission) => {
    if (!submission.submittedAt) return acc;

    const date = submission.submittedAt.toISOString().split("T")[0];

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

  const chartData = Object.values(dailyData)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      ...item,
      displayDate: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  const totalSubmissions = chartData.reduce(
    (sum, day) => sum + day.public + day.private,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Submissions</CardTitle>
        <CardDescription>
          Submissions per day, differentiated by privacy setting (
          {totalSubmissions} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="displayDate" />
              <YAxis />
              <Legend />
              <Bar
                dataKey="public"
                fill="var(--color-red-500)"
                name="Public"
                radius={[4,4,0,0]}
              />
              <Bar
                dataKey="private"
                fill="var(--color-purple-500)"
                name="Private"
                radius={[4,4,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
