"use client"

import { OverviewKpiCards } from "@/components/navigator/overview-kpi-cards"
import { RateTrendsChart } from "@/components/navigator/rate-trends-chart"
import { MarketDemandWidget } from "@/components/navigator/market-demand-widget"
import { PropertyHealthScoreWidget } from "@/components/navigator/property-health-score-widget"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Info, Activity, Compass, ChevronRight, Shield, Sparkles, TrendingUp } from "lucide-react"
import { FilterBar } from "@/components/navigator/filter-bar"
import { useState, useCallback, Suspense, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Enhanced loading skeleton with modern shimmer effect
 */
const LoadingSkeleton = memo(() => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
    <div className="h-[420px] sm:h-[500px] bg-gradient-to-br from-slate-200/50 to-slate-300/30 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-slate-600/20 to-transparent animate-[shimmer_2s_infinite]"></div>
    </div>
  </div>
))
LoadingSkeleton.displayName = "LoadingSkeleton"

/**
 * Modern Section Header Component with enhanced visual design
 */
interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  linkText: string
  borderColor: string
  iconColor: string
  linkColor: string
  accentColor: string
}

const SectionHeader = memo(({ 
  icon: Icon, 
  title, 
  subtitle, 
  linkText, 
  borderColor, 
  iconColor, 
  linkColor,
  accentColor
}: SectionHeaderProps) => (
  <div className="relative mb-6">
    {/* Background gradient decoration */}
    <div className={`absolute -inset-2 bg-gradient-to-r ${accentColor} opacity-5 dark:opacity-10 rounded-2xl blur-sm`}></div>
    
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Enhanced icon container with glassmorphism */}
        <div className={`relative p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-lg ${iconColor}`}>
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
              {title}
            </h2>
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Enhanced CTA link */}
      <div className="group">
        <a
          href="#"
          className={`
            inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm
            bg-gradient-to-r from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70
            backdrop-blur-sm border border-white/30 dark:border-slate-600/30
            ${linkColor} hover:shadow-lg hover:scale-105 transition-all duration-300
            hover:bg-gradient-to-r hover:from-white hover:to-white/90
            dark:hover:from-slate-700 dark:hover:to-slate-600
          `}
          aria-label={`${linkText} for ${title}`}
        >
          <span>{linkText}</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  </div>
))
SectionHeader.displayName = "SectionHeader"

/**
 * Enhanced Performance Pulse Section with modern glassmorphism design - Updated to use #1800FF
 */
const PerformancePulseSection = memo(() => (
  <section className="relative group" aria-labelledby="performance-pulse-heading" data-tour="performance-chart">
    {/* Background glow effect - Updated to use #1800FF */}
    <div className="absolute -inset-4 bg-gradient-to-r from-[#1800FF]/10 via-[#1800FF]/5 to-[#1800FF]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative">
      <SectionHeader
        icon={Activity}
        title="Performance Pulse"
        subtitle="Real-time rate dynamics and competitive positioning insights"
        linkText="Deep Analytics"
        borderColor="border-[#1800FF]"
        iconColor="text-[#1800FF] dark:text-[#1800FF]"
        linkColor="text-[#1800FF] hover:text-[#1500CC] dark:text-[#1800FF] dark:hover:text-[#2000FF]"
        accentColor="from-[#1800FF]/20 to-[#1800FF]/20"
      />
      
      {/* Enhanced card with glassmorphism and advanced styling */}
      <Card className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
        {/* Animated gradient border - Updated to use #1800FF */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-[#1800FF]/30 to-[#1800FF]/20">
          <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-slate-900/90"></div>
        </div>
        
        {/* Top accent gradient - Updated to use #1800FF */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-[#1800FF] to-[#1800FF]"></div>
        
        <CardContent className="relative p-6 sm:p-8">
          {/* Info banner with modern design - Updated colors */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 dark:from-slate-800/60 dark:to-slate-700/40 p-4 border border-[#1800FF]/20 dark:border-slate-600/30 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-[#1800FF]/10 dark:bg-[#1800FF]/20">
              <Info className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Live Market Intelligence
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Trends and changes are compared to the previous week with real-time updates
              </p>
            </div>
          </div>
          
          {/* Chart container with enhanced styling - Increased height for better tooltip visibility */}
          <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50/50 to-white/30 dark:from-slate-800/30 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/30">
            <Suspense fallback={<LoadingSkeleton />}>
              <RateTrendsChart />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
))
PerformancePulseSection.displayName = "PerformancePulseSection"

/**
 * Enhanced Market Insights Section with emerald theme
 */
const MarketInsightsSection = memo(() => (
  <section className="relative group" aria-labelledby="market-insights-heading" data-tour="market-demand">
    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative">
      <SectionHeader
        icon={Compass}
        title="Market Insights"
        subtitle={`Competitive landscape intelligence for ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        linkText="Market Explorer"
        borderColor="border-emerald-500"
        iconColor="text-emerald-600 dark:text-emerald-400"
        linkColor="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        accentColor="from-emerald-500/20 to-green-500/20"
      />
      
      <Card className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500/20 via-green-500/30 to-emerald-500/20">
          <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-slate-900/90"></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"></div>
        
        <CardContent className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-green-50/60 dark:from-slate-800/60 dark:to-slate-700/40 p-4 border border-emerald-100/50 dark:border-slate-600/30 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Market Analysis
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Comprehensive market data compared to previous week performance
              </p>
            </div>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50/50 to-white/30 dark:from-slate-800/30 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/30">
            <Suspense fallback={<LoadingSkeleton />}>
              <MarketDemandWidget />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
))
MarketInsightsSection.displayName = "MarketInsightsSection"

/**
 * Enhanced Property Health Score Section with purple theme - Updated to use #1800FF
 */
const PropertyHealthScoreSection = memo(() => (
  <section className="relative group" aria-labelledby="property-health-heading" data-tour="property-health">
    <div className="absolute -inset-4 bg-gradient-to-r from-[#1800FF]/10 via-[#1800FF]/5 to-[#1800FF]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative">
      <SectionHeader
        icon={Shield}
        title="Property Health Score"
        subtitle="Distribution performance and channel optimization metrics"
        linkText="Health Dashboard"
        borderColor="border-[#1800FF]"
        iconColor="text-[#1800FF] dark:text-[#1800FF]"
        linkColor="text-[#1800FF] hover:text-[#1500CC] dark:text-[#1800FF] dark:hover:text-[#2000FF]"
        accentColor="from-[#1800FF]/20 to-[#1800FF]/20"
      />
      
      <Card className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[#1800FF]/20 via-[#1800FF]/30 to-[#1800FF]/20">
          <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-slate-900/90"></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1800FF] via-[#1800FF] to-[#1800FF]"></div>
        
        <CardContent className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-[#1800FF]/5 to-[#1800FF]/10 dark:from-slate-800/60 dark:to-slate-700/40 p-4 border border-[#1800FF]/20 dark:border-slate-600/30 backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-[#1800FF]/10 dark:bg-[#1800FF]/20">
              <Shield className="h-4 w-4 text-[#1800FF] dark:text-[#1800FF]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                Health Monitoring
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Distribution health changes compared to last week's baseline
              </p>
            </div>
          </div>
          
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-50/50 to-white/30 dark:from-slate-800/30 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-700/30">
            <Suspense fallback={<LoadingSkeleton />}>
              <PropertyHealthScoreWidget />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
))
PropertyHealthScoreSection.displayName = "PropertyHealthScoreSection"

/**
 * Enhanced Home Page Component with modern design system
 * 
 * Features:
 * - Glassmorphism design with backdrop blur effects
 * - Enhanced gradients and visual hierarchy
 * - Modern spacing and typography
 * - Sophisticated animations and micro-interactions
 * - Advanced loading states with shimmer effects
 * - Updated #1800FF color scheme throughout
 * 
 * @returns {JSX.Element} The modernized dashboard page
 */
export default function Home(): JSX.Element {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)

  const handleMoreFiltersClick = useCallback(() => {
    setIsFilterSidebarOpen(true)
  }, [])

  const handleFilterSidebarClose = useCallback(() => {
    setIsFilterSidebarOpen(false)
  }, [])

  const handleFilterApply = useCallback((filters: any) => {
    console.log("Applied filters:", filters)
    setIsFilterSidebarOpen(false)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Filter applied:', {
        timestamp: new Date().toISOString(),
        filtersCount: Object.keys(filters).length,
        filters
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Main content with enhanced spacing and backdrop */}
      <div className="relative space-y-6 sm:space-y-8" role="main" aria-label="Performance Dashboard">
        {/* Filter bar without sticky positioning and shadow */}
        <div className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/30 dark:border-slate-700/30 transition-all duration-300" data-tour="filters">
          <div className="relative">
            <FilterBar onMoreFiltersClick={handleMoreFiltersClick} />
          </div>
        </div>
        
        {/* Enhanced page header with gradient text - Updated colors */}
        <header className="relative px-4 sm:px-6 lg:px-8 pt-2 pb-3 text-left">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#1800FF]/5 via-[#1800FF]/10 to-emerald-500/5 rounded-xl blur-xl"></div>
          <div className="relative max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-1">
              <span className="bg-gradient-to-r from-slate-900 via-[#1800FF] to-emerald-800 dark:from-slate-100 dark:via-[#1800FF] dark:to-emerald-300 bg-clip-text text-transparent">
                Performance Dashboard
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Your intelligent hub for
              <span className="text-[#1800FF] dark:text-[#1800FF] font-semibold"> hotel analytics</span>,
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold"> competitive insights</span>, and
              <span className="text-[#1800FF] dark:text-[#1800FF] font-semibold"> strategic intelligence</span>
            </p>
          </div>
        </header>
        
        {/* Enhanced KPI Cards Section */}
        <div className="relative px-4 sm:px-6 lg:px-8" data-tour="kpi-cards">
          <div className="absolute -inset-6 bg-gradient-to-r from-[#1800FF]/5 to-emerald-500/5 rounded-3xl blur-2xl"></div>
          <div className="relative">
            <Suspense fallback={<LoadingSkeleton />}>
              <OverviewKpiCards />
            </Suspense>
          </div>
        </div>
        
        {/* Enhanced content sections with improved spacing */}
        <div className="space-y-16 sm:space-y-20 px-4 sm:px-6 lg:px-8">
          <PerformancePulseSection />
          <MarketInsightsSection />
          <PropertyHealthScoreSection />
        </div>
        
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={handleFilterSidebarClose}
          onApply={handleFilterApply}
        />
      </div>
    </div>
  )
}
