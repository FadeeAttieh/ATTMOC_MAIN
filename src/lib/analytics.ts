import { Metric } from 'web-vitals';

/**
 * Analytics tracking for Web Vitals and user interactions
 */

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}: ${metric.value}ms`);
  }

  // Send to analytics service (Google Analytics, Vercel Analytics, Sentry, etc.)
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    // Example: Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

/**
 * Track custom events for user interactions
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track page views
 */
export function trackPageView(pathname: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID, {
      page_path: pathname,
    });
  }
}
