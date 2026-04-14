// ============================================
// SHOPPING CART SYSTEM (works across all pages)
// ============================================

let cart = JSON.parse(localStorage.getItem('aloka_cart') || '[]');

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add to cart
function addToCart(product, quantity = 1) {
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('aloka_cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart!');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('successNotification');
    if (notification) {
        notification.querySelector('p').textContent = message;
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 2000);
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
