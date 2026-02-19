import { ReactNode, useState } from "react";
import { PageLayout } from "./PageLayout";
import { PageHero } from "@/components/PageHero";
import { ServiceGuideWizard } from "@/components/ServiceGuideWizard";
import { InquiryModal } from "@/components/InquiryModal";
import type { ServiceKey } from "@/data/serviceGuideWizard";
import type { InquiryModalContext } from "@/components/InquiryModal";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  ctaText: string;
  children: ReactNode;
  footerTagline?: string;
  serviceKey?: ServiceKey;
  serviceTitle?: string;
}

export const ServicePageLayout = ({
  title,
  subtitle,
  ctaText,
  children,
  footerTagline,
  serviceKey,
  serviceTitle,
}: ServicePageLayoutProps) => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState<InquiryModalContext | null>(null);

  const showGuideMe = Boolean(serviceKey && serviceTitle);

  return (
    <PageLayout footerTagline={footerTagline} showContactCTA={false}>
      <PageHero
        title={title}
        subtitle={subtitle}
        ctaText={ctaText}
        showGuideMe={showGuideMe}
        onGuideMeClick={showGuideMe ? () => setWizardOpen(true) : undefined}
      />
      {children}

      {serviceKey && serviceTitle && (
        <>
          <ServiceGuideWizard
            open={wizardOpen}
            onOpenChange={setWizardOpen}
            serviceKey={serviceKey}
            serviceTitle={serviceTitle}
            onRequestPackageInfo={(context) => {
              setWizardOpen(false);
              setInquiryContext(context);
            }}
          />
          <InquiryModal
            open={!!inquiryContext}
            onOpenChange={(open) => !open && setInquiryContext(null)}
            context={inquiryContext}
          />
        </>
      )}
    </PageLayout>
  );
};
