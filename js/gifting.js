// ============================================
// GIFTING PAGE - GOOGLE SHEETS INTEGRATION
// ============================================

// Currency formatting function
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Categories for gifting page
const GIFT_CATEGORIES = {
    GIFT_HAMPERS: 'Gift Hampers',
    COMBO_SETS: 'Combo Sets',
    PREMIUM_SETS: 'Premium Gift Sets'
};

// Gift data (will be populated from Google Sheets)
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
    renderGiftSection('giftHampersGrid', giftData.giftHampers);
    renderGiftSection('comboSetsGrid', giftData.comboSets);
    renderGiftSection('premiumSetsGrid', giftData.premiumSets);
}

// ============================================
// RENDER GIFT SECTION
// ============================================
function renderGiftSection(gridId, products) {
    const grid = document.getElementById(gridId);
    
    if (!grid) {
        console.log('Grid not found:', gridId);
        return;
    }
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999; grid-column: 1/-1;">No products in this category yet.</p>';
        return;
    }
    
    console.log(`Rendering ${products.length} products in ${gridId}`);
    
    grid.innerHTML = products.map(product => `
        <div class="gift-card" onclick="openProductModal('${product.id}')">
            <div class="gift-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500?text=No+Image'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="gift-info">
                <div class="product-id">${product.id}</div>
                <h3 class="gift-name">${product.name}</h3>
                <p class="gift-description">${product.fragrance || ''}</p>
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
    
    const modal = document.getElementById('productModal');
    if (!modal) {
        console.log('Product modal not found - will add cart functionality soon');
        alert(`${product.name}\n${formatIndianRupee(product.price)}\n\nFull cart functionality coming soon!`);
        return;
    }
    
    // Populate modal
    const modalImage = document.querySelector('#productModalImage img');
    const modalName = document.getElementById('productModalName');
    const modalFragrance = document.getElementById('productModalFragrance');
    const modalPrice = document.getElementById('productModalPrice');
    
    if (modalImage) modalImage.src = product.image;
    if (modalName) modalName.textContent = product.name;
    if (modalFragrance) {
        modalFragrance.textContent = product.fragrance || '';
        modalFragrance.style.display = product.fragrance ? 'block' : 'none';
    }
    if (modalPrice) modalPrice.textContent = formatIndianRupee(product.price);
    
    modal.style.display = 'flex';
    modal.classList.add('active');
}

// ============================================
// CLOSE PRODUCT MODAL
// ============================================
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gifting.js loaded');
    
    // Set up modal close events
    const modalClose = document.getElementById('productModalClose');
    const modalOverlay = document.getElementById('productModalOverlay');
    
    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal);
    
    console.log('Gifting page initialized - waiting for Google Sheets data...');
});
