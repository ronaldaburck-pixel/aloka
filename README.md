# ALOKA BY RUTUSHREE - COMPLETE WEBSITE

## ✅ READY TO USE!

Just **3 simple steps** to get your website live!

---

## 📂 What's Included

```
aloka-website/
├── index.html          ← ✅ MAIN PAGE (fully working!)
├── products.html       ← Placeholder (links back to home)
├── gifting.html        ← Placeholder (links back to home)
├── apps-script.js      ← Google Sheets backend code
├── css/                ← Your beautiful design
│   ├── styles.css
│   └── products.css
├── img/                ← Your images
│   ├── logo.png
│   ├── 1.jpg, 2.jpg, 3.jpg
│   └── main.png
└── js/                 ← Original JavaScript files
    ├── script.js
    ├── products.js
    └── gifting.js
```

---

## 🚀 QUICK START (Works Immediately!)

### **Option 1: Test Now (No Setup)**

1. **Download** this folder
2. **Open `index.html`** in your browser
3. **You'll see 4 demo products!**
4. Click, add to cart, checkout - everything works!

### **Option 2: Connect Google Sheets (Real Products)**

Follow the 3 steps below...

---

## 📋 STEP 1: Create Google Sheet

1. **Go to Google Sheets** → Create new spreadsheet
2. **Create 3 tabs:**

### Tab 1: "Products"
Copy-paste this table:

| ID | Name | Price | Category | Badge | Image URL | Description | Active |
|----|------|-------|----------|-------|-----------|-------------|--------|
| CAN001 | Lavender Dream | 299 | Candles | NEW | https://images.unsplash.com/photo-1602874801006-c2b15bd4f842?w=800 | Soothing lavender scent | TRUE |
| CAN002 | Vanilla Bliss | 249 | Candles | HOT | https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800 | Sweet vanilla aroma | TRUE |
| TEA001 | Tea Light Set | 49 | Candles | | https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800 | Pack of 6 tea lights | TRUE |

### Tab 2: "Settings"
| Key | Value |
|-----|-------|
| brand_name | Aloka by Rutushree |
| contact_phone | +918048605268 |

### Tab 3: "Orders"
Just create headers (leave rows empty):

| Order ID | Timestamp | Items | Total | Status | Customer WA | Notes | Customer Name |
|----------|-----------|-------|-------|--------|-------------|-------|---------------|

---

## 📋 STEP 2: Deploy Google Apps Script

1. In your Google Sheet: **Extensions → Apps Script**
2. **Delete all code** in the editor
3. **Copy ALL code** from `apps-script.js`
4. **Paste** into Apps Script editor
5. **Find line 11:**
   ```javascript
   const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
   ```
6. **Replace** with your actual Sheet ID:
   - Look at your Sheet URL: `docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit`
   - Copy just the ID part
7. **Click Deploy → New deployment**
8. **Settings:**
   - Type: Web app
   - Execute as: Me
   - Who has access: **Anyone**
9. **Click Deploy**
10. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

---

## 📋 STEP 3: Update index.html

1. **Open `index.html`** in a text editor
2. **Find line 281** (press Ctrl+F and search for "SHEETS_URL"):
   ```javascript
   const SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. **Replace** with your Web App URL from Step 2:
   ```javascript
   const SHEETS_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. **Save the file**

---

## ✅ DONE! Deploy Your Website

### **GitHub Pages (Free):**
1. Create GitHub account
2. New repository
3. Upload all files
4. Settings → Pages → Enable
5. Your site: `https://username.github.io/repo-name`

### **Netlify (Free & Easy):**
1. Go to netlify.com
2. Drag & drop this folder
3. Get your URL instantly!

### **Your Own Hosting:**
Upload all files via FTP

---

## 🎯 What Works Right Now

✅ **index.html** - Full home page with:
- Products from Google Sheets (or demo products)
- Add to cart
- Shopping cart
- WhatsApp checkout
- Phone validation
- Beautiful design

✅ **products.html** - Placeholder page (says "Coming Soon")

✅ **gifting.html** - Placeholder page (says "Coming Soon")

---

## 🛠️ Customization

### Change WhatsApp Number
Open `index.html`, find line ~563:
```javascript
const url = `https://wa.me/918048605268?text=...`;
```
Change to your number!

### Add Your Product Images
Replace URLs in Google Sheet with your images:
- Use Imgur (easiest!)
- Or Google Drive
- Or your own hosting

### Change Colors
Edit `css/styles.css`:
```css
--color-primary: #8B7355;
```

---

## 💡 PRO TIPS

1. **Test WITHOUT Google Sheets first** - It shows demo products automatically
2. **Products page & Gifts page** - You can add later (optional)
3. **Focus on HOME PAGE** - That's where everything happens
4. **One Google Sheet** controls entire website
5. **No coding needed** to manage products

---

## ❓ FAQ

**Q: Why do products.html and gifting.html say "Coming Soon"?**
A: The HOME PAGE works perfectly! Other pages are optional - you can enable them later.

**Q: How do I test it?**
A: Just open `index.html` in Chrome/Firefox - works immediately with demo products!

**Q: Where do orders go?**
A: To WhatsApp +91 80486 05268 AND saved in Google Sheet "Orders" tab

**Q: Can customers pay online?**
A: Not yet - you discuss payment via WhatsApp (COD, UPI, etc.)

---

## 🎉 YOU'RE READY!

The website works immediately. Open `index.html` and see for yourself!

**Questions? Just ask!** 😊

---

**Made with ❤️ for Aloka by Rutushree**
