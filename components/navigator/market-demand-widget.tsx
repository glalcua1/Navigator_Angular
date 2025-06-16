"use client"

import { ArrowRight, TrendingUp, Globe, DollarSign, BarChart3, Users, MapPin, Sparkles, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PriceDifferenceTable } from "./price-difference-table"
import { MyEventsHolidaysTable } from "./my-events-holidays-table"
import { cn } from "@/lib/utils"

/**
 * Market KPI data with enhanced styling
 */
const marketKpis = [
  {
    title: "Demand Index",
    value: "70",
    change: "+5%",
    changeType: "positive" as const,
    subtitle: "vs. Yesterday",
    icon: BarChart3,
    bgGradient: "from-emerald-50/80 via-white to-green-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-green-950/30",
    borderGradient: "from-emerald-200/50 via-green-200/30 to-emerald-200/50 dark:from-emerald-800/30 dark:via-green-800/20 dark:to-emerald-800/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-gradient-to-br from-emerald-500/10 to-green-500/20 dark:from-emerald-400/20 dark:to-green-400/30"
  },
  {
    title: "Top Source Markets",
    value: "5",
    change: "Countries",
    changeType: "neutral" as const,
    subtitle: "Active markets",
    icon: Globe,
    bgGradient: "from-blue-50/80 via-white to-cyan-50/40 dark:from-blue-950/40 dark:via-slate-900 dark:to-cyan-950/30",
    borderGradient: "from-blue-200/50 via-cyan-200/30 to-blue-200/50 dark:from-blue-800/30 dark:via-cyan-800/20 dark:to-blue-800/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/20 dark:from-blue-400/20 dark:to-cyan-400/30"
  },
  {
    title: "Price Difference",
    value: "--",
    change: "N/A",
    changeType: "neutral" as const,
    subtitle: "Avg vs. comp set",
    icon: DollarSign,
    bgGradient: "from-slate-50/80 via-white to-slate-50/40 dark:from-slate-950/40 dark:via-slate-900 dark:to-slate-950/30",
    borderGradient: "from-slate-200/50 via-slate-200/30 to-slate-200/50 dark:from-slate-800/30 dark:via-slate-800/20 dark:to-slate-800/30",
    iconColor: "text-slate-600 dark:text-slate-400",
    iconBg: "bg-gradient-to-br from-slate-500/10 to-slate-500/20 dark:from-slate-400/20 dark:to-slate-400/30"
  },
  {
    title: "Market ADR",
    value: "$250",
    change: "+2.1%",
    changeType: "positive" as const,
    subtitle: "vs. Yesterday",
    icon: TrendingUp,
    bgGradient: "from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30",
    borderGradient: "from-purple-200/50 via-violet-200/30 to-purple-200/50 dark:from-purple-800/30 dark:via-violet-800/20 dark:to-purple-800/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-gradient-to-br from-purple-500/10 to-violet-500/20 dark:from-purple-400/20 dark:to-violet-400/30"
  },
  {
    title: "Market RevPAR",
    value: "$180",
    change: "+3.5%",
    changeType: "positive" as const,
    subtitle: "vs. Yesterday",
    icon: Users,
    bgGradient: "from-amber-50/80 via-white to-orange-50/40 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30",
    borderGradient: "from-amber-200/50 via-orange-200/30 to-amber-200/50 dark:from-amber-800/30 dark:via-orange-800/20 dark:to-amber-800/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-gradient-to-br from-amber-500/10 to-orange-500/20 dark:from-amber-400/20 dark:to-orange-400/30"
  }
]

/**
 * Enhanced source markets data
 */
const sourceMarkets = [
  { name: "United States", percent: "30%", flag: "🇺🇸", change: "+2%" },
  { name: "United Kingdom", percent: "20%", flag: "🇬🇧", change: "+1%" },
  { name: "Germany", percent: "10%", flag: "🇩🇪", change: "0%" },
  { name: "France", percent: "5%", flag: "🇫🇷", change: "-1%" },
  { name: "Canada", percent: "5%", flag: "🇨🇦", change: "+3%" },
]

/**
 * Enhanced MarketDemandWidget Component with modern glassmorphism design
 * 
 * Displays market insights with sophisticated visual styling, glassmorphism effects,
 * and enhanced user experience patterns.
 * 
 * Features:
 * - Glassmorphism design with backdrop blur effects
 * - Enhanced gradient backgrounds and borders
 * - Modern KPI cards with trend indicators
 * - Sophisticated source market visualization
 * - Advanced hover animations and micro-interactions
 * - Improved visual hierarchy and typography
 * 
 * @returns {JSX.Element} Enhanced market demand widget
 */
export function MarketDemandWidget() {
  /**
   * Get trend icon and styling based on change type
   */
  const getTrendIcon = (changeType: "positive" | "negative" | "neutral") => {
    switch (changeType) {
      case "positive":
        return <ArrowUp className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
      case "negative":
        return <ArrowDown className="h-3 w-3 text-red-500 dark:text-red-400" />
      case "neutral":
        return <Sparkles className="h-3 w-3 text-slate-500 dark:text-slate-400" />
    }
  }

  /**
   * Get change styling based on type
   */
  const getChangeClass = (changeType: "positive" | "negative" | "neutral") => {
    switch (changeType) {
      case "positive":
        return "text-emerald-600 dark:text-emerald-400"
      case "negative":
        return "text-red-600 dark:text-red-400"
      case "neutral":
        return "text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-12 w-full">
      {/* Enhanced KPI Cards Section with glassmorphism - Simplified layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
        {marketKpis.filter(kpi => kpi.title !== "Top Source Markets").map((kpi, index) => (
          <Card
            key={kpi.title}
            className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 col-span-1"
          >
            {/* Glassmorphism background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} backdrop-blur-sm`}></div>
            
            {/* Animated gradient border */}
            <div className={`absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r ${kpi.borderGradient}`}>
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-slate-900/90 dark:via-slate-800/95 dark:to-slate-900/90"></div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm"></div>

            <CardContent className="relative p-6">
              {/* Header with icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/30 dark:border-slate-700/30", kpi.iconBg)}>
                  <kpi.icon className={cn("h-5 w-5", kpi.iconColor)} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {kpi.title}
                  </h3>
                </div>
              </div>

              {/* Main value */}
              <div className="mb-4">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 mb-1 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {kpi.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {kpi.subtitle}
                </p>
              </div>

              {/* Trend indicator */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                  {getTrendIcon(kpi.changeType)}
                  <span className={cn("text-sm font-bold", getChangeClass(kpi.changeType))}>
                    {kpi.change}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Live
                </Badge>
              </div>

              {/* Floating accent dot */}
              <div className={cn("absolute top-4 right-4 w-2 h-2 rounded-full opacity-60", kpi.iconBg)}></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Data Tables Section */}
      <div className="space-y-8 sm:space-y-10 w-full">
        <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/40 dark:from-slate-950/40 dark:via-slate-900 dark:to-slate-950/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-slate-200/50 via-slate-200/30 to-slate-200/50 dark:from-slate-800/30 dark:via-slate-800/20 dark:to-slate-800/30">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-slate-900/90 dark:via-slate-800/95 dark:to-slate-900/90"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"></div>
          
          <CardContent className="relative p-6 sm:p-8 overflow-x-auto">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/20 dark:from-emerald-400/20 dark:to-green-400/30">
                <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Price Analysis
              </h3>
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                Updated
              </Badge>
            </div>
            <PriceDifferenceTable />
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white to-violet-50/40 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30 backdrop-blur-sm"></div>
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-200/50 via-violet-200/30 to-purple-200/50 dark:from-purple-800/30 dark:via-violet-800/20 dark:to-purple-800/30">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-slate-900/90 dark:via-slate-800/95 dark:to-slate-900/90"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-violet-400 to-purple-500"></div>
          
          <CardContent className="relative p-6 sm:p-8 overflow-x-auto">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/20 dark:from-purple-400/20 dark:to-violet-400/30">
                <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Events & Holidays
              </h3>
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                Live
              </Badge>
            </div>
            <MyEventsHolidaysTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
