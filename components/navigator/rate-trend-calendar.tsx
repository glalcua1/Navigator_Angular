"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RateTrendGraph } from "./rate-trend-graph"
import { RateDetailModal } from "./rate-detail-modal"
import { useState, useMemo, useCallback, useEffect } from "react"

/**
 * Interface defining the structure of a calendar day entry
 * Used for type safety and component props validation
 */
interface CalendarDay {
  date: number
  month: number // 0-indexed (0 for Jan, 11 for Dec)
  year: number
  price: string
  comparison: string
  hasFlag?: boolean
  flagCountry?: string
  hasIndicator?: boolean
  indicatorType?: "circle" | "square"
  indicatorColor?: string
}

// Updated calendarData to include month and year for Date object creation
const calendarData: CalendarDay[][] = [
  // Week 1 (May 26 - June 1, 2025) - Assuming current year is 2025 for example
  [
    { date: 26, month: 4, year: 2025, price: "$680", comparison: "-70% vs. Comp" },
    { date: 27, month: 4, year: 2025, price: "$680", comparison: "-70% vs. Comp" },
    { date: 28, month: 4, year: 2025, price: "$680", comparison: "-69% vs. Comp" },
    {
      date: 29,
      month: 4,
      year: 2025,
      price: "$680",
      comparison: "-69% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    {
      date: 30,
      month: 4,
      year: 2025,
      price: "$680",
      comparison: "-69% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    {
      date: 31,
      month: 4,
      year: 2025,
      price: "$680",
      comparison: "-69% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    {
      date: 1,
      month: 5,
      year: 2025, // June 1st
      price: "$680",
      comparison: "-69% vs. Comp",
      hasIndicator: true,
      indicatorType: "square",
      indicatorColor: "bg-red-500",
    },
  ],
  // Week 2 (June 2-8, 2025)
  [
    {
      date: 2,
      month: 5,
      year: 2025,
      price: "$680",
      comparison: "-70% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    { date: 3, month: 5, year: 2025, price: "$680", comparison: "-69% vs. Comp" },
    { date: 4, month: 5, year: 2025, price: "$680", comparison: "-69% vs. Comp" },
    { date: 5, month: 5, year: 2025, price: "$680", comparison: "-69% vs. Comp", hasFlag: true, flagCountry: "🇨🇦" },
    {
      date: 6,
      month: 5,
      year: 2025,
      price: "$680",
      comparison: "-69% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    {
      date: 7,
      month: 5,
      year: 2025,
      price: "$680",
      comparison: "-70% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
    {
      date: 8,
      month: 5,
      year: 2025,
      price: "$680",
      comparison: "-71% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
  ],
  // Week 3 (June 9-15, 2025) - This is the week containing June 14th from the screenshot
  [
    {
      date: 9,
      month: 5,
      year: 2025,
      price: "$810",
      comparison: "-64% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
      indicatorColor: "bg-orange-500",
    },
    { date: 10, month: 5, year: 2025, price: "$810", comparison: "-61% vs. Comp", hasFlag: true, flagCountry: "🇧🇪" },
    { date: 11, month: 5, year: 2025, price: "$810", comparison: "-61% vs. Comp", hasFlag: true, flagCountry: "🇮🇳" },
    { date: 12, month: 5, year: 2025, price: "$810", comparison: "-61% vs. Comp", hasFlag: true, flagCountry: "🇪🇸" },
    { date: 13, month: 5, year: 2025, price: "$810", comparison: "-61% vs. Comp" },
    { date: 14, month: 5, year: 2025, price: "$680", comparison: "-67% vs. Comp" }, // Saturday, June 14, 2025
    {
      date: 15,
      month: 5,
      year: 2025,
      price: "$680",
      comparison: "-67% vs. Comp",
      hasIndicator: true,
      indicatorType: "circle",
    },
  ],
  // Add more weeks as needed, ensuring month and year are correct
]

/**
 * Array of weekday names for calendar header
 * Used to display consistent day labels across mobile and desktop views
 */
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

/**
 * Props interface for the RateTrendCalendar component
 */
interface RateTrendCalendarProps {
  currentView: "calendar" | "chart" | "table"
}

/**
 * Enhanced Rate Trend Calendar Component
 * 
 * A comprehensive calendar component that displays rate trends with the following features:
 * - Responsive design (mobile and desktop layouts)
 * - Interactive date selection with modal details
 * - Multi-view support (calendar, chart, table)
 * - Week-by-week navigation on mobile
 * - Visual indicators for special events and pricing changes
 * - Proper error handling and debugging capabilities
 * 
 * @param {RateTrendCalendarProps} props - Component configuration
 * @returns {JSX.Element} Rendered calendar component
 * 
 * @example
 * ```tsx
 * <RateTrendCalendar currentView="calendar" />
 * ```
 */
export function RateTrendCalendar({ currentView }: RateTrendCalendarProps) {
  // Debug flag for development logging
  const DEBUG_MODE = process.env.NODE_ENV === 'development'
  
  // State management with proper initialization
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | null>(null)
  
  /**
   * Memoized computation of flattened calendar data
   * Optimizes performance by preventing unnecessary recalculations
   */
  const allDays = useMemo(() => {
    try {
      const flattened = calendarData.flat()
      if (DEBUG_MODE) {
        console.log(`[RateTrendCalendar] Flattened ${flattened.length} calendar days`)
      }
      return flattened
    } catch (error) {
      console.error('[RateTrendCalendar] Error flattening calendar data:', error)
      return []
    }
  }, [DEBUG_MODE])

  /**
   * Handles date selection and modal opening
   * Includes error handling and debug logging
   * 
   * @param {CalendarDay} dayData - The selected day's data
   */
  const handleDateClick = useCallback((dayData: CalendarDay) => {
    try {
      const selectedDate = new Date(dayData.year, dayData.month, dayData.date)
      
      if (DEBUG_MODE) {
        console.log(`[RateTrendCalendar] Date clicked:`, {
          date: selectedDate.toISOString(),
          price: dayData.price,
          comparison: dayData.comparison
        })
      }
      
      setSelectedDateForModal(selectedDate)
      setIsModalOpen(true)
    } catch (error) {
      console.error('[RateTrendCalendar] Error handling date click:', error)
    }
  }, [DEBUG_MODE])

  /**
   * Closes the rate detail modal and resets selection
   */
  const closeModal = useCallback(() => {
    if (DEBUG_MODE) {
      console.log('[RateTrendCalendar] Closing modal')
    }
    setIsModalOpen(false)
    setSelectedDateForModal(null)
  }, [DEBUG_MODE])

  /**
   * Finds the index of a specific date in the flattened calendar data
   * 
   * @param {Date | null} date - The date to find
   * @returns {number} The index of the date, or -1 if not found
   */
  const findDayIndex = useCallback((date: Date | null): number => {
    if (!date) {
      if (DEBUG_MODE) {
        console.warn('[RateTrendCalendar] findDayIndex called with null date')
      }
      return -1
    }
    
    try {
      const index = allDays.findIndex(
        (d) => d.year === date.getFullYear() && d.month === date.getMonth() && d.date === date.getDate(),
      )
      
      if (DEBUG_MODE && index === -1) {
        console.warn(`[RateTrendCalendar] Date not found in calendar data:`, date.toISOString())
      }
      
      return index
    } catch (error) {
      console.error('[RateTrendCalendar] Error finding day index:', error)
      return -1
    }
  }, [allDays, DEBUG_MODE])

  /**
   * Navigates to the previous or next day in the modal
   * Includes boundary checking and error handling
   * 
   * @param {"prev" | "next"} direction - Navigation direction
   */
  const navigateDay = useCallback((direction: "prev" | "next") => {
    if (!selectedDateForModal) {
      if (DEBUG_MODE) {
        console.warn('[RateTrendCalendar] navigateDay called without selected date')
      }
      return
    }
    
    try {
      const currentIndex = findDayIndex(selectedDateForModal)
      const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1

      if (newIndex >= 0 && newIndex < allDays.length) {
        const newDayData = allDays[newIndex]
        const newDate = new Date(newDayData.year, newDayData.month, newDayData.date)
        
        if (DEBUG_MODE) {
          console.log(`[RateTrendCalendar] Navigating ${direction} to:`, newDate.toISOString())
        }
        
        setSelectedDateForModal(newDate)
      } else {
        if (DEBUG_MODE) {
          console.warn(`[RateTrendCalendar] Cannot navigate ${direction}: index ${newIndex} out of bounds`)
        }
      }
    } catch (error) {
      console.error('[RateTrendCalendar] Error navigating day:', error)
    }
  }, [selectedDateForModal, findDayIndex, allDays, DEBUG_MODE])

  /**
   * Navigation handlers for week-based mobile view
   */
  const nextWeek = useCallback(() => {
    setCurrentWeekIndex((prev) => {
      const newIndex = Math.min(prev + 1, calendarData.length - 1)
      if (DEBUG_MODE) {
        console.log(`[RateTrendCalendar] Moving to week ${newIndex + 1}`)
      }
      return newIndex
    })
  }, [DEBUG_MODE])

  const prevWeek = useCallback(() => {
    setCurrentWeekIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0)
      if (DEBUG_MODE) {
        console.log(`[RateTrendCalendar] Moving to week ${newIndex + 1}`)
      }
      return newIndex
    })
  }, [DEBUG_MODE])

  // Debug effect to log component state changes
  useEffect(() => {
    if (DEBUG_MODE) {
      console.log(`[RateTrendCalendar] State update:`, {
        currentView,
        currentWeekIndex,
        isModalOpen,
        selectedDate: selectedDateForModal?.toISOString() || null,
        totalDays: allDays.length
      })
    }
  }, [currentView, currentWeekIndex, isModalOpen, selectedDateForModal, allDays.length, DEBUG_MODE])

  // View routing with error boundaries
  if (currentView === "chart") {
    return <RateTrendGraph />
  }

  if (currentView === "table") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500 py-8">Table view coming soon...</div>
      </div>
    )
  }

  // Render calendar view with comprehensive error handling
  try {
    return (
      <>
        <div className="bg-white rounded-lg shadow-sm">
          {/* Mobile View - Single Week with Navigation */}
          <div className="block lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" onClick={prevWeek} disabled={currentWeekIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Week {currentWeekIndex + 1} of {calendarData.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextWeek}
                  disabled={currentWeekIndex === calendarData.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Grid - 2 columns */}
              <div className="grid grid-cols-2 gap-3">
                {calendarData[currentWeekIndex]?.map((day, dayIndex) => (
                  <Card key={`mobile-${dayIndex}`} className="p-3 cursor-pointer" onClick={() => handleDateClick(day)}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          {weekDays[dayIndex % 7]} {day.date}
                        </span>
                        {day.hasFlag && <span className="text-lg">{day.flagCountry}</span>}
                        {day.hasIndicator && (
                          <div
                            className={`w-2 h-2 rounded-full ${day.indicatorColor || "bg-gray-400"} ${day.indicatorType === "square" ? "rounded-none" : ""}`}
                          />
                        )}
                      </div>
                      <div className="bg-green-100 rounded-md p-2 text-center">
                        <div className="text-lg font-bold text-gray-800">{day.price}</div>
                        <div className="text-xs text-green-700">{day.comparison}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop View - Full Calendar Grid */}
          <div className="hidden lg:block p-6">
            {/* Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
              {weekDays.map((day) => (
                <div key={day} className="text-sm font-medium text-gray-600 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="space-y-4">
              {calendarData.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-4">
                  {week.map((day, dayIndex) => (
                    <Card
                      key={`desktop-${weekIndex}-${dayIndex}`}
                      className="p-3 hover:shadow-md transition-shadow relative cursor-pointer"
                      onClick={() => handleDateClick(day)}
                    >
                      <div className="space-y-2">
                        {/* Date and Flag */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">{day.date}</span>
                          {day.hasFlag && <span className="text-lg">{day.flagCountry}</span>}
                          {day.hasIndicator && (
                            <div
                              className={`w-2 h-2 rounded-full ${day.indicatorColor || "bg-gray-400"} ${day.indicatorType === "square" ? "rounded-none" : ""}`}
                            />
                          )}
                        </div>

                        {/* Price Card */}
                        <div className="bg-green-100 rounded-md p-2 text-center">
                          <div className="text-lg font-bold text-gray-800">{day.price}</div>
                          <div className="text-xs text-green-700">{day.comparison}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Rate Detail Modal */}
        <RateDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDate={selectedDateForModal}
          onPrevDay={() => navigateDay("prev")}
          onNextDay={() => navigateDay("next")}
        />
      </>
    )
  } catch (error) {
    console.error('[RateTrendCalendar] Render error:', error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-red-800 font-medium mb-2">Calendar Error</h3>
          <p className="text-red-600 text-sm">
            Unable to render calendar. Please refresh the page or contact support.
          </p>
          {DEBUG_MODE && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-red-700 font-mono text-xs">Debug Info</summary>
              <pre className="mt-2 text-xs text-red-800 bg-red-100 p-2 rounded overflow-auto">
                {error instanceof Error ? error.stack : String(error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    )
  }
}
