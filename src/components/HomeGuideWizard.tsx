import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ArrowRight } from 'lucide-react'
import { analyticsService } from '@/services/analyticsService'
import {
  homeWizardSteps,
  getHomeWizardResult,
  needsContextStep,
  type HomeWizardResult,
} from '@/data/homeGuideWizard'

interface HomeGuideWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const HomeGuideWizard: React.FC<HomeGuideWizardProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<HomeWizardResult | null>(null)

  const currentStep = homeWizardSteps[stepIndex]
  const isResultView = result !== null

  useEffect(() => {
    if (open) {
      setStepIndex(0)
      setAnswers({})
      setResult(null)
      analyticsService.trackEvent('home_guide_wizard_start', {
        category: 'conversion',
        label: 'Guide me',
        location: 'homepage',
      })
    }
  }, [open])

  const handleSelectOption = (stepId: string, optionId: string, optionLabel?: string) => {
    const newAnswers = { ...answers, [stepId]: optionId }
    setAnswers(newAnswers)

    analyticsService.trackEvent('home_guide_wizard_step', {
      category: 'conversion',
      label: stepId,
      step_index: stepIndex + 1,
      option_id: optionId,
      option_label: optionLabel,
      location: 'homepage',
    })

    if (stepId === 'goal' && needsContextStep(optionId)) {
      setStepIndex(1)
    } else {
      const wizardResult = getHomeWizardResult(newAnswers)
      setResult(wizardResult)
      analyticsService.trackEvent('home_guide_wizard_complete', {
        category: 'conversion',
        label: wizardResult.serviceKey,
        service_key: wizardResult.serviceKey,
        step_index: stepIndex + 1,
        location: 'homepage',
      })
    }
  }

  const handleBack = () => {
    if (stepIndex > 0) {
      analyticsService.trackEvent('home_guide_wizard_back', {
        category: 'conversion',
        label: 'Back',
        step_index: stepIndex + 1,
        location: 'homepage',
      })
      setStepIndex(0)
      setAnswers((prev) => ({ goal: prev.goal }))
    }
  }

  const handleGoToService = () => {
    if (!result) return
    analyticsService.trackEvent('home_guide_wizard_go_to_service', {
      category: 'conversion',
      label: result.serviceKey,
      service_key: result.serviceKey,
      service_path: result.servicePath,
      location: 'homepage',
    })
    onOpenChange(false)
    navigate(result.servicePath)
  }

  const handleRequestInfo = () => {
    if (!result) return
    analyticsService.trackEvent('home_guide_wizard_request_info', {
      category: 'conversion',
      label: result.serviceKey,
      service_key: result.serviceKey,
      location: 'homepage',
    })
    onOpenChange(false)
    navigate(`/contact?interest=${result.serviceKey}`)
  }

  const handleSkip = () => {
    analyticsService.trackEvent('home_guide_wizard_skip', {
      category: 'conversion',
      label: 'Skip and explore',
      step_index: stepIndex + 1,
      location: 'homepage',
    })
    onOpenChange(false)
  }

  const totalSteps = answers.goal && needsContextStep(answers.goal) ? 2 : 1
  const displayStepNumber = isResultView ? totalSteps : stepIndex + 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto font-manrope w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-xl">Find the right service</DialogTitle>
          <DialogDescription>
            {isResultView
              ? 'Here’s what we recommend.'
              : `Step ${displayStepNumber} of ${totalSteps}`}
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
                  onClick={() => handleSelectOption(currentStep.id, opt.id, opt.label)}
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
                Skip and explore
              </Button>
            </DialogFooter>
          </>
        )}

        {isResultView && result && (
          <>
            <div className="py-4 min-w-0">
              <p className="text-lg font-semibold text-foreground mb-1 break-words">
                {result.serviceTitle}
              </p>
              <p className="text-sm text-muted-foreground mb-4 break-words">
                {result.blurb}
              </p>
              <p className="text-sm text-muted-foreground break-words">
                Go to the service page to see packages and request info, or book a call to discuss.
              </p>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:flex-wrap min-w-0">
              <Button
                className="bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 flex-1 min-w-0 sm:min-w-[8rem]"
                onClick={handleGoToService}
              >
                <ArrowRight className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="break-words">Go to {result.serviceTitle}</span>
              </Button>
              <Button
                variant="outline"
                className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A]/10 hover:text-primary flex-1 min-w-0 sm:min-w-[8rem]"
                onClick={handleRequestInfo}
              >
                Request info
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
