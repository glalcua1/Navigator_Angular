"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MessageCircle, X, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CSATOption {
  id: number
  emoji: string
  title: string
  description: string
  color: string
}

const csatOptions: CSATOption[] = [
  {
    id: 5,
    emoji: "🤩",
    title: "Very Satisfied",
    description: "Excellent experience",
    color: "hover:bg-green-50 dark:hover:bg-green-950/20 border-green-200 dark:border-green-800"
  },
  {
    id: 4,
    emoji: "😊",
    title: "Satisfied",
    description: "Good experience",
    color: "hover:bg-blue-50 dark:hover:bg-blue-950/20 border-blue-200 dark:border-blue-800"
  },
  {
    id: 3,
    emoji: "😐",
    title: "Neutral",
    description: "Average experience",
    color: "hover:bg-gray-50 dark:hover:bg-gray-800/20 border-gray-200 dark:border-gray-700"
  },
  {
    id: 2,
    emoji: "🙁",
    title: "Dissatisfied",
    description: "Below expectations",
    color: "hover:bg-orange-50 dark:hover:bg-orange-950/20 border-orange-200 dark:border-orange-800"
  },
  {
    id: 1,
    emoji: "😞",
    title: "Very Dissatisfied",
    description: "Poor experience",
    color: "hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-800"
  }
]

export function CSATDrawer() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(true)

  // Check if user has already provided feedback in this session
  useEffect(() => {
    const hasProvidedFeedback = sessionStorage.getItem('csat-feedback-provided')
    if (hasProvidedFeedback) {
      setShouldAutoTrigger(false)
    }
  }, [])

  // Scroll detection logic
  const handleScroll = useCallback(() => {
    if (!shouldAutoTrigger || hasReachedBottom || isOpen) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Calculate if user has scrolled to within 100px of the bottom
    const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 100

    if (scrolledToBottom && !hasReachedBottom) {
      setHasReachedBottom(true)
      
      // Add a small delay before showing the survey for better UX
      setTimeout(() => {
        if (shouldAutoTrigger && !isOpen) {
          setIsOpen(true)
        }
      }, 1000) // 1 second delay
    }
  }, [shouldAutoTrigger, hasReachedBottom, isOpen])

  // Add scroll event listener
  useEffect(() => {
    if (!shouldAutoTrigger) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, shouldAutoTrigger])

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating)
  }

  const handleSubmit = () => {
    if (selectedRating) {
      // Here you would typically send the rating to your backend
      console.log('CSAT Rating submitted:', selectedRating)
      setHasSubmitted(true)
      
      // Mark feedback as provided in this session
      sessionStorage.setItem('csat-feedback-provided', 'true')
      setShouldAutoTrigger(false)
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
        setHasSubmitted(false)
        setSelectedRating(null)
      }, 2000)
    }
  }

  const handleManualOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    // If user closes without submitting, don't auto-trigger again in this session
    if (!hasSubmitted) {
      sessionStorage.setItem('csat-feedback-dismissed', 'true')
      setShouldAutoTrigger(false)
    }
  }

  return (
    <>
      {/* Floating CSAT Button */}
      <Drawer open={isOpen} onOpenChange={handleClose}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            onClick={handleManualOpen}
            className={cn(
              "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 border-2 border-white dark:border-gray-800",
              hasReachedBottom && shouldAutoTrigger && "animate-pulse ring-4 ring-primary/30"
            )}
            aria-label="Rate your experience"
          >
            <BarChart3 className="h-6 w-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-w-md mx-auto">
          <DrawerHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DrawerTitle className="text-xl font-semibold">
              How was your experience?
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              {hasReachedBottom && shouldAutoTrigger 
                ? "We noticed you've explored our dashboard. Please share your feedback!"
                : "Please rate your overall satisfaction"
              }
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 pb-6">
            {hasSubmitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-medium mb-2">Thank you for your feedback!</h3>
                <p className="text-muted-foreground">Your rating helps us improve our service.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {csatOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleRatingSelect(option.id)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                      option.color,
                      selectedRating === option.id
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{option.title}</h4>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      {selectedRating === option.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!hasSubmitted && (
            <DrawerFooter className="pt-0">
              <div className="flex gap-3">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1">
                    {hasReachedBottom && shouldAutoTrigger ? "Maybe Later" : "Cancel"}
                  </Button>
                </DrawerClose>
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedRating}
                  className="flex-1"
                >
                  Submit Rating
                </Button>
              </div>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
} 