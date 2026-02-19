/**
 * Homepage "Guide me" wizard: high-level questions to recommend which service type fits.
 * Result is one of: product-development | strategic-advisory | product-marketing-gtm
 */

export type HomeServiceKey = 'product-development' | 'strategic-advisory' | 'product-marketing-gtm'

export interface HomeWizardOption {
  id: string
  label: string
}

export interface HomeWizardStep {
  id: string
  question: string
  options: HomeWizardOption[]
}

export interface HomeWizardResult {
  serviceKey: HomeServiceKey
  serviceTitle: string
  servicePath: string
  blurb: string
}

const SERVICE_META: Record<HomeServiceKey, Omit<HomeWizardResult, 'serviceKey'>> = {
  'product-development': {
    serviceTitle: 'Product Development',
    servicePath: '/product-development',
    blurb: 'From MVP scoping to delivery — we help you build and scale your product.',
  },
  'strategic-advisory': {
    serviceTitle: 'Strategic Advisory',
    servicePath: '/strategic-advisory',
    blurb: 'Clarity on direction, positioning, and strategy for product-led teams.',
  },
  'product-marketing-gtm': {
    serviceTitle: 'Product Marketing & GTM',
    servicePath: '/product-marketing-gtm',
    blurb: 'Launch smarter and reach buyers with data-driven go-to-market.',
  },
}

function getHomeResult(answers: Record<string, string>): HomeWizardResult {
  const goal = answers['goal']
  const context = answers['context']

  if (goal === 'build-scope') {
    return { ...SERVICE_META['product-development'], serviceKey: 'product-development' }
  }
  if (goal === 'strategy-direction') {
    return { ...SERVICE_META['strategic-advisory'], serviceKey: 'strategic-advisory' }
  }
  if (goal === 'launch-gtm') {
    return { ...SERVICE_META['product-marketing-gtm'], serviceKey: 'product-marketing-gtm' }
  }
  if (goal === 'not-sure') {
    if (context === 'early-idea') return { ...SERVICE_META['strategic-advisory'], serviceKey: 'strategic-advisory' }
    if (context === 'building') return { ...SERVICE_META['product-development'], serviceKey: 'product-development' }
    if (context === 'launching') return { ...SERVICE_META['product-marketing-gtm'], serviceKey: 'product-marketing-gtm' }
    return { ...SERVICE_META['strategic-advisory'], serviceKey: 'strategic-advisory' }
  }
  return { ...SERVICE_META['strategic-advisory'], serviceKey: 'strategic-advisory' }
}

export const homeWizardSteps: HomeWizardStep[] = [
  {
    id: 'goal',
    question: "What do you need most right now?",
    options: [
      { id: 'build-scope', label: 'Build or scope a product (MVP, roadmap, delivery)' },
      { id: 'strategy-direction', label: 'Strategy & direction (positioning, clarity)' },
      { id: 'launch-gtm', label: 'Launch & go-to-market (messaging, launch, sales)' },
      { id: 'not-sure', label: "Not sure — I'd like to find the right fit" },
    ],
  },
  {
    id: 'context',
    question: "What best describes your situation?",
    options: [
      { id: 'early-idea', label: 'Early stage — idea or pre-MVP' },
      { id: 'building', label: 'Building — need product execution or structure' },
      { id: 'launching', label: 'Launching or scaling — need GTM or growth' },
    ],
  },
]

export function getHomeWizardResult(answers: Record<string, string>): HomeWizardResult {
  return getHomeResult(answers)
}

/** Whether we need the second step (context) — only when user chose "Not sure" */
export function needsContextStep(goal: string): boolean {
  return goal === 'not-sure'
}
