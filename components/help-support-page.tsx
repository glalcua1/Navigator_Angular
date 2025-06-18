"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft,
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  ChevronRight,
  Play,
  FileText,
  Video,
  Lightbulb,
  Target,
  Zap,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useGuidedTour } from '@/lib/guided-tour'
import { useUser } from '@/hooks/use-user'

/**
 * ============================================================================
 * COMPREHENSIVE HELP & SUPPORT PAGE
 * ============================================================================
 * 
 * Full-page help system designed for hotel revenue managers with:
 * - Enhanced knowledge base with better organization
 * - Full-screen guided tours
 * - Professional support ticket system
 * - Comprehensive tutorial library
 * - Better content accessibility
 * 
 * @author Senior UX Designer
 * @version 2.0.0
 */

// Import knowledge base data and interfaces from the original component
interface KnowledgeArticle {
  id: string
  title: string
  category: string
  description: string
  content: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readTime: number
  helpful: number
  type: 'article' | 'video' | 'tutorial'
}

const knowledgeBase: KnowledgeArticle[] = [
  {
    id: "revenue-optimization-basics",
    title: "Revenue Optimization Fundamentals",
    category: "Getting Started",
    description: "Essential concepts every revenue manager should understand",
    content: `
# Revenue Optimization Fundamentals

## Overview
Revenue optimization is the strategic process of maximizing hotel revenue through data-driven pricing, inventory management, and market analysis.

## Key Concepts

### 1. Revenue Per Available Room (RevPAR)
RevPAR = ADR × Occupancy Rate
- Primary KPI for measuring revenue performance
- Combines both rate and occupancy metrics
- Industry benchmark for competitive analysis

### 2. Average Daily Rate (ADR)
- Average room rate across all bookings
- Key indicator of pricing strategy effectiveness
- Must balance with occupancy to optimize RevPAR

### 3. Occupancy Rate
- Percentage of available rooms sold
- Indicates demand strength
- Should be analyzed alongside ADR trends

## Best Practices
1. **Dynamic Pricing**: Adjust rates based on demand patterns
2. **Competitive Analysis**: Monitor competitor pricing daily
3. **Forecast Accuracy**: Use historical data and market intelligence
4. **Channel Management**: Optimize distribution across all channels
5. **Market Segmentation**: Target different guest segments with tailored pricing

## Implementation Steps
1. Establish baseline metrics
2. Set up automated reporting
3. Create pricing rules and restrictions
4. Monitor performance daily
5. Adjust strategy based on results
    `,
    tags: ["revenue", "basics", "kpi", "revpar", "adr"],
    difficulty: "beginner",
    readTime: 8,
    helpful: 45,
    type: "article"
  },
  {
    id: "rate-parity-management",
    title: "Rate Parity Management Best Practices",
    category: "Rate Management",
    description: "How to maintain rate consistency across all distribution channels",
    content: `
# Rate Parity Management

## What is Rate Parity?
Rate parity ensures consistent pricing across all distribution channels to maintain brand integrity and avoid channel conflicts.

## Why Rate Parity Matters
- **Brand Protection**: Maintains consistent pricing image
- **OTA Relationships**: Prevents penalties from booking platforms
- **Guest Trust**: Ensures fair pricing perception
- **Revenue Protection**: Prevents rate undercutting

## Common Rate Parity Issues
1. **OTA Discounting**: Third-party sites offering unauthorized discounts
2. **Package Complications**: Bundle pricing creating apparent disparities
3. **Currency Fluctuations**: Exchange rate impacts on international sites
4. **Member Rates**: Loyalty program pricing considerations

## Monitoring Strategies
- **Daily Rate Audits**: Check all major OTAs
- **Automated Monitoring**: Use rate intelligence tools
- **Competitive Shopping**: Regular manual checks
- **Alert Systems**: Set up notifications for violations

## Resolution Process
1. **Identify Violation**: Document the disparity
2. **Contact Channel**: Reach out to OTA immediately  
3. **Provide Evidence**: Screenshots and documentation
4. **Follow Up**: Ensure correction within 24-48 hours
5. **Escalate**: Use account management if needed
    `,
    tags: ["rate-parity", "ota", "distribution", "pricing"],
    difficulty: "intermediate",
    readTime: 12,
    helpful: 38,
    type: "article"
  },
  {
    id: "demand-forecasting",
    title: "Advanced Demand Forecasting Techniques",
    category: "Forecasting",
    description: "Master the art of predicting demand patterns for optimal pricing",
    content: `
# Advanced Demand Forecasting

## Forecasting Methodology

### Historical Analysis
- **Seasonal Patterns**: Identify recurring trends
- **Day-of-Week Variations**: Understand weekly cycles
- **Special Events**: Account for local happenings
- **Economic Indicators**: Consider market conditions

### Leading Indicators
1. **Advance Bookings**: Track booking pace
2. **Market Events**: Monitor conferences, festivals
3. **Competitor Activity**: Analyze pricing moves
4. **Economic Data**: GDP, employment, travel trends

### Forecasting Models
- **Moving Averages**: Smooth out fluctuations
- **Exponential Smoothing**: Weight recent data more heavily
- **Regression Analysis**: Identify relationships between variables
- **Machine Learning**: Advanced pattern recognition

## Implementation Framework
1. **Data Collection**: Gather historical and market data
2. **Model Selection**: Choose appropriate forecasting method
3. **Validation**: Test against historical performance
4. **Calibration**: Adjust for current market conditions
5. **Monitoring**: Track accuracy and adjust as needed

## Key Metrics to Track
- **Booking Pace**: Weekly pickup patterns
- **Cancellation Rates**: Historical cancellation trends
- **No-Show Rates**: Expected no-show percentages
- **Group Block Performance**: Corporate and event bookings
    `,
    tags: ["forecasting", "demand", "analytics", "pricing"],
    difficulty: "advanced",
    readTime: 15,
    helpful: 42,
    type: "article"
  },
  {
    id: "dashboard-overview",
    title: "Dashboard Navigation Tutorial",
    category: "Platform Guide",
    description: "Complete guide to using the Rate Parity Dashboard effectively",
    content: `
# Dashboard Navigation Guide

## Main Dashboard Components

### 1. Header Navigation
- **Hotel Selector**: Switch between properties
- **Date Range**: Adjust reporting period  
- **Theme Toggle**: Switch between light/dark modes
- **Help Center**: Access support and knowledge base

### 2. KPI Cards
- **Revenue Metrics**: RevPAR, ADR, Occupancy
- **Performance Indicators**: Trend arrows and percentages
- **Comparison Data**: Period-over-period analysis

### 3. Charts and Analytics
- **Performance Pulse**: Rate trends and competitive positioning
- **Market Demand**: Demand patterns and opportunities
- **Property Health**: Distribution performance metrics

### 4. Filter System
- **Quick Filters**: Date range, property, market segment
- **Advanced Filters**: Detailed criteria selection
- **Saved Views**: Store frequently used filter combinations

## Best Practices
1. **Daily Routine**: Check KPIs first thing each morning
2. **Trend Analysis**: Focus on trend directions, not just absolute numbers
3. **Competitive Intelligence**: Use market demand data for pricing decisions
4. **Filter Usage**: Leverage filters to drill down into specific segments

## Keyboard Shortcuts
- Ctrl/Cmd + D: Open date picker
- Ctrl/Cmd + F: Focus search
- Ctrl/Cmd + T: Toggle theme
- Ctrl/Cmd + H: Open help center
    `,
    tags: ["dashboard", "navigation", "tutorial", "interface"],
    difficulty: "beginner",
    readTime: 10,
    helpful: 55,
    type: "tutorial"
  },
  {
    id: "competitive-analysis",
    title: "Competitive Rate Analysis Strategies",
    category: "Market Intelligence",
    description: "How to analyze competitor pricing and position your rates effectively",
    content: `
# Competitive Rate Analysis

## Competitive Set Selection
Choose 3-5 direct competitors based on:
- **Location**: Same market area
- **Segment**: Similar customer base
- **Amenities**: Comparable facilities
- **Star Rating**: Similar service level

## Analysis Framework

### Daily Rate Shopping
1. **Primary Competitors**: Check daily
2. **Secondary Set**: Monitor weekly
3. **Market Leaders**: Track pricing strategies
4. **Disruptors**: Watch for aggressive pricing

### Key Metrics to Track
- **Rate Positioning**: Where you rank in competitive set
- **Rate Gaps**: Difference from closest competitors  
- **Availability**: Competitor inventory levels
- **Restrictions**: Minimum stays, advance purchase

### Pricing Strategies
- **Premium Positioning**: 10-15% above market average
- **Competitive Parity**: Match closest competitors
- **Value Strategy**: 5-10% below market for volume
- **Dynamic Response**: Adjust based on demand signals

## Tools and Techniques
- **Rate Shopping Tools**: Automated competitive intelligence
- **Manual Checks**: Direct website comparison
- **OTA Analysis**: Third-party site positioning
- **Package Comparison**: Total stay value analysis
    `,
    tags: ["competitive-analysis", "pricing", "market-intelligence", "strategy"],
    difficulty: "intermediate",
    readTime: 11,
    helpful: 33,
    type: "article"
  }
]

const supportCategories = [
  { value: "technical", label: "Technical Issues", icon: AlertCircle },
  { value: "data", label: "Data & Reporting", icon: BarChart3 },
  { value: "billing", label: "Billing & Account", icon: DollarSign },
  { value: "training", label: "Training & Onboarding", icon: BookOpen },
  { value: "feature", label: "Feature Request", icon: Lightbulb },
  { value: "other", label: "Other", icon: MessageSquare }
]

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { startQuickTour, startComprehensiveTour, startRevenueManagerTour } = useGuidedTour()
  const { user, email, userId, displayName } = useUser()
  
  const [supportForm, setSupportForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium" as const,
    email: "",
    phone: "",
    userId: ""
  })

  // Auto-populate email and userId when user data is available
  React.useEffect(() => {
    if (user && email && userId) {
      setSupportForm(prev => ({
        ...prev,
        email: email,
        userId: userId
      }))
    }
  }, [user, email, userId])

  const filteredArticles = knowledgeBase.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(knowledgeBase.map(article => article.category)))]

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Show loading state
    const submitButton = e.target as HTMLFormElement
    const button = submitButton.querySelector('button[type="submit"]') as HTMLButtonElement
    if (button) {
      button.disabled = true
      button.textContent = 'Sending...'
    }

    try {
      // Send the support request via API
      const response = await fetch('/api/send-support-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supportForm),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Reset form on success
        setSupportForm({
          title: "",
          description: "",
          category: "",
          priority: "medium",
          email: "",
          phone: "",
          userId: ""
        })
        
        alert(`✅ Support request sent successfully to ${result.recipient}!\n\nTicket ID: ${result.ticketId}\n\nWe'll get back to you within 24 hours.`)
      } else {
        throw new Error(result.error || 'Failed to send support request')
      }
    } catch (error) {
      console.error('Error submitting support request:', error)
      alert(`❌ Failed to send support request: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try again or contact support directly at gaurav.lal@rategain.com`)
    } finally {
      // Reset button state
      if (button) {
        button.disabled = false
        button.textContent = 'Submit Support Ticket'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced Page Header */}
      <div className="relative bg-gradient-to-r from-[#1800FF]/10 via-[#1800FF]/5 to-emerald-500/10 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF]/5 via-transparent to-emerald-500/5"></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600 dark:text-slate-300 hover:text-[#1800FF] dark:hover:text-[#1800FF]">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#1800FF]/10 dark:bg-[#1800FF]/20">
                <HelpCircle className="h-8 w-8 text-[#1800FF]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#1800FF] to-emerald-800 dark:from-slate-100 dark:via-[#1800FF] dark:to-emerald-300 bg-clip-text text-transparent">
                    Help & Support Center
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                  Comprehensive resources and support for hotel revenue managers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="knowledge" className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full max-w-4xl mx-auto h-auto p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl rounded-2xl">
                <TabsTrigger 
                  value="knowledge" 
                  className="flex flex-col items-center gap-2 h-20 lg:h-24 text-sm lg:text-base font-medium rounded-xl data-[state=active]:bg-[#1800FF] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                >
                  <BookOpen className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-center leading-tight">Knowledge<br className="lg:hidden"/>Base</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="flex flex-col items-center gap-2 h-20 lg:h-24 text-sm lg:text-base font-medium rounded-xl data-[state=active]:bg-[#1800FF] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                >
                  <MessageSquare className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-center leading-tight">Get<br className="lg:hidden"/>Support</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="tutorials" 
                  className="flex flex-col items-center gap-2 h-20 lg:h-24 text-sm lg:text-base font-medium rounded-xl data-[state=active]:bg-[#1800FF] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                >
                  <Play className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-center leading-tight">Video<br className="lg:hidden"/>Tutorials</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="coach" 
                  className="flex flex-col items-center gap-2 h-20 lg:h-24 text-sm lg:text-base font-medium rounded-xl data-[state=active]:bg-[#1800FF] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                >
                  <Target className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-center leading-tight">Interactive<br className="lg:hidden"/>Tours</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Enhanced Knowledge Base Tab */}
            <TabsContent value="knowledge" className="space-y-8">
              {/* Enhanced Search and Filters */}
              <Card className="bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-6">
                    {/* Search Header */}
                    <div className="text-center">
                      <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Knowledge Base
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Find answers to common questions and learn best practices
                      </p>
                    </div>
                    
                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        placeholder="Search articles, tutorials, and guides..."
                        className="h-14 pl-12 pr-4 text-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20 rounded-xl shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {/* Category Filters */}
                    <div className="flex justify-center">
                      <div className="flex gap-2 flex-wrap max-w-4xl">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="lg"
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                              "capitalize rounded-full px-6 py-2 transition-all duration-200",
                              selectedCategory === category 
                                ? "bg-[#1800FF] hover:bg-[#1500CC] text-white shadow-lg" 
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-600"
                            )}
                          >
                            {category === "all" ? "All Topics" : category}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Knowledge Articles */}
              <div className="grid gap-6 lg:gap-8">
                {filteredArticles.map((article) => (
                  <Card 
                    key={article.id} 
                    className="bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        {/* Content Type Icon */}
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0",
                          article.type === 'video' && "bg-gradient-to-br from-red-500 to-pink-600",
                          article.type === 'tutorial' && "bg-gradient-to-br from-blue-500 to-indigo-600", 
                          article.type === 'article' && "bg-gradient-to-br from-green-500 to-emerald-600"
                        )}>
                          {article.type === 'video' && <Video className="h-6 w-6 text-white" />}
                          {article.type === 'tutorial' && <Play className="h-6 w-6 text-white" />}
                          {article.type === 'article' && <FileText className="h-6 w-6 text-white" />}
                        </div>

                        <div className="space-y-3 flex-1">
                          <CardTitle className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#1800FF] transition-colors leading-tight">
                            {article.title}
                          </CardTitle>
                          
                          <CardDescription className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            {article.description}
                          </CardDescription>
                          
                          {/* Article Meta */}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{article.readTime} min read</span>
                            </div>
                            
                            <Badge 
                              variant="secondary"
                              className={cn(
                                "font-semibold",
                                article.difficulty === 'beginner' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                article.difficulty === 'intermediate' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                                article.difficulty === 'advanced' && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                              )}
                            >
                              {article.difficulty}
                            </Badge>
                            
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{article.helpful} helpful</span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-[#1800FF] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs px-3 py-1 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results State */}
              {filteredArticles.length === 0 && (
                <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Try adjusting your search terms or browse different categories
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                      }}
                      className="border-slate-300 dark:border-slate-600"
                    >
                      Clear filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                  <CardHeader className="pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1800FF] to-[#1800FF] rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                          Submit Support Request
                        </CardTitle>
                        <CardDescription className="text-base text-slate-600 dark:text-slate-300 mt-1">
                          Our expert team will help resolve your issue quickly
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSupportSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Email Address *
                            {user && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                <CheckCircle className="h-3 w-3" />
                                Auto-filled
                              </span>
                            )}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={supportForm.email}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20"
                            placeholder={user ? `Logged in as ${displayName}` : "Enter your email address"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Phone Number <span className="text-slate-400">(Optional)</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={supportForm.phone}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="userId" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          User ID *
                          {user && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                              <CheckCircle className="h-3 w-3" />
                              Auto-filled
                            </span>
                          )}
                        </Label>
                        <Input
                          id="userId"
                          type="text"
                          value={supportForm.userId}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, userId: e.target.value }))}
                          placeholder={user ? "Automatically filled from session" : "Enter your user ID"}
                          required
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Issue Category *
                          </Label>
                          <select
                            id="category"
                            className="w-full h-12 px-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-2 focus:ring-[#1800FF]/20 transition-all duration-200"
                            value={supportForm.category}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                            required
                          >
                            <option value="">Choose category...</option>
                            {supportCategories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Priority Level
                          </Label>
                          <select
                            id="priority"
                            className="w-full h-12 px-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-2 focus:ring-[#1800FF]/20 transition-all duration-200"
                            value={supportForm.priority}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, priority: e.target.value as any }))}
                          >
                            <option value="low">🟢 Low - General question</option>
                            <option value="medium">🟡 Medium - Issue affecting work</option>
                            <option value="high">🟠 High - Critical business impact</option>
                            <option value="urgent">🔴 Urgent - System down</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Issue Title *
                        </Label>
                        <Input
                          id="title"
                          value={supportForm.title}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Brief, descriptive title of your issue"
                          required
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Detailed Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={supportForm.description}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Please provide detailed information including:&#10;• Steps to reproduce the issue&#10;• Error messages (if any)&#10;• Expected vs actual behavior&#10;• Screenshots or additional context"
                          rows={6}
                          required
                          className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-[#1800FF] dark:focus:border-[#1800FF] focus:ring-[#1800FF]/20 resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-[#1800FF] to-[#1800FF] hover:from-[#1500CC] hover:to-[#1500CC] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                      >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Submit Support Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* Priority Information */}
                  <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        Support Priority Guide
                      </CardTitle>
                      <CardDescription>Choose the right priority level for faster resolution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <span className="font-medium text-green-700 dark:text-green-400">Low:</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">General questions and feature requests</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="flex-1">
                            <span className="font-medium text-yellow-700 dark:text-yellow-400">Medium:</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">Issues affecting daily work</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <div className="flex-1">
                            <span className="font-medium text-orange-700 dark:text-orange-400">High:</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">Critical business impact</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="flex-1">
                            <span className="font-medium text-red-700 dark:text-red-400">Urgent:</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">System down or data loss</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Methods */}
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        Alternative Support Channels
                      </CardTitle>
                      <CardDescription>Multiple ways to get the help you need</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/20 transition-all duration-200" 
                        asChild
                      >
                        <a href="mailto:gaurav.lal@rategain.com">
                          <MessageSquare className="h-5 w-5 mr-3 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">Email Support</div>
                            <div className="text-xs text-slate-500">gaurav.lal@rategain.com</div>
                          </div>
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950/20 transition-all duration-200"
                      >
                        <Users className="h-5 w-5 mr-3 text-emerald-600" />
                        <div className="text-left">
                          <div className="font-medium">Live Chat</div>
                          <div className="text-xs text-slate-500">Available during business hours</div>
                        </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-12 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20 transition-all duration-200" 
                        asChild
                      >
                        <a href="tel:+1-800-REVENUE">
                          <AlertCircle className="h-5 w-5 mr-3 text-red-600" />
                          <div className="text-left">
                            <div className="font-medium">Emergency Line</div>
                            <div className="text-xs text-slate-500">Critical issues only</div>
                          </div>
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Enhanced Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-8">
              {/* Tutorials Header */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Video Tutorials
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Step-by-step video guides to help you master revenue management techniques
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {/* Getting Started Tutorial */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                      <Play className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Getting Started Guide
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Complete walkthrough for new users to understand dashboard basics and core features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">12 min</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-semibold">
                          Beginner
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transition-all duration-200">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                {/* Rate Analysis Tutorial */}
                <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border border-red-200/50 dark:border-red-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                      <Video className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      Rate Analysis Deep Dive
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Advanced techniques for analyzing competitor rates and optimizing pricing strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">25 min</span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 font-semibold">
                          Advanced
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200">
                      <Video className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                {/* Dashboard Mastery Tutorial */}
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200/50 dark:border-emerald-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                      <BarChart3 className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Dashboard Mastery
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300">
                      Master all dashboard features and learn to create custom views for optimal workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">18 min</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 font-semibold">
                          Intermediate
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg transition-all duration-200">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Tutorial Benefits */}
              <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      What You'll Learn
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto">
                          <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h5 className="font-semibold text-slate-900 dark:text-white">Core Features</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Master essential dashboard functions and navigation</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto">
                          <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h5 className="font-semibold text-slate-900 dark:text-white">Best Practices</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Learn industry-proven revenue management strategies</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto">
                          <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h5 className="font-semibold text-slate-900 dark:text-white">Pro Tips</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Discover advanced techniques from revenue experts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Guided Tour Tab */}
            <TabsContent value="coach" className="space-y-8">
              {/* Tour Header */}
              <div className="text-center space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Interactive Dashboard Tours
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  Experience personalized, interactive tours designed to make you a dashboard expert in minutes
                </p>
              </div>

              {/* Tour Options */}
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {/* Quick Tour */}
                <Card className="bg-gradient-to-br from-[#1800FF]/5 to-indigo-50 dark:from-[#1800FF]/10 dark:to-indigo-950/30 border border-[#1800FF]/20 dark:border-[#1800FF]/30 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1800FF] to-[#1800FF] rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Zap className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        Quick Tour
                      </h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        5 minutes • Essential features
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Perfect introduction to core dashboard features and basic navigation
                      </p>
                    </div>
                    <Button 
                      className="w-full h-12 bg-gradient-to-r from-[#1800FF] to-[#1800FF] hover:from-[#1500CC] hover:to-[#1500CC] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                      onClick={() => {
                        setTimeout(() => startQuickTour(), 500)
                      }}
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Start Quick Tour
                    </Button>
                  </CardContent>
                </Card>

                {/* Complete Tour */}
                <Card className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 border border-slate-300/50 dark:border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        Complete Tour
                      </h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        15 minutes • Comprehensive walkthrough
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        In-depth exploration of all features, advanced filters, and reporting tools
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-all duration-200" 
                      onClick={() => {
                        setTimeout(() => startComprehensiveTour(), 500)
                      }}
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Start Complete Tour
                    </Button>
                  </CardContent>
                </Card>

                {/* Revenue Manager Tour */}
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50/30 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-300/50 dark:border-emerald-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <DollarSign className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        Revenue Expert Tips
                      </h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        8 minutes • Best practices
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Industry best practices and expert tips for maximizing revenue performance
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 font-semibold transition-all duration-200" 
                      onClick={() => {
                        setTimeout(() => startRevenueManagerTour(), 500)
                      }}
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      Start Expert Tour
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Tour Benefits */}
              <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        What Every Tour Includes
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        Comprehensive coverage of essential dashboard capabilities
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">Dashboard Navigation</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Master efficient navigation patterns</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">KPI Interpretation</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Understand key performance metrics</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">Advanced Filters</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Leverage powerful filtering capabilities</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">Chart Analysis</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Read and interpret data visualizations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">Competitive Intelligence</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Monitor and analyze competitor data</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white">Best Practices</h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300">Learn industry-proven strategies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 