import { ReactNode } from "react";
import { PageLayout } from "./PageLayout";
import { PageHero } from "@/components/PageHero";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  ctaText: string;
  children: ReactNode;
  footerTagline?: string;
}

export const ServicePageLayout = ({ 
  title, 
  subtitle, 
  ctaText, 
  children, 
  footerTagline 
}: ServicePageLayoutProps) => {
  return (
    <PageLayout footerTagline={footerTagline} showContactCTA={false}>
      <PageHero
        title={title}
        subtitle={subtitle}
        ctaText={ctaText}
      />
      {children}
    </PageLayout>
  );
};
