// Функция добавления товара в корзину
function addToCart(productId) {
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Увеличиваем количество, если товар уже есть
        existingItem.quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push({ id: productId, quantity: 1 });
    }
    
    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция изменения количества товара
function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Удаляем если количество ≤ 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Функция обновления счетчика корзины
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const counters = document.querySelectorAll('#cart-counter, .cart-count');
    
    counters.forEach(counter => {
        counter.textContent = total;
    });
}
