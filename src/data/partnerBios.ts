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
    fullDescription: "Iva blends analytical clarity with grounded execution to help product teams unlock progress—whether that means defining a vision, rebuilding a roadmap, or untangling misalignment between teams.\n\nWith over 8 years of experience across startups, agencies, and scaleups, she brings a calm, systems-thinking approach to complex product environments. Her superpower is asking the sharp question no one else thought to voice—and turning the answer into strategy.\n\nAs a consultant, Iva partners closely with founders and product leaders to set direction, stabilize delivery, and refocus efforts on outcomes that matter. She's also the instigator behind LMN3, driven by a belief that foundational product thinking should be both pragmatic and scalable.",
    expertise: [
      "Strategic Positioning",
      "Market Analysis",
      "Competitive Intelligence",
      "Value Proposition Design",
      "Go-to-Market Strategy",
      "Product-Market Fit"
    ],
    achievements: [
      "Guided 50+ startups through successful product positioning",
      "Developed positioning frameworks adopted by leading accelerators",
      "Featured speaker at ProductCon and Mind the Product events",
      "Mentor at Techstars and Y Combinator programs"
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
       pricing: "2000 (starting at)"
      },
      {
        packageName: "Product Ops-in-a-Box",
        tier: "Solo",
        serviceType: "product-development",
        servicePage: "/product-development",
        serviceTitle: "Product Development",
        pricing: "3000 (starting at)"
      }
    ]
  },
  {
    id: "anamarija-ledic",
    name: "Anamarija Ledic",
    informalName: "Impact Architect",
    role: "Product Growth Catalyst",
    image: "/lovable-uploads/43e1fa05-852f-4467-9ed5-9d3d1e4f106f.png",
    linkedinUrl: "https://www.linkedin.com/in/anamarijaledic/",
    shortDescription: "A product strategist with a nose for momentum, a knack for user insight, and a talent for turning \"we're not sure yet\" into clear, confident moves.",
    fullDescription: "Anamarija is a product strategist with a sharp eye for turning user insight into growth levers. With a background that spans scaleups, enterprise, and B2C startups, she excels at bridging customer needs with business goals. And she does it fast.\n\nHer work centers on activating product-market fit: defining the core value, positioning it clearly, and aligning cross-functional teams around it. Whether it's refining a go-to-market motion or revamping retention mechanics, Anamarija brings energy, empathy, and strategic clarity.\n\nAt LMN3, she's the partner who leans into experimentation, embraces ambiguity, and brings momentum to ideas that are ready to scale.",
    expertise: [
      "Product Development",
      "Team Building & Leadership",
      "Process Optimization",
      "Growth Strategy",
      "Data Analytics",
      "User Experience Design"
    ],
    achievements: [
      "Led product development for 3 successful exits",
      "Built and scaled product teams of 20+ members",
      "Implemented development processes reducing time-to-market by 40%",
      "Recognized as Top Product Leader by Product Management Association"
    ],
    philosophy: "Impact comes from building the right thing, the right way, at the right time. I focus on creating sustainable product development practices that deliver long-term value.",
    packageOffers: [
      // 1. Fractional Product Leadership
      {
        packageName: "Fractional Product Leadership",
        tier: "Solo",
        serviceType: "strategic-advisory",
        servicePage: "/strategic-advisory",
        serviceTitle: "Strategic Advisory",
        pricing: "60/h (starting rate)"
      },
      // 2. Product Reset
      {
        packageName: "Product Reset",
        tier: "Solo",
        serviceType: "strategic-advisory",
        servicePage: "/strategic-advisory",
        serviceTitle: "Strategic Advisory",
        pricing: "7000 (starting at)"
      },
      // 3. GTM Monetisation and Alignment
      {
        packageName: "GTM Monetisation and Alignment",
        tier: "Collab",
        serviceType: "product-marketing-gtm",
        servicePage: "/product-marketing-gtm",
        serviceTitle: "Product Marketing & GTM",
        pricing: "Custom"
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
