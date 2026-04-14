// ============================================
// PRODUCTS PAGE - GOOGLE SHEETS INTEGRATION
// ============================================

// Currency formatting
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Categories for products page
const PRODUCT_CATEGORIES = {
    CANDLES: 'Candles',
    JUTE_BAGS: 'Jute Bags',
    CONCRETE: 'Concrete Home Decor'
};

// Category data
let categoryData = {
    candles: [],
    juteBags: [],
    concrete: []
};

let currentCategory = null;

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
}

// ============================================
// SHOW CATEGORY
// ============================================
function showCategory(category) {
    console.log('Showing category:', category);
    currentCategory = category;
    
    const products = categoryData[category];
    
    if (!products) {
        console.error('Invalid category:', category);
        return;
    }
    
    // Hide categories grid, show products grid
    const categoriesGrid = document.getElementById('categoriesGrid');
    const productsGrid = document.getElementById('productsGrid');
    const categoryHeader = document.getElementById('categoryHeader');
    
    if (categoriesGrid) categoriesGrid.style.display = 'none';
    if (categoryHeader) categoryHeader.style.display = 'block';
    if (productsGrid) productsGrid.style.display = 'grid';
    
    // Render products
    renderProducts(products);
    
    // Update active state
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    const activeCard = document.querySelector(`[data-category="${category}"]`);
    if (activeCard) activeCard.classList.add('active');
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (!grid) {
        console.error('Products grid not found');
        return;
    }
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 3rem; color: #999; grid-column: 1/-1;">No products available in this category.</p>';
        return;
    }
    
    console.log(`Rendering ${products.length} products`);
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-id">${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                ${product.fragrance ? `<p class="product-fragrance">${product.fragrance}</p>` : ''}
                <p class="product-price">${formatIndianRupee(product.price)}</p>
                <button class="btn btn-primary btn-buy">Buy Now</button>
            </div>
        </div>
    `).join('');
}

// ============================================
// BACK TO CATEGORIES
// ============================================
function backToCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const productsGrid = document.getElementById('productsGrid');
    const categoryHeader = document.getElementById('categoryHeader');
    
    if (categoriesGrid) categoriesGrid.style.display = 'grid';
    if (productsGrid) productsGrid.style.display = 'none';
    if (categoryHeader) categoryHeader.style.display = 'none';
    
    currentCategory = null;
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
    console.log('Products.js loaded');
    
    // Set up category card clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            if (category) showCategory(category);
        });
    });
    
    // Set up view collection button clicks
    const viewButtons = document.querySelectorAll('.view-collection-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = btn.getAttribute('data-category');
            if (category) showCategory(category);
        });
    });
    
    // Set up back button
    const backButton = document.getElementById('backToCategories');
    if (backButton) {
        backButton.addEventListener('click', backToCategories);
    }
    
    console.log('Products page initialized - waiting for Google Sheets data...');
});
