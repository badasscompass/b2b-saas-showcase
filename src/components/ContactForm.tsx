import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, Send, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { analyticsService } from '@/services/analyticsService'
import {
  contactPackageOptions,
  getContactPackageByValue,
  getContactPackageByInterestAndPackage,
  CONTACT_GENERAL_VALUE,
} from '@/data/contactPackageOptions'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/png'
]

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  body: z.string().min(20, 'Message must be at least 20 characters'),
  file: z
    .any()
    .optional()
    .refine((file) => {
      if (!file || file.length === 0) return true
      return file[0]?.size <= MAX_FILE_SIZE
    }, 'File size must be less than 5MB')
    .refine((file) => {
      if (!file || file.length === 0) return true
      return ACCEPTED_FILE_TYPES.includes(file[0]?.type)
    }, 'File type not supported'),
  antiRobot: z.string().min(1, 'Please answer the anti-robot question'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export interface ContactFormContext {
  interest?: string
  packageName?: string
}

interface ContactFormProps {
  onSuccess?: () => void
  /** Optional initial selection from URL (e.g. ?interest=...&package=...) */
  interest?: string
  packageName?: string
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, interest, packageName }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [antiRobotQuestion, setAntiRobotQuestion] = useState({ question: '', answer: '' })
  const { toast } = useToast()

  const initialRegardingValue = useMemo(() => {
    if (interest && packageName) {
      const option = getContactPackageByInterestAndPackage(interest, packageName)
      return option?.value ?? CONTACT_GENERAL_VALUE
    }
    return CONTACT_GENERAL_VALUE
  }, [interest, packageName])

  const [selectedRegardingValue, setSelectedRegardingValue] = useState(initialRegardingValue)

  useEffect(() => {
    setSelectedRegardingValue(initialRegardingValue)
  }, [initialRegardingValue])

  const initialTitle = useMemo(() => {
    if (packageName) return `Inquiry: ${packageName}`
    return ''
  }, [packageName])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { title: initialTitle },
  })

  useEffect(() => {
    if (initialTitle) setValue('title', initialTitle)
  }, [initialTitle, setValue])

  const handleRegardingChange = (value: string) => {
    setSelectedRegardingValue(value)
    const pkg = getContactPackageByValue(value)
    setValue('title', pkg?.packageName ? `Inquiry: ${pkg.packageName}` : '')
  }

  // Generate random anti-robot question
  useEffect(() => {
    const generateQuestion = () => {
      const num1 = Math.floor(Math.random() * 10) + 1
      const num2 = Math.floor(Math.random() * 10) + 1
      const answer = num1 + num2
      setAntiRobotQuestion({
        question: `What is ${num1} + ${num2}?`,
        answer: answer.toString()
      })
    }
    generateQuestion()
  }, [])

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remove data URL prefix (e.g., "data:image/png;base64,")
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    console.log('=== CONTACT FORM SUBMISSION START ===')
    console.log('Form data:', { 
      name: data.name, 
      email: data.email, 
      title: data.title, 
      hasFile: !!(data.file && data.file[0]),
      antiRobot: data.antiRobot,
      expectedAnswer: antiRobotQuestion.answer
    })

    try {
      // Validate anti-robot answer
      if (data.antiRobot !== antiRobotQuestion.answer) {
        console.log('Anti-robot validation failed:', { 
          provided: data.antiRobot, 
          expected: antiRobotQuestion.answer 
        })
        toast({
          title: "Incorrect Answer",
          description: "Please answer the anti-robot question correctly.",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }
      console.log('Anti-robot validation passed')

      // Prepare file data if present
      let fileData = undefined
      if (data.file && data.file[0]) {
        const file = data.file[0]
        console.log('Processing file:', { name: file.name, size: file.size, type: file.type })
        
        try {
          const base64Content = await fileToBase64(file)
          fileData = {
            name: file.name,
            content: base64Content,
            size: file.size,
            type: file.type,
          }
          console.log('File converted to base64 successfully')
        } catch (fileError) {
          console.error('File conversion error:', fileError)
          throw new Error('Failed to process file. Please try again.')
        }
      }

      // Call Vercel API endpoint
      console.log('Calling Vercel API endpoint...')
      const selectedPackage = getContactPackageByValue(selectedRegardingValue)
      const payloadInterest = selectedPackage?.interest
      const payloadPackage = selectedPackage?.packageName

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          title: data.title,
          body: data.body,
          file: fileData,
          anti_robot_answer: data.antiRobot,
          ...(payloadInterest && { interest: payloadInterest }),
          ...(payloadPackage && { package: payloadPackage }),
        }),
      })

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        // Try to parse JSON error response, but handle HTML/plain text errors
        let errorMessage = 'Failed to send message'
        const contentType = response.headers.get('content-type')
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json()
            errorMessage = errorData.error || errorData.message || errorMessage
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError)
          }
        } else {
          // If it's not JSON, read as text to get the error message
          try {
            const textError = await response.text()
            console.error('Non-JSON error response:', textError)
            // Try to extract meaningful error from HTML/text
            if (textError.includes('RESEND_API_KEY')) {
              errorMessage = 'Server configuration error. Please contact support.'
            } else if (textError.includes('Internal Server Error')) {
              errorMessage = 'Server error occurred. Please try again later.'
            }
          } catch (textError) {
            console.error('Failed to read error response:', textError)
          }
        }
        
        console.error('API error:', { status: response.status, message: errorMessage })
        throw new Error(errorMessage)
      }

      // Parse JSON only if response is OK
      const result = await response.json()

      console.log('Form submitted successfully:', result)

      toast({
        title: 'Message sent successfully!',
        description: 'Thank you for your message. We\'ll get back to you soon.',
      })

      // Track successful form submission
      analyticsService.trackFormSubmission('contact_form', true)

      // Fire GA4 generate_lead event
      analyticsService.trackEvent('generate_lead', {
        currency: 'EUR',
        lead_source: 'contact_form',
        form_name: 'contact_form',
      })

      reset()
      setSelectedRegardingValue(CONTACT_GENERAL_VALUE)
      setValue('title', '')
      onSuccess?.()
    } catch (error) {
      console.error('Contact form submission error:', error)
      
      // Track failed form submission
      analyticsService.trackFormSubmission('contact_form', false)
      
      toast({
        title: 'Error sending message',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-manrope">Get in Touch</CardTitle>
        <CardDescription>
          Choose a package or general inquiry, then send your message. You can edit the subject and other fields before sending.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="regarding">Regarding *</Label>
            <Select
              value={selectedRegardingValue}
              onValueChange={handleRegardingChange}
              disabled={isSubmitting}
            >
              <SelectTrigger id="regarding" className="mt-1 font-manrope">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                {contactPackageOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="font-manrope">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Selecting a package pre-fills the subject; you can edit it below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register('name')}
                className="mt-1"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
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
            <Label htmlFor="title">Subject *</Label>
            <Input
              id="title"
              {...register('title')}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="body">Message *</Label>
            <Textarea
              id="body"
              {...register('body')}
              className="mt-1 min-h-[120px]"
              disabled={isSubmitting}
            />
            {errors.body && (
              <p className="text-sm text-destructive mt-1">{errors.body.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="file">Attachment (Optional)</Label>
            <div className="mt-1">
              <input
                id="file"
                type="file"
                {...register('file')}
                accept={ACCEPTED_FILE_TYPES.join(',')}
                disabled={isSubmitting}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-sm text-muted-foreground mt-1">
                <FileText className="inline w-4 h-4 mr-1" />
                PDF, DOC, DOCX, TXT, JPG, PNG (max 5MB)
              </p>
            </div>
            {errors.file && (
              <p className="text-sm text-destructive mt-1">{String(errors.file.message)}</p>
            )}
          </div>

          <div>
            <Label htmlFor="antiRobot">Anti-Robot Question *</Label>
            <p className="text-sm text-muted-foreground mb-2">
              {antiRobotQuestion.question} (Enter the number)
            </p>
            <Input
              id="antiRobot"
              {...register('antiRobot')}
              className="mt-1"
              disabled={isSubmitting}
              placeholder="Enter your answer"
            />
            {errors.antiRobot && (
              <p className="text-sm text-destructive mt-1">{errors.antiRobot.message}</p>
            )}
          </div>


          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-manrope font-semibold"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}