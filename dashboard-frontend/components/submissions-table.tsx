import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Submission } from "@/lib/types"

interface SubmissionsTableProps {
  submissions: Submission[]
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const publicSubmissions = submissions.filter(s => !s.isPrivate)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Submissions</CardTitle>
        <CardDescription>
          Showing {publicSubmissions.length} public submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>All public submissions from the platform</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Sector Interest</TableHead>
              <TableHead>Values</TableHead>
              <TableHead>Response Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publicSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  {submission.submittedAt?.toLocaleDateString() || 'N/A'}
                </TableCell>
                <TableCell>{submission.age}</TableCell>
                <TableCell>{submission.district}</TableCell>
                <TableCell>
                  <Badge variant={submission.occupationStatus !== "Other" ? "default" : "secondary"} className="break-all whitespace-normal">
                    {submission.occupationStatus === "Other" && submission.otherOccupation 
                      ? submission.otherOccupation 
                      : submission.occupationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={submission.sectorInterest !== "Other" ? "default" : "secondary"} className="break-all whitespace-normal">
                    {submission.sectorInterest === "Other" && submission.otherSector 
                      ? submission.otherSector 
                      : submission.sectorInterest}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-32">
                    {submission.values.slice(0, 2).map((value, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                    {submission.values.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{submission.values.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate text-sm text-muted-foreground">
                    {submission.question1}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
