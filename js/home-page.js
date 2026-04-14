// ============================================
// HOME PAGE - FEATURED PRODUCTS RENDERING
// ============================================

function renderHomeProducts() {
    const grid = document.getElementById('productsGridHome');
    if (!grid) {
        console.log('Products grid not found on this page');
        return;
    }
    
    console.log('Rendering home page products...');
    
    // Get featured products (with badges) or first 8
    const featured = allProducts.filter(p => p.badge && p.badge !== '' && p.active).slice(0, 8);
    const toShow = featured.length > 0 ? featured : allProducts.filter(p => p.active).slice(0, 8);
    
    if (toShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#999;">No products available yet. Coming soon!</p>';
        return;
    }
    
    grid.innerHTML = toShow.map(product => `
        <div class="product-card-home" onclick="openProductModalHome('${product.id}')">
            <div class="product-image-home">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info-home">
                <div class="product-id-home">${product.id}</div>
                <h3 class="product-name-home">${product.name}</h3>
                <p class="product-price-home">${formatIndianRupee(product.price)}</p>
            </div>
        </div>
    `).join('');
    
    console.log('Rendered', toShow.length, 'products on home page');
}

// Open product modal
function openProductModalHome(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Use existing modal from script.js if available
    if (typeof openProductModal === 'function') {
        openProductModal(product);
    } else {
        alert(`${product.name} - ${formatIndianRupee(product.price)}\n\nClick "View All Products" to see full details!`);
    }
}
