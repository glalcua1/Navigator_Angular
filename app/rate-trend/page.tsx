"use client"
import { useState } from "react"
import { RateTrendCalendar } from "@/components/navigator/rate-trend-calendar"
import { RateTrendFilters } from "@/components/navigator/rate-trend-filters"
import { RateTrendHeader } from "@/components/navigator/rate-trend-header"
import { TrendingUp } from "lucide-react"

/**
 * Rate Trend Page with Enhanced Visual Theme
 * 
 * Features modern glassmorphism design consistent with the overview page,
 * enhanced gradients, and sophisticated visual hierarchy.
 * 
 * @returns {JSX.Element} Enhanced rate trend page with unified theme
 */
export default function RateTrendPage() {
  const [currentView, setCurrentView] = useState<"calendar" | "chart" | "table">("calendar")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Main content with enhanced spacing and backdrop */}
      <div className="relative space-y-6 sm:space-y-8" role="main" aria-label="Rate Trend Dashboard">
        {/* Filter bar section */}
        <div className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/30 dark:border-slate-700/30 transition-all duration-300">
          <div className="relative">
            <RateTrendFilters />
          </div>
        </div>
        
        {/* Enhanced page header with gradient text */}
        <header className="relative px-4 sm:px-6 lg:px-8 pt-2 pb-3 text-left">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#1800FF]/5 via-[#1800FF]/10 to-emerald-500/5 rounded-xl blur-xl"></div>
          <div className="relative max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1">
              <span className="bg-gradient-to-r from-slate-900 via-[#1800FF] to-emerald-800 dark:from-slate-100 dark:via-[#1800FF] dark:to-emerald-300 bg-clip-text text-transparent">
                Rate Trends & Analytics
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Advanced rate analysis with
              <span className="text-[#1800FF] dark:text-[#1800FF] font-semibold"> competitive insights</span>,
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> pricing optimization</span>, and
              <span className="text-[#1800FF] dark:text-[#1800FF] font-semibold"> market intelligence</span>
            </p>
          </div>
        </header>

        {/* Enhanced Header Section */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="absolute -inset-6 bg-gradient-to-r from-[#1800FF]/5 to-emerald-500/5 rounded-3xl blur-2xl"></div>
          <div className="relative">
            <RateTrendHeader currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </div>
        
        {/* Enhanced Main Content Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-16">
          <div className="absolute -inset-6 bg-gradient-to-r from-[#1800FF]/3 to-emerald-500/3 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative">
            <RateTrendCalendar currentView={currentView} />
          </div>
        </div>
      </div>
    </div>
  )
}
