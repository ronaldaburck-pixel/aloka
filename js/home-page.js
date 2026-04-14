// ============================================
// HOME PAGE - SHOWCASE (NO PRICES, NO BUYING)
// ============================================

function renderHomeProducts() {
    const grid = document.getElementById('productsGridHome');
    const loader = document.getElementById('productsLoader');
    
    if (!grid) {
        console.log('Products grid not found on this page');
        return;
    }
    
    // Show loader
    if (loader) loader.classList.add('active');
    
    console.log('Rendering home page showcase...');
    
    // Filter products marked for home page display
    const showcaseProducts = allProducts.filter(p => {
        const showOnHome = p.showOnHome === true || p.showOnHome === 'TRUE' || p.show_on_home === true || p.show_on_home === 'TRUE';
        return p.active && showOnHome;
    });
    
    console.log(`Found ${showcaseProducts.length} products for home showcase`);
    
    // If no products marked, show first 6 active products
    const toShow = showcaseProducts.length > 0 ? showcaseProducts : allProducts.filter(p => p.active).slice(0, 6);
    
    if (toShow.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#999;">Products coming soon!</p>';
        if (loader) loader.classList.remove('active');
        grid.classList.add('loaded');
        return;
    }
    
    // Render showcase - NO PRICES, NO BUY BUTTONS, just beautiful display
    grid.innerHTML = toShow.map(product => `
        <div class="showcase-card">
            <div class="showcase-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500?text=No+Image'">
                ${product.badge ? `<span class="showcase-badge">${product.badge}</span>` : ''}
            </div>
            <div class="showcase-info">
                <h3 class="showcase-name">${product.name}</h3>
                ${product.fragrance ? `<p class="showcase-desc">${product.fragrance}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    console.log('✅ Home showcase rendered:', toShow.length, 'products');
    
    // Hide loader after minimum 2 seconds for smooth experience
    setTimeout(() => {
        if (loader) loader.classList.remove('active');
        grid.classList.add('loaded');
    }, 2000);
}

// No modal, no cart functionality on home page - it's just a showcase
