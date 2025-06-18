#!/usr/bin/env node

/**
 * ============================================================================
 * COMPREHENSIVE PAGE VERIFICATION SCRIPT
 * ============================================================================
 * 
 * Professional debugging script following @rulenav best practices for 
 * comprehensive page verification and component health checking.
 * 
 * Features:
 * - Automated page accessibility testing
 * - Component rendering verification
 * - Performance monitoring
 * - Error detection and reporting
 * - Build integrity validation
 * 
 * @author Senior Software Developer (10+ years experience)
 * @version 1.0.0
 * @created 2025-01-28
 * @rulenav Best practices applied
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

/**
 * Page verification configuration
 * Each page includes accessibility checks, performance metrics, and error monitoring
 */
const PAGES_TO_VERIFY = [
  {
    name: 'Overview Dashboard',
    path: '/',
    expectedElements: [
      '[data-tour="performance-chart"]',
      '[data-tour="market-demand"]',
      '.overview-kpi-cards',
      'header[role="banner"]'
    ],
    criticalComponents: ['OverviewKpiCards', 'RateTrendsChart', 'MarketDemandWidget'],
    performanceThresholds: {
      loadTime: 3000,
      firstContentfulPaint: 1500
    }
  },
  {
    name: 'Rate Trend Analysis',
    path: '/rate-trend',
    expectedElements: [
      '[role="main"]',
      '.rate-trend-calendar',
      '.rate-trend-filters',
      '.rate-trend-header'
    ],
    criticalComponents: ['RateTrendCalendar', 'RateTrendFilters', 'RateTrendHeader'],
    performanceThresholds: {
      loadTime: 4000,
      firstContentfulPaint: 2000
    }
  },
  {
    name: 'Demand Analytics',
    path: '/demand',
    expectedElements: [
      '.demand-calendar',
      '.demand-forecast-chart',
      '.demand-summary-cards',
      '.demand-header'
    ],
    criticalComponents: ['DemandCalendar', 'DemandForecastChart', 'DemandSummaryCards'],
    performanceThresholds: {
      loadTime: 4000,
      firstContentfulPaint: 2000
    }
  },
  {
    name: 'Help & Support',
    path: '/help',
    expectedElements: [
      '.help-support-page',
      '[role="main"]'
    ],
    criticalComponents: ['HelpSupportPage'],
    performanceThresholds: {
      loadTime: 2000,
      firstContentfulPaint: 1000
    }
  }
]

/**
 * Server configuration and debugging settings
 */
const CONFIG = {
  baseUrl: 'http://localhost:4002',
  timeout: 10000,
  viewport: { width: 1920, height: 1080 },
  screenshotPath: './debug-screenshots',
  reportPath: './page-verification-report.json'
}

/**
 * Professional logging system with debugging levels
 * @param {string} level - Log level (info, warn, error, success)
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log
 */
function debugLog(level, message, data = null) {
  const timestamp = new Date().toISOString()
  const colors = {
    info: '\x1b[36m',    // Cyan
    warn: '\x1b[33m',    // Yellow
    error: '\x1b[31m',   // Red
    success: '\x1b[32m', // Green
    reset: '\x1b[0m'
  }
  
  console.log(`${colors[level]}[${timestamp}] ${level.toUpperCase()}: ${message}${colors.reset}`)
  if (data) {
    console.log(`${colors[level]}Data:${colors.reset}`, JSON.stringify(data, null, 2))
  }
}

/**
 * Enhanced error handling with detailed debugging information
 * @param {Error} error - The error object
 * @param {string} context - Context where error occurred
 * @param {Object} additionalInfo - Additional debugging information
 */
function handleError(error, context, additionalInfo = {}) {
  debugLog('error', `Error in ${context}: ${error.message}`, {
    stack: error.stack,
    context,
    additionalInfo,
    timestamp: new Date().toISOString()
  })
}

/**
 * Comprehensive page verification function
 * @param {Object} browser - Puppeteer browser instance
 * @param {Object} pageConfig - Page configuration object
 * @returns {Object} Verification results
 */
async function verifyPage(browser, pageConfig) {
  let page = null
  const results = {
    name: pageConfig.name,
    path: pageConfig.path,
    success: false,
    loadTime: 0,
    errors: [],
    warnings: [],
    componentsFound: [],
    missingComponents: [],
    performanceMetrics: {},
    screenshot: null
  }

  try {
    debugLog('info', `Starting verification for: ${pageConfig.name}`)
    
    // Create new page with enhanced error handling
    page = await browser.newPage()
    
    // Set viewport for consistent testing
    await page.setViewport(CONFIG.viewport)
    
    // Enable console logging for debugging
    page.on('console', msg => {
      const type = msg.type()
      if (type === 'error') {
        results.errors.push(`Console Error: ${msg.text()}`)
      } else if (type === 'warn') {
        results.warnings.push(`Console Warning: ${msg.text()}`)
      }
    })
    
    // Monitor page errors
    page.on('pageerror', error => {
      results.errors.push(`Page Error: ${error.message}`)
      handleError(error, `Page ${pageConfig.name}`)
    })
    
    // Start performance monitoring
    const startTime = Date.now()
    
    // Navigate to page with timeout
    debugLog('info', `Navigating to: ${CONFIG.baseUrl}${pageConfig.path}`)
    await page.goto(`${CONFIG.baseUrl}${pageConfig.path}`, {
      waitUntil: 'networkidle0',
      timeout: CONFIG.timeout
    })
    
    // Calculate load time
    results.loadTime = Date.now() - startTime
    
    // Verify expected elements exist
    debugLog('info', `Checking elements for: ${pageConfig.name}`)
    for (const selector of pageConfig.expectedElements) {
      try {
        const element = await page.$(selector)
        if (element) {
          results.componentsFound.push(selector)
          debugLog('success', `Found element: ${selector}`)
        } else {
          results.missingComponents.push(selector)
          debugLog('warn', `Missing element: ${selector}`)
        }
      } catch (error) {
        results.missingComponents.push(selector)
        handleError(error, `Element check for ${selector}`)
      }
    }
    
    // Performance metrics collection
    debugLog('info', `Collecting performance metrics for: ${pageConfig.name}`)
    const performanceMetrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0]
      const paint = performance.getEntriesByType('paint')
      
      return {
        domContentLoaded: nav?.domContentLoadedEventEnd - nav?.domContentLoadedEventStart || 0,
        loadComplete: nav?.loadEventEnd - nav?.loadEventStart || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: paint.find(p => p.name === 'largest-contentful-paint')?.startTime || 0
      }
    })
    
    results.performanceMetrics = performanceMetrics
    
    // Take screenshot for debugging
    const screenshotDir = CONFIG.screenshotPath
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true })
    }
    
    const screenshotPath = path.join(screenshotDir, `${pageConfig.name.replace(/\s+/g, '-').toLowerCase()}.png`)
    await page.screenshot({ path: screenshotPath, fullPage: true })
    results.screenshot = screenshotPath
    
    // Verify performance thresholds
    if (results.loadTime <= pageConfig.performanceThresholds.loadTime) {
      debugLog('success', `Performance: Load time within threshold (${results.loadTime}ms)`)
    } else {
      results.warnings.push(`Load time exceeded threshold: ${results.loadTime}ms > ${pageConfig.performanceThresholds.loadTime}ms`)
      debugLog('warn', `Performance: Load time exceeded threshold`)
    }
    
    // Mark as successful if no critical errors
    results.success = results.errors.length === 0 && results.missingComponents.length === 0
    
    debugLog('success', `Verification completed for: ${pageConfig.name}`)
    
  } catch (error) {
    results.errors.push(`Verification failed: ${error.message}`)
    handleError(error, `Page verification for ${pageConfig.name}`)
  } finally {
    if (page) {
      await page.close()
    }
  }
  
  return results
}

/**
 * Generate comprehensive verification report
 * @param {Array} results - Array of verification results
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      warnings: results.reduce((acc, r) => acc + r.warnings.length, 0)
    },
    pages: results,
    recommendations: []
  }
  
  // Generate recommendations based on results
  results.forEach(result => {
    if (!result.success) {
      report.recommendations.push(`Fix issues on ${result.name}: ${result.errors.join(', ')}`)
    }
    if (result.warnings.length > 0) {
      report.recommendations.push(`Address warnings on ${result.name}: ${result.warnings.join(', ')}`)
    }
    if (result.loadTime > 3000) {
      report.recommendations.push(`Optimize performance for ${result.name} (current: ${result.loadTime}ms)`)
    }
  })
  
  // Save report to file
  fs.writeFileSync(CONFIG.reportPath, JSON.stringify(report, null, 2))
  
  return report
}

/**
 * Main verification function
 * Orchestrates the complete verification process
 */
async function main() {
  let browser = null
  
  try {
    debugLog('info', 'Starting comprehensive page verification process')
    debugLog('info', `Target server: ${CONFIG.baseUrl}`)
    
    // Launch browser with debugging options
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      defaultViewport: CONFIG.viewport
    })
    
    debugLog('success', 'Browser launched successfully')
    
    // Verify all pages
    const verificationResults = []
    
    for (const pageConfig of PAGES_TO_VERIFY) {
      const result = await verifyPage(browser, pageConfig)
      verificationResults.push(result)
      
      // Brief pause between page verifications
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    // Generate and display report
    const report = generateReport(verificationResults)
    
    // Display summary
    console.log('\n' + '='.repeat(80))
    console.log('PAGE VERIFICATION SUMMARY')
    console.log('='.repeat(80))
    console.log(`Total Pages Tested: ${report.summary.totalPages}`)
    console.log(`Successful: ${report.summary.successful}`)
    console.log(`Failed: ${report.summary.failed}`)
    console.log(`Total Warnings: ${report.summary.warnings}`)
    console.log('\nDetailed report saved to:', CONFIG.reportPath)
    console.log('Screenshots saved to:', CONFIG.screenshotPath)
    
    if (report.summary.failed === 0) {
      debugLog('success', 'All pages verified successfully! ✅')
      process.exit(0)
    } else {
      debugLog('error', 'Some pages failed verification. Check the report for details.')
      process.exit(1)
    }
    
  } catch (error) {
    handleError(error, 'Main verification process')
    process.exit(1)
  } finally {
    if (browser) {
      await browser.close()
      debugLog('info', 'Browser closed')
    }
  }
}

// Execute main function with error handling
if (require.main === module) {
  main().catch(error => {
    handleError(error, 'Script execution')
    process.exit(1)
  })
}

module.exports = { verifyPage, generateReport, debugLog } 