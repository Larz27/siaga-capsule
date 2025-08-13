"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Submission } from "@/lib/types";

// Abstracted table component for better performance
const UserTable = React.memo(
  ({
    data,
    columns,
    enableSelection = true,
    enablePagination = true,
    expandedRows = new Set<string>(),
  }: {
    data: Submission[];
    columns: ColumnDef<Submission>[];
    enableSelection?: boolean;
    enablePagination?: boolean;
    expandedRows?: Set<string>;
  }) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageIndex: 0,
      pageSize: 10,
    });

    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
        rowSelection: enableSelection ? rowSelection : {},
        columnFilters,
        pagination: enablePagination
          ? pagination
          : { pageIndex: 0, pageSize: 50 },
      },
      getRowId: (row) => row.id.toString(),
      enableRowSelection: enableSelection,
      onRowSelectionChange: enableSelection ? setRowSelection : undefined,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onPaginationChange: enablePagination ? setPagination : undefined,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: enablePagination
        ? getPaginationRowModel()
        : undefined,
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
      <>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Expandable row with full submission details */}
                    {expandedRows.has(row.original.id) && (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="p-0">
                          <div className="bg-muted/30 p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Personal Information */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  Personal Information
                                </h4>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-sm font-medium">Age:</span>
                                    <span className="ml-2 text-sm">{row.original.age || "N/A"}</span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">District:</span>
                                    <span className="ml-2 text-sm">{row.original.district || "N/A"}</span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Occupation:</span>
                                    <span className="ml-2 text-sm">
                                      {row.original.occupationStatus === "Other" && row.original.otherOccupation
                                        ? row.original.otherOccupation
                                        : row.original.occupationStatus || "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Sector Interest:</span>
                                    <span className="ml-2 text-sm">
                                      {row.original.sectorInterest === "Other" && row.original.otherSector
                                        ? row.original.otherSector
                                        : row.original.sectorInterest || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Values & Obstacles */}
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  Values & Obstacles
                                </h4>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-sm font-medium">Values:</span>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {row.original.values?.length > 0 ? (
                                        row.original.values.map((value, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {value}
                                          </Badge>
                                        ))
                                      ) : (
                                        <span className="text-sm text-muted-foreground">None specified</span>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Obstacles:</span>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {row.original.obstacles?.length > 0 ? (
                                        row.original.obstacles.map((obstacle, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {obstacle}
                                          </Badge>
                                        ))
                                      ) : (
                                        <span className="text-sm text-muted-foreground">None specified</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Full Response */}
                              <div className="space-y-3 md:col-span-2 lg:col-span-1">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  Full Response
                                </h4>
                                <div className="bg-background rounded-lg p-4 border">
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {row.original.question1 || "No response provided"}
                                  </p>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Submitted: {row.original.submittedAt ? new Date(row.original.submittedAt).toLocaleString() : "Unknown"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No submissions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {enablePagination && (
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <IconChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <IconChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <IconChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <IconChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

UserTable.displayName = "UserTable";

export default UserTable;
