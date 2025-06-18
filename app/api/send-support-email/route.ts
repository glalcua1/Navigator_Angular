import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'
import type { SupportEmailData } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, userId, category, priority, email, phone } = body

    // Prepare support email data
    const supportData: SupportEmailData = {
      title,
      description,
      userId,
      category,
      priority: priority || 'medium',
      email,
      phone
    }

    // Validate the support data
    const validation = emailService.validateSupportData(supportData)
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      )
    }

    // Send the support email using the email service
    const result = await emailService.sendSupportEmail(supportData, 'gaurav.lal@rategain.com')

    // Return success response
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error sending support email:', error)
    return NextResponse.json(
      { error: 'Failed to send support request. Please try again.' },
      { status: 500 }
    )
  }
} 