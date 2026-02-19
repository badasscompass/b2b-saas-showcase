# Options: Easier Inquiries & RFPs (Select Package → Send / Ask for Info)

This doc suggests ways to let prospects **select a service/package** and either **send an inquiry/RFP directly** or **ask for more information**, using your existing Contact form and API where possible.

---

## Current state (summary)

- **Contact page**: Single form (name, email, subject, message, optional file) → `POST /api/contact` → email via Resend. No service/package context.
- **Pricing tier cards** (e.g. Product Development): One CTA → Calendly only.
- **Partner package offers**: “View Service Page” only; no “Request this” or “Ask for info”.
- **Page CTA**: Always Calendly; no package context.

---

## Option A: Contact form with package/service context (recommended baseline)

**Idea:** Keep one contact form but add **optional** “Interest” or “Package” so submissions are pre-tagged.

**Flow:**
1. From a service page or pricing card, user clicks “Request this package” or “Ask about this package”.
2. User is sent to `/contact` with query params (e.g. `?interest=product-development&package=Product Clarity Sprint`).
3. Contact form reads params and shows a non-editable “Regarding: [Service] → [Package]” (or a hidden field). Subject/body can be pre-filled or left blank.
4. Existing `POST /api/contact` is extended to accept `interest` and `package` (or a single `context` object) and include them in the email (e.g. in subject or body template).

**Pros:** One form, one API, minimal UI; you get structured context in every lead.  
**Cons:** User still lands on the generic contact page (you can soften with a short “You’re inquiring about: …” line).

**Implementation outline:**
- Add optional query params to Contact route and parse in `Contact.tsx` (e.g. `useSearchParams()`).
- Add optional hidden/display-only fields to `ContactForm` for service + package; pass them in the submit payload.
- In `api/contact.ts`, accept `interest` / `package` and add to the email template (subject line and/or body).

---

## Option B: “Request this package” opens a small form (modal/drawer)

**Idea:** From the pricing card or partner package card, “Request this package” or “Ask for info” opens a **compact form** (modal or sheet) instead of leaving the page.

**Flow:**
1. On each pricing card (and optionally PartnerPackageOffers), add a second CTA: “Request this package” or “Ask for info”.
2. Click opens a modal/drawer with a short form: name, email, short message, and (hidden) selected package + service.
3. Form submits to the same `/api/contact` (or a thin alias) with package/service in the payload; API same as Option A.
4. On success, show a thank-you message and optionally “Book a call” (Calendly).

**Pros:** No navigation; user stays in context; clear “this request is for this package”.  
**Cons:** Slightly more UI (modal + form state); you may still want the full Contact page for long messages/RFPs with attachments.

**Implementation outline:**
- Add a reusable component, e.g. `InquiryModal` or `RFPDrawer`, that takes `servicePage`, `packageName`, `tier` (and optionally `pricing`).
- Use your existing `ContactForm` fields (name, email, message) in reduced form; omit or make optional file upload for the modal; include hidden fields for package/service.
- Reuse the same API body shape as Option A so `api/contact.ts` stays single.

---

## Option C: Dedicated “RFP” or “Request proposal” page with package selector

**Idea:** A dedicated page (e.g. `/rfp` or `/request-proposal`) where the user **first selects** service and package, **then** fills the form.

**Flow:**
1. User goes to “Request a proposal” or “Send RFP”.
2. Step 1: Choose service (e.g. Strategic Advisory, Product Development, Product Marketing & GTM) and then a package (from your existing pricing/partner data).
3. Step 2: Form (name, email, message, optional file) with a clear “Regarding: [Service] – [Package]”.
4. Submit to the same contact API with full context; optional redirect to thank-you page or Calendly.

**Pros:** Very clear intent (RFP); good for longer proposals and attachments; can add more fields later (company, timeline).  
**Cons:** Extra route and step; some users may still prefer the simple Contact page.

**Implementation outline:**
- New route and page component; package options can be derived from `productDevelopmentData`, `strategicAdvisoryData`, `partnerBios` package offers, etc.
- Reuse the same `ContactForm` logic (or a shared form component) and the same API; only the “context” (service + package) is chosen on this page.

---

## Option D: Calendly + pre-filled context (lightweight)

**Idea:** Keep Calendly as the main CTA but pass **which package** the user is interested in, so you see it in the meeting title or in Calendly’s custom questions.

**Flow:**
1. “Book a call” links use Calendly’s prefilled query params (e.g. `?a1=Product%20Clarity%20Sprint` for a custom question, or a specific event type).
2. Optionally, create **one Calendly event type per package** (or per service) and link each card to the right event type.
3. No form change; only link generation per card.

**Pros:** No backend or form changes; you get context in the calendar.  
**Cons:** Depends on Calendly setup; no written RFP/inquiry trail unless you add a follow-up form.

---

## Option E: Hybrid (recommended combination)

Combine **A + B** for a good balance:

1. **Option A:** Contact form always supports optional `?interest=...&package=...`; API includes that context in the email. Use this for links from “Contact us about [Package]” in nav, footer, or service pages.
2. **Option B:** On pricing tier cards and partner package cards, add “Request this package” / “Ask for info” that opens the **same form in a modal** with package/service pre-selected and submit to the same API.
3. Keep “Book a call” (Calendly) as the primary CTA; “Request this package” is the secondary, context-rich path.

Optionally add **Option C** later if you want a dedicated “Request a proposal” entry point for larger deals.

---

## Implemented: Option E (Hybrid)

- **Option A** is in place: Contact form reads `?interest=...&package=...` from the URL, shows “You're inquiring about: …”, pre-fills subject, and sends `interest` and `package` to the API. The contact API includes this context in the email body and subject.
- **Option B** is in place: Pricing tier cards and partner package cards have a “Request this package” button that opens `InquiryModal` with the same payload (interest, package). Submissions go to the same `/api/contact` endpoint.
- Use links like `/contact?interest=product-development&package=Product%20Clarity%20Sprint` from nav, footer, or service pages when you want to drive inquiries about a specific package.
