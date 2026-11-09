# Planiranje teme — Google Sheet back office setup

The planning page `public/HUB/planiranje/` saves each topic's plan to a Google Sheet through a
Google Apps Script web app (`apps-script.gs` in this folder). Until it is connected, the page
keeps everything in the planner's browser.

Sheet: **CARNET Hub · Planiranje tema** (Google Drive of the project owner). Tabs:

| Tab | Content |
|---|---|
| Upute | Rules for editing the sheet by hand (Croatian) |
| Teme | One row per topic: planner, format, period, planned number of events, notes |
| Priprema | One row per preparation item (steps 0–2): value, responsible person, due date, status |
| Dogadjanja | One row per event: who, when, where, status, resources |
| Popisi | Dropdown values. The column header is the list name used by the page; edit values freely |

Do not rename the tabs or reorder the columns of Teme, Priprema and Dogadjanja: the script writes by column position.

## 1. Check the sheet time zone

Open the sheet → **File → Settings → Time zone** → `(GMT+01:00) Central European Time - Zagreb`.

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with the contents of `apps-script.gs`. Save.
3. **Project Settings** (gear icon) → **Script properties** → **Add script property**:
   - Property: `PLAN_KOD`
   - Value: a planning code you choose (share it only with planners). Never put it in the code.

## 3. Deploy as a web app

1. **Deploy → New deployment** → type **Web app**.
2. **Execute as:** Me. **Who has access:** Anyone. (Not "Only myself" and not "Anyone with Google account": with those, Google answers with a sign-in redirect and the page cannot connect.)
3. **Deploy**, approve the permission prompt (the script only edits this spreadsheet).
4. Copy the **Web app URL** (ends with `/exec`).

To change the script later: paste the new code, save, then **Deploy → Manage deployments → Edit → Version: New version**. The URL stays the same.

Script versions: v2 adds the Priprema columns **Poveznica** and **Newsletter / mailing lista** (link to the published DOT post and whether it also went out by newsletter). The script writes their header cells itself on first use. If the page talks to an older script it shows a warning, because those two fields would not be saved.

## 4. Connect the page

On the planning page open **Postavke veze s tablicom**, paste the URL and the planning code,
then **Spremi postavke i provjeri vezu**. Both are stored only in that browser.

Optional: put the URL in `DEFAULT_API_URL` in `public/HUB/planiranje/index.html` so planners
only need the code.

## Security notes

- "Anyone" access means anyone who has the URL *and* the planning code can read and write plans.
  The code is checked on every request; change `PLAN_KOD` to revoke access.
- The code travels in the request (query string for reads), so treat it as a shared password, not as personal sign-in.
- Planners do not need access to the sheet itself; share the sheet only with back-office editors.

## How saving works

- Each save replaces all rows of that topic in Teme, Priprema and Dogadjanja; other topics are untouched.
- If someone else saved the same topic after you loaded it, the page asks before overwriting.
- Text columns are stored as plain text so dates (`2026-11-26`) and times (`14:00`) come back unchanged.
