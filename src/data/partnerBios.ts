
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
}

export const partnerBios: PartnerBio[] = [
  {
    id: "iva-rumora",
    name: "Iva Rumora",
    informalName: "Product Whisperer",
    role: "Strategic Product Partner",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
    linkedinUrl: "https://linkedin.com/in/iva-rumora",
    shortDescription: "Strategic product expert specializing in positioning and go-to-market strategy for early-stage companies.",
    fullDescription: "Iva brings over 8 years of experience in strategic product positioning and market analysis. She has a unique ability to distill complex market dynamics into clear, actionable strategies that drive product success. Her approach combines deep market research with intuitive understanding of customer needs, making her the go-to strategist for companies looking to establish strong market positioning.",
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
    philosophy: "Great products aren't just built—they're positioned. I believe that understanding your market position is the foundation of every successful product strategy."
  },
  {
    id: "anamarija-ledic",
    name: "Anamarija Ledic",
    informalName: "Impact Architect",
    role: "Product Growth Catalyst",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    linkedinUrl: "https://linkedin.com/in/anamarija-ledic",
    shortDescription: "Product development specialist focused on building scalable solutions and driving measurable growth outcomes.",
    fullDescription: "Anamarija is a seasoned product development expert with 10+ years of experience turning ideas into successful products. She excels at creating development processes that scale, building high-performing product teams, and implementing data-driven approaches to product growth. Her technical background combined with business acumen makes her invaluable for companies ready to scale their product operations.",
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
    philosophy: "Impact comes from building the right thing, the right way, at the right time. I focus on creating sustainable product development practices that deliver long-term value."
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
