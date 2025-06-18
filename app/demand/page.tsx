"use client"
import React from "react"
import { CardDescription } from "@/components/ui/card"
import { DemandCalendar } from "@/components/navigator/demand-calendar"
import { DemandForecastChart } from "@/components/navigator/demand-forecast-chart"
import { DemandHeader } from "@/components/navigator/demand-header"
import { DemandSummaryCards } from "@/components/navigator/demand-summary-cards"
import { MyEventsHolidaysTable } from "@/components/navigator/my-events-holidays-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Lightbulb, Sparkles, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

/**
 * Demand Page with Enhanced Visual Theme and Collapsible Calendar
 * 
 * Features modern glassmorphism design consistent with the overview page,
 * enhanced gradients, sophisticated visual hierarchy with sidebar layout,
 * and collapsible calendar functionality.
 * 
 * @returns {JSX.Element} Enhanced demand page with unified theme and collapsible sidebar
 */
export default function DemandPage() {
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(true)

  // Initialize collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsCalendarCollapsed(window.innerWidth < 768)
    }
    
    // Set initial state
    handleResize()
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="flex h-screen overflow-hidden">
        {/* Enhanced Collapsible Sidebar Calendar */}
        <div className={`hidden md:block relative transition-all duration-300 ease-in-out ${
          isCalendarCollapsed ? 'w-16' : 'w-80'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/60 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/60 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/50"></div>
          
          {/* Collapse/Expand Toggle Button */}
          <div className="absolute top-4 right-2 z-10">
            <Button
              onClick={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-white/30 dark:border-slate-700/50"
              aria-label={isCalendarCollapsed ? "Expand calendar" : "Collapse calendar"}
            >
              {isCalendarCollapsed ? (
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              )}
            </Button>
          </div>

          <div className="relative h-full overflow-hidden">
            {isCalendarCollapsed ? (
              /* Collapsed State - Mini Calendar Icon */
              <div className="flex flex-col items-center justify-start pt-16 px-2 h-full">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-[#1800FF]/20 dark:from-emerald-400/20 dark:to-[#1800FF]/30 mb-4">
                  <Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="writing-mode-vertical text-xs font-semibold text-slate-600 dark:text-slate-300 rotate-90 whitespace-nowrap">
                  Calendar
                </div>
              </div>
            ) : (
              /* Expanded State - Full Calendar */
              <div className="transition-opacity duration-300">
                <DemandCalendar />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Calendar Toggle */}
        <div className="md:hidden fixed top-20 left-4 z-50">
          <Button
            onClick={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
            variant="outline"
            size="sm"
            className="h-10 px-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 dark:border-slate-700/50"
          >
            <Calendar className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium">Calendar</span>
          </Button>
        </div>

        {/* Mobile Calendar Overlay */}
        {!isCalendarCollapsed && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsCalendarCollapsed(true)}>
            <div className="absolute left-0 top-0 h-full w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Calendar</h3>
                  <Button
                    onClick={() => setIsCalendarCollapsed(true)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <DemandCalendar />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto relative">
          {/* Enhanced Header with glassmorphism */}
          <div className="relative backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF]/5 via-transparent to-emerald-500/5"></div>
            <div className="relative">
              <DemandHeader />
            </div>
          </div>

          {/* Enhanced page header with gradient text */}
          <header className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-3 text-left">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/5 via-[#1800FF]/10 to-emerald-500/5 rounded-xl blur-xl"></div>
            <div className="relative max-w-4xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1">
                <span className="bg-gradient-to-r from-slate-900 via-emerald-600 to-[#1800FF] dark:from-slate-100 dark:via-emerald-400 dark:to-[#1800FF] bg-clip-text text-transparent">
                  Demand Analytics
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Comprehensive demand forecasting with
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> market insights</span>,
                <span className="text-[#1800FF] dark:text-[#1800FF] font-semibold"> predictive analytics</span>, and
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> strategic intelligence</span>
              </p>
            </div>
          </header>

          <div className="p-4 sm:p-6 space-y-8 relative">
            {/* Enhanced Trends Chart Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-[#1800FF]/5 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500/20 via-[#1800FF]/30 to-emerald-500/20">
                  <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-slate-900/90"></div>
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#1800FF] to-emerald-500"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-[#1800FF]/20 dark:from-emerald-400/20 dark:to-[#1800FF]/30">
                      <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                        Demand Trends
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Demand forecast and pricing analysis with market intelligence
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative p-0 sm:p-2 md:p-4">
                  <DemandForecastChart />
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Summary Cards */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-[#1800FF]/5 to-emerald-500/5 rounded-3xl blur-2xl"></div>
              <div className="relative">
                <DemandSummaryCards />
              </div>
            </div>

            {/* Enhanced Bottom Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-[#1800FF]/5 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <MyEventsHolidaysTable />
                </div>
              </div>
              
              <div className="xl:col-span-1 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1800FF]/10 via-emerald-500/5 to-[#1800FF]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Card className="relative overflow-hidden h-full rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-emerald-500/30 to-[#1800FF]/20">
                    <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-slate-900/90"></div>
                  </div>
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-emerald-500 to-[#1800FF]"></div>
                  
                  <CardHeader className="relative">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-[#1800FF]/10 to-emerald-500/20 dark:from-[#1800FF]/20 dark:to-emerald-400/30">
                        <Lightbulb className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                          AI Insights
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Powered by AI</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      AI-powered insights and strategic recommendations for optimal revenue management.
                    </p>
                    <div className="space-y-3">
                      {[
                        { text: "Consider adjusting rates for July 4th weekend due to high predicted demand.", priority: "high" },
                        { text: "Competitor X has lowered rates for mid-week stays.", priority: "medium" },
                        { text: "Opportunity to capture more bookings from the UK market.", priority: "low" }
                      ].map((insight, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-slate-50/50 to-white/30 dark:from-slate-800/30 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/30">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            insight.priority === 'high' ? 'bg-red-500' :
                            insight.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}></div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {insight.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
