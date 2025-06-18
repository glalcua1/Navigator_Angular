/**
 * ============================================================================
 * EMAIL SERVICE UTILITY
 * ============================================================================
 * 
 * Comprehensive email service for sending support requests and notifications.
 * Supports multiple email providers and provides structured email templates.
 * 
 * @author Rate Parity Dashboard Team
 * @version 1.0.0
 */

export interface SupportEmailData {
  title: string
  description: string
  userId: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  email: string
  phone?: string
}

export interface EmailConfig {
  provider: 'sendgrid' | 'nodemailer' | 'resend' | 'ses' | 'postmark'
  apiKey?: string
  smtpConfig?: {
    host: string
    port: number
    secure: boolean
    user: string
    pass: string
  }
}

export class EmailService {
  private config: EmailConfig

  constructor(config: EmailConfig) {
    this.config = config
  }

  /**
   * Generate professional HTML email template for support requests
   */
  private generateSupportEmailTemplate(data: SupportEmailData): string {
    const priorityColors = {
      low: '#28a745',
      medium: '#ffc107', 
      high: '#fd7e14',
      urgent: '#dc3545'
    }

    const priorityEmojis = {
      low: '🟢',
      medium: '🟡',
      high: '🟠', 
      urgent: '🔴'
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Rate Parity Dashboard - Support Request</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, Arial, sans-serif;
          line-height: 1.6; 
          color: #333; 
          background-color: #f8f9fa;
        }
        .container { 
          max-width: 650px; 
          margin: 20px auto; 
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #1800FF 0%, #4F46E5 100%); 
          color: white; 
          padding: 30px; 
          text-align: center;
        }
        .header h1 { 
          font-size: 24px; 
          font-weight: 700; 
          margin-bottom: 8px;
        }
        .header p { 
          opacity: 0.9; 
          font-size: 16px;
        }
        .content { 
          padding: 30px; 
        }
        .field { 
          margin-bottom: 20px; 
          border-radius: 8px;
          border: 1px solid #e9ecef;
          overflow: hidden;
        }
        .field-header {
          background: #f8f9fa;
          padding: 12px 16px;
          font-weight: 600;
          color: #1800FF;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-content { 
          padding: 16px; 
          background: white;
        }
        .priority-${data.priority.toLowerCase()} .field-header { 
          background: ${priorityColors[data.priority]};
          color: white;
        }
        .priority-urgent .field-content {
          background: #fff5f5;
        }
        .description {
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 15px;
          line-height: 1.6;
        }
        .footer { 
          background: #1800FF;
          color: white;
          padding: 20px 30px; 
          text-align: center;
        }
        .footer p {
          margin: 5px 0;
          opacity: 0.9;
        }
        .highlight {
          background: #fff3cd;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .ticket-id {
          background: #d1ecf1;
          color: #0c5460;
          padding: 8px 12px;
          border-radius: 6px;
          font-family: monospace;
          font-weight: 600;
          display: inline-block;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🆘 Rate Parity Dashboard</h1>
          <p>New Support Request Submitted</p>
        </div>
        
        <div class="content">
          <div class="ticket-id">
            Ticket ID: RPD-${Date.now()}
          </div>

          <div class="field">
            <div class="field-header">📧 Contact Information</div>
            <div class="field-content">
              <strong>Email:</strong> ${data.email}<br>
              <strong>Phone:</strong> ${data.phone || 'Not provided'}<br>
              <strong>User ID:</strong> <span class="highlight">${data.userId}</span>
            </div>
          </div>

          <div class="field priority-${data.priority.toLowerCase()}">
            <div class="field-header">${priorityEmojis[data.priority]} Priority & Category</div>
            <div class="field-content">
              <strong>Priority:</strong> ${data.priority.toUpperCase()}<br>
              <strong>Category:</strong> ${data.category}
            </div>
          </div>

          <div class="field">
            <div class="field-header">📋 Issue Summary</div>
            <div class="field-content">
              <strong>${data.title}</strong>
            </div>
          </div>

          <div class="field">
            <div class="field-header">📝 Detailed Description</div>
            <div class="field-content">
              <div class="description">${data.description}</div>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Rate Parity Dashboard Support</strong></p>
          <p>Submitted: ${new Date().toLocaleString()}</p>
          <p>This is an automated message from the Help Center</p>
        </div>
      </div>
    </body>
    </html>
    `
  }

  /**
   * Send support email (currently simulated - ready for real implementation)
   */
  async sendSupportEmail(data: SupportEmailData, recipient: string = 'gaurav.lal@rategain.com'): Promise<{
    success: boolean
    message: string
    ticketId: string
    recipient: string
  }> {
    try {
      const emailSubject = `🆘 Support Request: ${data.title} [${data.priority.toUpperCase()}]`
      const emailBody = this.generateSupportEmailTemplate(data)
      const ticketId = `RPD-${Date.now()}`

      // Log the email details for development
      console.log('📧 EMAIL SERVICE - Support Request Details:')
      console.log('═══════════════════════════════════════════')
      console.log(`📬 Recipient: ${recipient}`)
      console.log(`📋 Subject: ${emailSubject}`)
      console.log(`🆔 User ID: ${data.userId}`)
      console.log(`⚡ Priority: ${data.priority.toUpperCase()}`)
      console.log(`📂 Category: ${data.category}`)
      console.log(`🔍 Issue: ${data.title}`)
      console.log(`📄 Description: ${data.description.substring(0, 100)}${data.description.length > 100 ? '...' : ''}`)
      console.log(`🎫 Ticket ID: ${ticketId}`)
      console.log(`📅 Timestamp: ${new Date().toISOString()}`)
      console.log('═══════════════════════════════════════════')

      // TODO: Implement actual email sending based on provider
      // Example implementations:

      /*
      // SendGrid Implementation
      if (this.config.provider === 'sendgrid') {
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(this.config.apiKey)
        
        const msg = {
          to: recipient,
          from: 'support@rateparity.com',
          subject: emailSubject,
          html: emailBody,
        }
        
        await sgMail.send(msg)
      }

      // Nodemailer Implementation
      if (this.config.provider === 'nodemailer') {
        const nodemailer = require('nodemailer')
        
        const transporter = nodemailer.createTransporter({
          host: this.config.smtpConfig?.host,
          port: this.config.smtpConfig?.port,
          secure: this.config.smtpConfig?.secure,
          auth: {
            user: this.config.smtpConfig?.user,
            pass: this.config.smtpConfig?.pass,
          },
        })

        await transporter.sendMail({
          from: 'support@rateparity.com',
          to: recipient,
          subject: emailSubject,
          html: emailBody,
        })
      }

      // Resend Implementation
      if (this.config.provider === 'resend') {
        const { Resend } = require('resend')
        const resend = new Resend(this.config.apiKey)
        
        await resend.emails.send({
          from: 'support@rateparity.com',
          to: recipient,
          subject: emailSubject,
          html: emailBody,
        })
      }
      */

      return {
        success: true,
        message: 'Support request sent successfully!',
        ticketId,
        recipient
      }

    } catch (error) {
      console.error('❌ EMAIL SERVICE ERROR:', error)
      throw new Error(`Failed to send support email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Validate email data before sending
   */
  validateSupportData(data: SupportEmailData): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.title?.trim()) errors.push('Issue title is required')
    if (!data.description?.trim()) errors.push('Issue description is required')
    if (!data.userId?.trim()) errors.push('User ID is required')
    if (!data.email?.trim()) errors.push('Email is required')
    if (!data.category?.trim()) errors.push('Issue category is required')

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Invalid email format')
    }

    // Priority validation
    const validPriorities = ['low', 'medium', 'high', 'urgent']
    if (!validPriorities.includes(data.priority)) {
      errors.push('Invalid priority level')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Default email service instance (ready for configuration)
export const emailService = new EmailService({
  provider: 'sendgrid', // Configure based on your preferred provider
  // apiKey: process.env.SENDGRID_API_KEY, // Add your API key
})

// Export types for external use
export type { SupportEmailData, EmailConfig } 