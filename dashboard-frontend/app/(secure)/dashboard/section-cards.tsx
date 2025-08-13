"use client";

import {
  IconQrcode,
  IconUsers,
  IconMapPin,
  IconCalendar,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
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
import Image from "next/image";

export function SectionCards({ initialData }: { initialData: Submission[] }) {
  const { data: submissions } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => getSubmissions(),
    initialData,
  });

  // Calculate statistics that complement the charts
  const totalSubmissions = submissions?.length || 0;
  const publicSubmissions =
    submissions?.filter((s) => !s.isPrivate).length || 0;
  const privateSubmissions =
    submissions?.filter((s) => s.isPrivate).length || 0;

  // Calculate unique districts and find top district
  const districtCounts =
    submissions?.reduce((acc, s) => {
      acc[s.district] = (acc[s.district] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};
  const uniqueDistricts = Object.keys(districtCounts).length;
  const topDistrict = Object.entries(districtCounts).sort(
    ([, a], [, b]) => b - a
  )[0];

  // Calculate average age
  const validAges = submissions?.filter((s) => s.age && s.age > 0) || [];
  const averageAge =
    validAges.length > 0
      ? Math.round(
          validAges.reduce((sum, s) => sum + s.age, 0) / validAges.length
        )
      : 0;

  // Calculate min and max ages
  const minAge =
    validAges.length > 0 ? Math.min(...validAges.map((s) => s.age)) : 0;
  const maxAge =
    validAges.length > 0 ? Math.max(...validAges.map((s) => s.age)) : 0;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* QR Code CTA Card */}
      <Card className="@container/card bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardDescription className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <IconQrcode className="size-5" />
            Time Capsule Access
          </CardDescription>
          <CardDescription className="flex items-center justify-between gap-4">
            <Image
              src="/images/qr-code.png"
              className="rounded-md"
              alt="QR Code"
              width={100}
              height={100}
            />
            <div className="line-clamp-1 flex gap-2 font-medium text-blue-800 dark:text-blue-200 text-xs">
              Scan the QR code to access the time capsule submission form
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Total Submissions Card */}
      <Card className="@container/card">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconUsers className="size-4" />
            Total Submissions
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {totalSubmissions.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {publicSubmissions} public • {privateSubmissions} private
            </div>
            <Badge
              variant="outline"
              className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-600"
            >
              <IconUsers className="size-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Coverage Card */}
      <Card className="@container/card">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconMapPin className="size-4" />
            Districts Covered
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {uniqueDistricts}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Top: {topDistrict?.[0] || "N/A"} ({topDistrict?.[1] || 0})
            </div>
            <Badge variant="outline">
              <IconMapPin className="size-3 mr-1" />
              Coverage
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Average Age Card */}
      <Card className="@container/card">
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2 text-sm">
            <IconCalendar className="size-4" />
            Average Age
          </CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            {averageAge}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {minAge} - {maxAge} years
            </div>
            <Badge
              variant="outline"
              className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-600"
            >
              <IconCalendar className="size-3 mr-1" />
              Demographics
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
