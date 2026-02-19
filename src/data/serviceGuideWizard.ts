/**
 * Service "Guide me" wizard: steps, options, and result mapping per service.
 * Package names must match contactPackageOptions for InquiryModal.
 */

export type ServiceKey = 'product-development' | 'strategic-advisory' | 'product-marketing-gtm'

export interface WizardOption {
  id: string
  label: string
}

export interface WizardStep {
  id: string
  question: string
  options: WizardOption[]
}

export interface WizardResult {
  packageName?: string
  packageLabel?: string
  /** 'general' = no specific package; show both CTAs, Request info without package */
  ctaType: 'call' | 'info' | 'both'
}

export interface ServiceWizardConfig {
  serviceKey: ServiceKey
  steps: WizardStep[]
  /** Map stepId -> optionId -> next step id or result. Last step options map to WizardResult. */
  getResult(answers: Record<string, string>): WizardResult
}

function productDevelopmentGetResult(answers: Record<string, string>): WizardResult {
  const challenge = answers['challenge']
  const stage = answers['stage']
  if (!challenge || !stage) return { ctaType: 'both' }

  if (challenge === 'mvp-scope' && (stage === 'pre-mvp' || stage === 'post-mvp'))
    return { packageName: 'Product Clarity Sprint', packageLabel: 'Product Clarity Sprint', ctaType: 'both' }
  if (challenge === 'roadmap' && stage === 'post-mvp')
    return { packageName: 'Product Clarity Sprint', packageLabel: 'Product Clarity Sprint', ctaType: 'both' }
  if (challenge === 'team-process' && (stage === 'growing-team' || stage === 'post-mvp'))
    return { packageName: 'Product Ops-in-a-Box', packageLabel: 'Product Ops-in-a-Box', ctaType: 'both' }
  if (challenge === 'fractional' || (challenge === 'team-process' && stage === 'pre-mvp'))
    return { packageName: 'Fractional Product Leadership', packageLabel: 'Fractional Product Leadership', ctaType: 'both' }
  return { ctaType: 'both' }
}

function strategicAdvisoryGetResult(answers: Record<string, string>): WizardResult {
  const need = answers['need']
  const situation = answers['situation']
  if (!need || !situation) return { ctaType: 'both' }

  if (need === 'strategy-direction' && (situation === 'scaling' || situation === 'small-team'))
    return { packageName: 'Product Strategy Blueprint', packageLabel: 'Product Strategy Blueprint', ctaType: 'both' }
  if (need === 'market-positioning' || (need === 'funding' && situation === 'solo-founder'))
    return { packageName: 'Discovery-to-Strategy Accelerator', packageLabel: 'Discovery-to-Strategy Accelerator', ctaType: 'both' }
  if (need === 'funding' && (situation === 'small-team' || situation === 'scaling'))
    return { packageName: 'Product Strategy Blueprint', packageLabel: 'Product Strategy Blueprint', ctaType: 'both' }
  if (situation === 'solo-founder' && need === 'strategy-direction')
    return { packageName: 'Fractional Product Leadership', packageLabel: 'Fractional Product Leadership', ctaType: 'both' }
  return { ctaType: 'both' }
}

function productMarketingGTMGetResult(answers: Record<string, string>): WizardResult {
  const focus = answers['focus']
  const stage = answers['stage']
  if (!focus || !stage) return { ctaType: 'both' }

  if (focus === 'messaging-positioning' || focus === 'launch')
    return { packageName: 'GTM & Monetisation Alignment', packageLabel: 'GTM & Monetisation Alignment', ctaType: 'both' }
  if (focus === 'sales-enablement' || stage === 'ongoing')
    return { packageName: 'Fractional Product Marketing Specialist', packageLabel: 'Fractional Product Marketing Specialist', ctaType: 'both' }
  return { ctaType: 'both' }
}

const productDevelopmentConfig: ServiceWizardConfig = {
  serviceKey: 'product-development',
  steps: [
    {
      id: 'challenge',
      question: "What's your main challenge?",
      options: [
        { id: 'mvp-scope', label: 'Scoping or building an MVP' },
        { id: 'roadmap', label: 'Roadmap & priorities' },
        { id: 'team-process', label: 'Team & process (delivery, alignment)' },
        { id: 'fractional', label: 'Need interim product leadership' },
        { id: 'other', label: "Something else – I'd rather talk" },
      ],
    },
    {
      id: 'stage',
      question: "What best describes your stage?",
      options: [
        { id: 'pre-mvp', label: 'Pre-MVP or early build' },
        { id: 'post-mvp', label: 'Post-MVP, scaling' },
        { id: 'growing-team', label: 'Growing team, need structure' },
      ],
    },
  ],
  getResult: productDevelopmentGetResult,
}

const strategicAdvisoryConfig: ServiceWizardConfig = {
  serviceKey: 'strategic-advisory',
  steps: [
    {
      id: 'need',
      question: 'What do you need most?',
      options: [
        { id: 'strategy-direction', label: 'Strategy & direction' },
        { id: 'market-positioning', label: 'Market positioning' },
        { id: 'funding', label: 'Preparing for funding or growth' },
        { id: 'other', label: "Something else – I'd rather talk" },
      ],
    },
    {
      id: 'situation',
      question: 'Your situation?',
      options: [
        { id: 'solo-founder', label: 'Solo founder' },
        { id: 'small-team', label: 'Small team' },
        { id: 'scaling', label: 'Scaling / need executive-level input' },
      ],
    },
  ],
  getResult: strategicAdvisoryGetResult,
}

const productMarketingGTMConfig: ServiceWizardConfig = {
  serviceKey: 'product-marketing-gtm',
  steps: [
    {
      id: 'focus',
      question: "What's your focus?",
      options: [
        { id: 'messaging-positioning', label: 'Messaging & positioning' },
        { id: 'launch', label: 'Launch / go-to-market' },
        { id: 'sales-enablement', label: 'Sales enablement & performance' },
        { id: 'other', label: "Something else – I'd rather talk" },
      ],
    },
    {
      id: 'stage',
      question: "What best describes your stage?",
      options: [
        { id: 'pre-launch', label: 'Pre-launch' },
        { id: 'launching', label: 'Launching or just launched' },
        { id: 'ongoing', label: 'Ongoing growth & optimization' },
      ],
    },
  ],
  getResult: productMarketingGTMGetResult,
}

const configs: Record<ServiceKey, ServiceWizardConfig> = {
  'product-development': productDevelopmentConfig,
  'strategic-advisory': strategicAdvisoryConfig,
  'product-marketing-gtm': productMarketingGTMConfig,
}

export function getWizardConfig(serviceKey: ServiceKey): ServiceWizardConfig {
  const config = configs[serviceKey]
  if (!config) throw new Error(`Unknown service key: ${serviceKey}`)
  return config
}
