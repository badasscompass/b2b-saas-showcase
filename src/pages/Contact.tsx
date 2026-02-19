import React from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { ContactForm } from '@/components/ContactForm'
import { ContactCTA } from '@/components/ContactCTA'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'
import { analyticsService } from '@/services/analyticsService'

export const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Us - LMN3',
    description: 'Get in touch with LMN3. Send us your questions, project inquiries, or RFPs. We\'re here to help transform your product business.',
    keywords: ['contact', 'contact form', 'get in touch', 'RFP', 'project inquiry', 'LMN3'],
    canonicalUrl: '/contact',
  })

  return (
    <PageLayout>
      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope mb-6 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your product business? Let's start the conversation.
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 rounded-lg border bg-card">
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold font-manrope mb-2">Email</h3>
              <a
                href="mailto:hello@lmn3.digital"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => analyticsService.trackEvent('contact', { category: 'engagement', method: 'email', label: 'hello@lmn3.digital', location: 'contact_page' })}
              >
                hello@lmn3.digital
              </a>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card">
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold font-manrope mb-2">Phone</h3>
              <a
                href="https://calendly.com/iva-lmn3/30min"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: 'Schedule a call', location: 'contact_page_phone_card' })}
              >
                Schedule a call
              </a>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold font-manrope mb-2">Location</h3>
              <p className="text-muted-foreground">Remote-first</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card">
              <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold font-manrope mb-2">Response Time</h3>
              <p className="text-muted-foreground">Within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-16">
            <ContactForm />
          </div>

          {/* Additional Information */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-manrope">
              What happens next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold font-manrope">We Review</h3>
                <p className="text-muted-foreground text-sm">
                  We'll review your message and understand your needs within 24 hours.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold font-manrope">We Connect</h3>
                <p className="text-muted-foreground text-sm">
                  We'll schedule a discovery call to discuss your project in detail.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold font-manrope">We Deliver</h3>
                <p className="text-muted-foreground text-sm">
                  We'll create a custom proposal tailored to your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Contact