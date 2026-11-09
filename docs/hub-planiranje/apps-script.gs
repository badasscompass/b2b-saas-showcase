/**
 * CARNET Hub · Planiranje tema — Google Apps Script back office.
 *
 * The planning page (public/HUB/hub-planer/) reads and writes one topic at a time
 * through this web app. Setup: docs/hub-planiranje/SETUP.md.
 *
 *  - Script property PLAN_KOD holds the shared planning code (never put it in this file).
 *  - Each save replaces all rows of that one topic in Teme, Priprema and Dogadjanja.
 *  - A save is refused if the topic was saved by someone else after the planner loaded it,
 *    unless the page sends prepisi:true (the planner confirmed overwriting).
 *  - Do not reorder the columns of the data tabs; the order below is the contract.
 */

const VERSION = 2; // the planning page warns when it talks to an older script

const TABS = { teme: 'Teme', priprema: 'Priprema', dogadjanja: 'Dogadjanja', popisi: 'Popisi' };

const COLS = {
  teme: ['tema_id', 'tema', 'zajednica', 'vlasnik_teme', 'format_teme', 'planer',
         'razdoblje_od', 'razdoblje_do', 'planirani_broj_dogadjanja', 'napomena',
         'azurirano', 'azurirao'],
  priprema: ['tema_id', 'korak', 'stavka_id', 'stavka', 'vrijednost', 'odgovorna_osoba',
             'rok', 'status', 'napomena', 'azurirano',
             // v2: added at the end so rows saved by v1 keep their column positions
             'poveznica', 'newsletter'],
  dogadjanja: ['tema_id', 'dogadjanje_id', 'naziv', 'vrsta', 'korak', 'voditelj', 'odjel',
               'gosti', 'publika', 'ocekivani_broj', 'datum', 'pocetak', 'trajanje', 'format',
               'lokacija', 'platforma', 'snimanje', 'status', 'resursi', 'napomena', 'azurirano']
};

/* Columns stored as numbers; every other column is stored as plain text so that
   dates such as 2026-11-26 and times such as 09:00 come back exactly as written. */
const NUMBER_COLS = ['planirani_broj_dogadjanja', 'ocekivani_broj'];

const EXAMPLE_ID = 'PRIMJER';

/* Header labels for columns added after the template was created; written once if the cell is empty. */
const ADDED_HEADERS = {
  priprema: { poveznica: 'Poveznica', newsletter: 'Newsletter / mailing lista' }
};

function doGet(e) {
  return handle_((e && e.parameter) || {}, null);
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return out_({ ok: false, error: 'Neispravan zahtjev.' });
  }
  return handle_(body, body);
}

function handle_(p, body) {
  const kod = PropertiesService.getScriptProperties().getProperty('PLAN_KOD');
  if (!kod) return out_({ ok: false, code: 'setup', error: 'PLAN_KOD nije postavljen u svojstvima skripte.' });
  if (String(p.kod || '') !== kod) return out_({ ok: false, code: 'auth', error: 'Pogrešan kod za planiranje.' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  try {
    if (p.action === 'popis') {
      return out_({
        ok: true, verzija: VERSION,
        teme: readAll_(ss, 'teme').map(r => ({ tema_id: r.tema_id, planer: r.planer, azurirano: r.azurirano })),
        popisi: readPopisi_(ss)
      });
    }
    if (p.action === 'ucitaj') {
      const id = String(p.tema || '');
      if (!id) return out_({ ok: false, error: 'Nedostaje tema.' });
      return out_({
        ok: true, verzija: VERSION,
        tema: readAll_(ss, 'teme').find(r => r.tema_id === id) || null,
        priprema: readAll_(ss, 'priprema').filter(r => r.tema_id === id),
        dogadjanja: readAll_(ss, 'dogadjanja').filter(r => r.tema_id === id),
        popisi: readPopisi_(ss)
      });
    }
    if (p.action === 'spremi' && body) return save_(ss, body);
    return out_({ ok: false, error: 'Nepoznata radnja.' });
  } catch (err) {
    return out_({ ok: false, error: String(err && err.message || err) });
  }
}

function save_(ss, b) {
  const id = String(b.tema || '');
  if (!id || id === EXAMPLE_ID) return out_({ ok: false, error: 'Nedostaje tema.' });
  const data = b.podaci || {};

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const cur = readAll_(ss, 'teme').find(r => r.tema_id === id);
    if (cur && cur.azurirano && String(b.ucitano || '') !== cur.azurirano && !b.prepisi) {
      return out_({
        ok: false, code: 'conflict',
        error: 'Temu je u međuvremenu spremio/la netko drugi.',
        azurirano: cur.azurirano, azurirao: cur.azurirao
      });
    }
    const now = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    const tema = Object.assign({}, data.tema || {}, {
      tema_id: id, azurirano: now, azurirao: String((data.tema && data.tema.planer) || '')
    });
    replace_(ss, 'teme', id, [tema]);
    replace_(ss, 'priprema', id, (data.priprema || []).map(r => Object.assign({}, r, { tema_id: id, azurirano: now })));
    replace_(ss, 'dogadjanja', id, (data.dogadjanja || []).map(r => Object.assign({}, r, { tema_id: id, azurirano: now })));
    return out_({ ok: true, verzija: VERSION, azurirano: now });
  } finally {
    lock.releaseLock();
  }
}

/* Read a data tab into objects keyed by COLS; the example row is skipped. */
function readAll_(ss, key) {
  const sh = sheet_(ss, key);
  const cols = COLS[key];
  const last = sh.getLastRow();
  if (last < 2) return [];
  const tz = ss.getSpreadsheetTimeZone();
  return sh.getRange(2, 1, last - 1, cols.length).getValues()
    .filter(r => r[0] !== '' && String(r[0]) !== EXAMPLE_ID)
    .map(r => {
      const o = {};
      cols.forEach((c, i) => { o[c] = text_(r[i], c, tz); });
      return o;
    });
}

/* Replace every row of one topic, keep all other rows (example row included). */
function replace_(ss, key, id, rows) {
  const sh = sheet_(ss, key);
  const cols = COLS[key];
  const tz = ss.getSpreadsheetTimeZone();
  const last = sh.getLastRow();
  let keep = [];
  if (last > 1) {
    keep = sh.getRange(2, 1, last - 1, cols.length).getValues()
      .filter(r => String(r[0]) !== id && r.some(v => v !== '' && v !== null))
      .map(r => r.map((v, i) => cell_(cols[i], text_(v, cols[i], tz))));
    sh.getRange(2, 1, last - 1, cols.length).clearContent();
  }
  const add = rows.map(o => cols.map(c => cell_(c, o[c])));
  const all = keep.concat(add);
  // Example row first, then topics in a stable order so the back office stays readable.
  all.sort((a, b) => (a[0] === EXAMPLE_ID ? -1 : b[0] === EXAMPLE_ID ? 1 : String(a[0]).localeCompare(String(b[0]))));
  if (!all.length) return;
  cols.forEach((c, i) => {
    sh.getRange(2, i + 1, all.length, 1).setNumberFormat(NUMBER_COLS.indexOf(c) >= 0 ? '0' : '@');
  });
  sh.getRange(2, 1, all.length, cols.length).setValues(all);
}

function cell_(col, v) {
  if (v === null || v === undefined) return '';
  if (NUMBER_COLS.indexOf(col) >= 0) {
    const n = Number(v);
    return v === '' || isNaN(n) ? '' : n;
  }
  return String(v).slice(0, 5000);
}

/* Cells typed directly in the sheet may have become dates; turn them back into text. */
function text_(v, col, tz) {
  if (v instanceof Date) {
    if (col === 'azurirano') return Utilities.formatDate(v, tz, 'yyyy-MM-dd HH:mm:ss');
    if (v.getFullYear() < 1900) return Utilities.formatDate(v, tz, 'HH:mm');
    return Utilities.formatDate(v, tz, 'yyyy-MM-dd');
  }
  return v === null || v === undefined ? '' : String(v);
}

/* Popisi: each column header names a dropdown list, the values below it are the options. */
function readPopisi_(ss) {
  const sh = sheet_(ss, 'popisi');
  const vals = sh.getDataRange().getValues();
  const out = {};
  if (!vals.length) return out;
  vals[0].forEach((h, c) => {
    const name = String(h).trim();
    if (!name) return;
    out[name] = vals.slice(1).map(r => String(r[c]).trim()).filter(Boolean);
  });
  return out;
}

function sheet_(ss, key) {
  const sh = ss.getSheetByName(TABS[key]);
  if (!sh) throw new Error('Nedostaje list „' + TABS[key] + '”.');
  const added = ADDED_HEADERS[key];
  if (added) {
    const cols = COLS[key];
    const head = sh.getRange(1, 1, 1, cols.length).getValues()[0];
    cols.forEach((c, i) => {
      if (added[c] && String(head[i] || '') === '') sh.getRange(1, i + 1, 1, 1).setValues([[added[c]]]);
    });
  }
  return sh;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
