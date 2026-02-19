# Analytics Review: GA4, GTM & Clarity

## Current setup (summary)

| Tool | Placement | Role |
|------|-----------|------|
| **GTM** | `index.html` `<head>` + noscript in `<body>` | Loads tags (e.g. GA4); receives consent and app events via `dataLayer` |
| **Consent Mode v2** | Inline script in `index.html` (before GTM) | Sets default consent to denied; `CookieConsent` updates on accept/decline |
| **GA4** | Via GTM + app calls to `gtag()` | Measurement ID `G-FQVXJN10TZ`; page views and events pushed from app to `dataLayer` |
| **Clarity** | Loaded in app after consent | Injected when user accepts cookies in `CookieConsent` |
| **HubSpot** | `index.html` script + consent in `CookieConsent` | Script in body; consent updated on accept/decline |

Analytics (GTM, consent, HubSpot, Clarity) load **only on production**: `lmn3.digital` and `www.lmn3.digital`. Vercel and Lovable preview URLs are excluded.

## Changes made

1. **Consent before GTM**  
   The Consent Mode v2 inline script now runs **before** the GTM snippet so default consent is in `dataLayer` before GTM loads. This aligns with Google’s recommendation and avoids tags firing before consent is set.

2. **Clarity only after consent**  
   Clarity was moved from `index.html` into the app. The script is loaded only when the user clicks “Accept All” in `CookieConsent`, so Clarity runs only after analytics consent. This improves compliance with consent/GDPR expectations.

3. **Analytics logging only in dev**  
   `analyticsService` now logs page views and events only when `import.meta.env.DEV` is true, so production builds don’t clutter the console.

## App-side tracking (already in good shape)

- **Page views**: `App.tsx` calls `analyticsService.trackPageView(path, title)` on route change → correct for an SPA.
- **Events**: Calendly clicks, contact form, `view_item` on service pages, scroll depth (25/50/75/90%), nav and external links are tracked via `analyticsService.trackEvent()` / helpers.
- **Scroll depth**: `useScrollDepth` with passive listener and milestone deduplication is used on Index, StrategicAdvisory, ProductDevelopment, ProductMarketingGTM.
- **Consent**: `CookieConsent` updates `gtag('consent', 'update', …)` and HubSpot consent; Clarity is loaded only on accept.

## GTM / GA4 recommendations (in GTM UI)

1. **Avoid duplicate page views**  
   The app sends a page view on every route change via `gtag('config', measurementId, { page_path, page_title })`. In GTM, if the GA4 Configuration tag is set to “Send a page view event when this configuration loads,” you may get two page views on the first load. Either:
   - Rely on the app for all page views and **do not** send an initial page view from the GA4 tag, or  
   - Use a GA4 tag that only fires on the initial load and let the app handle subsequent SPA route changes (more complex).  
   Recommended: configure the GA4 tag so it does **not** send an automatic page view; use only the app’s `trackPageView` for both first load and route changes.

2. **GA4 tag and measurement ID**  
   Ensure the GA4 Configuration tag in GTM uses the same measurement ID as the app: `G-FQVXJN10TZ`. The app pushes `config` and `event` via `gtag()` (i.e. into `dataLayer`); the GA4 tag should read from `dataLayer` and use this ID.

3. **Consent and triggers**  
   GA4 (and any other marketing/analytics tags) should be gated by Consent Mode / triggers so they respect the “denied by default” and “update on accept” behavior. No code change needed if you already use consent-based triggers for GA4 and other tags.

4. **Exclude preview domains (Vercel / Lovable)**  
   - **In code**: GTM, consent script, HubSpot, and Clarity run only when `hostname` is `lmn3.digital` or `www.lmn3.digital`. Preview URLs (e.g. `*.vercel.app`, Lovable preview) do not load analytics.  
   - **In GTM (optional extra)**: Create a trigger **Production only** where **Page Hostname** equals `lmn3.digital` (or “matches regex” `lmn3\.digital` to include `www`). Use this trigger for your Google Tag and Clarity tag instead of “All Pages”. Then even if the container loads elsewhere, tags won’t fire.

## Tag coverage (GA4)

After adding or changing the GA4/Google Tag in GTM, tag coverage can take **24–48 hours** to update. Ensure the tag trigger is **All Pages** (or “Production only” as above) and that you’ve visited the live site (lmn3.digital) and accepted cookies so events are sent.

## Optional improvements

- **Scroll depth**: Consider adding a 100% milestone in `useScrollDepth.ts` (e.g. `MILESTONES = [25, 50, 75, 90, 100]`) to capture “read to bottom.”
- **GA4 measurement ID**: If you add staging/production environments, consider moving `G-FQVXJN10TZ` to an env var (e.g. `import.meta.env.VITE_GA4_MEASUREMENT_ID`) and using it in `analyticsService`.
- **Centralise `Window` types**: `gtag` and `dataLayer` are declared in `CookieConsent.tsx`; you could move these to a shared `global.d.ts` or `vite-env.d.ts` for a single place to maintain types.

## File reference

- **index.html**: Consent script (before GTM), GTM snippet, GTM noscript; Clarity removed from HTML.
- **src/services/analyticsService.ts**: GA4 page view and event helpers; dev-only logging.
- **src/components/CookieConsent.tsx**: Consent update for gtag/HubSpot; loads Clarity on accept.
- **src/App.tsx**: `trackPageView` on `location` change.
- **src/hooks/useScrollDepth.ts**: Scroll depth events at 25/50/75/90%.
