"use client"

import * as React from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FilterValue = {
  severity: string[]
  channels: string[]
  lossRange: [number, number]
  violationTypes: string[]
  regions: string[]
  savedFilter: string
  rateTypes: string[]
  roomTypes: string[]
  viewBy: string
}

const defaultFilters: FilterValue = {
  severity: [],
  channels: [],
  lossRange: [0, 100],
  violationTypes: [],
  regions: [],
  savedFilter: "none",
  rateTypes: [],
  roomTypes: [],
  viewBy: "cheapest",
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterValue) => void
  initialFilters?: Partial<FilterValue>
}

export function FilterSidebar({ isOpen, onClose, onApply, initialFilters = {} }: FilterSidebarProps) {
  const [filters, setFilters] = React.useState<FilterValue>({
    ...defaultFilters,
    ...initialFilters,
  })

  const handleCheckboxChange = (category: keyof FilterValue, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[]
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      }
    })
  }

  const handleRangeChange = (value: [number, number]) => {
    setFilters((prev) => ({
      ...prev,
      lossRange: value,
    }))
  }

  const handleRadioChange = (category: keyof FilterValue, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const severityOptions = [
    { id: "critical", label: "Critical (>15%)" },
    { id: "major", label: "Major (6-15%)" },
    { id: "trivial", label: "Trivial (0-5%)" },
  ]

  const channelOptions = [
    { id: "booking", label: "Booking.com" },
    { id: "expedia", label: "Expedia" },
    { id: "agoda", label: "Agoda" },
    { id: "makemytrip", label: "MakeMyTrip" },
    { id: "tripadvisor", label: "Tripadvisor" },
    { id: "google", label: "Google Hotel Finder" },
  ]

  const violationTypeOptions = [
    { id: "rate", label: "Rate Violations" },
    { id: "availability", label: "Availability Violations" },
  ]

  const regionOptions = [
    { id: "europe", label: "Europe" },
    { id: "asia", label: "Asia" },
    { id: "namerica", label: "North America" },
    { id: "samerica", label: "South America" },
    { id: "oceania", label: "Oceania" },
    { id: "africa", label: "Africa" },
  ]

  const savedFilterOptions = [
    { id: "critical-violations", label: "Critical Violations" },
    { id: "booking-issues", label: "Booking.com Issues" },
    { id: "high-loss-properties", label: "High Loss Properties" },
    { id: "availability-problems", label: "Availability Problems" },
  ]

  const rateTypeOptions = [
    { id: "low", label: "Lowest (LOW)" },
    { id: "bar", label: "Best Available Rate (BAR)" },
    { id: "qlf", label: "Qualified (QLF)" },
    { id: "rst", label: "Restricted (RST)" },
    { id: "prm", label: "Promotional (PRM)" },
    { id: "uql", label: "Un-Qualified (UQL)" },
  ]

  const roomTypeOptions = [
    { id: "any", label: "Any" },
    { id: "apt", label: "Apartment (APT)" },
    { id: "dlx", label: "Deluxe Room (DLX)" },
    { id: "std", label: "Standard Room (STD)" },
    { id: "stu", label: "Studio (STU)" },
    { id: "ste", label: "Suite (STE)" },
    { id: "sup", label: "Superior Room (SUP)" },
    { id: "vll", label: "Villa (VLL)" },
  ]

  const viewByOptions = [
    { id: "cheapest", label: "By Cheapest" },
    { id: "split", label: "By Split" },
    { id: "product", label: "By Product" },
  ]

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Filter sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[60] w-96 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out border-l border-gray-200 dark:bg-slate-900 dark:border-slate-700 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Advanced Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5 text-gray-500 dark:text-slate-400" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 block">Saved Filters</Label>
            <Select value={filters.savedFilter} onValueChange={(value) => handleRadioChange("savedFilter", value)}>
              <SelectTrigger className="w-full border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-[#1800FF] focus:ring-[#1800FF] dark:focus:border-[#1800FF]">
                <SelectValue placeholder="Select a saved filter" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                {savedFilterOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="dark:text-slate-300">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View By Section */}
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-3 block">View By</Label>
            <div className="flex items-center gap-4">
              {viewByOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="viewBy"
                    value={option.id}
                    checked={filters.viewBy === option.id}
                    onChange={() => handleRadioChange("viewBy", option.id)}
                    className="w-4 h-4 text-[#1800FF] border-gray-300 dark:border-slate-600 focus:ring-[#1800FF] dark:focus:ring-[#1800FF]"
                    style={{
                      accentColor: "#1800FF",
                    }}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      filters.viewBy === option.id ? "text-gray-900 dark:text-slate-100" : "text-gray-500 dark:text-slate-400",
                    )}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Separator className="border-gray-200" />

          <div className="space-y-6">
            <FilterSection title="Severity">
              <div className="space-y-3">
                {severityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`severity-${option.id}`}
                      checked={filters.severity.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("severity", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`severity-${option.id}`} className="text-sm text-gray-700 dark:text-slate-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Channels">
              <div className="space-y-3">
                {channelOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`channel-${option.id}`}
                      checked={filters.channels.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("channels", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`channel-${option.id}`} className="text-sm text-gray-700 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Loss Range">
              <div className="px-2 pt-2">
                <Slider
                  value={filters.lossRange}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleRangeChange}
                  className="my-4"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{filters.lossRange[0]}%</span>
                  <span className="text-sm text-gray-600">{filters.lossRange[1]}%</span>
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Violation Types">
              <div className="space-y-3">
                {violationTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`violation-${option.id}`}
                      checked={filters.violationTypes.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("violationTypes", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`violation-${option.id}`} className="text-sm text-gray-700 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Regions">
              <div className="space-y-3">
                {regionOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`region-${option.id}`}
                      checked={filters.regions.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("regions", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`region-${option.id}`} className="text-sm text-gray-700 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Rate Types">
              <div className="space-y-3">
                {rateTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`rate-type-${option.id}`}
                      checked={filters.rateTypes.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("rateTypes", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`rate-type-${option.id}`} className="text-sm text-gray-700 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Room Types">
              <div className="space-y-3">
                {roomTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`room-type-${option.id}`}
                      checked={filters.roomTypes.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange("roomTypes", option.id)}
                      className="border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]"
                    />
                    <Label htmlFor={`room-type-${option.id}`} className="text-sm text-gray-700 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex-shrink-0">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 h-12 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold transition-all duration-200"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
            <Button 
              className="flex-1 h-12 bg-gradient-to-r from-[#1800FF] to-[#1800FF] hover:from-[#1500CC] hover:to-[#1500CC] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200">
        <CollapsibleTrigger asChild>
          <div className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-t-xl transition-colors duration-200">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500 dark:text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-slate-400" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="border-gray-200 dark:border-slate-700" />
          <div className="p-4">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
