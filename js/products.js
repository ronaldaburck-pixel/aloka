// ============================================
// Product Data - 3 Main Categories
// ============================================

// Currency formatting function for Indian Rupees
function formatIndianRupee(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Image paths - using the 3 images from img folder, repeating as needed
const productImages = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];

// ============================================
// CATEGORY 1: CANDLES
// ============================================
const candles = [
    {
        id: 101,
        name: 'Serenity',
        fragrance: 'Lavender & Vanilla',
        price: 1999,
        image: productImages[0],
        category: 'candles',
        description: 'A calming blend of lavender and vanilla that helps create a peaceful atmosphere in your home. Perfect for evening relaxation.'
    },
    {
        id: 102,
        name: 'Tranquility',
        fragrance: 'Sandalwood & Rose',
        price: 2399,
        image: productImages[1],
        category: 'candles',
        description: 'Elegant combination of earthy sandalwood and delicate rose. Brings warmth and sophistication to any space.'
    },
    {
        id: 103,
        name: 'Harmony',
        fragrance: 'Jasmine & Bergamot',
        price: 2199,
        image: productImages[2],
        category: 'candles',
        description: 'Fresh and uplifting scent with jasmine blooms and citrusy bergamot. Energizes your living space naturally.'
    },
    {
        id: 104,
        name: 'Floral Tea Light Set',
        fragrance: 'Assorted Fragrances',
        price: 499,
        image: productImages[0],
        category: 'candles',
        description: 'A beautiful collection of floral-scented tea lights perfect for creating a romantic ambiance. Set of 12 pieces.'
    },
    {
        id: 105,
        name: 'Classic White Tea Lights',
        fragrance: 'Unscented',
        price: 399,
        image: productImages[1],
        category: 'candles',
        description: 'Clean, unscented tea lights that provide beautiful flickering light. Ideal for any occasion or decor style.'
    },
    {
        id: 106,
        name: 'Inspiration Mini Jar',
        fragrance: 'Lavender & Sage',
        price: 799,
        image: productImages[2],
        category: 'candles',
        description: 'Compact mini jar candle with an inspiring blend of lavender and sage. Perfect for small spaces and gifting.'
    },
    {
        id: 107,
        name: 'Smile Mini Jar',
        fragrance: 'Citrus & Bergamot',
        price: 799,
        image: productImages[0],
        category: 'candles',
        description: 'Cheerful citrus blend that instantly brightens your mood. This mini jar candle brings positivity to any room.'
    },
    {
        id: 108,
        name: '3-Wick Ribbed Jar Candle',
        fragrance: 'Warm Vanilla',
        price: 2499,
        image: productImages[1],
        category: 'candles',
        description: 'Premium large jar candle with triple wick for stronger, longer-lasting fragrance. Perfect for large rooms.'
    }
];

// ============================================
// CATEGORY 2: JHUTE BAGS
// ============================================
const jhuteBags = [
    {
        id: 201,
        name: 'Eco-Friendly Tote Bag',
        fragrance: 'Natural Jute',
        price: 599,
        image: productImages[2],
        category: 'jhute-bags',
        description: 'Handcrafted jute tote bag with natural texture. Spacious and durable, perfect for shopping or daily use. Eco-friendly and sustainable.'
    },
    {
        id: 202,
        name: 'Premium Jute Shopping Bag',
        fragrance: 'Natural Jute',
        price: 699,
        image: productImages[0],
        category: 'jhute-bags',
        description: 'Stylish and sturdy jute bag with reinforced handles. Made from high-quality natural jute fiber. Ideal for groceries and essentials.'
    },
    {
        id: 203,
        name: 'Decorative Jute Pouch',
        fragrance: 'Natural Jute',
        price: 449,
        image: productImages[1],
        category: 'jhute-bags',
        description: 'Beautifully designed jute pouch with drawstring closure. Perfect for storing small items, gifts, or as a decorative piece.'
    },
    {
        id: 204,
        name: 'Large Jute Carrier Bag',
        fragrance: 'Natural Jute',
        price: 899,
        image: productImages[2],
        category: 'jhute-bags',
        description: 'Extra-large jute bag with wide handles for comfortable carrying. Great for farmers market trips or beach outings.'
    },
    {
        id: 205,
        name: 'Embroidered Jute Handbag',
        fragrance: 'Natural Jute',
        price: 1299,
        image: productImages[0],
        category: 'jhute-bags',
        description: 'Elegant jute handbag with hand-embroidered details. Combines traditional craftsmanship with modern design. A fashion-forward eco choice.'
    },
    {
        id: 206,
        name: 'Mini Jute Gift Bag',
        fragrance: 'Natural Jute',
        price: 299,
        image: productImages[1],
        category: 'jhute-bags',
        description: 'Small jute gift bag perfect for presents and treats. Environmentally friendly alternative to paper bags. Set of 5 pieces.'
    }
];

// ============================================
// CATEGORY 3: CONCRETE HOME DECOR
// ============================================
const concreteHomeDecor = [
    {
        id: 301,
        name: 'Concrete Candle Holder',
        fragrance: 'Unscented',
        price: 899,
        image: productImages[2],
        category: 'concrete-home-decor',
        description: 'Minimalist concrete candle holder with geometric design. Adds modern industrial charm to any space. Handcrafted with precision.'
    },
    {
        id: 302,
        name: 'Concrete Planter',
        fragrance: 'Unscented',
        price: 1299,
        image: productImages[0],
        category: 'concrete-home-decor',
        description: 'Sleek concrete planter perfect for succulents and small plants. Features drainage holes and contemporary design aesthetic.'
    },
    {
        id: 303,
        name: 'Concrete Bookend Set',
        fragrance: 'Unscented',
        price: 1599,
        image: productImages[1],
        category: 'concrete-home-decor',
        description: 'Heavy-duty concrete bookends to keep your library organized. Modern design that doubles as decorative art piece. Set of 2.'
    },
    {
        id: 304,
        name: 'Concrete Vase',
        fragrance: 'Unscented',
        price: 1399,
        image: productImages[2],
        category: 'concrete-home-decor',
        description: 'Elegant concrete vase with smooth finish. Perfect for dried flowers or minimalist arrangements. Statement piece for modern interiors.'
    },
    {
        id: 305,
        name: 'Concrete Coaster Set',
        fragrance: 'Unscented',
        price: 799,
        image: productImages[0],
        category: 'concrete-home-decor',
        description: 'Set of 4 concrete coasters with felt backing. Protects surfaces while adding industrial style to your decor. Durable and functional.'
    },
    {
        id: 306,
        name: 'Concrete Wall Clock',
        fragrance: 'Unscented',
        price: 2499,
        image: productImages[1],
        category: 'concrete-home-decor',
        description: 'Contemporary concrete wall clock with minimalist design. Battery operated with clear, easy-to-read numerals. Modern timepiece for any room.'
    }
];

// ============================================
// Category Data
// ============================================
const categories = {
    'candles': {
        title: 'Candles',
        description: 'Discover our collection of premium handcrafted soy candles in various sizes and fragrances. Each candle is made with care to bring warmth and ambiance to your space.',
        products: candles
    },
    'jhute-bags': {
        title: 'Jhute Bags',
        description: 'Eco-friendly jute bags that combine sustainability with style. Perfect for shopping, daily use, or as thoughtful gifts. Made from natural jute fiber.',
        products: jhuteBags
    },
    'concrete-home-decor': {
        title: 'Concrete Home Decor',
        description: 'Modern concrete home decor pieces that add industrial elegance to your space. Each piece is handcrafted for unique texture and contemporary appeal.',
        products: concreteHomeDecor
    }
};

// ============================================
// DOM Elements (will be set in DOMContentLoaded)
// ============================================
let categoriesGrid;
let categoryHeader;
let categoryTitle;
let categoryDescription;
let productsGridElement; // Renamed to avoid conflict with script.js
let backToCategories;
let imageLightbox;
let lightboxClose;
let lightboxImage;
let lightboxTitle;
let lightboxDetails;

// ============================================
// Category Selection
// ============================================
function showCategory(categoryKey) {
    console.log('showCategory called with:', categoryKey);
    const category = categories[categoryKey];
    if (!category) {
        console.error('Category not found:', categoryKey);
        return;
    }
    
    console.log('Category found:', category);
    
    // Hide categories grid
    if (categoriesGrid) {
        categoriesGrid.style.display = 'none';
    } else {
        console.error('categoriesGrid not found');
    }
    
    // Show category header
    if (categoryHeader) {
        categoryHeader.style.display = 'block';
    } else {
        console.error('categoryHeader not found');
    }
    
    if (categoryTitle) {
        categoryTitle.textContent = category.title;
    }
    if (categoryDescription) {
        categoryDescription.textContent = category.description;
    }
    
    // Show and render products grid
    if (productsGridElement) {
        productsGridElement.style.display = 'grid';
        renderProducts(category.products, productsGridElement);
    } else {
        console.error('productsGridElement not found');
    }
    
    // Update URL without reload
    window.history.pushState({ category: categoryKey }, '', `?category=${categoryKey}`);
}

function showCategories() {
    console.log('showCategories called');
    // Show categories grid
    if (categoriesGrid) {
        categoriesGrid.style.display = 'grid';
    }
    
    // Hide category header and products
    if (categoryHeader) {
        categoryHeader.style.display = 'none';
    }
    if (productsGridElement) {
        productsGridElement.style.display = 'none';
    }
    
    // Replace URL to show clean products.html (no parameters)
    if (window.location.search) {
        window.history.replaceState({}, '', 'products.html');
    }
}

// ============================================
// Render Products Function
// ============================================
function renderProducts(products, gridElement) {
    if (!gridElement) {
        console.error('gridElement is null');
        return;
    }
    
    console.log('Rendering products:', products.length);
    gridElement.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name} - ${product.fragrance}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-fragrance">${product.fragrance}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${formatIndianRupee(product.price)}</p>
                <button class="btn btn-primary buy-now-btn" data-product-id="${product.id}" data-product-category="${product.category}">Buy Now</button>
            </div>
        `;
        gridElement.appendChild(productCard);
        
        // Click on card/image to show lightbox
        const cardImage = productCard.querySelector('.product-image img');
        if (cardImage) {
            cardImage.addEventListener('click', (e) => {
                e.stopPropagation();
                showImageLightbox(product);
            });
        }
        
        // Click on Buy Now button
        const buyBtn = productCard.querySelector('.buy-now-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.openProductModal) {
                    window.openProductModal(product);
                }
            });
        }
    });
    
    // Trigger visibility animation after a short delay
    setTimeout(() => {
        const cards = gridElement.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 50);
        });
    }, 100);
}

// ============================================
// Image Lightbox
// ============================================
function showImageLightbox(product) {
    if (!imageLightbox || !lightboxImage) return;
    
    lightboxImage.src = product.image;
    lightboxImage.alt = product.name;
    if (lightboxTitle) lightboxTitle.textContent = product.name;
    if (lightboxDetails) lightboxDetails.textContent = `${product.fragrance} • ${formatIndianRupee(product.price)}`;
    
    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideImageLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Products.js loaded');
    
    // Initialize DOM elements
    categoriesGrid = document.getElementById('categoriesGrid');
    categoryHeader = document.getElementById('categoryHeader');
    categoryTitle = document.getElementById('categoryTitle');
    categoryDescription = document.getElementById('categoryDescription');
    productsGridElement = document.getElementById('productsGrid');
    backToCategories = document.getElementById('backToCategories');
    imageLightbox = document.getElementById('imageLightbox');
    lightboxClose = document.getElementById('lightboxClose');
    lightboxImage = document.getElementById('lightboxImage');
    lightboxTitle = document.getElementById('lightboxTitle');
    lightboxDetails = document.getElementById('lightboxDetails');
    
    console.log('DOM Elements initialized:', {
        categoriesGrid: !!categoriesGrid,
        categoryHeader: !!categoryHeader,
        productsGridElement: !!productsGridElement
    });
    
    // Category card click handlers - clicking anywhere on card
    const categoryCards = document.querySelectorAll('.category-card');
    console.log('Found category cards:', categoryCards.length);
    categoryCards.forEach(card => {
        const categoryKey = card.getAttribute('data-category');
        if (categoryKey) {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the button itself (handled separately)
                if (!e.target.closest('.view-collection-btn')) {
                    console.log('Category card clicked:', categoryKey);
                    showCategory(categoryKey);
                }
            });
        }
    });
    
    // View Collection button click handlers
    const viewCollectionBtns = document.querySelectorAll('.view-collection-btn');
    console.log('Found view collection buttons:', viewCollectionBtns.length);
    viewCollectionBtns.forEach((btn, index) => {
        const categoryKey = btn.getAttribute('data-category');
        console.log(`Button ${index} - category:`, categoryKey);
        if (categoryKey) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent card click event
                console.log('View Collection clicked for:', categoryKey);
                showCategory(categoryKey);
            });
        } else {
            console.error('Button missing data-category attribute:', btn);
        }
    });
    
    // Back button handler
    if (backToCategories) {
        backToCategories.addEventListener('click', (e) => {
            e.preventDefault();
            showCategories();
        });
    }
    
    // Lightbox close handlers
    if (lightboxClose) {
        lightboxClose.addEventListener('click', hideImageLightbox);
    }
    
    if (imageLightbox) {
        imageLightbox.addEventListener('click', (e) => {
            if (e.target === imageLightbox) {
                hideImageLightbox();
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageLightbox && imageLightbox.classList.contains('active')) {
            hideImageLightbox();
        }
    });
    
    // On page load, always show categories (not a specific category)
    // This ensures refreshing the page shows the category selection
    showCategories();
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.category) {
            showCategory(e.state.category);
        } else {
            showCategories();
        }
    });
});
