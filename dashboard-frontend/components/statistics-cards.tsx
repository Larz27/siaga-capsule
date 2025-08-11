import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Submission } from "@/lib/types"

interface StatisticsCardsProps {
  submissions: Submission[]
}

export function StatisticsCards({ submissions }: StatisticsCardsProps) {
  const totalSubmissions = submissions.length
  const publicSubmissions = submissions.filter(s => !s.isPrivate).length
  const privateSubmissions = submissions.filter(s => s.isPrivate).length

  const districtCounts = submissions.reduce((acc, s) => {
    acc[s.district] = (acc[s.district] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topDistrict = Object.entries(districtCounts)
    .sort(([,a], [,b]) => b - a)[0]

  const ageCounts = submissions.reduce((acc, s) => {
    const ageGroup = s.age < 25 ? "18-24" : s.age < 35 ? "25-34" : "35+"
    acc[ageGroup] = (acc[ageGroup] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topAgeGroup = Object.entries(ageCounts)
    .sort(([,a], [,b]) => b - a)[0]

  const occupationCounts = submissions.reduce((acc, s) => {
    const occupationValue = s.occupationStatus === "Other" && s.otherOccupation 
      ? s.otherOccupation 
      : s.occupationStatus
    acc[occupationValue] = (acc[occupationValue] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topOccupation = Object.entries(occupationCounts)
    .sort(([,a], [,b]) => b - a)[0]

  const sectorCounts = submissions.reduce((acc, s) => {
    const sectorValue = s.sectorInterest === "Other" && s.otherSector 
      ? s.otherSector 
      : s.sectorInterest
    acc[sectorValue] = (acc[sectorValue] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topSector = Object.entries(sectorCounts)
    .sort(([,a], [,b]) => b - a)[0]

  const allValues = submissions.flatMap(s => s.values)
  const valueCounts = allValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topValues = Object.entries(valueCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)

  const allObstacles = submissions.flatMap(s => s.obstacles)
  const obstacleCounts = allObstacles.reduce((acc, obstacle) => {
    acc[obstacle] = (acc[obstacle] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topObstacles = Object.entries(obstacleCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)

  const avgResponseLength = Math.round(
    submissions.reduce((sum, s) => sum + s.question1.length, 0) / submissions.length
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSubmissions}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {publicSubmissions} public • {privateSubmissions} private
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top District</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topDistrict?.[0] || 'N/A'}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {topDistrict?.[1] || 0} submissions ({totalSubmissions > 0 ? Math.round(((topDistrict?.[1] || 0) / totalSubmissions) * 100) : 0}%)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Age Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topAgeGroup?.[0] || 'N/A'}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {topAgeGroup?.[1] || 0} submissions ({totalSubmissions > 0 ? Math.round(((topAgeGroup?.[1] || 0) / totalSubmissions) * 100) : 0}%)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Occupation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{topOccupation?.[0] || 'N/A'}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {topOccupation?.[1] || 0} submissions ({totalSubmissions > 0 ? Math.round(((topOccupation?.[1] || 0) / totalSubmissions) * 100) : 0}%)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Sector Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{topSector?.[0] || 'N/A'}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {topSector?.[1] || 0} submissions ({totalSubmissions > 0 ? Math.round(((topSector?.[1] || 0) / totalSubmissions) * 100) : 0}%)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Avg Response Length</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResponseLength}</div>
          <div className="text-xs text-muted-foreground mt-1">
            characters per response
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-base">Top Values</CardTitle>
          <CardDescription>Most commonly mentioned values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topValues.map(([value, count]) => (
              <Badge key={value} variant="secondary">
                {value} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-base">Top Obstacles</CardTitle>
          <CardDescription>Most frequently mentioned challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topObstacles.map(([obstacle, count]) => (
              <Badge key={obstacle} variant="outline">
                {obstacle} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
