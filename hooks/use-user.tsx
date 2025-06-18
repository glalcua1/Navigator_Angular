"use client"

import { useState, useEffect } from 'react'
import { getCurrentUser, getSupportUserContext, type User } from '@/lib/user-context'

/**
 * ============================================================================
 * USE USER HOOK
 * ============================================================================
 * 
 * React hook for accessing current user data and session information.
 * Automatically updates when user data changes and provides utilities
 * for user-related operations.
 * 
 * @author Rate Parity Dashboard Team
 * @version 1.0.0
 */

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial user data
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)

    // Listen for user changes
    const handleUserChange = (event: CustomEvent) => {
      setUser(event.detail)
    }

    const handleUserLogout = () => {
      setUser(null)
    }

    // Add event listeners
    window.addEventListener('userChanged', handleUserChange as EventListener)
    window.addEventListener('userLoggedOut', handleUserLogout)

    // Cleanup
    return () => {
      window.removeEventListener('userChanged', handleUserChange as EventListener)
      window.removeEventListener('userLoggedOut', handleUserLogout)
    }
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    // Utility functions
    getSupportContext: getSupportUserContext,
    displayName: user?.name || user?.email || 'Guest User',
    initials: user ? getInitials(user.name || user.email || 'Guest User') : 'GU',
    role: user?.role || 'Guest',
    email: user?.email || '',
    userId: user?.id || '',
    hotelName: user?.hotelName || 'Unknown Hotel'
  }
}

/**
 * Helper function to get user initials
 */
function getInitials(name: string): string {
  const nameParts = name.split(' ')
  
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  }
  
  return name.substring(0, 2).toUpperCase()
} 