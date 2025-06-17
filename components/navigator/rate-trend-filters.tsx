"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, Filter, Plus, X, CalendarDays, MapPin, Settings2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

/**
 * Enhanced Rate Trend Filters Component with Modern Glassmorphism Design
 * 
 * DESIGN PRINCIPLES APPLIED:
 * - Consistent with dashboard FilterBar design pattern
 * - Modern glassmorphism effects with backdrop blur
 * - Enhanced visual hierarchy and color-coded categories
 * - Progressive disclosure for mobile responsiveness
 * - Professional micro-interactions and animations
 * 
 * @returns {JSX.Element} Professional filter component with dashboard consistency
 */
export function RateTrendFilters() {
  const [showAllFilters, setShowAllFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>(['Lowest', 'Booking.com'])

  /**
   * Filter categories with enhanced categorization matching dashboard pattern
   */
  const filterCategories = {
    rateType: {
      label: "Rate Type",
      icon: CalendarDays,
      options: ["Lowest", "Highest", "Average"],
      color: "emerald"
    },
    channel: {
      label: "Booking Channel",
      icon: MapPin,
      options: ["Booking.com", "Expedia", "Hotels.com"],
      color: "blue"
    },
    device: {
      label: "Device",
      icon: Settings2,
      options: ["Desktop", "Mobile", "Tablet"],
      color: "purple"
    }
  }

  const additionalFilters = [
    { key: "duration", label: "Duration", options: ["1 night", "2 nights", "3 nights", "7 nights"], color: "amber" },
    { key: "guests", label: "Guests", options: ["1 guest", "2 guests", "3 guests", "4 guests"], color: "rose" },
    { key: "room", label: "Room Type", options: ["Any room", "Standard room", "Deluxe room", "Suite"], color: "indigo" },
    { key: "meal", label: "Meal Plan", options: ["Any meal", "Room only", "Breakfast included", "Half board", "Full board"], color: "cyan" },
    { key: "compset", label: "Compset", options: ["Primary compset", "Secondary compset", "Custom compset"], color: "orange" }
  ]

  /**
   * Remove active filter with smooth animation
   */
  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter))
  }

  /**
   * Get filter chip styling based on category
   */
  const getFilterChipStyle = (filter: string) => {
    let category = "default"
    if (filter.includes("Lowest") || filter.includes("Highest") || filter.includes("Average")) category = "emerald"
    else if (filter.includes("Booking") || filter.includes("Expedia") || filter.includes("Hotels")) category = "blue"
    else if (filter.includes("Desktop") || filter.includes("Mobile") || filter.includes("Tablet")) category = "purple"
    else if (filter.includes("night")) category = "amber"
    else if (filter.includes("guest")) category = "rose"
    else if (filter.includes("room") || filter.includes("Suite")) category = "indigo"
    else if (filter.includes("meal") || filter.includes("board")) category = "cyan"
    else if (filter.includes("compset")) category = "orange"

    const styles = {
      emerald: "bg-emerald-50/80 border-emerald-200/60 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800/40 dark:text-emerald-200",
      blue: "bg-blue-50/80 border-blue-200/60 text-blue-800 dark:bg-blue-950/40 dark:border-blue-800/40 dark:text-blue-200",
      purple: "bg-purple-50/80 border-purple-200/60 text-purple-800 dark:bg-purple-950/40 dark:border-purple-800/40 dark:text-purple-200",
      amber: "bg-amber-50/80 border-amber-200/60 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800/40 dark:text-amber-200",
      rose: "bg-rose-50/80 border-rose-200/60 text-rose-800 dark:bg-rose-950/40 dark:border-rose-800/40 dark:text-rose-200",
      indigo: "bg-indigo-50/80 border-indigo-200/60 text-indigo-800 dark:bg-indigo-950/40 dark:border-indigo-800/40 dark:text-indigo-200",
      cyan: "bg-cyan-50/80 border-cyan-200/60 text-cyan-800 dark:bg-cyan-950/40 dark:border-cyan-800/40 dark:text-cyan-200",
      orange: "bg-orange-50/80 border-orange-200/60 text-orange-800 dark:bg-orange-950/40 dark:border-orange-800/40 dark:text-orange-200",
      default: "bg-slate-50/80 border-slate-200/60 text-slate-800 dark:bg-slate-800/40 dark:border-slate-700/40 dark:text-slate-200"
    }

    return styles[category as keyof typeof styles]
  }

  return (
    <div className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-slate-200/40 dark:border-slate-700/40">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 sm:py-4 lg:py-6 xl:py-8">
        
        {/* Main Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          
          {/* Primary Filters Section */}
          <div className="flex items-center gap-3 lg:gap-4">
            
            {/* Filter Indicator with enhanced visual */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#1800FF]/10 to-emerald-500/10 dark:from-[#3366FF]/20 dark:to-emerald-400/20 border border-white/40 dark:border-slate-700/40 backdrop-blur-sm">
                <Filter className="h-4 w-4 text-[#1800FF] dark:text-[#3366FF]" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden sm:block">
                Rate Filters
              </span>
            </div>

            {/* Mobile: Show only essential filters + toggle button */}
            <div className="flex lg:hidden items-center gap-2">
              {Object.entries(filterCategories).slice(0, 2).map(([key, category]) => (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 h-auto rounded-xl border-0",
                        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                        "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md",
                        "text-slate-700 dark:text-slate-300 font-medium",
                        "transition-all duration-300 hover:scale-105"
                      )}
                    >
                      {key === "rateType" && (
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      )}
                      {key === "channel" && (
                        <span className="w-3 h-3 bg-blue-600 text-white text-xs rounded flex items-center justify-center font-bold">B</span>
                      )}
                      <span className="text-xs">
                        {key === "rateType" ? "Lowest" : "Booking.com"}
                      </span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl">
                    {category.options.map((option) => (
                      <DropdownMenuItem 
                        key={option}
                        className="rounded-xl mx-2 my-1 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAllFilters(!showAllFilters)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 h-auto rounded-xl border-0",
                  "bg-gradient-to-r from-[#1800FF]/5 to-emerald-500/5",
                  "hover:from-[#1800FF]/10 hover:to-emerald-500/10",
                  "text-[#1800FF] font-medium transition-all duration-300"
                )}
              >
                <Filter className="h-3 w-3" />
                More
              </Button>
            </div>

            {/* Desktop: Quick Filter Dropdowns */}
            <div className="hidden lg:flex items-center gap-2 lg:gap-3">
              {Object.entries(filterCategories).map(([key, category]) => (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 h-auto rounded-xl border-0",
                        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                        "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md",
                        "text-slate-700 dark:text-slate-300 font-medium",
                        "transition-all duration-300 hover:scale-105",
                        "focus:ring-2 focus:ring-[#1800FF]/30"
                      )}
                    >
                      <category.icon className={cn(
                        "h-4 w-4",
                        category.color === "emerald" && "text-emerald-600 dark:text-emerald-400",
                        category.color === "blue" && "text-blue-600 dark:text-blue-400",
                        category.color === "purple" && "text-purple-600 dark:text-purple-400"
                      )} />
                      <span className="hidden sm:inline">{category.label}</span>
                      <ChevronDown className="h-3 w-3 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent 
                    align="start" 
                    className="w-48 rounded-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl"
                  >
                    {category.options.map((option) => (
                      <DropdownMenuItem 
                        key={option}
                        onClick={() => {
                          if (!activeFilters.includes(option)) {
                            setActiveFilters(prev => [...prev, option])
                          }
                        }}
                        className="rounded-xl mx-2 my-1 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer"
                      >
                        <category.icon className={cn(
                          "h-4 w-4 mr-2",
                          category.color === "emerald" && "text-emerald-600 dark:text-emerald-400",
                          category.color === "blue" && "text-blue-600 dark:text-blue-400",
                          category.color === "purple" && "text-purple-600 dark:text-purple-400"
                        )} />
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:flex flex-1" />

          {/* Advanced Filters and Settings */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowAllFilters(!showAllFilters)}
              variant="outline"
              size="sm"
              className={cn(
                "hidden lg:flex items-center gap-2 px-4 py-2 h-auto rounded-xl border-0",
                "bg-gradient-to-r from-[#1800FF]/5 to-emerald-500/5 dark:from-[#3366FF]/10 dark:to-emerald-400/10",
                "hover:from-[#1800FF]/10 hover:to-emerald-500/10 dark:hover:from-[#3366FF]/20 dark:hover:to-emerald-400/20",
                "text-[#1800FF] dark:text-[#3366FF] font-semibold",
                "border border-[#1800FF]/20 dark:border-[#3366FF]/30",
                "hover:shadow-lg hover:scale-105 transition-all duration-300",
                "focus:ring-2 focus:ring-[#1800FF]/30"
              )}
            >
              <Plus className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-2 px-3 py-2 h-auto rounded-xl border-0",
                "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md",
                "text-slate-700 dark:text-slate-300 font-medium",
                "transition-all duration-300 hover:scale-105"
              )}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </div>

        {/* Additional filters when expanded on mobile */}
        {showAllFilters && (
          <div className="mt-4 lg:mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3">
              {additionalFilters.map((filter) => (
                <DropdownMenu key={filter.key}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={cn(
                        "w-full justify-between rounded-xl border-0",
                        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
                        "hover:bg-white dark:hover:bg-slate-800 hover:shadow-md",
                        "text-slate-700 dark:text-slate-300 font-medium",
                        "transition-all duration-300 hover:scale-105"
                      )}
                    >
                      <span className="text-xs lg:text-sm">{filter.label}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl">
                    {filter.options.map((option) => (
                      <DropdownMenuItem 
                        key={option}
                        className="rounded-xl mx-2 my-1 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mt-4 lg:mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Active Filters
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>
              {activeFilters.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveFilters([])}
                  className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 px-2 py-1 h-auto rounded-lg"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {activeFilters.map((filter) => (
                <Card
                  key={filter}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 border rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md group",
                    getFilterChipStyle(filter)
                  )}
                >
                  <span className="text-sm font-medium">{filter}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(filter)}
                    className="h-4 w-4 p-0 rounded-full hover:bg-current/20 opacity-60 hover:opacity-100 transition-all duration-200"
                    aria-label={`Remove ${filter} filter`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filter Summary Stats */}
        <div className="mt-4 lg:mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span>
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Rate trend data filtered by selected criteria
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span>Updated 8 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
