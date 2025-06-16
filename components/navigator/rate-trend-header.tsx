"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  TrendingUp,
  Grid3X3,
  Download,
  RefreshCw,
} from "lucide-react"

interface RateTrendHeaderProps {
  currentView: "calendar" | "chart" | "table"
  onViewChange: (view: "calendar" | "chart" | "table") => void
}

export function RateTrendHeader({ currentView, onViewChange }: RateTrendHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                June 2025 <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>May 2025</DropdownMenuItem>
              <DropdownMenuItem>June 2025</DropdownMenuItem>
              <DropdownMenuItem>July 2025</DropdownMenuItem>
              <DropdownMenuItem>August 2025</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 rounded-md p-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${currentView === "calendar" ? "bg-white shadow-sm" : ""}`}
            onClick={() => onViewChange("calendar")}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${currentView === "chart" ? "bg-white shadow-sm" : ""}`}
            onClick={() => onViewChange("chart")}
          >
            <TrendingUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${currentView === "table" ? "bg-white shadow-sm" : ""}`}
            onClick={() => onViewChange("table")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              <Download className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            <DropdownMenuItem>Export as CSV</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="text-sm bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh rates
        </Button>
      </div>
    </div>
  )
}
