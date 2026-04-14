// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

// ⚠️ IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycby6IZ__1mjoE3iOqM08F84iw9a97B2J_Zy8_OPA_Chc41b7qIYQXCzs1Hdn2XD0_7ej/exec';

// Global products array
let allProducts = [];

// Currency formatting
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Fetch products from Google Sheets
async function fetchProductsFromSheets() {
    try {
        console.log('Fetching products from Google Sheets...');
        const response = await fetch(SHEETS_URL + '?action=all');
        const data = await response.json();
        console.log('Data received:', data);
        
        if (data && data.products) {
            allProducts = data.products.map(p => ({
                id: p.id,
                name: p.name,
                price: parseFloat(p.price),
                category: p.cat || p.category,
                badge: p.badge || '',
                image: p.img,
                fragrance: p.desc || p.description || '',
                active: p.active === true || p.active === 'TRUE',
                showOnHome: p.show_on_home === true || p.show_on_home === 'TRUE' || p.showOnHome === true || p.showOnHome === 'TRUE'
            }));
            console.log('Products loaded:', allProducts.length);
            return allProducts;
        }
        
        console.warn('No products found, using demo data');
        return getDemoProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
        return getDemoProducts();
    }
}

// Demo products fallback
function getDemoProducts() {
    return [
        { id: 'CAN001', name: 'Lavender Dream', price: 299, category: 'Candles', badge: 'NEW', image: 'https://images.unsplash.com/photo-1602874801006-c2b15bd4f842?w=800', fragrance: 'Soothing lavender scent', active: true },
        { id: 'CAN002', name: 'Vanilla Bliss', price: 249, category: 'Candles', badge: 'HOT', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800', fragrance: 'Sweet vanilla aroma', active: true },
        { id: 'CAN003', name: 'Rose Garden', price: 349, category: 'Candles', badge: '', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', fragrance: 'Delicate rose fragrance', active: true },
        { id: 'TEA001', name: 'Tea Light Set', price: 49, category: 'Candles', badge: '', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', fragrance: 'Pack of 6 tea lights', active: true }
    ];
}

// Get products by category
function getProductsByCategory(category) {
    return allProducts.filter(p => p.category === category && p.active);
}

// Initialize products on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    initializeProducts();
}

async function initializeProducts() {
    await fetchProductsFromSheets();
    
    // Trigger page-specific rendering
    if (typeof renderHomeProducts === 'function') {
        renderHomeProducts();
    }
    if (typeof renderProductsPage === 'function') {
        renderProductsPage();
    }
    if (typeof renderGiftingPage === 'function') {
        renderGiftingPage();
    }
}
