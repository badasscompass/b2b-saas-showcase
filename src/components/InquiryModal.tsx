import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { analyticsService } from '@/services/analyticsService'

const inquiryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  body: z.string().min(10, 'Message must be at least 10 characters'),
  antiRobot: z.string().min(1, 'Please answer the question'),
})

type InquiryFormData = z.infer<typeof inquiryFormSchema>

export interface InquiryModalContext {
  /** Service slug (e.g. product-development) */
  interest: string
  /** Display name (e.g. Product Development) */
  serviceTitle?: string
  /** Package name (e.g. Product Clarity Sprint) */
  packageName: string
}

interface InquiryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  context: InquiryModalContext | null
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  open,
  onOpenChange,
  context,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [antiRobot, setAntiRobot] = useState({ question: '', answer: '' })
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setAntiRobot({
      question: `What is ${n1} + ${n2}?`,
      answer: String(n1 + n2),
    })
  }, [open])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
  })

  const onSubmit = async (data: InquiryFormData) => {
    if (!context) return
    if (data.antiRobot !== antiRobot.answer) {
      toast({
        title: 'Incorrect answer',
        description: 'Please answer the question correctly.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const title = `Inquiry: ${context.packageName}`
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          title,
          body: data.body,
          anti_robot_answer: data.antiRobot,
          interest: context.interest,
          package: context.packageName,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to send message')
      }

      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
      })
      analyticsService.trackFormSubmission('inquiry_modal', true)
      analyticsService.trackEvent('generate_lead', {
        currency: 'EUR',
        lead_source: 'inquiry_modal',
        form_name: 'inquiry_modal',
      })
      reset()
      onOpenChange(false)
    } catch (e) {
      toast({
        title: 'Error',
        description: e instanceof Error ? e.message : 'Please try again later.',
        variant: 'destructive',
      })
      analyticsService.trackFormSubmission('inquiry_modal', false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayRegarding = context
    ? [context.serviceTitle || context.interest, context.packageName].filter(Boolean).join(' → ')
    : ''

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-manrope">Request package info</DialogTitle>
          <DialogDescription>
            {displayRegarding && (
              <span className="text-foreground/80">Regarding: {displayRegarding}</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inquiry-name">Name *</Label>
              <Input
                id="inquiry-name"
                {...register('name')}
                className="mt-1"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="inquiry-email">Email *</Label>
              <Input
                id="inquiry-email"
                type="email"
                {...register('email')}
                className="mt-1"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="inquiry-body">Message *</Label>
            <Textarea
              id="inquiry-body"
              {...register('body')}
              className="mt-1 min-h-[100px]"
              disabled={isSubmitting}
              placeholder="Tell us a bit about your needs or ask a question..."
            />
            {errors.body && (
              <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="inquiry-antiRobot">Anti-robot *</Label>
            <p className="text-sm text-muted-foreground mb-1">{antiRobot.question} (enter number)</p>
            <Input
              id="inquiry-antiRobot"
              {...register('antiRobot')}
              className="mt-1"
              disabled={isSubmitting}
              placeholder="Answer"
            />
            {errors.antiRobot && (
              <p className="text-sm text-destructive mt-1">{errors.antiRobot.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 font-manrope"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send inquiry
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
