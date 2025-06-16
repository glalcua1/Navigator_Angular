"use client"
import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, Activity, Star, ArrowUp, ArrowDown, Minus, Crown, Sparkles } from "lucide-react"
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

// Random hotel names for the chart lines
const randomHotelNames = [
  "Azure Sands Resort",
  "Coral Reef Inn", 
  "Ocean Breeze Hotel",
  "Palm Grove Suites",
  "Sunset Bay Villas",
  "Starfish Retreat",
  "Lagoon Paradise",
]

// Enhanced data with more variation for better visual trends
const hotelRatesData = [
  {
    date: "7 Jun 2025",
    shortDate: "7 Jun",
    [randomHotelNames[0]]: 2100,
    [randomHotelNames[1]]: 1580,
    [randomHotelNames[2]]: 1650,
    [randomHotelNames[3]]: 1880,
    [randomHotelNames[4]]: 2136,
    [randomHotelNames[5]]: 1920,
    [randomHotelNames[6]]: 1750,
  },
  {
    date: "14 Jun 2025",
    shortDate: "14 Jun",
    [randomHotelNames[0]]: 2136,
    [randomHotelNames[1]]: 1620,
    [randomHotelNames[2]]: 1680,
    [randomHotelNames[3]]: 1920,
    [randomHotelNames[4]]: 2200,
    [randomHotelNames[5]]: 1960,
    [randomHotelNames[6]]: 1780,
  },
  {
    date: "21 Jun 2025",
    shortDate: "21 Jun",
    [randomHotelNames[0]]: 2200,
    [randomHotelNames[1]]: 1650,
    [randomHotelNames[2]]: 1720,
    [randomHotelNames[3]]: 1960,
    [randomHotelNames[4]]: 2280,
    [randomHotelNames[5]]: 2000,
    [randomHotelNames[6]]: 1820,
  },
  {
    date: "28 Jun 2025",
    shortDate: "28 Jun",
    [randomHotelNames[0]]: 1880,
    [randomHotelNames[1]]: 1590,
    [randomHotelNames[2]]: 1630,
    [randomHotelNames[3]]: 1720,
    [randomHotelNames[4]]: 2150,
    [randomHotelNames[5]]: 1850,
    [randomHotelNames[6]]: 1720,
  },
  {
    date: "5 Jul 2025",
    shortDate: "5 Jul",
    [randomHotelNames[0]]: 1950,
    [randomHotelNames[1]]: 1610,
    [randomHotelNames[2]]: 1660,
    [randomHotelNames[3]]: 1780,
    [randomHotelNames[4]]: 2180,
    [randomHotelNames[5]]: 1890,
    [randomHotelNames[6]]: 1760,
  },
  {
    date: "12 Jul 2025",
    shortDate: "12 Jul",
    [randomHotelNames[0]]: 2050,
    [randomHotelNames[1]]: 1640,
    [randomHotelNames[2]]: 1700,
    [randomHotelNames[3]]: 1840,
    [randomHotelNames[4]]: 2250,
    [randomHotelNames[5]]: 1930,
    [randomHotelNames[6]]: 1800,
  },
]

// Enhanced Channel Performance data with more realistic entries
const channelPerformanceTableData = [
  { channel: "Booking.com", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "28%", bookings: 145, trend: "up" },
  { channel: "Expedia", yourRate: 2050.0, lowestCompetitor: 1580.0, marketShare: "22%", bookings: 98, trend: "down" },
  { channel: "Agoda", yourRate: 2080.0, lowestCompetitor: 1580.0, marketShare: "18%", bookings: 76, trend: "up" },
  { channel: "Direct Website", yourRate: 1950.0, lowestCompetitor: 1580.0, marketShare: "15%", bookings: 89, trend: "stable" },
  { channel: "Hotels.com", yourRate: 2120.0, lowestCompetitor: 1580.0, marketShare: "8%", bookings: 34, trend: "up" },
  { channel: "Kayak", yourRate: 2100.0, lowestCompetitor: 1580.0, marketShare: "4%", bookings: 23, trend: "down" },
  { channel: "Priceline", yourRate: 2090.0, lowestCompetitor: 1580.0, marketShare: "3%", bookings: 18, trend: "stable" },
  { channel: "Orbitz", yourRate: 2110.0, lowestCompetitor: 1580.0, marketShare: "2%", bookings: 12, trend: "up" },
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

    // Sort competitors by price to show competitive positioning
    const sortedData = payload.sort((a: any, b: any) => b.value - a.value)
    const pricePosition = sortedData.findIndex((item: any) => item.name === hoveredHotelName) + 1

    return (
      <div className="fixed z-[10000] pointer-events-none" style={{
        left: coordinate?.x ? Math.min(coordinate.x + 10, window.innerWidth - 400) : 0,
        top: coordinate?.y ? Math.max(20, coordinate.y - 200) : 0,
        transform: coordinate?.x && coordinate.x > window.innerWidth - 400 ? 'translateX(-100%)' : 'none'
      }}>
        <div className="relative overflow-hidden rounded-2xl border-0 shadow-2xl backdrop-blur-xl bg-white/98 dark:bg-slate-900/98 p-3 w-[360px] max-w-[90vw]">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/98 to-white/95 dark:from-slate-900/95 dark:via-slate-800/98 dark:to-slate-900/95 backdrop-blur-xl"></div>
          
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/30 via-[#1800FF]/20 to-[#1800FF]/30 dark:from-[#1800FF]/40 dark:via-[#1800FF]/30 dark:to-[#1800FF]/40">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/95 via-white/98 to-white/95 dark:from-slate-900/95 dark:via-slate-800/98 dark:to-slate-900/95"></div>
          </div>

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
        {/* Enhanced Tab List with Modern Glassmorphism Design */}
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-white/90 via-white/95 to-white/90 dark:from-slate-800/90 dark:via-slate-700/90 dark:to-slate-800/90 backdrop-blur-sm p-1.5 rounded-2xl h-auto border border-[#1800FF]/20 dark:border-[#1800FF]/30 shadow-lg mb-4 flex-shrink-0">
          <TabsTrigger
            value="performance"
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm group",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/90 data-[state=active]:shadow-lg data-[state=active]:text-blue-600",
              "dark:data-[state=active]:from-slate-800 dark:data-[state=active]:to-slate-700 dark:data-[state=active]:text-blue-400",
              "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
            )}
          >
            <div className="p-1 rounded-lg bg-gradient-to-br from-[#1800FF]/10 to-[#1800FF]/20 group-data-[state=active]:from-[#1800FF]/15 group-data-[state=active]:to-[#1800FF]/25">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline">Performance</span>
            <span className="sm:hidden">Perf</span>
          </TabsTrigger>
          <TabsTrigger
            value="rates"
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm group",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-white/90 data-[state=active]:shadow-lg data-[state=active]:text-[#1800FF]",
              "dark:data-[state=active]:from-slate-800 dark:data-[state=active]:to-slate-700 dark:data-[state=active]:text-[#1800FF]",
              "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
            )}
          >
            <div className="p-1 rounded-lg bg-gradient-to-br from-[#1800FF]/10 to-[#1800FF]/20 group-data-[state=active]:from-[#1800FF]/15 group-data-[state=active]:to-[#1800FF]/25">
              <Activity className="h-4 w-4" />
            </div>
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

            {/* Top accent gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-[#1800FF]/80 to-[#1800FF]"></div>

            <div className="relative h-full p-4 sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
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
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
