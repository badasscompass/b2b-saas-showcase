# GTM Container Setup Guide — LMN3

**Container ID:** `GTM-KW5L5SNP`  
**GA4 Measurement ID:** `G-FQVXJN10TZ`  
**Production hosts:** `lmn3.digital`, `www.lmn3.digital`

> The app pushes **all** analytics data to `window.dataLayer` only.  
> GTM is the **single owner** of the GA4 property — no direct `gtag()` calls exist in app code.

---

## 1. GA4 Configuration Tag

| Field | Value |
|---|---|
| **Tag type** | Google Analytics: GA4 Configuration |
| **Measurement ID** | `G-FQVXJN10TZ` |
| **Send page view** | ❌ Disabled (app sends custom `page_view` events) |
| **Trigger** | All Pages (Initialization) |
| **Consent** | Require `analytics_storage` = granted |

---

## 2. Required GA4 Event Tags

Each tag type is **GA4 Event**, linked to the GA4 Config tag above, and gated by `analytics_storage` consent.

### 2a. Page View

| Field | Value |
|---|---|
| **Event name** | `page_view` |
| **Trigger** | Custom Event → `page_view` |
| **Parameters** | `page_path` ← `{{DLV - page_path}}`, `page_title` ← `{{DLV - page_title}}` |

### 2b. Scroll Depth

| Field | Value |
|---|---|
| **Event name** | `scroll` |
| **Trigger** | Custom Event → `scroll` |
| **Parameters** | `percent_scrolled` ← `{{DLV - value}}`, `event_label` ← `{{DLV - event_label}}` |

### 2c. Content Selection (Case Studies, Metrics)

| Field | Value |
|---|---|
| **Event name** | `select_content` |
| **Trigger** | Custom Event → `select_content` |
| **Parameters** | `content_type`, `content_id`, `location` |

### 2d. Service Page Views

| Field | Value |
|---|---|
| **Event name** | `view_item` |
| **Trigger** | Custom Event → `view_item` |
| **Parameters** | `item_id`, `item_name`, `item_category` |

### 2e. Button Clicks

| Field | Value |
|---|---|
| **Event name** | `button_click` |
| **Trigger** | Custom Event → `button_click` |
| **Parameters** | `event_label`, `location` |

### 2f. Form Submissions

| Field | Value |
|---|---|
| **Event name** | `form_submit` |
| **Trigger** | Custom Event → `form_submit` |
| **Parameters** | `event_label`, `success` |

### 2g. File Downloads

| Field | Value |
|---|---|
| **Event name** | `file_download` |
| **Trigger** | Custom Event → `file_download` |
| **Parameters** | `event_label`, `file_type` |

### 2h. Outbound Link Clicks

| Field | Value |
|---|---|
| **Event name** | `click` |
| **Trigger** | Custom Event → `click` (with filter `event_category` = `outbound`) |
| **Parameters** | `event_label`, `outbound_url` |

### 2i. Navigation

| Field | Value |
|---|---|
| **Event name** | `navigation` |
| **Trigger** | Custom Event → `navigation` |
| **Parameters** | `event_label` |

### 2j. Guide Wizard Open

| Field | Value |
|---|---|
| **Event name** | `guide_wizard_open` |
| **Trigger** | Custom Event → `guide_wizard_open` |
| **Parameters** | `event_label`, `location` |

### 2k. Inquiry Modal Open

| Field | Value |
|---|---|
| **Event name** | `inquiry_modal_open` |
| **Trigger** | Custom Event → `inquiry_modal_open` |
| **Parameters** | `event_label`, `location` |

---

## 3. Conversion Tags (mark as Key Events in GA4)

These events are auto-promoted to conversions by the app (pushed as both the event name **and** a separate `conversion` dataLayer event):

| dataLayer event | Conversion label | GA4 Key Event? |
|---|---|---|
| `calendly_click` | Discovery call booked | ✅ |
| `generate_lead` | Lead form submitted | ✅ |
| `guide_wizard_complete` | Service wizard completed | ✅ |
| `home_guide_wizard_complete` | Home wizard completed | ✅ |
| `conversion` (generic) | Catch-all — use `conversion_name` param to distinguish | ✅ |

### Dedicated Conversion Tag

| Field | Value |
|---|---|
| **Tag type** | GA4 Event |
| **Event name** | `conversion` |
| **Trigger** | Custom Event → `conversion` |
| **Parameters** | `conversion_name`, `conversion_type`, `value`, `currency` |
| **Mark as Key Event in GA4** | ✅ Yes |

> **Tip:** In GA4 Admin → Key Events, also mark `calendly_click` and `generate_lead` directly so they appear as conversions even without the separate `conversion` push.

---

## 4. Micro-Conversions (Startup Health)

These are pushed via `trackConversion()` with `conversion_type: "micro"`:

| `conversion_name` | When fired |
|---|---|
| `startup_health_guide_view` | User lands on /startup-health |
| `startup_health_calculator_complete` | User completes all 6 KPI fields |

They flow through the same `conversion` Custom Event trigger above. Use `conversion_type` = `micro` to filter in GA4 explorations.

---

## 5. Data Layer Variables (DLV) to Create in GTM

| Variable name | DLV path | Used by |
|---|---|---|
| `DLV - page_path` | `page_path` | page_view tag |
| `DLV - page_title` | `page_title` | page_view tag |
| `DLV - event_category` | `event_category` | all event tags |
| `DLV - event_label` | `event_label` | all event tags |
| `DLV - value` | `value` | scroll, conversions |
| `DLV - content_type` | `content_type` | select_content |
| `DLV - content_id` | `content_id` | select_content |
| `DLV - location` | `location` | button_click, wizard |
| `DLV - conversion_name` | `conversion_name` | conversion tag |
| `DLV - conversion_type` | `conversion_type` | conversion tag |
| `DLV - item_id` | `item_id` | view_item |
| `DLV - item_name` | `item_name` | view_item |
| `DLV - item_category` | `item_category` | view_item |
| `DLV - outbound_url` | `outbound_url` | click (outbound) |
| `DLV - success` | `success` | form_submit |
| `DLV - file_type` | `file_type` | file_download |
| `DLV - currency` | `currency` | conversion |

---

## 6. Consent Configuration

The app sets Consent Mode v2 defaults to `denied` before GTM loads (in `index.html`).  
`CookieConsent.tsx` updates consent via `gtag('consent', 'update', ...)`.

In GTM:
- All GA4 tags should use **Built-in Consent** → require `analytics_storage`
- Ad/remarketing tags (if any) should also require `ad_storage`

---

## 7. Checklist — Things to Verify in GTM

- [ ] **No standalone GA4 `gtag.js` script** in any tag (would duplicate the config)
- [ ] GA4 Config tag has "Send page view" **disabled**
- [ ] All Custom Event triggers match exact event names from table above
- [ ] Consent settings applied to every tag
- [ ] No "All Pages" GA4 page_view trigger (app handles SPA routing)
- [ ] Preview domain filter: exclude `*.lovable.app` in tag firing conditions
- [ ] Container published after changes

---

*Last updated: 2026-03-03*
