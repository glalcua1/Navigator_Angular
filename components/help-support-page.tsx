"use client"

import React, { useState } from "react"
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
  const [supportForm, setSupportForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium" as const,
    email: "",
    phone: ""
  })

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
    console.log("Support ticket submitted:", supportForm)
    
    setSupportForm({
      title: "",
      description: "",
      category: "",
      priority: "medium",
      email: "",
      phone: ""
    })
    
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.")
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
            <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <TabsTrigger value="knowledge" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Knowledge Base
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Get Support
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
              <TabsTrigger value="coach" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Guided Tour
              </TabsTrigger>
            </TabsList>

            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge" className="space-y-6">
              {/* Search and Filters */}
              <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search knowledge base..."
                        className="pl-10 bg-white/50 dark:bg-slate-800/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "capitalize",
                            selectedCategory === category && "bg-[#1800FF] hover:bg-[#1500CC]"
                          )}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Articles */}
              <div className="grid gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="text-xl flex items-center gap-3 group-hover:text-[#1800FF] transition-colors">
                            {article.type === 'video' && <Video className="h-5 w-5 text-red-500" />}
                            {article.type === 'tutorial' && <Play className="h-5 w-5 text-blue-500" />}
                            {article.type === 'article' && <FileText className="h-5 w-5 text-green-500" />}
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-base">{article.description}</CardDescription>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime} min read
                            </span>
                            <Badge variant={
                              article.difficulty === 'beginner' ? 'secondary' :
                              article.difficulty === 'intermediate' ? 'default' : 'destructive'
                            }>
                              {article.difficulty}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {article.helpful} helpful
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-[#1800FF] transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-[#1800FF]" />
                      Submit Support Ticket
                    </CardTitle>
                    <CardDescription>
                      Get help from our expert support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={supportForm.email}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="bg-white/50 dark:bg-slate-800/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={supportForm.phone}
                            onChange={(e) => setSupportForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="bg-white/50 dark:bg-slate-800/50"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="category">Issue Category *</Label>
                        <select
                          id="category"
                          className="w-full p-2 border rounded-md bg-white/50 dark:bg-slate-800/50"
                          value={supportForm.category}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                          required
                        >
                          <option value="">Select a category</option>
                          {supportCategories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="priority">Priority Level</Label>
                        <select
                          id="priority"
                          className="w-full p-2 border rounded-md bg-white/50 dark:bg-slate-800/50"
                          value={supportForm.priority}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, priority: e.target.value as any }))}
                        >
                          <option value="low">Low - General question</option>
                          <option value="medium">Medium - Issue affecting work</option>
                          <option value="high">High - Critical business impact</option>
                          <option value="urgent">Urgent - System down</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="title">Issue Title *</Label>
                        <Input
                          id="title"
                          value={supportForm.title}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Brief description of your issue"
                          required
                          className="bg-white/50 dark:bg-slate-800/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Detailed Description *</Label>
                        <Textarea
                          id="description"
                          value={supportForm.description}
                          onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Please provide as much detail as possible including steps to reproduce, error messages, etc."
                          rows={6}
                          required
                          className="bg-white/50 dark:bg-slate-800/50"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-[#1800FF] hover:bg-[#1500CC]">
                        Submit Support Ticket
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-500" />
                        Response Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Low Priority</span>
                        <span className="font-medium">2-3 business days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Priority</span>
                        <span className="font-medium">24-48 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Priority</span>
                        <span className="font-medium">4-8 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Urgent</span>
                        <span className="font-medium text-red-600">1-2 hours</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Quick Support Options</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="mailto:support@rateparity.com">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Email Support
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href="tel:+1-800-REVENUE">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Emergency Line
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Live Chat (9 AM - 6 PM EST)
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tutorial Cards */}
                <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-[#1800FF] transition-colors">
                      <Play className="h-5 w-5 text-blue-500" />
                      Getting Started Guide
                    </CardTitle>
                    <CardDescription>
                      Complete walkthrough for new users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>12 min</span>
                      <Badge>Beginner</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-[#1800FF] transition-colors">
                      <Video className="h-5 w-5 text-red-500" />
                      Rate Analysis Deep Dive
                    </CardTitle>
                    <CardDescription>
                      Advanced rate analysis techniques
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>25 min</span>
                      <Badge variant="default">Advanced</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg group-hover:text-[#1800FF] transition-colors">
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      Dashboard Mastery
                    </CardTitle>
                    <CardDescription>
                      Making the most of your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>18 min</span>
                      <Badge variant="secondary">Intermediate</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Guided Tour Tab */}
            <TabsContent value="coach" className="space-y-6">
              <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-[#1800FF]" />
                    Interactive Guided Tours
                  </CardTitle>
                  <CardDescription>
                    Take personalized tours of the Rate Parity Dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Button 
                      className="h-24 bg-[#1800FF] hover:bg-[#1500CC] flex-col gap-2" 
                      onClick={() => {
                        setTimeout(() => startQuickTour(), 500)
                      }}
                    >
                      <Zap className="h-6 w-6" />
                      Quick Tour (5 min)
                      <span className="text-xs opacity-80">Essential features overview</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-24 flex-col gap-2 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800" 
                      onClick={() => {
                        setTimeout(() => startComprehensiveTour(), 500)
                      }}
                    >
                      <BookOpen className="h-6 w-6" />
                      Complete Tour (15 min)
                      <span className="text-xs opacity-60">In-depth feature walkthrough</span>
                    </Button>

                    <Button 
                      variant="outline" 
                      className="h-24 flex-col gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950" 
                      onClick={() => {
                        setTimeout(() => startRevenueManagerTour(), 500)
                      }}
                    >
                      <DollarSign className="h-6 w-6" />
                      Revenue Tips (8 min)
                      <span className="text-xs opacity-60">Industry best practices</span>
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Tour includes:</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Dashboard navigation
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        KPI interpretation
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Filter system usage
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Chart analysis
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Competitive insights
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Best practices tips
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