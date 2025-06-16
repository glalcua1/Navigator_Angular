"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, TrendingDown, Users, BarChart3, DollarSign, Percent } from "lucide-react"
import Link from "next/link"

interface SummaryCardProps {
  title: string
  value: string
  description?: string
  trend?: string
  trendDirection?: "up" | "down"
  linkText?: string
  linkHref?: string
  icon: React.ElementType
  iconColorClass: string
}

function SummaryCard({
  title,
  value,
  description,
  trend,
  trendDirection,
  linkText,
  linkHref,
  icon: Icon,
  iconColorClass,
}: SummaryCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</CardTitle>
          <div className={`p-2 rounded-lg ${iconColorClass}/20`}>
            <Icon className={`h-5 w-5 ${iconColorClass}`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
        {trend && (
          <div
            className={`text-xs mt-1 flex items-center ${trendDirection === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {trendDirection === "up" ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            {trend}
          </div>
        )}
        {linkText && linkHref && (
          <Link
            href={linkHref}
            className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs mt-3 font-medium"
          >
            {linkText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export function DemandSummaryCards() {
  const summaryData: SummaryCardProps[] = [
    {
      title: "Avg. Market ADR",
      value: "$250",
      description: "Average Daily Rate in market",
      trend: "+2.1% vs. Yesterday",
      trendDirection: "up",
      linkText: "See in Demand AI",
      linkHref: "#",
      icon: DollarSign,
      iconColorClass: "text-green-500 dark:text-green-400",
    },
    {
      title: "Avg. Market RevPAR",
      value: "$180",
      description: "Revenue Per Available Room",
      trend: "+3.5% vs. Yesterday",
      trendDirection: "up",
      linkText: "See in Demand AI",
      linkHref: "#",
      icon: BarChart3,
      iconColorClass: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Price Difference",
      value: "+$15",
      description: "Avg. vs. comp set",
      trend: "Improved from +$12",
      trendDirection: "up",
      linkText: "See in Rate Trends",
      linkHref: "#",
      icon: Percent, // Using Percent as a placeholder for price difference
      iconColorClass: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Top Source Market",
      value: "USA",
      description: "30% of total demand",
      linkText: "View all sources",
      linkHref: "#",
      icon: Users,
      iconColorClass: "text-orange-500 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {summaryData.map((data) => (
        <SummaryCard key={data.title} {...data} />
      ))}
    </div>
  )
}
