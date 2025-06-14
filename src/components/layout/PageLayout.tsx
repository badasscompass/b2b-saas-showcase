
import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { ContactCTA } from "@/components/ContactCTA";
import { PageFooter } from "@/components/PageFooter";

interface PageLayoutProps {
  children: ReactNode;
  showContactCTA?: boolean;
  footerTagline?: string;
}

export const PageLayout = ({ 
  children, 
  showContactCTA = true, 
  footerTagline = "Building products that scale." 
}: PageLayoutProps) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {children}
        {showContactCTA && <ContactCTA />}
        <PageFooter tagline={footerTagline} />
      </main>
    </>
  );
};
