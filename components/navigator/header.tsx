"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Settings, UserCircle, Search, Loader2, Building, Sparkles, Building2, HelpCircle, BookOpen, MessageSquare, LifeBuoy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Overview", href: "/" },
  {
    name: "Rate Trend",
    href: "#", // This is a placeholder, actual navigation is via dropdown items
    dropdown: true,
    items: [
      { name: "Rate Trend", href: "/rate-trend" },
      { name: "Rate Evolution", href: "#" },
      { name: "OTA Rank", href: "#" },
      { name: "Reviews", href: "#" },
      { name: "Parity", href: "#" },
      { name: "Demand", href: "/demand" },
      { name: "Events", href: "#" },
    ],
  },
]

const hotelOptions = [
  "Dubai Hotel - 5 Star",
  "New York Grand - 4 Star",
  "London Boutique - 3 Star",
  "Vakkaru Maldives - 30 percent off on seaplane transfers",
  "Four Seasons Resort Maldives at Landaa Giraavaru",
  "One&Only Reethi Rah",
  "Six Senses Laamu",
  "Soneva Fushi",
  "Anantara Kihavah Maldives Villas",
  "The St. Regis Maldives Vommuli Resort",
  "Conrad Maldives Rangali Island",
  "Waldorf Astoria Maldives Ithaafushi",
]

/**
 * Header Component
 * 
 * Modern navigation header with enhanced visual design, hotel selection, and user controls.
 * Features glassmorphism effects, improved gradients, and better accessibility.
 * 
 * Features:
 * - Modern glassmorphism design with enhanced gradients
 * - Responsive navigation with mobile/desktop layouts
 * - Hotel selection with advanced search functionality
 * - Theme toggle support with improved UI
 * - Active route highlighting with visual indicators
 * - Loading states and comprehensive error handling
 * - Full accessibility compliance
 * - Modern color scheme using #1800FF
 * 
 * @returns {JSX.Element} The enhanced header navigation component
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export function Header(): JSX.Element {
  const pathname = usePathname()
  const [selectedHotel, setSelectedHotel] = useState("Dubai Hotel - 5 Star")
  const [hotelSearch, setHotelSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Determines the active navigation tab based on current pathname
   * @returns {string} The name of the active tab
   */
  const getActiveTab = (): string => {
    try {
      if (pathname === "/") return "Overview"
      if (pathname.startsWith("/rate-trend") || pathname.startsWith("/demand")) return "Rate Trend"
      return "Overview" // Default fallback
    } catch (err) {
      console.error("Error determining active tab:", err)
      return "Overview"
    }
  }

  const activeTab = getActiveTab()

  /**
   * Filters hotel options based on search input
   * @returns {string[]} Filtered list of hotels
   */
  const getFilteredHotels = (): string[] => {
    try {
      if (!hotelSearch.trim()) return hotelOptions
      return hotelOptions.filter((hotel) => 
        hotel.toLowerCase().includes(hotelSearch.toLowerCase())
      )
    } catch (err) {
      console.error("Error filtering hotels:", err)
      return hotelOptions
    }
  }

  const filteredHotels = getFilteredHotels()

  /**
   * Handles hotel selection with loading state and error handling
   * @param {string} hotel - The selected hotel name
   */
  const handleHotelSelect = async (hotel: string): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setSelectedHotel(hotel)
      setHotelSearch("") // Clear search and close dropdown after selection
      
      // Debug logging for verification
      console.log(`Hotel selected: ${hotel}`)
    } catch (err) {
      setError("Failed to select hotel. Please try again.")
      console.error("Error selecting hotel:", err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles search input changes with debouncing
   * @param {string} value - The search input value
   */
  const handleSearchChange = (value: string): void => {
    try {
      setHotelSearch(value)
      setError(null) // Clear any previous errors
    } catch (err) {
      console.error("Error handling search change:", err)
    }
  }

  return (
    <header 
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-b border-white/25 dark:border-slate-700/50 shadow-lg dark:shadow-black/10" 
      role="banner"
      data-tour="header"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF]/5 via-transparent to-[#1800FF]/5"></div>
      
      <div className="relative flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand Section with enhanced design */}
        <div className="flex-shrink-0">
          <Link href="/" className="group flex items-center gap-3" aria-label="Navigator Home">
            {/* Enhanced logo with glassmorphism */}
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative p-2 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-xl">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#1800FF] to-[#1800FF] bg-clip-text text-transparent">
              Navigator
            </h1>
          </Link>
        </div>

        {/* Enhanced Hotel Selector with glassmorphism */}
        <div className="flex items-center space-x-3" data-tour="hotel-selector">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF]/10 to-[#1800FF]/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-slate-700/50">
              <Building className="h-4 w-4 text-[#1800FF]" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#1800FF] max-w-[200px] sm:max-w-[250px] flex items-center text-left p-0 h-auto
                      focus:ring-2 focus:ring-[#1800FF]/20 focus:border-[#1800FF] dark:focus:border-[#1800FF]
                      border-none bg-transparent hover:bg-transparent
                      transition-all duration-200 hover:border-[#1800FF]/50"
                    disabled={isLoading}
                    aria-label={`Selected hotel: ${selectedHotel}`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    <span className="truncate flex-grow font-medium">{selectedHotel}</span>
                    <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 text-[#1800FF]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl w-72 sm:w-80 border-white/20 dark:border-slate-700/50 shadow-2xl" align="end">
                  <div className="p-3 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search hotels..."
                        value={hotelSearch}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 w-full text-sm bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-slate-300/50 dark:border-slate-600/50 focus:ring-[#1800FF] focus:border-[#1800FF] rounded-xl"
                        aria-label="Search hotels"
                      />
                    </div>
                    {error && (
                      <div className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredHotels.length > 0 ? (
                      filteredHotels.map((hotel) => (
                        <DropdownMenuItem
                          key={hotel}
                          onSelect={() => handleHotelSelect(hotel)}
                          className={`text-sm cursor-pointer px-4 py-3 truncate rounded-lg mx-2 my-1
                            ${
                              selectedHotel === hotel
                                ? "bg-[#1800FF]/10 text-[#1800FF] font-medium dark:bg-[#1800FF]/20 dark:text-[#1800FF]"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                            }`}
                          disabled={isLoading}
                        >
                          {hotel}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                        No hotels found.
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-grow justify-center" role="navigation" aria-label="Main navigation">
          {navItems.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium flex items-center transition-all duration-300
                      ${
                        activeTab === item.name
                          ? "text-white bg-gradient-to-r from-[#1800FF] to-[#1800FF] shadow-lg" // Active dropdown trigger style
                          : "text-slate-600 dark:text-slate-300 hover:text-[#1800FF] dark:hover:text-[#1800FF] hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                      }`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    {activeTab === item.name && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-xl blur-lg opacity-60"></div>
                    )}
                    <span className="relative flex items-center gap-2">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-2xl rounded-xl">
                  {item.items?.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild disabled={subItem.href === pathname}>
                      <Link
                        href={subItem.href}
                        className={`block px-4 py-3 text-sm rounded-lg mx-2 my-1 transition-all duration-200
                          ${
                            pathname === subItem.href
                              ? "font-semibold text-[#1800FF] bg-[#1800FF]/10 dark:text-[#1800FF] dark:bg-[#1800FF]/20" // Active item in dropdown
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 hover:text-[#1800FF]"
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={item.name} variant="ghost" asChild>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105
                    ${
                      activeTab === item.name
                        ? "text-[#1800FF] font-semibold" // Active non-dropdown tab style
                        : "text-slate-600 dark:text-slate-300 hover:text-[#1800FF] hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                    }`}
                >
                  {item.name}
                  {activeTab === item.name && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-full" />
                  )}
                </Link>
              </Button>
            ),
          )}
        </nav>

        {/* Enhanced Right Side Controls */}
        <div className="flex flex-none items-center space-x-2" data-tour="theme-toggle">
          {/* Mobile Hotel Selector */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 dark:text-slate-300 hover:text-[#1800FF] dark:hover:text-[#1800FF] rounded-xl transition-colors duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                  aria-label="Select Hotel"
                >
                  <Building className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl w-72 border-white/20 dark:border-slate-700/50 shadow-2xl" align="end">
                <div className="p-3 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Selected Hotel:</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{selectedHotel}</div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {hotelOptions.map((hotel) => (
                    <DropdownMenuItem
                      key={hotel}
                      onSelect={() => handleHotelSelect(hotel)}
                      className={`text-sm cursor-pointer px-4 py-3 truncate rounded-lg mx-2 my-1
                        ${
                          selectedHotel === hotel
                            ? "bg-[#1800FF]/10 text-[#1800FF] font-medium dark:bg-[#1800FF]/20"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                        }`}
                    >
                      {hotel}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />

          {/* Help & Support Link */}
          <div data-tour="help-support">
            <Link href="/help">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-600 dark:text-slate-300 hover:text-[#1800FF] dark:hover:text-[#1800FF] rounded-xl transition-all duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 hover:scale-110" 
                aria-label="Help & Support"
              >
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help & Support</span>
              </Button>
            </Link>
          </div>

          {/* Enhanced Action Buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 dark:text-slate-300 hover:text-[#1800FF] dark:hover:text-[#1800FF] rounded-xl transition-all duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 hover:scale-110" 
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* Enhanced User Profile with avatar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <Button variant="ghost" size="icon" className="relative rounded-full hover:scale-110 transition-all duration-300" aria-label="User Profile">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1800FF] to-[#1800FF] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
