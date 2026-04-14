// ============================================
// GIFTING PAGE - GOOGLE SHEETS INTEGRATION
// ============================================

// Currency formatting
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Categories for gifting page
const GIFT_CATEGORIES = {
    GIFT_HAMPERS: 'Gift Hampers',
    COMBO_SETS: 'Combo Sets',
    PREMIUM_SETS: 'Premium Gift Sets'
};

// Gift data
let giftData = {
    giftHampers: [],
    comboSets: [],
    premiumSets: []
};

// ============================================
// RENDER GIFTING PAGE
// ============================================
function renderGiftingPage() {
    console.log('Rendering gifting page...');
    
    if (!allProducts || allProducts.length === 0) {
        console.log('No products loaded yet');
        return;
    }
    
    // Filter products by gift category
    giftData.giftHampers = allProducts.filter(p => p.category === GIFT_CATEGORIES.GIFT_HAMPERS && p.active);
    giftData.comboSets = allProducts.filter(p => p.category === GIFT_CATEGORIES.COMBO_SETS && p.active);
    giftData.premiumSets = allProducts.filter(p => p.category === GIFT_CATEGORIES.PREMIUM_SETS && p.active);
    
    console.log('Gifts by category:', {
        giftHampers: giftData.giftHampers.length,
        comboSets: giftData.comboSets.length,
        premiumSets: giftData.premiumSets.length
    });
    
    // Render all sections
    renderGiftSection('giftHampersGrid', giftData.giftHampers, 'Gift Hampers');
    renderGiftSection('comboSetsGrid', giftData.comboSets, 'Combo Sets');
    renderGiftSection('premiumSetsGrid', giftData.premiumSets, 'Premium Gift Sets');
}

// ============================================
// RENDER GIFT SECTION
// ============================================
function renderGiftSection(gridId, products, sectionName) {
    const grid = document.getElementById(gridId);
    
    if (!grid) {
        console.log('Grid not found:', gridId);
        return;
    }
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999; grid-column: 1/-1;">No products available yet. Check back soon!</p>';
        return;
    }
    
    console.log(`Rendering ${products.length} products in ${sectionName}`);
    
    grid.innerHTML = products.map(product => `
        <div class="gift-card" onclick="openProductModal('${product.id}')">
            <div class="gift-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500?text=No+Image'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="gift-info">
                <div class="product-id">${product.id}</div>
                <h3 class="gift-name">${product.name}</h3>
                ${product.fragrance ? `<p class="gift-description">${product.fragrance}</p>` : ''}
                <p class="gift-price">${formatIndianRupee(product.price)}</p>
                <button class="btn btn-primary btn-buy">Buy Now</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// OPEN PRODUCT MODAL
// ============================================
function openProductModal(productId) {
    console.log('Opening modal for product:', productId);
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        console.log('Product not found:', productId);
        return;
    }
    
    // For now, just alert - modal functionality will be added in Option B
    alert(`${product.name}\n${formatIndianRupee(product.price)}\n\nFull cart system coming in next update!`);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gifting.js loaded');
    console.log('Gifting page initialized - waiting for Google Sheets data...');
});
