/**
 * Package options for the Contact form "Regarding" dropdown.
 * Kept in sync with pricing tiers on Product Development, Strategic Advisory, and Product Marketing & GTM pages.
 */
export interface ContactPackageOption {
  value: string
  interest: string
  serviceTitle: string
  packageName: string
  label: string
}

const GENERAL_VALUE = 'general'

export const CONTACT_GENERAL_VALUE = GENERAL_VALUE

/** Options for the Regarding dropdown: General inquiry + all service packages */
export const contactPackageOptions: ContactPackageOption[] = [
  {
    value: GENERAL_VALUE,
    interest: '',
    serviceTitle: '',
    packageName: '',
    label: 'General inquiry',
  },
  // Product Development
  {
    value: 'product-development|Product Clarity Sprint',
    interest: 'product-development',
    serviceTitle: 'Product Development',
    packageName: 'Product Clarity Sprint',
    label: 'Product Development – Product Clarity Sprint',
  },
  {
    value: 'product-development|Fractional Product Leadership',
    interest: 'product-development',
    serviceTitle: 'Product Development',
    packageName: 'Fractional Product Leadership',
    label: 'Product Development – Fractional Product Leadership',
  },
  {
    value: 'product-development|Product Ops-in-a-Box',
    interest: 'product-development',
    serviceTitle: 'Product Development',
    packageName: 'Product Ops-in-a-Box',
    label: 'Product Development – Product Ops-in-a-Box',
  },
  // Strategic Advisory
  {
    value: 'strategic-advisory|Product Strategy Blueprint',
    interest: 'strategic-advisory',
    serviceTitle: 'Strategic Advisory',
    packageName: 'Product Strategy Blueprint',
    label: 'Strategic Advisory – Product Strategy Blueprint',
  },
  {
    value: 'strategic-advisory|Discovery-to-Strategy Accelerator',
    interest: 'strategic-advisory',
    serviceTitle: 'Strategic Advisory',
    packageName: 'Discovery-to-Strategy Accelerator',
    label: 'Strategic Advisory – Discovery-to-Strategy Accelerator',
  },
  {
    value: 'strategic-advisory|Fractional Product Leadership',
    interest: 'strategic-advisory',
    serviceTitle: 'Strategic Advisory',
    packageName: 'Fractional Product Leadership',
    label: 'Strategic Advisory – Fractional Product Leadership',
  },
  // Product Marketing & GTM
  {
    value: 'product-marketing-gtm|GTM & Monetisation Alignment',
    interest: 'product-marketing-gtm',
    serviceTitle: 'Product Marketing & GTM',
    packageName: 'GTM & Monetisation Alignment',
    label: 'Product Marketing & GTM – GTM & Monetisation Alignment',
  },
  {
    value: 'product-marketing-gtm|Fractional Product Marketing Specialist',
    interest: 'product-marketing-gtm',
    serviceTitle: 'Product Marketing & GTM',
    packageName: 'Fractional Product Marketing Specialist',
    label: 'Product Marketing & GTM – Fractional Product Marketing Specialist',
  },
]

export function getContactPackageByValue(value: string): ContactPackageOption | undefined {
  return contactPackageOptions.find((opt) => opt.value === value)
}

/** Find option matching interest + packageName (e.g. from URL params) */
export function getContactPackageByInterestAndPackage(
  interest: string,
  packageName: string
): ContactPackageOption | undefined {
  return contactPackageOptions.find(
    (opt) => opt.interest === interest && opt.packageName === packageName
  )
}
