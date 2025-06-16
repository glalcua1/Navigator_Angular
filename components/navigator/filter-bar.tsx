"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Settings, ChevronDown, Sparkles, Globe, Calendar as CalendarIcon } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"



/**
 * Available date range options with historical and future periods
 */
const dateRangeOptions = [
  // Historical periods
  { value: "7d", label: "Last 7 Days", category: "historical" },
  { value: "14d", label: "Last 14 Days", category: "historical" },
  { value: "30d", label: "Last 30 Days", category: "historical" },
  
  // Future periods
  { value: "next-7d", label: "Next 7 Days", category: "future" },
  { value: "next-14d", label: "Next 14 Days", category: "future" },
  { value: "next-30d", label: "Next 30 Days", category: "future" },
  
  // Extended options
  { value: "90d", label: "Last 90 Days", category: "historical" },
  { value: "custom", label: "Custom Range", category: "other" },
]

/**
 * Available market options
 */
const marketOptions = [
  { value: "all", label: "All Markets" },
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
  { value: "business", label: "Business Travel" },
  { value: "leisure", label: "Leisure Travel" },
]

/**
 * Props interface for FilterBar component
 */
interface FilterBarProps {
  /** Callback function when more filters button is clicked */
  onMoreFiltersClick: () => void
}

/**
 * Enhanced FilterBar Component with modern glassmorphism design
 * 
 * Displays the main filter controls for the dashboard with sophisticated styling,
 * glassmorphism effects, and improved user experience patterns.
 * 
 * Features:
 * - Glassmorphism design with backdrop blur effects
 * - Enhanced select components with modern styling
 * - Sophisticated animations and micro-interactions
 * - Active filter badges with gradient styling
 * - Responsive layout with mobile-first approach
 * - Advanced visual hierarchy and typography
 * 
 * @param {FilterBarProps} props - Component props
 * @returns {JSX.Element} Modern filter bar with glassmorphism effects
 * 
 * @example
 * ```tsx
 * <FilterBar onMoreFiltersClick={() => setFilterOpen(true)} />
 * ```
 * 
 * @author Dashboard Team
 * @since 2.0.0
 */
export function FilterBar({ onMoreFiltersClick }: FilterBarProps): JSX.Element {
  const [selectedDateRange, setSelectedDateRange] = useState<string>("30d")
  const [selectedMarket, setSelectedMarket] = useState<string>("all")

  /**
   * Handle date range selection
   */
  const handleDateRangeChange = useCallback((value: string) => {
    setSelectedDateRange(value)
  }, [])

  /**
   * Handle market selection
   */
  const handleMarketChange = useCallback((value: string) => {
    setSelectedMarket(value)
  }, [])

  /**
   * Get active filters count for badge display
   */
  const getActiveFiltersCount = (): number => {
    let count = 0
    if (selectedMarket !== "all") count++
    if (selectedDateRange !== "30d") count++
    return count
  }

  return (
    <div className="w-full relative">
      {/* Enhanced background with improved glassmorphism for sticky behavior */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/95 to-white/98 dark:from-slate-900/98 dark:via-slate-800/95 dark:to-slate-900/98 backdrop-blur-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1800FF]/5 via-transparent to-purple-50/10 dark:from-[#1800FF]/10 dark:via-transparent dark:to-purple-950/5"></div>
      
      <div className="relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          {/* Main filters section - Enhanced layout without property selector */}
          <div className="flex flex-1 items-center gap-4">
            {/* Enhanced Date Range Filter - Wider and more prominent */}
            <div className="flex-1 max-w-sm">
              <Select value={selectedDateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="h-11 rounded-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#1800FF]/10 to-[#1800FF]/20 dark:from-[#1800FF]/20 dark:to-[#1800FF]/30">
                      <CalendarIcon className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
                    </div>
                    <div className="flex-1 text-left">
                      <SelectValue className="font-semibold text-slate-900 dark:text-slate-100" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl w-64">
                  {/* Historical Options */}
                  <div className="px-3 py-2 border-b border-slate-200/50 dark:border-slate-600/50">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Historical
                    </p>
                  </div>
                  {dateRangeOptions.filter(option => option.category === "historical").map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="rounded-lg mx-2 my-1 p-3 focus:bg-gradient-to-r focus:from-[#1800FF]/10 focus:to-[#1800FF]/20 dark:focus:from-[#1800FF]/20 dark:focus:to-[#1800FF]/30 hover:bg-gradient-to-r hover:from-[#1800FF]/5 hover:to-[#1800FF]/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                  
                  {/* Future Options */}
                  <div className="px-3 py-2 mt-2 border-t border-b border-slate-200/50 dark:border-slate-600/50">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Future
                    </p>
                  </div>
                  {dateRangeOptions.filter(option => option.category === "future").map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="rounded-lg mx-2 my-1 p-3 focus:bg-gradient-to-r focus:from-emerald-50 focus:to-green-50 dark:focus:from-emerald-950/50 dark:focus:to-green-950/50 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-green-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                  
                  {/* Other Options */}
                  {dateRangeOptions.filter(option => option.category === "other").length > 0 && (
                    <>
                      <div className="px-3 py-2 mt-2 border-t border-slate-200/50 dark:border-slate-600/50">
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          Other
                        </p>
                      </div>
                      {dateRangeOptions.filter(option => option.category === "other").map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="rounded-lg mx-2 my-1 p-3 focus:bg-gradient-to-r focus:from-purple-50 focus:to-violet-50 dark:focus:from-purple-950/50 dark:focus:to-violet-950/50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-violet-50/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Market Filter */}
            <div className="flex-1 max-w-xs">
              <Select value={selectedMarket} onValueChange={handleMarketChange}>
                <SelectTrigger className="h-11 rounded-xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-xl">
                  {marketOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="rounded-lg m-1 focus:bg-gradient-to-r focus:from-purple-50 focus:to-violet-50 dark:focus:from-purple-950/50 dark:focus:to-violet-950/50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right section - More filters button with enhanced styling */}
          <div className="flex items-center gap-3">
            {getActiveFiltersCount() > 0 && (
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg animate-pulse-glow"
              >
                {getActiveFiltersCount()} active
              </Badge>
            )}
            
            <Button
              onClick={onMoreFiltersClick}
              variant="outline"
              size="default"
              className="h-10 px-4 rounded-xl border-0 bg-gradient-to-r from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group btn-modern"
              aria-label="Open advanced filters"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-gradient-to-br from-purple-500/10 to-violet-500/20">
                  <Settings className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span className="font-semibold">More Filters</span>
                <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
              </div>
            </Button>
          </div>
        </div>


      </div>
    </div>
  )
}
