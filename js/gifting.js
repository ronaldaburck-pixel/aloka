// ============================================
// Gift Products Data
// ============================================

// Currency formatting function for Indian Rupees (shared across pages)
if (typeof formatIndianRupee === 'undefined') {
    function formatIndianRupee(amount) {
        return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }
}

// Image paths - using the 3 images from img folder, repeating as needed
const images = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];

// Gift Hampers
const giftHampers = [
    {
        id: 601,
        name: 'Festive Gift Hamper',
        fragrance: 'Scented Candles + Home Decor Set',
        price: 3499,
        image: images[0],
        category: 'gift-hampers'
    },
    {
        id: 602,
        name: 'Luxury Candle Hamper',
        fragrance: 'Premium Scented Candle Collection',
        price: 4599,
        image: images[1],
        category: 'gift-hampers'
    },
    {
        id: 603,
        name: 'Wedding Gift Hamper',
        fragrance: 'Elegant Candle & Decor Combo',
        price: 5499,
        image: images[2],
        category: 'gift-hampers'
    },
    {
        id: 604,
        name: 'Special Occasion Hamper',
        fragrance: 'Mixed Fragrances Collection',
        price: 3999,
        image: images[0],
        category: 'gift-hampers'
    }
];

// Combo Sets
const comboSets = [
    {
        id: 701,
        name: '3-Candle Combo Set',
        fragrance: 'Lavender, Vanilla & Sandalwood',
        price: 4999,
        image: images[1],
        category: 'combo-sets'
    },
    {
        id: 702,
        name: 'Tea Light & Jar Combo',
        fragrance: 'Assorted Fragrances',
        price: 3299,
        image: images[2],
        category: 'combo-sets'
    },
    {
        id: 703,
        name: 'Mini Jar Set (Pack of 4)',
        fragrance: 'Mixed Inspirational Scents',
        price: 2799,
        image: images[0],
        category: 'combo-sets'
    },
    {
        id: 704,
        name: 'Home Decor & Candle Combo',
        fragrance: 'Candles + Concrete Decor',
        price: 4299,
        image: images[1],
        category: 'combo-sets'
    },
    {
        id: 705,
        name: 'Premium 5-Candle Set',
        fragrance: 'Signature Fragrance Collection',
        price: 8999,
        image: images[2],
        category: 'combo-sets'
    },
    {
        id: 706,
        name: 'Festive Combo Pack',
        fragrance: 'Festival Special Collection',
        price: 3799,
        image: images[0],
        category: 'combo-sets'
    }
];

// Premium Gift Sets
const premiumGifts = [
    {
        id: 801,
        name: 'Luxury Celebration Set',
        fragrance: 'Premium Candle & Home Decor',
        price: 6999,
        image: images[2],
        category: 'premium-gifts'
    },
    {
        id: 802,
        name: 'Executive Gift Set',
        fragrance: 'Corporate Gifting Collection',
        price: 7999,
        image: images[1],
        category: 'premium-gifts'
    },
    {
        id: 803,
        name: 'Ultimate Gift Hamper',
        fragrance: 'Complete Collection Set',
        price: 9999,
        image: images[0],
        category: 'premium-gifts'
    },
    {
        id: 804,
        name: 'Anniversary Gift Set',
        fragrance: 'Romantic Fragrance Collection',
        price: 6499,
        image: images[2],
        category: 'premium-gifts'
    }
];

// ============================================
// DOM Elements
// ============================================
const giftHampersGrid = document.getElementById('giftHampersGrid');
const comboSetsGrid = document.getElementById('comboSetsGrid');
const premiumGiftsGrid = document.getElementById('premiumGiftsGrid');

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(giftHampers, giftHampersGrid);
    renderProducts(comboSets, comboSetsGrid);
    renderProducts(premiumGifts, premiumGiftsGrid);
    setupScrollAnimations();
    setupMobileMenu();
});

// ============================================
// Render Products
// ============================================
function renderProducts(products, gridElement) {
    if (!gridElement) return;
    
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
                <p class="product-price">${formatIndianRupee(product.price)}</p>
                <button class="btn btn-primary buy-now-btn" data-product-id="${product.id}">Buy Now</button>
            </div>
        `;
        gridElement.appendChild(productCard);
        
        // Add click event to Buy Now button
        const buyBtn = productCard.querySelector('.buy-now-btn');
        buyBtn.addEventListener('click', () => {
            // Find the product in all categories
            let selectedProduct = [...giftHampers, ...comboSets, ...premiumGifts]
                .find(p => p.id === product.id);
            if (selectedProduct) {
                // Use the modal function from script.js (loaded after gifting.js)
                if (typeof window.openProductModal === 'function') {
                    window.openProductModal(selectedProduct);
                } else {
                    // Initialize modal if script.js hasn't loaded yet
                    setTimeout(() => {
                        if (typeof window.openProductModal === 'function') {
                            window.openProductModal(selectedProduct);
                        } else {
                            // Direct modal opening as fallback
                            openModalDirectly(selectedProduct);
                        }
                    }, 200);
                }
            }
        });
    });
    
    // Trigger visibility animation after a short delay
    setTimeout(() => {
        const cards = gridElement.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// ============================================
// Direct Modal Opening (Fallback)
// ============================================
function openModalDirectly(product) {
    const modal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductFragrance = document.getElementById('modalProductFragrance');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductImage = document.getElementById('modalProductImage');
    const quantityInput = document.getElementById('quantity');
    const modalTotal = document.getElementById('modalTotal');
    
    if (!modal) return;
    
    modalProductName.textContent = product.name;
    modalProductFragrance.textContent = product.fragrance;
    modalProductPrice.textContent = formatIndianRupee(product.price);
    
    const modalImg = modalProductImage.querySelector('img');
    if (modalImg) {
        modalImg.src = product.image;
        modalImg.alt = `${product.name} - ${product.fragrance}`;
    }
    
    quantityInput.value = 1;
    modalTotal.textContent = formatIndianRupee(product.price);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Store current product for quantity updates
    window.currentProduct = product;
    
    // Setup quantity controls
    const quantityDecrease = document.getElementById('quantityDecrease');
    const quantityIncrease = document.getElementById('quantityIncrease');
    
    if (quantityDecrease) {
        quantityDecrease.onclick = () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateModalTotalDirectly();
            }
        };
    }
    
    if (quantityIncrease) {
        quantityIncrease.onclick = () => {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
                updateModalTotalDirectly();
            }
        };
    }
    
    quantityInput.oninput = () => {
        let value = parseInt(quantityInput.value) || 1;
        if (value < 1) value = 1;
        if (value > 10) value = 10;
        quantityInput.value = value;
        updateModalTotalDirectly();
    };
}

function updateModalTotalDirectly() {
    if (!window.currentProduct) return;
    const quantityInput = document.getElementById('quantity');
    const modalTotal = document.getElementById('modalTotal');
    const quantity = parseInt(quantityInput.value) || 1;
    const total = window.currentProduct.price * quantity;
    modalTotal.textContent = formatIndianRupee(total);
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => observer.observe(card));
    
    // Observe category sections
    const categories = document.querySelectorAll('.product-category');
    categories.forEach(category => observer.observe(category));
}

// ============================================
// Mobile Menu Toggle
// ============================================
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    
    if (!mobileMenuToggle || !nav) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            nav.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}
