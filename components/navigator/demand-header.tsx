"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, Download, CalendarIcon, Star } from "lucide-react"
import * as React from "react"

export function DemandHeader() {
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({
    from: new Date(2025, 5, 8), // June 8, 2025
    to: new Date(2025, 5, 30), // June 30, 2025
  })

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b bg-white dark:bg-slate-800/50">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Demand Analysis</h1>
      <div className="flex items-center space-x-2">
        {/* Replace with your actual DateRangePicker component */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CalendarIcon className="h-4 w-4" />
              {dateRange.from ? dateRange.from.toLocaleDateString() : "Start Date"} -{" "}
              {dateRange.to ? dateRange.to.toLocaleDateString() : "End Date"}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto p-0" align="end">
            {/* Placeholder for actual DateRangePicker component */}
            <div className="p-4">Date Range Picker Here</div>
            {/* <DateRangePicker initialRange={dateRange} onRangeChange={setDateRange} /> */}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
          <Star className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Settings</DropdownMenuItem>
            <DropdownMenuItem>Chart Preferences</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Download className="h-4 w-4" />
              Export
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem>Export as PNG</DropdownMenuItem>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
