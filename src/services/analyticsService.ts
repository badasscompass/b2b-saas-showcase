// Analytics service for Google Analytics (GA4) and Google Tag Manager (GTM) conversion tracking
const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private measurementId: string = 'G-FQVXJN10TZ';

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private isGtagAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
  }

  /** Push event to dataLayer for GTM triggers (e.g. GA4 Event tags, conversion tags) */
  private pushToDataLayer(eventName: string, eventParams?: Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    try {
      window.dataLayer = window.dataLayer || [];
    } catch {
      return;
    }
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
    if (isDev) console.log(`dataLayer: ${eventName}`, eventParams);
  }

  /**
   * Track conversion for GA4/GTM. Push to dataLayer so GTM can fire:
   * - GA4 Event tag (mark as conversion in GA4 UI)
   * - Google Ads conversion tag (if used)
   */
  public trackConversion(
    conversionName: string,
    options?: { value?: number; currency?: string; [key: string]: unknown }
  ): void {
    const params: Record<string, unknown> = {
      conversion_name: conversionName,
      conversion_type: 'primary',
      ...options,
    };
    if (options?.value != null) params.value = options.value;
    if (options?.currency) params.currency = options.currency;
    this.pushToDataLayer('conversion', params);
    if (this.isGtagAvailable()) {
      window.gtag('event', 'conversion', {
        send_to: this.measurementId,
        conversion_label: conversionName,
        ...params,
      });
    }
    if (isDev) console.log(`Conversion: ${conversionName}`, options);
  }

  public trackPageView(path: string, title?: string): void {
    if (!this.isGtagAvailable()) {
      console.warn('Google Analytics gtag not available');
      return;
    }

    window.gtag('config', this.measurementId, {
      page_path: path,
      page_title: title || document.title
    });

    if (isDev) console.log(`GA Page View: ${path}`);
  }

  /** Event names that should also be sent as GA4/GTM conversions */
  private static readonly CONVERSION_EVENTS = new Set([
    'calendly_click',
    'generate_lead',
    'guide_wizard_complete',
    'home_guide_wizard_complete',
  ]);

  public trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isGtagAvailable()) {
      console.warn('Google Analytics gtag not available');
      return;
    }

    const payload = {
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters
    };
    window.gtag('event', eventName, payload);
    this.pushToDataLayer(eventName, payload as Record<string, unknown>);

    if (AnalyticsService.CONVERSION_EVENTS.has(eventName)) {
      this.trackConversion(parameters?.label || eventName, {
        value: parameters?.value,
        ...parameters,
      });
    }

    if (isDev) console.log(`GA Event: ${eventName}`, parameters);
  }

  // Track button clicks
  public trackButtonClick(buttonName: string, location?: string): void {
    this.trackEvent('button_click', {
      category: 'engagement',
      label: buttonName,
      location: location || window.location.pathname
    });
  }

  // Track form submissions
  public trackFormSubmission(formName: string, success: boolean = true): void {
    this.trackEvent('form_submit', {
      category: 'engagement',
      label: formName,
      success: success
    });
  }

  // Track navigation
  public trackNavigation(from: string, to: string): void {
    this.trackEvent('navigation', {
      category: 'engagement',
      label: `${from} -> ${to}`
    });
  }

  // Track scroll depth
  public trackScrollDepth(percentage: number): void {
    this.trackEvent('scroll', {
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage
    });
  }

  // Track file downloads
  public trackDownload(fileName: string, fileType: string): void {
    this.trackEvent('file_download', {
      category: 'engagement',
      label: fileName,
      file_type: fileType
    });
  }

  // Track external link clicks
  public trackExternalLink(url: string, linkText?: string): void {
    this.trackEvent('click', {
      category: 'outbound',
      label: linkText || url,
      outbound_url: url
    });
  }
}

export const analyticsService = AnalyticsService.getInstance();
