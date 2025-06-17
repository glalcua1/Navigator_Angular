"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Area, ReferenceLine, Tooltip } from "recharts"
import { TrendingUp, BarChart3, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const chartData = [
  {
    date: "1 Jun 2025",
    shortDate: "1 Jun",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1600,
    marketDemand: 60,
    myHotelRate: 680,
    event: null
  },
  {
    date: "3 Jun 2025",
    shortDate: "3 Jun",
    medianCompRate: 2180,
    upperBound: 2350,
    lowerBound: 1580,
    marketDemand: 58,
    myHotelRate: 680,
    event: null
  },
  {
    date: "5 Jun 2025",
    shortDate: "5 Jun",
    medianCompRate: 2160,
    upperBound: 2320,
    lowerBound: 1560,
    marketDemand: 56,
    myHotelRate: 680,
    event: null
  },
  {
    date: "7 Jun 2025",
    shortDate: "7 Jun",
    medianCompRate: 2240,
    upperBound: 2420,
    lowerBound: 1640,
    marketDemand: 62,
    myHotelRate: 680,
    event: null
  },
  {
    date: "9 Jun 2025",
    shortDate: "9 Jun",
    medianCompRate: 2300,
    upperBound: 2500,
    lowerBound: 1720,
    marketDemand: 30,
    myHotelRate: 680,
    event: null
  },
  {
    date: "11 Jun 2025",
    shortDate: "11 Jun",
    medianCompRate: 2280,
    upperBound: 2480,
    lowerBound: 1700,
    marketDemand: 32,
    myHotelRate: 680,
    event: null
  },
  {
    date: "13 Jun 2025",
    shortDate: "13 Jun",
    medianCompRate: 2260,
    upperBound: 2460,
    lowerBound: 1680,
    marketDemand: 34,
    myHotelRate: 680,
    event: null
  },
  {
    date: "15 Jun 2025",
    shortDate: "15 Jun",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1620,
    marketDemand: 25,
    myHotelRate: 680,
    event: {
      eventName: "Tech Conference",
      type: "conference",
      impact: "high",
      description: "Major tech conference - high demand expected",
      color: "#ef4444"
    }
  },
  {
    date: "17 Jun 2025",
    shortDate: "17 Jun",
    medianCompRate: 2180,
    upperBound: 2380,
    lowerBound: 1600,
    marketDemand: 26,
    myHotelRate: 680,
    event: null
  },
  {
    date: "19 Jun 2025",
    shortDate: "19 Jun",
    medianCompRate: 2160,
    upperBound: 2360,
    lowerBound: 1580,
    marketDemand: 25,
    myHotelRate: 680,
    event: null
  },
  {
    date: "21 Jun 2025",
    shortDate: "21 Jun",
    medianCompRate: 2200,
    upperBound: 2400,
    lowerBound: 1620,
    marketDemand: 45,
    myHotelRate: 680,
    event: null
  },
  {
    date: "23 Jun 2025",
    shortDate: "23 Jun",
    medianCompRate: 2220,
    upperBound: 2420,
    lowerBound: 1640,
    marketDemand: 47,
    myHotelRate: 680,
    event: null
  },
  {
    date: "25 Jun 2025",
    shortDate: "25 Jun",
    medianCompRate: 2180,
    upperBound: 2380,
    lowerBound: 1600,
    marketDemand: 35,
    myHotelRate: 680,
    event: null
  },
  {
    date: "27 Jun 2025",
    shortDate: "27 Jun",
    medianCompRate: 2160,
    upperBound: 2360,
    lowerBound: 1580,
    marketDemand: 30,
    myHotelRate: 680,
    event: null
  },
  {
    date: "29 Jun 2025",
    shortDate: "29 Jun",
    medianCompRate: 2140,
    upperBound: 2340,
    lowerBound: 1560,
    marketDemand: 28,
    myHotelRate: 680,
    event: null
  },
]

/**
 * Enhanced Custom Tooltip with Professional Design
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Get event data for this date
    const currentDateData = chartData.find(data => data.shortDate === label || data.date === label)
    const eventInfo = currentDateData?.event

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-4 shadow-2xl min-w-[280px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 border border-[#1800FF]/20">
          <BarChart3 className="h-4 w-4 text-[#1800FF]" />
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{label}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Rate Analysis</p>
          </div>
        </div>

        {/* Data */}
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {entry.name === "myHotelRate" ? "Your Rate" :
                   entry.name === "medianCompRate" ? "Market Median" :
                   entry.name === "marketDemand" ? "Market Demand" :
                   entry.name === "upperBound" ? "Upper Bound" :
                   entry.name === "lowerBound" ? "Lower Bound" : entry.name}
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {entry.name === "marketDemand" ? `${entry.value}%` : `$${entry.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>

        {/* Event Information */}
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
    )
  }
  return null
}

/**
 * Enhanced Rate Trend Graph with Modern Design System
 * 
 * Features:
 * - Professional glassmorphism design with enhanced visual hierarchy
 * - Modern color palette with #1800FF primary theme
 * - Enhanced tooltips with event information
 * - Improved accessibility and responsive design
 * - Strategic use of gradients and shadows
 * 
 * @returns {JSX.Element} Enhanced rate spread chart with modern styling
 */
export function RateTrendGraph() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Enhanced Header Section */}
      <div className="flex items-start gap-3 lg:gap-4 rounded-2xl xl:rounded-3xl bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 dark:from-[#1800FF]/10 dark:to-[#1800FF]/15 p-3 sm:p-4 lg:p-6 border border-[#1800FF]/20 dark:border-[#1800FF]/30 backdrop-blur-sm">
        <div className="p-2 lg:p-3 rounded-xl xl:rounded-2xl bg-[#1800FF]/10 dark:bg-[#1800FF]/20">
          <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-[#1800FF]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            Rate Spread Analysis
          </h3>
          <p className="text-sm lg:text-base xl:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Competitive positioning with market demand correlation and event impact analysis
          </p>
        </div>
      </div>

      {/* Enhanced Card with Professional Styling */}
      <Card className="relative overflow-hidden rounded-2xl xl:rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl xl:rounded-3xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-[#1800FF]/30 to-[#1800FF]/20">
          <div className="h-full w-full rounded-2xl xl:rounded-3xl bg-white/90 dark:bg-slate-900/90"></div>
        </div>
        
        {/* Top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-[#1800FF] to-[#1800FF]"></div>
        
        {/* Enhanced glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-slate-900/60 dark:via-slate-800/40 dark:to-slate-900/20 backdrop-blur-xl rounded-2xl xl:rounded-3xl"></div>

        <CardHeader className="relative pb-2 sm:pb-4">
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-[#1800FF] to-slate-700 dark:from-slate-100 dark:via-[#1800FF] dark:to-slate-200 bg-clip-text text-transparent">
            Rate spread
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative p-4 sm:p-6 lg:p-8">
          {/* Chart container with enhanced styling */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] w-full overflow-hidden rounded-xl xl:rounded-2xl bg-gradient-to-br from-slate-50/50 to-white/30 dark:from-slate-800/30 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/30">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={chartData} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <defs>
                    <linearGradient id="rateSpreadGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
                      <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
                    </linearGradient>
                    <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(100, 116, 139, 0.6)" />
                      <stop offset="100%" stopColor="rgba(100, 116, 139, 0.2)" />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#e2e8f0" 
                    className="dark:stroke-slate-600"
                    vertical={false}
                    opacity={0.6}
                  />
                  
                  <XAxis
                    dataKey="shortDate"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tickMargin={8}
                  />
                  
                  <YAxis
                    yAxisId="price"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                    domain={[400, 2800]}
                    tickMargin={8}
                  />
                  
                  <YAxis
                    yAxisId="demand"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[20, 70]}
                    tickMargin={8}
                  />

                  {/* Rate spread area between upper and lower bounds */}
                  <Area
                    yAxisId="price"
                    dataKey="upperBound"
                    fill="url(#rateSpreadGradient)"
                    stroke="none"
                  />
                  <Area 
                    yAxisId="price" 
                    dataKey="lowerBound" 
                    fill="white" 
                    stroke="none"
                  />

                  {/* Market demand bars with enhanced styling */}
                  <Bar
                    yAxisId="demand"
                    dataKey="marketDemand"
                    fill="url(#demandGradient)"
                    radius={[4, 4, 0, 0]}
                    opacity={0.7}
                  />

                  {/* Enhanced rate lines with better styling */}
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="medianCompRate"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 3, r: 5, stroke: "#fff" }}
                    activeDot={{ r: 8, stroke: "#10b981", strokeWidth: 3, fill: "#fff" }}
                    connectNulls
                  />

                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="myHotelRate"
                    stroke="#1800FF"
                    strokeWidth={4}
                    dot={{ fill: "#1800FF", strokeWidth: 3, r: 6, stroke: "#fff" }}
                    activeDot={{ r: 10, stroke: "#1800FF", strokeWidth: 3, fill: "#fff" }}
                    connectNulls
                  />

                  {/* Event markers */}
                  {chartData.map((dataPoint, index) => 
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
                            fontSize: "11px",
                            fontWeight: "600",
                            fill: dataPoint.event.color,
                            textAnchor: "start"
                          }
                        }}
                      />
                    ) : null
                  )}

                  <Tooltip content={<CustomTooltip />} />
                  
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    iconType="line"
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: 600
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
          </div>

          {/* Enhanced insight strip */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl xl:rounded-2xl border backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-[#1800FF]/10 dark:from-blue-900/20 dark:to-[#1800FF]/20 border-blue-200/50 dark:border-blue-800/30">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs sm:text-sm lg:text-base font-medium leading-relaxed text-blue-800 dark:text-blue-200">
                <strong>Analysis Guide:</strong> The amber area shows competitive rate spread. Your hotel rate (blue) vs market median (green). Events marked with vertical lines. Market demand bars show correlation opportunities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
