"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Submission } from "@/lib/types"

interface OccupationChartProps {
  submissions: Submission[]
}

const chartConfig = {
  count: {
    label: "Submissions",
    color: "var(--color-violet-500)",
  },
} satisfies ChartConfig

export function OccupationChart({ submissions }: OccupationChartProps) {
  const occupationCounts = submissions.reduce((acc, s) => {
    const occupationValue = s.occupationStatus === "Other" && s.otherOccupation 
      ? s.otherOccupation 
      : s.occupationStatus
    acc[occupationValue] = (acc[occupationValue] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(occupationCounts)
    .map(([occupation, count]) => ({
      occupation: occupation.length > 12 ? occupation.substring(0, 12) + "..." : occupation,
      fullOccupation: occupation,
      count,
      percentage: Math.round((count / submissions.length) * 100)
    }))
    .sort((a, b) => b.count - a.count)

  const CustomTooltip = ({ active, payload }: {
    active: boolean;
    payload: {
      name: string;
      dataKey: string;
      payload: Record<string, string | number>;
      type?: string;
      value: number;
    }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-2 shadow-md">
          <p className="text-sm font-medium">{data.fullOccupation}</p>
          <p className="text-sm text-muted-foreground">
            {data.count} submissions ({data.percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupation Status Distribution</CardTitle>
        <CardDescription>
          Breakdown of submissions by occupation status ({submissions.length} total)
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
              <XAxis 
                dataKey="occupation" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis />
              {/* @ts-expect-error not sure why this is not working */}
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
