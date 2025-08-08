import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, Send, FileText, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'

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

interface ContactFormProps {
  onSuccess?: () => void
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [antiRobotQuestion, setAntiRobotQuestion] = useState({ question: '', answer: '' })
  const { toast } = useToast()

  // Generate random anti-robot question
  useEffect(() => {
    const generateQuestion = () => {
      const num1 = Math.floor(Math.random() * 10) + 1 // 1-10
      const num2 = Math.floor(Math.random() * 10) + 1 // 1-10
      const answer = num1 + num2
      setAntiRobotQuestion({
        question: `What is ${num1} + ${num2}?`,
        answer: answer.toString()
      })
    }
    generateQuestion()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // Validate anti-robot answer
      if (data.antiRobot !== antiRobotQuestion.answer) {
        throw new Error('Incorrect answer to anti-robot question')
      }

      let filePath = null
      let fileName = null
      let fileSize = null

      // Handle file upload if present
      console.log('File data check:', { file: data.file, hasFile: !!(data.file && data.file[0]) })
      
      if (data.file && data.file[0]) {
        const file = data.file[0]
        fileName = file.name
        fileSize = file.size

        console.log('Starting file upload:', { fileName, fileSize, type: file.type })
        setUploadProgress(25)

        const fileExt = file.name.split('.').pop()
        const timestamp = Date.now()
        filePath = `contact-files/${timestamp}-${file.name}`

        console.log('Uploading to path:', filePath)
        const { error: uploadError } = await supabase.storage
          .from('contact-files')
          .upload(filePath, file)

        if (uploadError) {
          console.error('File upload error:', uploadError)
          throw new Error(`File upload failed: ${uploadError.message}`)
        }

        console.log('File uploaded successfully')
        setUploadProgress(50)
      } else {
        console.log('No file to upload')
      }

      // Call the edge function to send email and store submission
      setUploadProgress(75)
      
      console.log('Calling edge function with data:', {
        name: data.name,
        email: data.email,
        title: data.title,
        body: data.body.substring(0, 50) + '...',
        file_path: filePath,
        file_name: fileName,
        file_size: fileSize,
        anti_robot_answer: data.antiRobot,
      })

      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          title: data.title,
          body: data.body,
          file_path: filePath,
          file_name: fileName,
          file_size: fileSize,
          anti_robot_answer: data.antiRobot,
        }
      })

      console.log('Edge function result:', { result, error })

      if (error) {
        console.error('Edge function error details:', error)
        throw new Error(`Failed to send message: ${error.message}`)
      }
      setUploadProgress(100)

      toast({
        title: 'Message sent successfully!',
        description: 'Thank you for your message. We\'ll get back to you soon.',
      })

      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast({
        title: 'Error sending message',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-manrope">Get in Touch</CardTitle>
        <CardDescription>
          Send us a message and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <Label>Upload Progress</Label>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

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