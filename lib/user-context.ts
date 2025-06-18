/**
 * ============================================================================
 * USER CONTEXT & SESSION MANAGEMENT
 * ============================================================================
 * 
 * Provides user session data for the Rate Parity Dashboard.
 * Currently uses mock data for development, but designed to be easily
 * replaced with real authentication providers (Auth0, Firebase, etc.)
 * 
 * @author Rate Parity Dashboard Team
 * @version 1.0.0
 */

export interface User {
  id: string
  email: string
  name: string
  role: string
  hotelId?: string
  hotelName?: string
  permissions?: string[]
  avatar?: string
  lastLogin?: Date
  isActive: boolean
}

export interface UserSession {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error?: string
}

/**
 * Mock user data for development
 * In production, this would come from your authentication provider
 */
const MOCK_USERS: User[] = [
  {
    id: "usr_001_gm_grandhotel",
    email: "gaurav.manager@grandhotel.com",
    name: "Gaurav Lal",
    role: "General Manager",
    hotelId: "hotel_001",
    hotelName: "Grand Hotel & Spa",
    permissions: ["dashboard:read", "rates:manage", "reports:generate"],
    avatar: "/placeholder-user.jpg",
    lastLogin: new Date(),
    isActive: true
  },
  {
    id: "usr_002_rm_cityview",
    email: "sarah.revenue@cityviewhotel.com", 
    name: "Sarah Johnson",
    role: "Revenue Manager",
    hotelId: "hotel_002",
    hotelName: "City View Business Hotel",
    permissions: ["dashboard:read", "rates:manage"],
    avatar: "/placeholder-user.jpg",
    lastLogin: new Date(),
    isActive: true
  },
  {
    id: "usr_003_ops_seaside",
    email: "mike.operations@seasideresort.com",
    name: "Mike Chen",
    role: "Operations Manager", 
    hotelId: "hotel_003",
    hotelName: "Seaside Resort & Marina",
    permissions: ["dashboard:read", "reports:view"],
    avatar: "/placeholder-user.jpg",
    lastLogin: new Date(),
    isActive: true
  }
]

/**
 * Get current user session
 * In development: returns mock user data
 * In production: would integrate with your auth provider
 */
export function getCurrentUser(): User | null {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return null
  }

  try {
    // Try to get user from localStorage (for development persistence)
    const storedUser = localStorage.getItem('rate-parity-user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      // Validate user object has required fields
      if (user.id && user.email && user.name) {
        return user
      }
    }

    // Default to first mock user if no stored user
    const defaultUser = MOCK_USERS[0]
    localStorage.setItem('rate-parity-user', JSON.stringify(defaultUser))
    return defaultUser

  } catch (error) {
    console.warn('Error getting current user:', error)
    return MOCK_USERS[0] // Fallback to default user
  }
}

/**
 * Set current user (for development/testing)
 */
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('rate-parity-user', JSON.stringify(user))
    
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('userChanged', { detail: user }))
  } catch (error) {
    console.warn('Error setting current user:', error)
  }
}

/**
 * Switch to a different mock user (for development/testing)
 */
export function switchMockUser(userId: string): User | null {
  const user = MOCK_USERS.find(u => u.id === userId)
  if (user) {
    setCurrentUser(user)
    return user
  }
  return null
}

/**
 * Get all available mock users (for development)
 */
export function getMockUsers(): User[] {
  return MOCK_USERS
}

/**
 * Logout user
 */
export function logout(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('rate-parity-user')
    window.dispatchEvent(new CustomEvent('userLoggedOut'))
  } catch (error) {
    console.warn('Error during logout:', error)
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(permission: string, user?: User): boolean {
  const currentUser = user || getCurrentUser()
  if (!currentUser || !currentUser.permissions) return false
  
  return currentUser.permissions.includes(permission) || 
         currentUser.permissions.includes('admin:all')
}

/**
 * Get user display name
 */
export function getUserDisplayName(user?: User): string {
  const currentUser = user || getCurrentUser()
  if (!currentUser) return 'Guest User'
  
  return currentUser.name || currentUser.email || 'Unknown User'
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(user?: User): string {
  const currentUser = user || getCurrentUser()
  if (!currentUser) return 'GU'
  
  const name = currentUser.name || currentUser.email || 'Guest User'
  const nameParts = name.split(' ')
  
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  }
  
  return name.substring(0, 2).toUpperCase()
}

/**
 * Generate support ticket user context
 */
export function getSupportUserContext(): { email: string; userId: string } {
  const user = getCurrentUser()
  
  return {
    email: user?.email || '',
    userId: user?.id || ''
  }
}

// Export mock users for development tools
export { MOCK_USERS } 