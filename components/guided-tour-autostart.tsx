"use client"

import { useEffect } from "react"
import { guidedTour } from "@/lib/guided-tour"

/**
 * ============================================================================
 * GUIDED TOUR AUTO-START COMPONENT
 * ============================================================================
 * 
 * Automatically initiates guided tour for first-time users
 * with professional onboarding experience.
 * 
 * Features:
 * - First-time user detection
 * - Non-intrusive tour suggestion
 * - Progress tracking
 * - Smooth integration with dashboard
 * 
 * @author Senior UX Designer
 * @version 1.0.0
 */

export function GuidedTourAutoStart() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check if this is a first-time user
    const isFirstTime = guidedTour.isFirstTimeUser()
    
    if (isFirstTime) {
      // Delay to ensure all components are mounted and ready
      const timer = setTimeout(() => {
        try {
          // Check if the user wants to take a tour
          const shouldStartTour = window.confirm(
            "👋 Welcome to the Rate Parity Dashboard!\n\n" +
            "This dashboard helps hotel revenue managers optimize pricing and track performance.\n\n" +
            "Would you like a quick 5-minute tour to get started?"
          )

          if (shouldStartTour) {
            // Start the quick tour
            guidedTour.startQuickTour()
          }

          // Mark user as having visited
          guidedTour.markUserAsReturning()
        } catch (error) {
          console.warn('Failed to start guided tour:', error)
          // Still mark as returning user to avoid repeated prompts
          guidedTour.markUserAsReturning()
        }
      }, 3000) // Wait 3 seconds for page to fully load

      return () => clearTimeout(timer)
    }
  }, [])

  // This component doesn't render anything visible
  return null
} 