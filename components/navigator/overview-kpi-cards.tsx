"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ShieldCheck, Users, CalendarDays, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * KPI data structure definition with enhanced properties
 * @interface KPIData
 */
interface KPIData {
  title: string
  value: string
  subValue: string
  icon: any
  iconBgClass: string
  iconTextClass: string
  badgeText: string | null
  badgeType: "good" | "high" | "default"
  trend: "up" | "down" | "stable"
  trendValue: string
  bgGradient: string
  borderGradient: string
}

/**
 * Enhanced KPI data with modern visual indicators
 * Contains performance metrics with comprehensive visual styling
 */
const kpiData: KPIData[] = [
  {
    title: "Average Rate",
    value: "$195",
    subValue: "vs last period",
    trendValue: "+5.2%",
    icon: TrendingUp,
    iconBgClass: "bg-gradient-to-br from-blue-500/10 to-cyan-500/20 dark:from-blue-400/20 dark:to-cyan-400/30",
    iconTextClass: "text-blue-600 dark:text-blue-400",
    badgeText: "Good",
    badgeType: "good" as const,
    trend: "up" as const,
    bgGradient: "from-blue-50/80 via-white to-cyan-50/40 dark:from-blue-950/40 dark:via-slate-900 dark:to-cyan-950/30",
    borderGradient: "from-blue-200/50 via-cyan-200/30 to-blue-200/50 dark:from-blue-800/30 dark:via-cyan-800/20 dark:to-blue-800/30"
  },
  {
    title: "Parity Status", 
    value: "92%",
    subValue: "vs last period",
    trendValue: "-2.1%",
    icon: ShieldCheck,
    iconBgClass: "bg-gradient-to-br from-emerald-500/10 to-green-500/20 dark:from-emerald-400/20 dark:to-green-400/30",
    iconTextClass: "text-emerald-600 dark:text-emerald-400",
    badgeText: null,
    badgeType: "default" as const,
    trend: "down" as const,
    bgGradient: "from-emerald-50/80 via-white to-green-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-green-950/30",
    borderGradient: "from-emerald-200/50 via-green-200/30 to-emerald-200/50 dark:from-emerald-800/30 dark:via-green-800/20 dark:to-emerald-800/30"
  },
  {
    title: "Market Position",
    value: "#2",
    subValue: "of 15 competitors",
    trendValue: "0",
    icon: Users,
    iconBgClass: "bg-gradient-to-br from-purple-500/10 to-violet-500/20 dark:from-purple-400/20 dark:to-violet-400/30", 
    iconTextClass: "text-purple-600 dark:text-purple-400",
    badgeText: null,
    badgeType: "default" as const,
    trend: "stable" as const,
    bgGradient: "from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30",
    borderGradient: "from-purple-200/50 via-violet-200/30 to-purple-200/50 dark:from-purple-800/30 dark:via-violet-800/20 dark:to-purple-800/30"
  },
  {
    title: "Event Impact",
    value: "Conference Week", 
    subValue: "3 major events nearby",
    trendValue: "+15%",
    icon: CalendarDays,
    iconBgClass: "bg-gradient-to-br from-amber-500/10 to-orange-500/20 dark:from-amber-400/20 dark:to-orange-400/30",
    iconTextClass: "text-amber-600 dark:text-amber-400",
    badgeText: "High",
    badgeType: "high" as const,
    trend: "up" as const,
    bgGradient: "from-amber-50/80 via-white to-orange-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30",
    borderGradient: "from-amber-200/50 via-orange-200/30 to-amber-200/50 dark:from-amber-800/30 dark:via-orange-800/20 dark:to-amber-800/30"
  },
]

/**
 * Enhanced OverviewKpiCards Component
 * 
 * Displays key performance indicator cards with modern glassmorphism design.
 * Each card features gradient backgrounds, trend indicators, and sophisticated animations.
 * 
 * Features:
 * - Glassmorphism design with backdrop blur effects
 * - Enhanced gradient backgrounds and borders
 * - Trend indicators with directional arrows
 * - Sophisticated hover animations and micro-interactions
 * - Modern typography and improved visual hierarchy
 * - Accessibility-compliant design patterns
 * 
 * @returns {JSX.Element} Enhanced grid of modern KPI cards
 * 
 * @example
 * ```tsx
 * <OverviewKpiCards />
 * ```
 * 
 * @author Dashboard Team
 * @since 2.0.0
 */
export function OverviewKpiCards(): JSX.Element {
  /**
   * Enhanced badge styling with modern gradients
   */
  const badgeClasses = {
    good: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/25",
    high: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg shadow-red-500/25", 
    default: "bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-500"
  }

  /**
   * Get trend icon and styling based on trend direction
   */
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
      case "down": 
        return <ArrowDown className="h-3 w-3 text-red-500 dark:text-red-400" />
      case "stable":
        return <Minus className="h-3 w-3 text-slate-500 dark:text-slate-400" />
    }
  }

  /**
   * Get trend value styling based on trend direction
   */
  const getTrendValueClass = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-emerald-600 dark:text-emerald-400"
      case "down":
        return "text-red-600 dark:text-red-400" 
      case "stable":
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="w-full" role="region" aria-label="Key Performance Indicators">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card
            key={`kpi-${index}-${kpi.title}`}
            className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
            role="article"
            aria-label={`${kpi.title}: ${kpi.value}`}
          >
            {/* Glassmorphism background with gradients */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} backdrop-blur-sm`}></div>
            
            {/* Animated gradient border */}
            <div className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r ${kpi.borderGradient}`}>
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-slate-900/90 dark:via-slate-800/95 dark:to-slate-900/90"></div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"></div>

            <CardContent className="relative p-6 flex flex-col h-full">
              {/* Header with icon, title and badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/30 dark:border-slate-700/30", kpi.iconBgClass)}>
                    <kpi.icon className={cn("h-5 w-5", kpi.iconTextClass)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {kpi.title}
                    </p>
                    {kpi.badgeText && (
                      <Badge
                        className={cn(
                          "text-xs font-bold px-2 py-1 rounded-lg",
                          badgeClasses[kpi.badgeType],
                        )}
                        aria-label={`Status: ${kpi.badgeText}`}
                      >
                        {kpi.badgeText}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Main value with enhanced typography */}
              <div className="flex-1 flex flex-col justify-center mb-4">
                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {kpi.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {kpi.subValue}
                </p>
              </div>

              {/* Trend indicator with modern styling */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(kpi.trend)}
                    <span className={cn("text-sm font-bold", getTrendValueClass(kpi.trend))}>
                      {kpi.trendValue}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  vs last week
                </div>
              </div>

              {/* Floating accent dot */}
              <div className={cn("absolute top-4 right-4 w-2 h-2 rounded-full opacity-60", kpi.iconBgClass)}></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
