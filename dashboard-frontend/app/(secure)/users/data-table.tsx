"use client";

import * as React from "react";
import {
  IconDotsVertical,
  IconStar,
  IconStarFilled,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Submission } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPublicSubmissions, toggleSubmissionFeatured } from "./query";
import { SiteHeader } from "@/components/site-header";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import UserTable from "./user-table";

export function SubmissionsDataTable({
  initialData,
}: {
  initialData: Submission[];
}) {
  const queryClient = useQueryClient();
  
  // State for expanded rows
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  // Mutation for toggling featured status
  const toggleFeaturedMutation = useMutation({
    mutationFn: ({
      submissionId,
      isFeatured,
    }: {
      submissionId: string;
      isFeatured: boolean;
    }) => toggleSubmissionFeatured(submissionId, isFeatured),
    onSuccess: () => {
      // Invalidate and refetch submissions to get updated data
      queryClient.invalidateQueries({ queryKey: ["submissions", "public"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to toggle featured: ${error.message}`);
    },
  });

  const {
    data: submissions,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["submissions", "public"],
    queryFn: () => getPublicSubmissions(),
    initialData,
  });

  // Memoize filtered data to prevent recalculation on every render
  const { allSubmissions, featuredSubmissions } = React.useMemo(() => {
    const all = submissions || [];
    const featured = all.filter((s) => s.isFeatured);
    return { allSubmissions: all, featuredSubmissions: featured };
  }, [submissions]);

  // Updated action handlers
  const handleViewDetails = React.useCallback((submission: Submission) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submission.id)) {
        newSet.delete(submission.id);
      } else {
        newSet.add(submission.id);
      }
      return newSet;
    });
  }, []);

  const handleToggleFeatured = React.useCallback(
    (submission: Submission) => {
      const newFeaturedStatus = !submission.isFeatured;

      toggleFeaturedMutation.mutate({
        submissionId: submission.id,
        isFeatured: newFeaturedStatus,
      });

      // Show immediate feedback
      const action = newFeaturedStatus ? "Added to" : "Removed from";
      toast.success(`${action} featured submissions`);
    },
    [toggleFeaturedMutation]
  );

  // Memoized columns definition inside component to access handler functions
  const columns = React.useMemo<ColumnDef<Submission>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "submittedAt",
        header: "Submitted",
        cell: ({ row }) => {
          const date = row.original.submittedAt
            ? new Date(row.original.submittedAt)
            : null;
          return (
            <div className="text-sm">
              {date ? (
                <>
                  <div className="font-medium">{date.toLocaleDateString()}</div>
                  <div className="text-muted-foreground">
                    {date.toLocaleTimeString()}
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground">N/A</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => (
          <div className="text-center">
            <Badge variant="outline" className="text-muted-foreground">
              {row.original.age || "N/A"}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "district",
        header: "District",
        cell: ({ row }) => (
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {row.original.district || "N/A"}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "occupationStatus",
        header: "Occupation",
        cell: ({ row }) => {
          const occupation =
            row.original.occupationStatus === "Other" &&
            row.original.otherOccupation
              ? row.original.otherOccupation
              : row.original.occupationStatus;
          return (
            <div className="w-32">
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                {occupation || "N/A"}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "sectorInterest",
        header: "Sector",
        cell: ({ row }) => {
          const sector =
            row.original.sectorInterest === "Other" && row.original.otherSector
              ? row.original.otherSector
              : row.original.sectorInterest;
          return (
            <div className="w-32">
              <Badge
                variant="outline"
                className="text-muted-foreground px-1.5 whitespace-pre-line"
              >
                {sector || "N/A"}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "isPrivate",
        header: "Privacy",
        cell: ({ row }) => (
          <Badge
            variant={row.original.isPrivate ? "destructive" : "default"}
            className="px-1.5"
          >
            {row.original.isPrivate ? "Private" : "Public"}
          </Badge>
        ),
      },
      {
        accessorKey: "question1",
        header: "Response Length",
        cell: ({ row }) => {
          const length = row.original.question1?.length || 0;
          return (
            <div className="text-center">
              <Badge variant="outline" className="text-muted-foreground">
                {length} chars
              </Badge>
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {/* Expand/Collapse indicator */}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleViewDetails(row.original)}
              title={expandedRows.has(row.original.id) ? "Hide details" : "View details"}
            >
              {expandedRows.has(row.original.id) ? (
                <IconChevronUp className="size-3" />
              ) : (
                <IconChevronDown className="size-3" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                  size="icon"
                >
                  <IconDotsVertical />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
                  {expandedRows.has(row.original.id) ? (
                    <>
                      <IconChevronUp className="mr-2 size-4" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <IconChevronDown className="mr-2 size-4" />
                      View Details
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggleFeatured(row.original)}
                >
                  {row.original.isFeatured ? (
                    <>
                      <IconStarFilled className="mr-2 size-4 text-yellow-500" />
                      Unfeature
                    </>
                  ) : (
                    <>
                      <IconStar className="mr-2 size-4" />
                      Feature
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [handleViewDetails, handleToggleFeatured, expandedRows]
  );

  return (
    <>
      <SiteHeader
        header={
          <h1 className="text-base font-medium flex items-center gap-2">
            <span>Users</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCcw
                className={cn("size-4", isRefetching && "animate-spin")}
              />
            </Button>
          </h1>
        }
      />
      <Tabs
        defaultValue="all"
        className="w-full flex-col justify-start gap-6 py-6"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            <TabsTrigger value="all">
              Public Submissions{" "}
              <Badge variant="secondary">{allSubmissions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="featured">
              Featured{" "}
              <Badge variant="secondary">{featuredSubmissions.length}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* All Submissions Tab */}
        <TabsContent
          value="all"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <UserTable
            columns={columns}
            data={allSubmissions}
            enableSelection={true}
            enablePagination={true}
            expandedRows={expandedRows}
          />
        </TabsContent>

        {/* Featured Submissions Tab */}
        <TabsContent
          value="featured"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <UserTable
            columns={columns}
            data={featuredSubmissions}
            enableSelection={false}
            enablePagination={false}
            expandedRows={expandedRows}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
