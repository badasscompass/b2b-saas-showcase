// Analytics service for Google Analytics tracking (GA4 via GTM dataLayer)
const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true;

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

  // Check if gtag is available
  private isGtagAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.gtag === 'function';
  }

  // Track page view
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

  // Track custom events
  public trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isGtagAvailable()) {
      console.warn('Google Analytics gtag not available');
      return;
    }

    window.gtag('event', eventName, {
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters
    });

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
