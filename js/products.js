// ============================================
// PRODUCTS PAGE - GOOGLE SHEETS INTEGRATION
// ============================================

// Currency formatting function
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Categories for products page
const PRODUCT_CATEGORIES = {
    CANDLES: 'Candles',
    JUTE_BAGS: 'Jute Bags',
    CONCRETE: 'Concrete Home Decor'
};

// Category data (will be populated from Google Sheets)
let categoryData = {
    candles: [],
    juteBags: [],
    concrete: []
};

// Current active category
let currentCategory = 'candles';

// ============================================
// RENDER PRODUCTS PAGE
// ============================================
function renderProductsPage() {
    console.log('Rendering products page...');
    
    if (!allProducts || allProducts.length === 0) {
        console.log('No products loaded yet');
        return;
    }
    
    // Filter products by category
    categoryData.candles = allProducts.filter(p => p.category === PRODUCT_CATEGORIES.CANDLES && p.active);
    categoryData.juteBags = allProducts.filter(p => p.category === PRODUCT_CATEGORIES.JUTE_BAGS && p.active);
    categoryData.concrete = allProducts.filter(p => p.category === PRODUCT_CATEGORIES.CONCRETE && p.active);
    
    console.log('Products by category:', {
        candles: categoryData.candles.length,
        juteBags: categoryData.juteBags.length,
        concrete: categoryData.concrete.length
    });
    
    // Show candles by default
    showCategory('candles');
}

// ============================================
// SHOW CATEGORY
// ============================================
function showCategory(category) {
    console.log('Showing category:', category);
    currentCategory = category;
    
    // Hide all collections
    document.querySelectorAll('.category-collection').forEach(col => {
        col.style.display = 'none';
    });
    
    // Show selected collection
    const collection = document.getElementById(category + 'Collection');
    if (collection) {
        collection.style.display = 'block';
        renderCategoryProducts(category);
    }
    
    // Update active button
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
}

// ============================================
// RENDER CATEGORY PRODUCTS
// ============================================
function renderCategoryProducts(category) {
    const gridId = category + 'Grid';
    const grid = document.getElementById(gridId);
    
    if (!grid) {
        console.log('Grid not found:', gridId);
        return;
    }
    
    const products = categoryData[category];
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999;">No products in this category yet.</p>';
        return;
    }
    
    console.log(`Rendering ${products.length} products for ${category}`);
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500?text=No+Image'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-id">${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-fragrance">${product.fragrance || ''}</p>
                <p class="product-price">${formatIndianRupee(product.price)}</p>
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
    console.log('Products.js loaded');
    
    // Set up category buttons
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) showCategory(category);
        });
    });
    
    // Set up view collection buttons
    const viewButtons = document.querySelectorAll('.view-collection-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = btn.getAttribute('data-category');
            if (category) showCategory(category);
        });
    });
    
    // Set up modal close events
    const modalClose = document.getElementById('productModalClose');
    const modalOverlay = document.getElementById('productModalOverlay');
    
    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal);
    
    console.log('Products page initialized - waiting for Google Sheets data...');
});
