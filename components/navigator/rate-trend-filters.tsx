"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, Filter } from "lucide-react"
import { useState } from "react"

export function RateTrendFilters() {
  const [showAllFilters, setShowAllFilters] = useState(false)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Mobile: Show only essential filters + toggle button */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Lowest
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Lowest</DropdownMenuItem>
              <DropdownMenuItem>Highest</DropdownMenuItem>
              <DropdownMenuItem>Average</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span className="w-3 h-3 bg-blue-600 text-white text-xs rounded mr-2 flex items-center justify-center font-bold">
                  B
                </span>
                Booking.com
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Booking.com</DropdownMenuItem>
              <DropdownMenuItem>Expedia</DropdownMenuItem>
              <DropdownMenuItem>Hotels.com</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={() => setShowAllFilters(!showAllFilters)}>
            <Filter className="h-3 w-3 mr-1" />
            More
          </Button>
        </div>

        {/* Additional filters when expanded */}
        {showAllFilters && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Desktop
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Desktop</DropdownMenuItem>
                <DropdownMenuItem>Mobile</DropdownMenuItem>
                <DropdownMenuItem>Tablet</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  1 night
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>1 night</DropdownMenuItem>
                <DropdownMenuItem>2 nights</DropdownMenuItem>
                <DropdownMenuItem>3 nights</DropdownMenuItem>
                <DropdownMenuItem>7 nights</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  2 guests
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>1 guest</DropdownMenuItem>
                <DropdownMenuItem>2 guests</DropdownMenuItem>
                <DropdownMenuItem>3 guests</DropdownMenuItem>
                <DropdownMenuItem>4 guests</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Any room
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any room</DropdownMenuItem>
                <DropdownMenuItem>Standard room</DropdownMenuItem>
                <DropdownMenuItem>Deluxe room</DropdownMenuItem>
                <DropdownMenuItem>Suite</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Any meal
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any meal</DropdownMenuItem>
                <DropdownMenuItem>Room only</DropdownMenuItem>
                <DropdownMenuItem>Breakfast included</DropdownMenuItem>
                <DropdownMenuItem>Half board</DropdownMenuItem>
                <DropdownMenuItem>Full board</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Primary compset
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Primary compset</DropdownMenuItem>
                <DropdownMenuItem>Secondary compset</DropdownMenuItem>
                <DropdownMenuItem>Custom compset</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <Button variant="outline" size="sm">
            <Settings className="mr-1 h-3 w-3" />
            Settings
          </Button>
          <span>Updated 8 hours ago</span>
        </div>
      </div>

      {/* Desktop: Show all filters horizontally */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Lowest
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Lowest</DropdownMenuItem>
              <DropdownMenuItem>Highest</DropdownMenuItem>
              <DropdownMenuItem>Average</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                <span className="w-4 h-4 bg-blue-600 text-white text-xs rounded mr-2 flex items-center justify-center font-bold">
                  B
                </span>
                Booking.com
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Booking.com</DropdownMenuItem>
              <DropdownMenuItem>Expedia</DropdownMenuItem>
              <DropdownMenuItem>Hotels.com</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                Desktop
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Desktop</DropdownMenuItem>
              <DropdownMenuItem>Mobile</DropdownMenuItem>
              <DropdownMenuItem>Tablet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                1 night
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>1 night</DropdownMenuItem>
              <DropdownMenuItem>2 nights</DropdownMenuItem>
              <DropdownMenuItem>3 nights</DropdownMenuItem>
              <DropdownMenuItem>7 nights</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                2 guests
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>1 guest</DropdownMenuItem>
              <DropdownMenuItem>2 guests</DropdownMenuItem>
              <DropdownMenuItem>3 guests</DropdownMenuItem>
              <DropdownMenuItem>4 guests</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                Any room
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Any room</DropdownMenuItem>
              <DropdownMenuItem>Standard room</DropdownMenuItem>
              <DropdownMenuItem>Deluxe room</DropdownMenuItem>
              <DropdownMenuItem>Suite</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                Any meal
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Any meal</DropdownMenuItem>
              <DropdownMenuItem>Room only</DropdownMenuItem>
              <DropdownMenuItem>Breakfast included</DropdownMenuItem>
              <DropdownMenuItem>Half board</DropdownMenuItem>
              <DropdownMenuItem>Full board</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-sm">
                Primary compset
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Primary compset</DropdownMenuItem>
              <DropdownMenuItem>Secondary compset</DropdownMenuItem>
              <DropdownMenuItem>Custom compset</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-sm">
            <Settings className="mr-2 h-4 w-4" />
            Calendar settings
          </Button>
          <span className="text-sm text-gray-500">Updated 8 hours ago</span>
        </div>
      </div>
    </div>
  )
}
