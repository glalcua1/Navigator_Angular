"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowDown, ArrowUp, Star, Hotel, Plane, Search } from "lucide-react"
// Gauge import is no longer needed if the gauge is removed
// import { Gauge } from "@/components/ui/gauge"

interface ChannelMetricProps {
  label: string
  value: React.ReactNode
  change?: number
  compsetValue?: string
  detailsLink: string
}

const ChannelMetric: React.FC<ChannelMetricProps> = ({ label, value, change, compsetValue, detailsLink }) => (
  <div className="grid grid-cols-2 items-center py-2">
    <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    <div className="text-right">
      <a href="#" className="text-sm text-blue-600 hover:underline">
        See channel details
      </a>
    </div>
    <div className="col-span-2 flex items-baseline justify-between pt-1">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</span>
        {change !== undefined && (
          <span className={`text-sm font-medium ${change > 0 ? "text-green-500" : "text-red-500"}`}>
            {change > 0 ? `+${change}` : change}
            {change !== 0 &&
              (change > 0 ? (
                <ArrowUp className="inline-block h-3 w-3 ml-0.5" />
              ) : (
                <ArrowDown className="inline-block h-3 w-3 ml-0.5" />
              ))}
          </span>
        )}
      </div>
      {compsetValue && <span className="text-sm text-slate-600 dark:text-slate-300">{compsetValue}</span>}
    </div>
  </div>
)

interface ParityIssueProps {
  issues: number
  avgLoss: number
  detailsLink: string
}

const ParityIssue: React.FC<ParityIssueProps> = ({ issues, avgLoss, detailsLink }) => (
  <div className="grid grid-cols-2 items-center py-2">
    <div className="text-sm text-slate-500 dark:text-slate-400">Next 90 days parity issues</div>
    <div className="text-right">
      <a href="#" className="text-sm text-blue-600 hover:underline">
        See channel details
      </a>
    </div>
    <div className="col-span-2 flex items-baseline justify-between pt-1">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{issues}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">Issues</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${avgLoss < 0 ? "text-red-500" : "text-slate-800 dark:text-slate-100"}`}>
          {avgLoss < 0 ? `-$${Math.abs(avgLoss)}` : `$${avgLoss}`}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">Avg. loss issue</span>
      </div>
    </div>
  </div>
)

export function PropertyHealthScoreWidget() {
  return (
    <div className="space-y-6">
      {/* The main title and info bar are now handled in app/page.tsx */}
      {/* Removed the Card containing the gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Booking.com Card */}
        <Card className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <CardHeader className="flex flex-row items-center space-x-2 p-4 pb-2 pt-5">
            <div className="p-2 bg-cyan-100 dark:bg-slate-700 rounded-lg">
              <Hotel className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Booking.com</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <ChannelMetric
              label="Ranking"
              value={
                <>
                  {"6"} <span className="text-red-500 text-base font-medium">-2</span>
                </>
              }
              compsetValue="1st"
              detailsLink="#"
            />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Out of all 19</div>
            <Separator />
            <ChannelMetric label="Review score" value="0/10" compsetValue="--" detailsLink="#" />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Own hotel</div>
            <Separator />
            <ParityIssue issues={0} avgLoss={0} detailsLink="#" />
          </CardContent>
        </Card>

        {/* Expedia Card */}
        <Card className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <CardHeader className="flex flex-row items-center space-x-2 p-4 pb-2 pt-5">
            <div className="p-2 bg-green-100 dark:bg-slate-700 rounded-lg">
              <Plane className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Expedia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <ChannelMetric
              label="Ranking"
              value={
                <>
                  {"10"} <span className="text-green-500 text-base font-medium">+2</span>
                </>
              }
              compsetValue="1st"
              detailsLink="#"
            />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Out of all 476</div>
            <Separator />
            <ChannelMetric label="Review score" value="9.8/10" compsetValue="3rd" detailsLink="#" />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Own hotel</div>
            <Separator />
            <ParityIssue issues={28} avgLoss={-25} detailsLink="#" />
          </CardContent>
        </Card>

        {/* Tripadvisor Card */}
        <Card className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <CardHeader className="flex flex-row items-center space-x-2 p-4 pb-2 pt-5">
            <div className="p-2 bg-emerald-100 dark:bg-slate-700 rounded-lg">
              <Star className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Tripadvisor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <ChannelMetric label="Ranking" value="1" compsetValue="1st" detailsLink="#" />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Out of all 1</div>
            <Separator />
            <ChannelMetric label="Review score" value="5/5" compsetValue="1st" detailsLink="#" />
            <div className="text-sm text-slate-500 dark:text-slate-400 -mt-2">Own hotel</div>
            <Separator />
            <ParityIssue issues={0} avgLoss={0} detailsLink="#" />
          </CardContent>
        </Card>

        {/* Agoda Card */}
        <Card className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
          <CardHeader className="flex flex-row items-center space-x-2 p-4 pb-2 pt-5">
            <div className="p-2 bg-orange-100 dark:bg-slate-700 rounded-lg">
              <Search className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-lg font-semibold">Agoda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <ParityIssue issues={61} avgLoss={-22} detailsLink="#" />
            {/* Agoda only has parity issues in the screenshot, no ranking or review score */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
