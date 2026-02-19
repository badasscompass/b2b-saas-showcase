import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Send, ChevronLeft } from 'lucide-react'
import { analyticsService } from '@/services/analyticsService'
import { getWizardConfig, type ServiceKey, type WizardResult } from '@/data/serviceGuideWizard'
import type { InquiryModalContext } from './InquiryModal'

interface ServiceGuideWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceKey: ServiceKey
  serviceTitle: string
  onRequestPackageInfo: (context: InquiryModalContext) => void
}

export const ServiceGuideWizard: React.FC<ServiceGuideWizardProps> = ({
  open,
  onOpenChange,
  serviceKey,
  serviceTitle,
  onRequestPackageInfo,
}) => {
  const config = getWizardConfig(serviceKey)
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<WizardResult | null>(null)

  const totalSteps = config.steps.length
  const currentStep = config.steps[stepIndex]
  const isResultView = result !== null

  useEffect(() => {
    if (open) {
      setStepIndex(0)
      setAnswers({})
      setResult(null)
      analyticsService.trackEvent('guide_wizard_start', {
        category: 'conversion',
        label: 'Guide me',
        service_key: serviceKey,
      })
    }
  }, [open, serviceKey])

  const handleSelectOption = (stepId: string, optionId: string) => {
    const newAnswers = { ...answers, [stepId]: optionId }
    setAnswers(newAnswers)
    analyticsService.trackEvent('guide_wizard_step', {
      category: 'conversion',
      label: stepId,
      step_index: stepIndex + 1,
      option_id: optionId,
      service_key: serviceKey,
    })
    if (stepIndex + 1 < totalSteps) {
      setStepIndex(stepIndex + 1)
    } else {
      const wizardResult = config.getResult(newAnswers)
      setResult(wizardResult)
      analyticsService.trackEvent('guide_wizard_complete', {
        category: 'conversion',
        label: wizardResult.packageName || 'general',
        package_name: wizardResult.packageName,
        service_key: serviceKey,
      })
    }
  }

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1)
  }

  const handleRequestPackageInfo = () => {
    if (result?.packageName) {
      onRequestPackageInfo({
        interest: serviceKey,
        serviceTitle,
        packageName: result.packageName,
      })
    } else {
      onRequestPackageInfo({
        interest: serviceKey,
        serviceTitle,
        packageName: '',
      })
    }
    onOpenChange(false)
  }

  const handleSkip = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-manrope w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Guide me</DialogTitle>
          <DialogDescription>
            {isResultView
              ? 'Here’s what we recommend.'
              : `Step ${stepIndex + 1} of ${totalSteps}`}
          </DialogDescription>
        </DialogHeader>

        {!isResultView && currentStep && (
          <>
            <p className="text-base font-medium text-foreground mt-2 mb-4">
              {currentStep.question}
            </p>
            <div className="space-y-2 min-w-0">
              {currentStep.options.map((opt) => (
                <Button
                  key={opt.id}
                  type="button"
                  variant="outline"
                  className="w-full justify-start border-[#EA3E3A]/30 hover:bg-[#EA3E3A]/10 hover:border-[#EA3E3A]/50 hover:text-primary text-left font-normal break-words whitespace-normal h-auto py-3"
                  onClick={() => handleSelectOption(currentStep.id, opt.id)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            <DialogFooter className="mt-6 flex-row justify-between sm:justify-between">
              <div>
                {stepIndex > 0 && (
                  <Button type="button" variant="ghost" onClick={handleBack}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                )}
              </div>
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground"
                onClick={handleSkip}
              >
                Skip and explore the page
              </Button>
            </DialogFooter>
          </>
        )}

        {isResultView && result && (
          <>
            <div className="py-4 min-w-0">
              {result.packageName && result.packageLabel ? (
                <>
                  <p className="text-lg font-semibold text-foreground mb-1 break-words">
                    We recommend: {result.packageLabel}
                  </p>
                  <p className="text-sm text-muted-foreground break-words">
                    Book a call to discuss fit, or request more info to get details by email.
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground break-words">
                  Let’s talk so we can recommend the right next step. Book a call or request more info.
                </p>
              )}
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:flex-wrap min-w-0">
              {(result.ctaType === 'both' || result.ctaType === 'info') && (
                <Button
                  className="bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 flex-1 min-w-0 sm:min-w-[8rem]"
                  onClick={handleRequestPackageInfo}
                >
                  <Send className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="break-words">Request package info</span>
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
