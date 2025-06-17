"use client"
import React, { useState } from "react"
import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Area,
  AreaChart,
  Scatter,
  ComposedChart,
  ReferenceLine
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Activity, Star, ArrowUp, ArrowDown, Minus, Crown, Sparkles, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Enhanced color palette for chart lines
 * Using vibrant, contrasting colors that work in both light and dark modes
 */
const chartColors = [
  "#3b82f6", // Blue
  "#ef4444", // Red  
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
]

// Hotel names for the chart lines - Your hotel is first
const randomHotelNames = [
  "Dubai Hotel - 5 Star", // Your hotel (matches header selector)
  "Coral Reef Inn", 
  "Ocean Breeze Hotel",
  "Palm Grove Suites",
  "Sunset Bay Villas",
  "Starfish Retreat",
]

// Events data for plotting on the chart
const eventsData = [
  {
    date: "14 Jun 2025",
    eventName: "Business Summit",
    type: "conference",
    impact: "medium",
    description: "Regional business conference affecting demand",
    color: "#10b981" // emerald
  },
  {
    date: "5 Jul 2025", 
    eventName: "Tech Conference",
    type: "conference",
    impact: "high",
    description: "Major tech conference - high demand expected",
    color: "#ef4444" // red
  },
  {
    date: "12 Jul 2025",
    eventName: "Trade Exhibition", 
    type: "exhibition",
    impact: "medium",
    description: "International trade exhibition",
    color: "#f59e0b" // amber
  }
]

// Helper function to get event for a specific date
const getEventForDate = (date: string) => {
  return eventsData.find(event => event.date === date)
}

// Realistic hotel data showing your hotel's pricing challenges
const hotelRatesData = [
  {
    date: "7 Jun 2025",
    shortDate: "7 Jun",
    [randomHotelNames[0]]: 2100, // Your hotel - consistently high
    [randomHotelNames[1]]: 1580, // Lowest competitor
    [randomHotelNames[2]]: 1650,
    [randomHotelNames[3]]: 1880,
    [randomHotelNames[4]]: 1920,
    [randomHotelNames[5]]: 1740,
    event: null
  },
  {
    date: "14 Jun 2025",
    shortDate: "14 Jun",
    [randomHotelNames[0]]: 2100, // Your hotel - stable high price
    [randomHotelNames[1]]: 1580, // Consistent low competitor
    [randomHotelNames[2]]: 1680,
    [randomHotelNames[3]]: 1900,
    [randomHotelNames[4]]: 1950,
    [randomHotelNames[5]]: 1780,
    event: getEventForDate("14 Jun 2025")
  },
  {
    date: "21 Jun 2025",
    shortDate: "21 Jun",
    [randomHotelNames[0]]: 2100, // Your hotel - maintaining high rate
    [randomHotelNames[1]]: 1580, // Competitor staying low
    [randomHotelNames[2]]: 1720,
    [randomHotelNames[3]]: 1920,
    [randomHotelNames[4]]: 1980,
    [randomHotelNames[5]]: 1820,
    event: null
  },
  {
    date: "28 Jun 2025",
    shortDate: "28 Jun",
    [randomHotelNames[0]]: 2100, // Your hotel - steady pricing
    [randomHotelNames[1]]: 1580, // Low competitor consistent
    [randomHotelNames[2]]: 1700,
    [randomHotelNames[3]]: 1890,
    [randomHotelNames[4]]: 1960,
    [randomHotelNames[5]]: 1800,
    event: null
  },
  {
    date: "5 Jul 2025",
    shortDate: "5 Jul",
    [randomHotelNames[0]]: 2100, // Your hotel - needs adjustment
    [randomHotelNames[1]]: 1580, // Consistent low rate
    [randomHotelNames[2]]: 1710,
    [randomHotelNames[3]]: 1910,
    [randomHotelNames[4]]: 1970,
    [randomHotelNames[5]]: 1810,
    event: getEventForDate("5 Jul 2025")
  },
  {
    date: "12 Jul 2025",
    shortDate: "12 Jul",
    [randomHotelNames[0]]: 2100, // Your hotel - current rate
    [randomHotelNames[1]]: 1580, // Lowest market rate
    [randomHotelNames[2]]: 1720,
    [randomHotelNames[3]]: 1920,
    [randomHotelNames[4]]: 1980,
    [randomHotelNames[5]]: 1820,
    event: getEventForDate("12 Jul 2025")
  },
]

// Enhanced Channel Performance data with consistent parity issues
const channelPerformanceTableData = [
  { channel: "Booking.com", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "24%", bookings: 132, trend: "down" },
  { channel: "Expedia", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "19%", bookings: 87, trend: "down" },
  { channel: "Agoda", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "16%", bookings: 68, trend: "down" },
  { channel: "Direct Website", yourRate: 1950.0, lowestCompetitor: 1580.0, marketShare: "18%", bookings: 94, trend: "stable" },
  { channel: "Hotels.com", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "12%", bookings: 45, trend: "down" },
  { channel: "Kayak", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "6%", bookings: 28, trend: "down" },
  { channel: "Priceline", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "3%", bookings: 18, trend: "stable" },
  { channel: "Orbitz", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "2%", bookings: 12, trend: "down" },
]

// Helper function to determine parity status and styling
const getParityStatus = (yourRate: number, lowestCompetitor: number) => {
  const variance = yourRate - lowestCompetitor
  const percentageVariance = (variance / lowestCompetitor) * 100

  if (Math.abs(variance) < 50) {
    return {
      text: "In Parity",
      className: "text-emerald-600 dark:text-emerald-400",
      varianceText: `$${variance.toFixed(0)}`,
      percentageText: `${percentageVariance >= 0 ? "+" : ""}${percentageVariance.toFixed(1)}%`,
      badgeColor: "success",
      icon: <Minus className="h-3 w-3" />
    }
  } else if (variance > 0) {
    return {
      text: "Out of Parity (Higher)",
      className: "text-red-600 dark:text-red-400",
      varianceText: `+$${variance.toFixed(0)}`,
      percentageText: `+${percentageVariance.toFixed(1)}%`,
      badgeColor: "destructive",
      icon: <ArrowUp className="h-3 w-3" />
    }
  } else {
    return {
      text: "Out of Parity (Lower)",
      className: "text-amber-600 dark:text-amber-400",
      varianceText: `-$${Math.abs(variance).toFixed(0)}`,
      percentageText: `${percentageVariance.toFixed(1)}%`,
      badgeColor: "warning",
      icon: <ArrowDown className="h-3 w-3" />
    }
  }
}

/**
 * Enhanced custom tooltip with better formatting and information
 */
const CustomTooltip = ({ active, payload, label, coordinate }: any) => {
  if (active && payload && payload.length) {
    const hoveredHotelName = payload[0].name
    const hoveredHotelPrice = payload[0].value

    // Get event data for this date
    const currentDateData = hotelRatesData.find(data => data.shortDate === label || data.date === label)
    const eventInfo = currentDateData?.event

    // Sort competitors by price to show competitive positioning
    const sortedData = payload.sort((a: any, b: any) => b.value - a.value)
    const pricePosition = sortedData.findIndex((item: any) => item.name === hoveredHotelName) + 1

    return (
      <div className="fixed z-[10000] pointer-events-none" style={{
        left: coordinate?.x ? Math.min(coordinate.x + 10, window.innerWidth - 400) : 0,
        top: coordinate?.y ? Math.max(20, coordinate.y - 200) : 0,
        transform: coordinate?.x && coordinate.x > window.innerWidth - 400 ? 'translateX(-100%)' : 'none'
      }}>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl backdrop-blur-xl bg-white dark:bg-slate-900 p-3 w-[360px] max-w-[90vw]">
          {/* Simplified background */}
          <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl"></div>

          <div className="relative">
            {/* Enhanced Header with Rank Information */}
            <div className="flex items-center justify-between mb-3 p-2.5 rounded-xl bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 dark:from-[#1800FF]/10 dark:to-[#1800FF]/15 border border-[#1800FF]/20 dark:border-[#1800FF]/30">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" 
                  style={{ backgroundColor: payload[0].stroke }}
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">{hoveredHotelName}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Crown className="h-3 w-3 text-amber-500" />
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                      #{pricePosition}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Market Rank</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900 dark:text-slate-100 bg-gradient-to-r from-[#1800FF] to-[#1800FF]/80 bg-clip-text text-transparent">
                    ${hoveredHotelPrice?.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rate</p>
                </div>
              </div>
            </div>

            {/* Market Comparison - Compact Layout */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1.5">
                <BarChart3 className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                <p className="font-bold text-slate-700 dark:text-slate-300 text-xs">Market Overview</p>
              </div>
              <div className="max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                {sortedData.slice(0, 6).map((item: any, index: number) => (
                  <div 
                    key={item.name} 
                    className={cn(
                      "flex justify-between items-center text-xs py-1 px-2 rounded-lg transition-all duration-200 mb-0.5",
                      item.name === hoveredHotelName 
                        ? 'bg-gradient-to-r from-[#1800FF]/10 to-[#1800FF]/15 dark:from-[#1800FF]/15 dark:to-[#1800FF]/20 border border-[#1800FF]/30 dark:border-[#1800FF]/40 shadow-sm' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-4">
                        #{index + 1}
                      </span>
                      <span 
                        className="w-1.5 h-1.5 rounded-full shadow-sm flex-shrink-0" 
                        style={{ backgroundColor: item.stroke }}
                      />
                      <span className={cn(
                        "font-medium truncate text-xs",
                        item.name === hoveredHotelName ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'
                      )}>
                        {item.name}
                      </span>
                      {index === 0 && <Crown className="h-2 w-2 text-amber-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={cn(
                        "font-bold text-xs",
                        item.name === hoveredHotelName ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'
                      )}>
                        ${item.value?.toLocaleString()}
                      </span>
                      {item.name === hoveredHotelName && <Sparkles className="h-2 w-2 text-[#1800FF] animate-pulse" />}
                    </div>
                  </div>
                ))}
                {sortedData.length > 6 && (
                  <div className="text-center py-0.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      +{sortedData.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Information - Show when event exists */}
            {eventInfo && (
              <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-xs">Event Impact</p>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50/50 to-white/30 dark:from-slate-800/50 dark:to-slate-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: eventInfo.color }}
                    />
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {eventInfo.eventName}
                    </span>
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-md font-medium",
                      eventInfo.impact === 'high' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : eventInfo.impact === 'medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    )}>
                      {eventInfo.impact} impact
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {eventInfo.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  return null
}

/**
 * Enhanced Rate Trends Chart Component with modern glassmorphism design
 * 
 * Displays rate comparison charts and channel performance data with sophisticated styling,
 * glassmorphism effects, and enhanced user experience patterns.
 * 
 * Features:
 * - Glassmorphism design with backdrop blur effects
 * - Enhanced tab design with icons and animations
 * - Modern tooltip with competitive positioning
 * - Sophisticated table styling with featured rows
 * - Advanced visual hierarchy and typography
 * - Responsive design and accessibility compliance
 * 
 * @returns {JSX.Element} The enhanced rate trends chart component
 */
export function RateTrendsChart(): JSX.Element {
  // Chart type state for Rate Trends toggle
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')

  // Separate Direct Website data from the rest
  const directWebsiteData = channelPerformanceTableData.find((item) => item.channel === "Direct Website")
  const otherChannelData = channelPerformanceTableData.filter((item) => item.channel !== "Direct Website")

  /**
   * Get trend icon based on trend direction
   */
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500 dark:text-red-400" />
      default:
        return <Minus className="h-3 w-3 text-slate-500 dark:text-slate-400" />
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs defaultValue="rates" className="w-full flex flex-col h-full">
        {/* Switch-style Tab List */}
        <TabsList className="inline-flex w-auto bg-transparent p-0 h-auto mb-4 flex-shrink-0 justify-start">
          <TabsTrigger
            value="performance"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 font-semibold text-sm group border-0",
              "data-[state=active]:bg-[#1800FF] data-[state=active]:text-white",
              "data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600",
              "dark:data-[state=inactive]:bg-slate-800 dark:data-[state=inactive]:text-slate-400",
              "hover:bg-[#1800FF]/10 dark:hover:bg-[#1800FF]/20"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
            <span className="sm:hidden">Perf</span>
          </TabsTrigger>
          <TabsTrigger
            value="rates"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 font-semibold text-sm group border-0",
              "data-[state=active]:bg-[#1800FF] data-[state=active]:text-white",
              "data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600",
              "dark:data-[state=inactive]:bg-slate-800 dark:data-[state=inactive]:text-slate-400",
              "hover:bg-[#1800FF]/10 dark:hover:bg-[#1800FF]/20"
            )}
          >
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Rate Trends</span>
            <span className="sm:hidden">Trends</span>
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab Content with Enhanced Styling */}
        <TabsContent value="performance" className="flex-grow overflow-hidden h-[calc(100%-80px)] data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2">
          <div className="relative overflow-hidden rounded-2xl border-0 shadow-xl h-full min-h-[350px]">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1800FF]/3 via-white to-[#1800FF]/5 dark:from-[#1800FF]/10 dark:via-slate-900 dark:to-[#1800FF]/15 backdrop-blur-sm"></div>
            
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-[#1800FF]/30 to-[#1800FF]/20 dark:from-[#1800FF]/30 dark:via-[#1800FF]/40 dark:to-[#1800FF]/30">
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/95 via-white/98 to-white/95 dark:from-slate-900/95 dark:via-slate-800/98 dark:to-slate-900/95"></div>
            </div>

            {/* Top accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-[#1800FF]/80 to-[#1800FF]"></div>

            <div className="relative h-full overflow-y-auto">
                              <Table>
                  <TableHeader className="sticky top-0 bg-gradient-to-r from-white/95 to-white/90 dark:from-slate-900/95 dark:to-slate-800/90 backdrop-blur-xl z-10 border-b border-[#1800FF]/20 dark:border-[#1800FF]/30">
                    <TableRow>
                      <TableHead className="text-slate-800 dark:text-slate-200 font-bold py-4">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
                          Channel
                        </div>
                      </TableHead>
                      <TableHead className="text-slate-800 dark:text-slate-200 font-bold">My Rate</TableHead>
                      <TableHead className="text-slate-800 dark:text-slate-200 font-bold">Competitor</TableHead>
                      <TableHead className="text-slate-800 dark:text-slate-200 font-bold">Variance</TableHead>
                      <TableHead className="text-slate-800 dark:text-slate-200 font-bold">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {/* Direct Website - Featured Row with Enhanced Styling */}
                  {directWebsiteData && (
                    <TableRow className="bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 dark:from-[#1800FF]/10 dark:to-[#1800FF]/15 border-b border-[#1800FF]/20 dark:border-[#1800FF]/30 hover:from-[#1800FF]/10 hover:to-[#1800FF]/15 dark:hover:from-[#1800FF]/15 dark:hover:to-[#1800FF]/20 transition-all duration-300">
                      <TableCell className="font-bold text-slate-900 dark:text-slate-100 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-[#1800FF]/20 to-[#1800FF]/30 dark:from-[#1800FF]/30 dark:to-[#1800FF]/40">
                            <Crown className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{directWebsiteData.channel}</span>
                              <Badge className="bg-gradient-to-r from-[#1800FF] to-[#1800FF]/80 text-white text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              Market Share: {directWebsiteData.marketShare}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-800 dark:text-slate-200">
                        <div className="text-lg">${directWebsiteData.yourRate.toLocaleString()}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{directWebsiteData.bookings} bookings</div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-300 font-medium">
                        ${directWebsiteData.lowestCompetitor.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            {getParityStatus(directWebsiteData.yourRate, directWebsiteData.lowestCompetitor).icon}
                            <span className={cn("font-bold", getParityStatus(directWebsiteData.yourRate, directWebsiteData.lowestCompetitor).className)}>
                              {getParityStatus(directWebsiteData.yourRate, directWebsiteData.lowestCompetitor).varianceText}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {getParityStatus(directWebsiteData.yourRate, directWebsiteData.lowestCompetitor).percentageText}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(directWebsiteData.trend)}
                          <Badge variant="outline" className="text-xs">
                            {directWebsiteData.trend}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* Other Channels with Enhanced Styling */}
                  {otherChannelData.map((item) => {
                    const status = getParityStatus(item.yourRate, item.lowestCompetitor)
                    return (
                      <TableRow 
                        key={item.channel} 
                        className="hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-slate-50/30 dark:hover:from-slate-800/50 dark:hover:to-slate-800/30 transition-all duration-200 border-b border-slate-200/30 dark:border-slate-700/30"
                      >
                        <TableCell className="font-semibold text-slate-800 dark:text-slate-100 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-slate-500"></div>
                            <div>
                              <div>{item.channel}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Share: {item.marketShare}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-200 font-semibold">
                          <div>${item.yourRate.toLocaleString()}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{item.bookings} bookings</div>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-300 font-medium">
                          ${item.lowestCompetitor.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              {status.icon}
                              <span className={cn("font-bold", status.className)}>
                                {status.varianceText}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {status.percentageText}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(item.trend)}
                            <Badge variant="outline" className="text-xs">
                              {item.trend}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Enhanced Rate Trends Chart with Glassmorphism */}
        <TabsContent value="rates" className="flex-grow overflow-hidden h-[calc(100%-80px)] data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2">
          <div className="relative overflow-hidden rounded-2xl border-0 shadow-xl h-full min-h-[350px]">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1800FF]/3 via-white to-[#1800FF]/5 dark:from-[#1800FF]/10 dark:via-slate-900 dark:to-[#1800FF]/15 backdrop-blur-sm"></div>
            
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-[#1800FF]/30 to-[#1800FF]/20 dark:from-[#1800FF]/30 dark:via-[#1800FF]/40 dark:to-[#1800FF]/30">
              <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/95 via-white/98 to-white/95 dark:from-slate-900/95 dark:via-slate-800/98 dark:to-slate-900/95"></div>
            </div>

            {/* Chart Type Toggle - Smart UX placement */}
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className={cn(
                    "h-8 px-3 text-xs font-medium transition-all duration-200",
                    chartType === 'line' 
                      ? "bg-[#1800FF] text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <LineChart className="h-3 w-3 mr-1" />
                  Line
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  className={cn(
                    "h-8 px-3 text-xs font-medium transition-all duration-200",
                    chartType === 'bar' 
                      ? "bg-[#1800FF] text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Bar
                </Button>
              </div>
            </div>

            <div className="relative h-full p-4 sm:p-6 pt-16 sm:pt-16">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <ComposedChart
                    data={hotelRatesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      className="dark:stroke-slate-600"
                      vertical={false}
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="shortDate"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      className="text-xs text-slate-600 dark:text-slate-400"
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                      domain={[1400, 2400]}
                      className="text-xs text-slate-600 dark:text-slate-400"
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ 
                        stroke: "#3b82f6", 
                        strokeWidth: 2, 
                        strokeDasharray: "5 5",
                        opacity: 0.8
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={50}
                      iconType="line"
                      wrapperStyle={{ 
                        paddingTop: "20px", 
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: 600
                      }}
                    />
                    
                    {/* Enhanced Line Components with Better Styling */}
                    {randomHotelNames.map((hotelName, index) => (
                      <Line
                        key={hotelName}
                        type="monotone"
                        dataKey={hotelName}
                        stroke={chartColors[index % chartColors.length]}
                        strokeWidth={3}
                        name={hotelName}
                        dot={{ 
                          fill: chartColors[index % chartColors.length], 
                          strokeWidth: 3, 
                          r: 5,
                          stroke: "#fff"
                        }}
                        activeDot={{ 
                          r: 8, 
                          stroke: chartColors[index % chartColors.length], 
                          strokeWidth: 3,
                          fill: "#fff",
                          shadow: "0 4px 8px rgba(0,0,0,0.2)"
                        }}
                        connectNulls
                        strokeDasharray={index === 0 ? "0" : index === 6 ? "8 4" : "0"}
                      />
                    ))}

                    {/* Event Markers - Add reference lines for events */}
                    {hotelRatesData.map((dataPoint, index) => 
                      dataPoint.event ? (
                        <ReferenceLine
                          key={`event-${index}`}
                          x={dataPoint.shortDate}
                          stroke={dataPoint.event.color}
                          strokeWidth={3}
                          strokeDasharray="8 4"
                          opacity={0.8}
                          label={{
                            value: `📅 ${dataPoint.event.eventName}`,
                            position: "topLeft",
                            offset: 10,
                            style: {
                              fontSize: "10px",
                              fontWeight: "600",
                              fill: dataPoint.event.color,
                              textAnchor: "start"
                            }
                          }}
                        />
                      ) : null
                    )}
                  </ComposedChart>
                ) : (
                  <ComposedChart
                    data={hotelRatesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      className="dark:stroke-slate-600"
                      vertical={false}
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="shortDate"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      className="text-xs text-slate-600 dark:text-slate-400"
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                      domain={[1400, 2400]}
                      className="text-xs text-slate-600 dark:text-slate-400"
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ 
                        fill: "rgba(59, 130, 246, 0.1)",
                        stroke: "#3b82f6", 
                        strokeWidth: 1
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={50}
                      iconType="rect"
                      wrapperStyle={{ 
                        paddingTop: "20px", 
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: 600
                      }}
                    />
                    
                    {/* Enhanced Bar Components with Better Styling */}
                    {randomHotelNames.map((hotelName, index) => (
                      <Bar
                        key={hotelName}
                        dataKey={hotelName}
                        fill={chartColors[index % chartColors.length]}
                        name={hotelName}
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                    ))}

                    {/* Event Markers for Bar Chart */}
                    {hotelRatesData.map((dataPoint, index) => 
                      dataPoint.event ? (
                        <ReferenceLine
                          key={`event-bar-${index}`}
                          x={dataPoint.shortDate}
                          stroke={dataPoint.event.color}
                          strokeWidth={3}
                          strokeDasharray="8 4"
                          opacity={0.8}
                          label={{
                            value: `📅 ${dataPoint.event.eventName}`,
                            position: "topLeft",
                            offset: 10,
                            style: {
                              fontSize: "10px",
                              fontWeight: "600",
                              fill: dataPoint.event.color,
                              textAnchor: "start"
                            }
                          }}
                        />
                      ) : null
                    )}
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
