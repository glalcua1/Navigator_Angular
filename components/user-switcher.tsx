"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, RotateCcw, UserCheck } from 'lucide-react'
import { getMockUsers, setCurrentUser, type User } from '@/lib/user-context'
import { useUser } from '@/hooks/use-user'

/**
 * ============================================================================
 * USER SWITCHER COMPONENT (DEVELOPMENT ONLY)
 * ============================================================================
 * 
 * Development utility for testing different user contexts.
 * Allows switching between mock users to test auto-population
 * and user-specific features.
 * 
 * @author Rate Parity Dashboard Team
 * @version 1.0.0
 */

export function UserSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { user: currentUser } = useUser()
  const mockUsers = getMockUsers()

  const handleUserSwitch = (user: User) => {
    setCurrentUser(user)
    setIsOpen(false)
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
          size="sm"
        >
          <Users className="h-4 w-4 mr-2" />
          Dev: Switch User
        </Button>

        {/* User Switcher Panel */}
        {isOpen && (
          <Card className="absolute bottom-12 right-0 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                User Switcher
              </CardTitle>
              <CardDescription>
                Development tool to test different user contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                    currentUser?.id === user.id
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => handleUserSwitch(user)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{user.role}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                        {user.email}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        ID: {user.id}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Hotel: {user.hotelName}
                      </div>
                    </div>
                    {currentUser?.id === user.id && (
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Active
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                  💡 Switch users to test auto-population in support forms
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}