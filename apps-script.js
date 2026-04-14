// ============================================================
// FORME — Google Apps Script Backend
// 
// SETUP:
// 1. Open Google Sheet → Extensions → Apps Script
// 2. Delete all code → Paste this entire file
// 3. Replace PASTE_YOUR_SHEET_ID_HERE with your actual Sheet ID
//    (from URL: docs.google.com/spreadsheets/d/THIS_PART/edit)
// 4. Deploy → Manage Deployments → ✏️ → New Version → Deploy
// ============================================================

// ── YOUR SHEET ID — REPLACE THIS ──────────────────────────
const SHEET_ID = '1VkccoZ7YvnRn3NaUSsCegmqLwSIGM6UrMJoS5qY9hcQ';

// ── RESPONSE HELPER ───────────────────────────────────────
function makeResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET ROUTER ────────────────────────────────────────────
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'products';
    if (action === 'products') return makeResponse(getProducts());
    if (action === 'deals')    return makeResponse(getDeals());
    if (action === 'settings') return makeResponse(getSettings());
    if (action === 'track')    return makeResponse(trackOrder(e.parameter.orderId || ''));
    // Single call that returns everything — used by frontend for fast initial load
    if (action === 'all')      return makeResponse(getAllData());
    return makeResponse({ success: false, error: 'Unknown action' });
  } catch(err) {
    return makeResponse({ success: false, error: err.message });
  }
}

// ── POST ROUTER ───────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'order') return makeResponse(logOrder(data));
    return makeResponse({ success: false, error: 'Unknown action' });
  } catch(err) {
    return makeResponse({ success: false, error: err.message });
  }
}

// ── GET PRODUCTS ──────────────────────────────────────────
// Sheet tab: "Products"
// Columns: ID | Name | Price | Category | Badge | Image URL | Description | Active
//
// IMAGE URL column: put comma-separated URLs for multiple images
//   e.g. https://img1.jpg, https://img2.jpg, https://img3.jpg
//
// ACTIVE column:
//   TRUE  = product shows normally
//   FALSE = shows as "Out of Stock" (still visible, not clickable)
//   (leave empty = treated as TRUE)
//
// NOTE: If your sheet doesn't have Description or Active columns yet,
//       add them to the right of Image URL. They are optional.
function getProducts() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Products');
  if (!sheet) return { success: false, error: 'Products sheet not found' };

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return { success: true, data: [] };

  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  const products = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Skip completely empty rows
    const idVal = String(row[headers.indexOf('id')] || '').trim();
    if (!idVal) continue;

    // Read active status — default TRUE if column missing or empty
    const activeIdx = headers.indexOf('active');
    let isActive = true;
    if (activeIdx >= 0 && row[activeIdx] !== '' && row[activeIdx] !== null) {
      const activeVal = row[activeIdx];
      isActive = !(activeVal === false || String(activeVal).toUpperCase() === 'FALSE');
    }

    // Read image URL — split by comma for multiple images
    const imgRaw = String(row[headers.indexOf('image url')] || '').trim();
    const images = imgRaw.split(',').map(s => s.trim()).filter(Boolean);

    // Read description — optional column
    const descIdx = headers.indexOf('description');
    const desc = descIdx >= 0 ? String(row[descIdx] || '').trim() : '';

    // Read gender — optional column, defaults to empty (shown as Unisex)
    const genderIdx = headers.indexOf('gender');
    const gender = genderIdx >= 0 ? String(row[genderIdx] || '').trim() : '';

    // Read show_on_home — optional column, defaults to FALSE
    const showOnHomeIdx = headers.indexOf('showonhome');
    let showOnHome = false;
    if (showOnHomeIdx >= 0 && row[showOnHomeIdx] !== '' && row[showOnHomeIdx] !== null) {
      const val = row[showOnHomeIdx];
      showOnHome = (val === true || String(val).toUpperCase() === 'TRUE');
    }

    products.push({
      id:     idVal,
      name:   String(row[headers.indexOf('name')]     || '').trim(),
      price:  Number(row[headers.indexOf('price')]    || 0),
      cat:    String(row[headers.indexOf('category')] || '').trim(),
      badge:  String(row[headers.indexOf('badge')]    || '').trim(),
      img:    images[0] || '',
      images: images,
      desc:   desc,
      active: isActive,
      gender: gender,
      show_on_home: showOnHome
    });
  }

  return { success: true, data: products };
}

// ── GET DEALS ─────────────────────────────────────────────
// Sheet tab: "Deals"
// Columns: Image URL | Label | Title | Subtitle | Active
function getDeals() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Deals');
  if (!sheet) return { success: false, error: 'Deals sheet not found' };

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return { success: true, data: [] };

  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  const deals = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const activeIdx = headers.indexOf('active');
    if (activeIdx >= 0) {
      const active = row[activeIdx];
      if (active === false || String(active).toUpperCase() === 'FALSE') continue;
    }
    const imgVal = String(row[headers.indexOf('image url')] || '').trim();
    if (!imgVal) continue;

    deals.push({
      img:   imgVal,
      label: String(row[headers.indexOf('label')]    || '').trim(),
      title: String(row[headers.indexOf('title')]    || '').trim(),
      sub:   String(row[headers.indexOf('subtitle')] || '').trim(),
    });
  }
  return { success: true, data: deals };
}

// ── GET SETTINGS ──────────────────────────────────────────
// Sheet tab: "Settings"
// Columns: Key | Value
function getSettings() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Settings');
  if (!sheet) return { success: false, error: 'Settings sheet not found' };

  const rows = sheet.getDataRange().getValues();
  const settings = {};
  for (let i = 1; i < rows.length; i++) {
    const key = String(rows[i][0] || '').trim();
    const val = String(rows[i][1] || '').trim();
    if (key) settings[key] = val;
  }
  return { success: true, data: settings };
}

// ── LOG ORDER ─────────────────────────────────────────────
// Sheet tab: "Orders"
// Columns: A:Order ID | B:Timestamp | C:Items | D:Total | E:Status | F:Customer WA | G:Notes | H:Customer Name
function logOrder(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Orders');
  if (!sheet) return { success: false, error: 'Orders sheet not found. Create a sheet tab named "Orders".' };

  const orderId   = 'ORD-' + new Date().getTime().toString().slice(-6);
  const timestamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy HH:mm:ss');

  const itemsStr = (data.items || []).map(item =>
    `${item.name} (${item.id}) | Size: ${item.size} | Qty: ${item.qty} | ₹${(item.price * item.qty)}`
  ).join('\n');

  // Customer name + phone from the form
  // Phone arrives as full intl format: +919876543210
  // Strip the + prefix only — keep country code as-is, no prepending
  const customerName  = data.customerName  || '';
  const rawPhone      = data.customerPhone || '';
  const custWA        = rawPhone.replace(/^\+/, ''); // "+919876543210" → "919876543210" ✓

  sheet.appendRow([
    orderId,        // A: Order ID
    timestamp,      // B: Timestamp
    itemsStr,       // C: Items
    '₹' + (data.total || 0), // D: Total
    'Pending',      // E: Status
    custWA,         // F: Customer WA
    '',             // G: Notes — staff fills this manually (shown to customer in Track Order)
    customerName,   // H: Customer Name
  ]);

  return { success: true, orderId: orderId };
}

// ── TRACK ORDER ───────────────────────────────────────────
function trackOrder(orderId) {
  if (!orderId) return { success: false, error: 'No order ID provided' };

  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Orders');
  if (!sheet) return { success: false, error: 'Orders sheet not found' };

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return { success: false, error: 'No orders found' };

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (String(row[0]).trim().toUpperCase() === orderId.trim().toUpperCase()) {
      return {
        success: true,
        order: {
          id:           String(row[0]),
          timestamp:    String(row[1]),
          items:        String(row[2]),
          total:        String(row[3]),
          status:       String(row[4]) || 'Pending',
          customerWA:   String(row[5]) || '',
          notes:        String(row[6]) || '', // G: staff notes shown to customer
          customerName: String(row[7]) || '', // H: customer name
        }
      };
    }
  }
  return { success: false, error: 'Order not found' };
}

// ── GET ALL DATA IN ONE CALL ──────────────────────────────
// Returns products + deals + settings in a single response
// Called by frontend on initial load — 3x faster than separate calls
function getAllData() {
  try {
    const productsResult = getProducts();
    const dealsResult    = getDeals();
    const settingsResult = getSettings();

    return {
      products: productsResult.success ? productsResult.data : [],
      deals:    dealsResult.success    ? dealsResult.data    : [],
      settings: settingsResult.success ? settingsResult.data : {},
    };
  } catch(err) {
    return { products: [], deals: [], settings: {}, error: err.message };
  }
}

// ── TEST — run this in Apps Script editor to verify ───────
function testGetProducts() {
  Logger.log(JSON.stringify(getProducts()));
}
function testLogOrder() {
  const result = logOrder({
    items: [{ name:'Test Shirt', id:'SH001', size:'M', qty:1, price:999 }],
    total: 999,
    waNumber: '919558875322'
  });
  Logger.log(JSON.stringify(result));
}
