"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowDown, 
  ArrowUp, 
  Star, 
  Hotel, 
  Plane, 
  Search, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Users,
  Eye,
  Target,
  Activity,
  Crown,
  Award,
  HelpCircle
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

/**
 * Enhanced Channel Performance Metrics Interface
 * Comprehensive data structure for channel analytics
 */
interface ChannelMetrics {
  channelName: string
  channelIcon: React.ComponentType<{ className?: string }>
  primaryColor: string
  accentColor: string
  ranking: {
    current: number
    previous: number
    totalProperties: number
    compsetPosition: string
  }
  reviewScore: {
    score: string
    maxScore: string
    position: string
    trend: "up" | "down" | "stable"
  }
  parityIssues: {
    count: number
    avgLoss: number
    severity: "low" | "medium" | "high" | "critical"
  }
  visibility: {
    searchRank: number
    impressions: number
    clickRate: number
  }
  conversion: {
    rate: number
    trend: number
    bookings: number
  }
  revenue: {
    monthlyRevenue: number
    revenueShare: number
    avgDailyRate: number
    trend: number
  }
  healthScore: number
}

/**
 * Sample enhanced channel data with comprehensive metrics
 */
const channelData: ChannelMetrics[] = [
  {
    channelName: "Booking.com",
    channelIcon: Hotel,
    primaryColor: "#0066CC",
    accentColor: "#E6F3FF",
    ranking: {
      current: 6,
      previous: 8,
      totalProperties: 19,
      compsetPosition: "1st"
    },
    reviewScore: {
      score: "8.7",
      maxScore: "10",
      position: "2nd",
      trend: "up"
    },
    parityIssues: {
      count: 12,
      avgLoss: 45,
      severity: "medium"
    },
    visibility: {
      searchRank: 3,
      impressions: 125000,
      clickRate: 3.2
    },
    conversion: {
      rate: 2.8,
      trend: 0.3,
      bookings: 156
    },
    revenue: {
      monthlyRevenue: 285000,
      revenueShare: 42,
      avgDailyRate: 1850,
      trend: 8.5
    },
    healthScore: 78
  },
  {
    channelName: "Expedia",
    channelIcon: Plane,
    primaryColor: "#FFC72C",
    accentColor: "#FFF8E6",
    ranking: {
      current: 10,
      previous: 12,
      totalProperties: 476,
      compsetPosition: "1st"
    },
    reviewScore: {
      score: "9.1",
      maxScore: "10",
      position: "1st",
      trend: "up"
    },
    parityIssues: {
      count: 28,
      avgLoss: 25,
      severity: "low"
    },
    visibility: {
      searchRank: 8,
      impressions: 89000,
      clickRate: 2.9
    },
    conversion: {
      rate: 3.2,
      trend: 0.8,
      bookings: 98
    },
    revenue: {
      monthlyRevenue: 178000,
      revenueShare: 26,
      avgDailyRate: 1920,
      trend: 12.3
    },
    healthScore: 85
  },
  {
    channelName: "Agoda",
    channelIcon: Search,
    primaryColor: "#FF6B35",
    accentColor: "#FFF2EF",
    ranking: {
      current: 4,
      previous: 5,
      totalProperties: 89,
      compsetPosition: "2nd"
    },
    reviewScore: {
      score: "8.9",
      maxScore: "10",
      position: "1st",
      trend: "stable"
    },
    parityIssues: {
      count: 61,
      avgLoss: 22,
      severity: "high"
    },
    visibility: {
      searchRank: 2,
      impressions: 67000,
      clickRate: 4.1
    },
    conversion: {
      rate: 2.1,
      trend: -0.2,
      bookings: 74
    },
    revenue: {
      monthlyRevenue: 134000,
      revenueShare: 19,
      avgDailyRate: 1780,
      trend: 5.7
    },
    healthScore: 72
  },
  {
    channelName: "TripAdvisor",
    channelIcon: Star,
    primaryColor: "#00AA6C",
    accentColor: "#E6F7F1",
    ranking: {
      current: 1,
      previous: 1,
      totalProperties: 1,
      compsetPosition: "1st"
    },
    reviewScore: {
      score: "5.0",
      maxScore: "5",
      position: "1st",
      trend: "stable"
    },
    parityIssues: {
      count: 0,
      avgLoss: 0,
      severity: "low"
    },
    visibility: {
      searchRank: 1,
      impressions: 45000,
      clickRate: 2.3
    },
    conversion: {
      rate: 1.8,
      trend: 0.1,
      bookings: 32
    },
    revenue: {
      monthlyRevenue: 87000,
      revenueShare: 13,
      avgDailyRate: 2100,
      trend: 3.2
    },
    healthScore: 92
  }
]

/**
 * Enhanced Channel Card Component with sophisticated design
 */
interface ChannelCardProps {
  channel: ChannelMetrics
  isExpanded?: boolean
  onToggleExpand?: () => void
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isExpanded = false }) => {
  const Icon = channel.channelIcon
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500"
      case "high": return "bg-orange-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }
  
  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-blue-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl xl:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl xl:rounded-3xl p-[1px]" style={{
        background: `linear-gradient(135deg, ${channel.primaryColor}20 0%, ${channel.primaryColor}40 100%)`
      }}>
        <div className="h-full w-full rounded-2xl xl:rounded-3xl bg-white/95 dark:bg-slate-900/95"></div>
      </div>
      
      {/* Top accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl xl:rounded-t-3xl" 
        style={{ backgroundColor: channel.primaryColor }}
      />
      
      {/* Health Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getHealthScoreColor(channel.healthScore)} bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/50 dark:border-slate-700/50`}>
          <Activity className="h-3 w-3" />
          {channel.healthScore}%
        </div>
      </div>

      <CardHeader className="relative pb-3 pt-6">
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-xl shadow-lg"
            style={{ backgroundColor: channel.accentColor }}
          >
            <Icon className="h-6 w-6" style={{ color: channel.primaryColor }} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {channel.channelName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                #{channel.ranking.current} of {channel.ranking.totalProperties}
              </Badge>
              {channel.ranking.current < channel.ranking.previous ? (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{channel.ranking.previous - channel.ranking.current}</span>
                </div>
              ) : channel.ranking.current > channel.ranking.previous ? (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDown className="h-3 w-3" />
                  <span className="text-xs font-medium">-{channel.ranking.current - channel.ranking.previous}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="text-xs">No change</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4 pb-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Review Score */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Star className="h-3 w-3 text-amber-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Review Score</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {channel.reviewScore.score}
              </span>
              <span className="text-sm text-slate-500">/{channel.reviewScore.maxScore}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {channel.reviewScore.position} in compset
            </Badge>
          </div>

          {/* Revenue Share */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Revenue Share</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {channel.revenue.revenueShare}%
              </span>
              {channel.revenue.trend > 0 && (
                <div className="flex items-center gap-0.5 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+{channel.revenue.trend}%</span>
                </div>
              )}
            </div>
            <div className="text-xs text-slate-500">
              ${(channel.revenue.monthlyRevenue / 1000).toFixed(0)}k monthly
            </div>
          </div>
        </div>

        <Separator className="bg-slate-200/50 dark:bg-slate-700/50" />

        {/* Performance Indicators */}
        <div className="space-y-3">
          {/* Conversion Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {channel.conversion.rate}%
              </span>
              {channel.conversion.trend !== 0 && (
                <div className={`flex items-center gap-0.5 ${channel.conversion.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {channel.conversion.trend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  <span className="text-xs">{Math.abs(channel.conversion.trend)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Visibility Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Visibility</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Rank #{channel.visibility.searchRank}
              </span>
              <span className="text-xs text-slate-500">
                {(channel.visibility.impressions / 1000).toFixed(0)}k views
              </span>
            </div>
          </div>

          {/* Parity Issues */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Parity Issues</span>
            </div>
            <div className="flex items-center gap-2">
              {channel.parityIssues.count > 0 ? (
                <>
                  <span className="text-sm font-bold text-red-600">
                    {channel.parityIssues.count}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(channel.parityIssues.severity)}`} />
                  <span className="text-xs text-red-600">
                    -${channel.parityIssues.avgLoss}
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">Clean</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Score Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Channel Health</span>
            </div>
            <span className={`text-xs font-bold ${getHealthScoreColor(channel.healthScore)}`}>
              {channel.healthScore}%
            </span>
          </div>
          <Progress 
            value={channel.healthScore} 
            className="h-2" 
            style={{ 
              background: `linear-gradient(to right, ${channel.primaryColor}40 0%, ${channel.primaryColor} 100%)` 
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Revenue Manager Insights Strip Component
 * Provides actionable insights tailored for revenue optimization
 */
const RevenueManagerInsights: React.FC = () => {
  const totalRevenue = channelData.reduce((sum, channel) => sum + channel.revenue.monthlyRevenue, 0)
  const avgHealthScore = channelData.reduce((sum, channel) => sum + channel.healthScore, 0) / channelData.length
  const totalParityIssues = channelData.reduce((sum, channel) => sum + channel.parityIssues.count, 0)
  const potentialLoss = channelData.reduce((sum, channel) => sum + (channel.parityIssues.count * channel.parityIssues.avgLoss), 0)
  
  const topPerformer = channelData.reduce((prev, current) => 
    prev.healthScore > current.healthScore ? prev : current
  )
  
  const needsAttention = channelData.filter(channel => 
    channel.parityIssues.count > 20 || channel.healthScore < 75
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Metrics Overview */}
      <Card className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Portfolio Performance
          </CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Key metrics and performance indicators
          </p>
        </CardHeader>

        <CardContent>
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Avg Health Score</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-1">
                      <div className="font-semibold">Portfolio Health Score</div>
                      <div className="text-xs">
                        Average health score across all channels weighted by revenue contribution. 
                        Scores above 80% indicate strong overall performance.
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {avgHealthScore.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500">
                {avgHealthScore >= 80 ? "Excellent" : avgHealthScore >= 70 ? "Good" : "Needs Attention"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Monthly Revenue</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-1">
                      <div className="font-semibold">Total Portfolio Revenue</div>
                      <div className="text-xs">
                        Combined monthly revenue from all distribution channels. 
                        Includes direct bookings, OTA commissions (net), and other channel revenue streams.
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ${(totalRevenue / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-green-600">
                +8.2% vs last month
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Parity Issues</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {totalParityIssues}
              </div>
              <div className="text-xs text-orange-600">
                -${(potentialLoss / 1000).toFixed(1)}k potential loss
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Top Channel</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {topPerformer.channelName}
              </div>
              <div className="text-xs text-blue-600">
                {topPerformer.healthScore}% health score
              </div>
            </div>
          </div>


        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Enhanced Property Health Score Widget
 * 
 * A comprehensive dashboard component providing deep insights into channel performance,
 * revenue optimization opportunities, and strategic recommendations for revenue managers.
 * 
 * Features:
 * - Real-time channel health monitoring
 * - Revenue performance analytics
 * - Parity issue tracking and alerting
 * - Strategic insights and recommendations
 * - Modern glassmorphism design with enhanced UX
 * 
 * @returns {JSX.Element} Enhanced property health score dashboard
 */
export function PropertyHealthScoreWidget() {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <div className="space-y-6 sm:space-y-8">
        {/* Key Performance Metrics */}
        <RevenueManagerInsights />
        
        {/* Channel Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {channelData.map((channel, index) => (
            <ChannelCard
              key={channel.channelName}
              channel={channel}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
