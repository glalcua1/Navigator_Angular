import React from "react"
import type { Metadata } from "next"
import { HelpSupportPage } from "@/components/help-support-page"

export const metadata: Metadata = {
  title: "Help & Support - Rate Parity Dashboard",
  description: "Comprehensive help center and support for hotel revenue managers",
  openGraph: {
    title: "Help & Support - Rate Parity Dashboard",
    description: "Get help with hotel revenue management tools and features",
  },
}

/**
 * ============================================================================
 * HELP & SUPPORT PAGE
 * ============================================================================
 * 
 * Dedicated page for comprehensive help and support functionality
 * designed specifically for hotel revenue managers.
 * 
 * Features:
 * - Full-screen knowledge base
 * - Comprehensive guided tours
 * - Professional support ticket system
 * - Enhanced tutorial library
 * - Better content organization
 * 
 * @author Senior UX Designer
 * @version 2.0.0
 */

export default function HelpPage(): JSX.Element {
  return <HelpSupportPage />
} 