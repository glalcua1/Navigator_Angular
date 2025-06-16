/**
 * ============================================================================
 * GUIDED TOUR SYSTEM
 * ============================================================================
 * 
 * Professional onboarding system for hotel revenue managers
 * designed to provide comprehensive dashboard orientation.
 * 
 * Features:
 * - Interactive step-by-step tours
 * - Contextual tooltips and highlights
 * - Progress tracking
 * - Skip and navigation controls
 * - Responsive design
 * 
 * @author Senior UX Designer
 * @version 1.0.0
 */

import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export interface TourStep {
  element: string
  popover: {
    title: string
    description: string
    side?: 'top' | 'bottom' | 'left' | 'right'
    align?: 'start' | 'center' | 'end'
  }
}

export interface TourConfig {
  steps: TourStep[]
  showProgress?: boolean
  allowClose?: boolean
  overlayClickNext?: boolean
  smoothScroll?: boolean
}

/**
 * Quick Tour - Essential features overview (5 minutes)
 */
const quickTourSteps: TourStep[] = [
  {
    element: '[data-tour="header"]',
    popover: {
      title: '🏨 Welcome to Rate Parity Dashboard',
      description: 'This is your command center for hotel revenue management. Let\'s take a quick tour of the essential features.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="hotel-selector"]',
    popover: {
      title: '🏢 Hotel Selector',
      description: 'Switch between your properties here. Each hotel has its own performance data and analytics.',
      side: 'bottom',
      align: 'start'
    }
  },
  {
    element: '[data-tour="date-range"]',
    popover: {
      title: '📅 Date Range Control',
      description: 'Adjust your reporting period to analyze performance trends. Use quick presets or select custom ranges.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="theme-toggle"]',
    popover: {
      title: '🌙 Theme Toggle',
      description: 'Switch between light and dark modes for comfortable viewing during extended analysis sessions.',
      side: 'bottom',
      align: 'end'
    }
  },
  {
    element: '[data-tour="kpi-cards"]',
    popover: {
      title: '📊 Key Performance Indicators',
      description: 'Your most important metrics at a glance: RevPAR, ADR, Occupancy, and Market Share. Trend arrows show performance direction.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="performance-chart"]',
    popover: {
      title: '📈 Performance Pulse',
      description: 'Track your rate trends vs. competitors. Use this to identify pricing opportunities and market positioning.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="market-demand"]',
    popover: {
      title: '🎯 Market Demand Widget',
      description: 'Understand demand patterns in your market. Green indicates opportunities, red shows high-demand periods.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="filters"]',
    popover: {
      title: '🔍 Smart Filters',
      description: 'Drill down into specific segments, dates, or markets. Save your favorite filter combinations for quick access.',
      side: 'bottom',
      align: 'center'
    }
  }
]

/**
 * Comprehensive Tour - In-depth feature walkthrough (15 minutes)
 */
const comprehensiveTourSteps: TourStep[] = [
  {
    element: '[data-tour="header"]',
    popover: {
      title: '🎯 Comprehensive Dashboard Tour',
      description: 'Welcome to the complete walkthrough! We\'ll explore every feature to make you a dashboard expert.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="hotel-selector"]',
    popover: {
      title: '🏢 Multi-Property Management',
      description: 'Manage multiple properties from one dashboard. Each hotel maintains separate data, comp sets, and performance metrics. Use the search to quickly find specific properties.',
      side: 'bottom',
      align: 'start'
    }
  },
  {
    element: '[data-tour="date-range"]',
    popover: {
      title: '📅 Advanced Date Controls',
      description: 'Historical Analysis: Compare YoY, MoM performance. Future Booking: Analyze booking pace and forward demand. Custom Ranges: Set specific periods for detailed analysis.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="kpi-cards"]',
    popover: {
      title: '📊 KPI Deep Dive',
      description: 'RevPAR = ADR × Occupancy (your primary revenue metric). ADR trends indicate pricing strategy effectiveness. Occupancy shows demand strength. Market Share reveals competitive position.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="performance-chart"]',
    popover: {
      title: '📈 Performance Analytics',
      description: 'Line Chart: Track rate trends over time. Competitive View: Compare vs. comp set properties. Tooltip Details: Hover for specific data points and rankings.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="rate-trends"]',
    popover: {
      title: '💰 Rate Trend Analysis',
      description: 'Performance Tab: Your rates vs. market average. Rate Trends Tab: Detailed competitive positioning. Use this to identify pricing gaps and opportunities.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="market-demand"]',
    popover: {
      title: '🎯 Market Intelligence',
      description: 'Demand Levels: Very Low (Blue) to Very High (Red). Opportunity Indicators: Green highlights where you can increase rates. Market Events: Special events affecting demand.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="property-health"]',
    popover: {
      title: '🏥 Property Health Score',
      description: 'Distribution Performance: How well you\'re represented across channels. Channel Optimization: Identify underperforming booking sources. Health Metrics: Overall property performance score.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="filters"]',
    popover: {
      title: '🔍 Advanced Filtering',
      description: 'Quick Filters: Date, property, market segment. Advanced Options: Rate codes, room types, booking sources. Saved Views: Store frequently used filter combinations.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="help-support"]',
    popover: {
      title: '❓ Help & Support',
      description: 'Knowledge Base: Searchable articles and best practices. Video Tutorials: Step-by-step training content. Support Tickets: Get help from our revenue management experts.',
      side: 'bottom',
      align: 'end'
    }
  }
]

/**
 * Revenue Manager Specific Tour - Industry best practices
 */
const revenueManagerTourSteps: TourStep[] = [
  {
    element: '[data-tour="kpi-cards"]',
    popover: {
      title: '💼 Revenue Manager\'s Daily Routine',
      description: 'Start here each morning. Check overnight performance vs. forecast. Look for unusual patterns or competitor rate changes.',
      side: 'bottom',
      align: 'center'
    }
  },
  {
    element: '[data-tour="performance-chart"]',
    popover: {
      title: '📊 Rate Strategy Analysis',
      description: 'Best Practice: Check competitive position daily. If you\'re significantly below market, consider rate increases. If above market, monitor pickup closely.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="market-demand"]',
    popover: {
      title: '🎯 Demand-Based Pricing',
      description: 'Revenue Tip: Green periods indicate rate increase opportunities. Red periods suggest premium pricing potential. Adjust rates 2-3 days ahead for optimal pickup.',
      side: 'top',
      align: 'center'
    }
  },
  {
    element: '[data-tour="filters"]',
    popover: {
      title: '🔍 Segment Analysis',
      description: 'Pro Tip: Filter by booking source to identify channel performance. Analyze corporate vs. leisure patterns. Adjust channel strategies based on performance.',
      side: 'bottom',
      align: 'center'
    }
  }
]

/**
 * Tour Configuration Class
 */
export class GuidedTourManager {
  private static instance: GuidedTourManager
  private currentTour: any = null

  private constructor() {}

  static getInstance(): GuidedTourManager {
    if (!GuidedTourManager.instance) {
      GuidedTourManager.instance = new GuidedTourManager()
    }
    return GuidedTourManager.instance
  }

  /**
   * Start Quick Tour (5 minutes)
   */
  startQuickTour(): void {
    this.startTour(quickTourSteps, {
      showButtons: ['next', 'previous', 'close'],
      showProgress: true,
      progressText: '{{current}} of {{total}}',
      nextBtnText: 'Next →',
      prevBtnText: '← Previous',
      doneBtnText: 'Finish Tour',
      closeBtnText: 'Skip Tour',
      onDestroyed: () => {
        this.trackTourCompletion('quick-tour')
      }
    })
  }

  /**
   * Start Comprehensive Tour (15 minutes)
   */
  startComprehensiveTour(): void {
    this.startTour(comprehensiveTourSteps, {
      showButtons: ['next', 'previous', 'close'],
      showProgress: true,
      progressText: 'Step {{current}} of {{total}}',
      nextBtnText: 'Continue →',
      prevBtnText: '← Back',
      doneBtnText: 'Complete Tour',
      closeBtnText: 'Exit Tour',
      onDestroyed: () => {
        this.trackTourCompletion('comprehensive-tour')
      }
    })
  }

  /**
   * Start Revenue Manager Specific Tour
   */
  startRevenueManagerTour(): void {
    this.startTour(revenueManagerTourSteps, {
      showButtons: ['next', 'previous', 'close'],
      showProgress: true,
      progressText: 'Best Practice {{current}} of {{total}}',
      nextBtnText: 'Next Tip →',
      prevBtnText: '← Previous Tip',
      doneBtnText: 'Ready to Excel!',
      closeBtnText: 'Skip Tips',
      onDestroyed: () => {
        this.trackTourCompletion('revenue-manager-tour')
      }
    })
  }

  /**
   * Generic tour starter
   */
  private startTour(steps: TourStep[], config: any): void {
    // Ensure all tour elements are present
    const missingElements = this.validateTourElements(steps)
    if (missingElements.length > 0) {
      console.warn('Tour elements missing:', missingElements)
      // Filter out missing elements
      steps = steps.filter(step => !missingElements.includes(step.element))
    }

    this.currentTour = driver({
      steps: steps.map(step => ({
        element: step.element,
        popover: {
          ...step.popover,
          className: 'tour-popover'
        }
      })),
      ...config,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      smoothScroll: true,
      allowClose: true,
      overlayClickNext: false,
      stagePadding: 8,
      stageRadius: 8
    })

    this.currentTour.drive()
  }

  /**
   * Validate that tour elements exist in the DOM
   */
  private validateTourElements(steps: TourStep[]): string[] {
    const missingElements: string[] = []
    
    steps.forEach(step => {
      if (!document.querySelector(step.element)) {
        missingElements.push(step.element)
      }
    })

    return missingElements
  }

  /**
   * Track tour completion for analytics
   */
  private trackTourCompletion(tourType: string): void {
    // Track completion in localStorage
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]')
    if (!completedTours.includes(tourType)) {
      completedTours.push(tourType)
      localStorage.setItem('completedTours', JSON.stringify(completedTours))
    }

    // Track timestamp
    localStorage.setItem(`tour-${tourType}-completed`, new Date().toISOString())

    console.log(`✅ Tour completed: ${tourType}`)
  }

  /**
   * Check if user has completed a specific tour
   */
  hasTourBeenCompleted(tourType: string): boolean {
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]')
    return completedTours.includes(tourType)
  }

  /**
   * Reset all tour progress (for testing)
   */
  resetTourProgress(): void {
    localStorage.removeItem('completedTours')
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('tour-') && key.endsWith('-completed')) {
        localStorage.removeItem(key)
      }
    })
    console.log('🔄 Tour progress reset')
  }

  /**
   * Stop current tour
   */
  stopTour(): void {
    if (this.currentTour) {
      this.currentTour.destroy()
      this.currentTour = null
    }
  }

  /**
   * Check if this is user's first visit
   */
  isFirstTimeUser(): boolean {
    return !localStorage.getItem('hasVisitedBefore')
  }

  /**
   * Mark user as having visited before
   */
  markUserAsReturning(): void {
    localStorage.setItem('hasVisitedBefore', 'true')
    localStorage.setItem('firstVisit', new Date().toISOString())
  }

  /**
   * Auto-start tour for first-time users
   */
  autoStartForNewUsers(): void {
    if (this.isFirstTimeUser()) {
      // Delay to ensure page is loaded
      setTimeout(() => {
        if (confirm('Welcome to Rate Parity Dashboard! Would you like to take a quick tour to get started?')) {
          this.startQuickTour()
        }
        this.markUserAsReturning()
      }, 2000)
    }
  }
}

// Global instance
export const guidedTour = GuidedTourManager.getInstance()

/**
 * Hook for React components to use guided tour
 */
export function useGuidedTour() {
  const startQuickTour = () => guidedTour.startQuickTour()
  const startComprehensiveTour = () => guidedTour.startComprehensiveTour()
  const startRevenueManagerTour = () => guidedTour.startRevenueManagerTour()
  const stopTour = () => guidedTour.stopTour()
  const isFirstTime = () => guidedTour.isFirstTimeUser()
  const resetProgress = () => guidedTour.resetTourProgress()

  return {
    startQuickTour,
    startComprehensiveTour,
    startRevenueManagerTour,
    stopTour,
    isFirstTime,
    resetProgress,
    hasTourBeenCompleted: (tourType: string) => guidedTour.hasTourBeenCompleted(tourType)
  }
} 