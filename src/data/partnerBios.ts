export interface PackageOffer {
  packageName: string;
  tier: 'Solo' | 'Duo' | 'Collab';
  serviceType: 'strategic-advisory' | 'product-development' | 'product-marketing-gtm';
  servicePage: string;
  serviceTitle: string;
  pricing?: string;
}

export interface PartnerBio {
  id: string;
  name: string;
  informalName: string;
  role: string;
  image: string;
  linkedinUrl: string;
  shortDescription: string;
  fullDescription: string;
  expertise: string[];
  achievements: string[];
  philosophy: string;
  packageOffers: PackageOffer[];
}

export const partnerBios: PartnerBio[] = [
  {
    id: "iva-rumora",
    name: "Iva Rumora",
    informalName: "Product Whisperer",
    role: "Strategic Product Partner",
    image: "/lovable-uploads/195b913c-4f2a-4d17-9a3f-b9e1751cb51c.png",
    linkedinUrl: "https://www.linkedin.com/in/irumora/",
    shortDescription: "Product partner who observes closely, makes sense of moving parts, and helps teams find steady footing in shifting ground.",
    fullDescription: "Iva blends analytical vision with grounded execution to help product teams unlock progress—whether that means defining a vision, rebuilding a roadmap, or untangling misalignment between teams.\n\nWith over 9 years of experience across startups, agencies, and scaleups, she brings a systems-thinking approach to complex product environments. Her superpower is asking the sharp question and turning the answers into strategic building blocks.\n\nAs a consultant, Iva partners closely with founders and product leaders to set direction, stabilize delivery, and refocus efforts on outcomes that matter. She's also the instigator behind LMN3, driven by a belief that foundational product thinking should be both pragmatic and scalable.",
    expertise: [
      "Strategic Positioning",
      "Market Analysis",
      "Competitive Intelligence",
      "Value Proposition Design",
      "Go-to-Market Strategy",
      "Product-Market Fit"
    ],
    achievements: [
      "Guided startups through successful product positioning",
      "Developed sprint execution frameworks for product teams",
      "Featured speaker at Ladies of New Business: Product edition and Product World Europe events",
    
    ],
    philosophy: "Great products aren't just built—they're positioned. I believe that understanding your market position is the foundation of every successful product strategy.",
    packageOffers: [
      // Added Fractional Product Leadership
      {
        packageName: "Fractional Product Leadership",
        tier: "Solo",
        serviceType: "product-development",
        servicePage: "/product-development",
        serviceTitle: "Product Development",
        pricing: "40/h (starting rate)"
      },
      {
        packageName: "Product Clarity Sprint",
        tier: "Solo",
        serviceType: "product-development",
        servicePage: "/product-development",
        serviceTitle: "Product Development",
       pricing: "2500 (starting at)"
      },
      {
        packageName: "Discovery-to-Strategy Accelerator",
        tier: "Collab",
        serviceType: "strategic-advisory",
        servicePage: "/strategic-advisory",
        serviceTitle: "Strategic Advisory",
        pricing: "6000 (starting at)"
      }
    ]
  }
];

export const getPartnerById = (id: string): PartnerBio | undefined => {
  return partnerBios.find(partner => partner.id === id);
};

export const getPartnerByName = (name: string): PartnerBio | undefined => {
  return partnerBios.find(partner => 
    partner.name.toLowerCase() === name.toLowerCase()
  );
};
