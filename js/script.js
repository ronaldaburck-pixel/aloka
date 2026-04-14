// ============================================
// Product Data
// ============================================
// Currency formatting function for Indian Rupees (shared across pages)
if (typeof formatIndianRupee === 'undefined') {
    function formatIndianRupee(amount) {
        return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }
}

const products = [
    {
        id: 1,
        name: 'Serenity',
        fragrance: 'Lavender & Vanilla',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=90&fit=crop&auto=format'
    },
    {
        id: 2,
        name: 'Tranquility',
        fragrance: 'Sandalwood & Rose',
        price: 2399,
        image: 'https://images.unsplash.com/photo-1602874805368-6a10281c5c3a?w=1200&q=90&fit=crop&auto=format'
    },
    {
        id: 3,
        name: 'Harmony',
        fragrance: 'Jasmine & Bergamot',
        price: 2199,
        image: 'https://images.unsplash.com/photo-1602874805368-6a10281c5c3a?w=1200&q=90&fit=crop&auto=format'
    },
    {
        id: 4,
        name: 'Bliss',
        fragrance: 'Eucalyptus & Mint',
        price: 2099,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=90&fit=crop&auto=format'
    }
];

// ============================================
// DOM Elements (will be initialized in DOMContentLoaded)
// ============================================
// productsGrid is only for home page, so we'll initialize it conditionally
let productsGrid;
let productModal;
let ordersModal;
let modalOverlay;
let ordersModalOverlay;
let modalClose;
let ordersModalClose;
let cartIcon;
let cartCount;
let mobileMenuToggle;
let nav;
let navLinks;
let successNotification;
let modalProductName;
let modalProductFragrance;
let modalProductPrice;
let modalProductImage;
let quantityInput;
let quantityDecrease;
let quantityIncrease;
let modalTotal;
let confirmOrderBtn;
let cancelOrderBtn;
let ordersList;
let ordersActions;
let clearCartBtn;

// Current product being viewed
let currentProduct = null;

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize productsGrid only if element exists (home page)
    productsGrid = document.getElementById('productsGrid');
    
    // Setup logo click handler - reload page if on home, navigate if on other pages
    const logoLinks = document.querySelectorAll('.logo-link');
    logoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            // If already on home page, reload it
            if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/')) {
                e.preventDefault();
                window.location.reload(true); // Force reload from server
                return false;
            }
            // Otherwise, navigate normally to home page
        });
    });
    
    // Only render products if on home page and productsGrid exists
    if (productsGrid && typeof renderProducts === 'function') {
        renderProducts();
    }
    setupSmoothScroll();
    setupScrollAnimations();
    setupMobileMenu();
    updateCartCount();
    loadOrders();
    
    // Make modal functions globally available for products page
    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    
    // Setup modal close events only if elements exist
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }
    if (cancelOrderBtn) {
        cancelOrderBtn.addEventListener('click', closeProductModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }
    
    // Quantity controls - only if elements exist
    if (quantityDecrease) {
        quantityDecrease.addEventListener('click', () => {
            if (!quantityInput) return;
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateModalTotal();
            }
        });
    }
    
    if (quantityIncrease) {
        quantityIncrease.addEventListener('click', () => {
            if (!quantityInput) return;
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
                updateModalTotal();
            }
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            let value = parseInt(quantityInput.value) || 1;
            if (value < 1) value = 1;
            if (value > 10) value = 10;
            quantityInput.value = value;
            updateModalTotal();
        });
    }
    
    // Setup clear cart button if it exists
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Setup confirm order button if it exists
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', confirmOrder);
    }
    
    // Setup orders modal event listeners if they exist
    if (ordersModalClose) {
        ordersModalClose.addEventListener('click', closeOrdersModal);
    }
    if (ordersModalOverlay) {
        ordersModalOverlay.addEventListener('click', closeOrdersModal);
    }
    if (cartIcon) {
        cartIcon.addEventListener('click', openOrdersModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ordersModal && ordersModal.classList.contains('active')) {
                closeOrdersModal();
            }
            if (productModal && productModal.classList.contains('active')) {
                closeProductModal();
            }
        }
    });
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
});

// ============================================
// Render Products
// ============================================
function renderProducts() {
    // This function is for home page, but home page doesn't have productsGrid anymore
    // Products are shown on products.html page
    if (!productsGrid) {
        console.log('productsGrid not found - this is expected on home page');
        return;
    }
    
    productsGrid.innerHTML = '';
    
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
        productsGrid.appendChild(productCard);
        
        // Add click event to Buy Now button
        const buyBtn = productCard.querySelector('.buy-now-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', () => openProductModal(product));
        }
    });
    
    // Trigger visibility animation after a short delay
    setTimeout(() => {
        const cards = productsGrid.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

// ============================================
// Product Modal Functions
// ============================================
function openProductModal(product) {
    if (!product) {
        console.error('No product provided to openProductModal');
        return;
    }
    
    currentProduct = product;
    
    if (!productModal) {
        console.error('Product modal not found');
        return;
    }
    
    // Set modal content with null checks
    if (modalProductName) modalProductName.textContent = product.name || '';
    if (modalProductFragrance) modalProductFragrance.textContent = product.fragrance || '';
    if (modalProductPrice) modalProductPrice.textContent = formatIndianRupee(product.price || 0);
    
    // Update modal image
    if (modalProductImage) {
        const modalImg = modalProductImage.querySelector('img') || document.getElementById('modalImage');
        if (modalImg) {
            modalImg.src = product.image || '';
            modalImg.alt = `${product.name || ''} - ${product.fragrance || ''}`;
        }
    }
    
    if (quantityInput) {
        quantityInput.value = 1;
        updateModalTotal();
    }
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

function updateModalTotal() {
    if (!currentProduct) return;
    if (!quantityInput || !modalTotal) return;
    const quantity = parseInt(quantityInput.value) || 1;
    const total = (currentProduct.price || 0) * quantity;
    modalTotal.textContent = formatIndianRupee(total);
}

// Quantity controls and modal events are now set up in DOMContentLoaded

// Close modal on Escape key (handled in DOMContentLoaded now)

// ============================================
// Order Management (localStorage)
// ============================================
function confirmOrder() {
    if (!currentProduct) {
        console.error('No product selected');
        return;
    }
    
    if (!quantityInput) {
        console.error('Quantity input not found');
        return;
    }
    
    const quantity = parseInt(quantityInput.value) || 1;
    const order = {
        id: Date.now(),
        productName: currentProduct.name,
        fragrance: currentProduct.fragrance,
        quantity: quantity,
        price: currentProduct.price,
        total: currentProduct.price * quantity,
        date: new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    // Get existing orders from localStorage
    const orders = getOrders();
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('alokaOrders', JSON.stringify(orders));
    
    // Update cart count
    updateCartCount();
    
    // Close modal
    closeProductModal();
    
    // Show success notification
    showSuccessNotification();
    
    // Reload orders list if modal is open
    if (ordersModal && ordersModal.classList.contains('active')) {
        loadOrders();
    }
}

// confirmOrderBtn event listener is set up in DOMContentLoaded

function getOrders() {
    const ordersJson = localStorage.getItem('alokaOrders');
    return ordersJson ? JSON.parse(ordersJson) : [];
}

function updateCartCount() {
    if (!cartCount) return;
    const orders = getOrders();
    const totalItems = orders.reduce((sum, order) => sum + order.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// ============================================
// Orders Modal Functions
// ============================================
function openOrdersModal() {
    if (!ordersModal) return;
    loadOrders();
    ordersModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrdersModal() {
    if (!ordersModal) return;
    ordersModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners are set up in DOMContentLoaded

function loadOrders() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="no-orders">No orders yet. Start shopping!</p>';
        if (ordersActions) {
            ordersActions.style.display = 'none';
        }
        return;
    }
    
    ordersList.innerHTML = '';
    
    // Show clear cart button
    if (ordersActions) {
        ordersActions.style.display = 'block';
    }
    
    // Sort orders by date (newest first)
    orders.sort((a, b) => b.id - a.id);
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-header">
                <h4 class="order-item-name">${order.productName}</h4>
                <span class="order-item-date">${order.date}</span>
            </div>
            <p class="order-item-details">${order.fragrance} • Quantity: ${order.quantity}</p>
            <p class="order-item-total">Total: ${formatIndianRupee(order.total)}</p>
        `;
        ordersList.appendChild(orderItem);
    });
}

// ============================================
// Clear Cart Function
// ============================================
function clearCart() {
    if (confirm('Are you sure you want to clear all orders?')) {
        localStorage.removeItem('alokaOrders');
        updateCartCount();
        loadOrders();
    }
}

// ============================================
// Success Notification
// ============================================
function showSuccessNotification() {
    if (!successNotification) return;
    successNotification.classList.add('show');
    
    setTimeout(() => {
        if (successNotification) {
            successNotification.classList.remove('show');
        }
    }, 4000);
}

// ============================================
// Smooth Scroll Navigation
// ============================================
function setupSmoothScroll() {
    if (!navLinks || navLinks.length === 0) return;
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Handle "Shop Now" and "View Gift Collection" buttons
    document.querySelectorAll('a[href="#shop"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.getElementById('shop');
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll reveal
    const revealElements = document.querySelectorAll('.fade-in, .product-card, .feature-card, .section-title, .gifting-content, .about-image, .about-text, .instagram-item');
    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// Mobile Menu Toggle
// ============================================
function setupMobileMenu() {
    if (!mobileMenuToggle || !nav) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (nav.classList.contains('active')) {
            if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (spans[1]) spans[1].style.opacity = '0';
            if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            if (spans[0]) spans[0].style.transform = '';
            if (spans[1]) spans[1].style.opacity = '1';
            if (spans[2]) spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && mobileMenuToggle) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                if (spans[0]) spans[0].style.transform = '';
                if (spans[1]) spans[1].style.opacity = '1';
                if (spans[2]) spans[2].style.transform = '';
            }
        }
    });
}

// ============================================
// Sticky Header on Scroll
// ============================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});
