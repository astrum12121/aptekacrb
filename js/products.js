// Данные товаров
const products = [
    // Лекарства (5 товаров)
    { id: 1, name: "Нурофен таблетки 200мг №20", price: 350, category: "medicines", image: "img/medicines/nurofen.jpg" },
    { id: 2, name: "Парацетамол 500мг №20", price: 120, category: "medicines", image: "img/medicines/paracetamol.jpg" },
    { id: 3, name: "Амбробене сироп 100мл", price: 280, category: "medicines", image: "img/medicines/ambrobene.jpg" },
    { id: 4, name: "Лоперамид капс. 2мг №10", price: 85, category: "medicines", image: "img/medicines/loperamide.jpg" },
    { id: 5, name: "Валидол таб. 60мг №10", price: 45, category: "medicines", image: "img/medicines/validol.jpg" },
    
    // Витамины (5 товаров)
    { id: 6, name: "Компливит витамины №60", price: 450, category: "vitamins", image: "img/vitamins/complivit.jpg" },
    { id: 7, name: "Супрадин таб. шип. №10", price: 520, category: "vitamins", image: "img/vitamins/supradin.jpg" },
    { id: 8, name: "Магний B6 таб. №50", price: 380, category: "vitamins", image: "img/vitamins/magnesium.jpg" },
    { id: 9, name: "Омега-3 капс. 500мг №60", price: 650, category: "vitamins", image: "img/vitamins/omega.jpg" },
    { id: 10, name: "Витамин D3 2000МЕ №60", price: 420, category: "vitamins", image: "img/vitamins/vitamin-d.jpg" },
    
    // Гигиена (5 товаров)
    { id: 11, name: "Маска медицинская 50шт", price: 250, category: "hygiene", image: "img/hygiene/mask.jpg" },
    { id: 12, name: "Бинт стерильный 5м", price: 120, category: "hygiene", image: "img/hygiene/bandage.jpg" },
    { id: 13, name: "Пластырь бактерицидный 20шт", price: 85, category: "hygiene", image: "img/hygiene/plaster.jpg" },
    { id: 14, name: "Антисептик для рук 100мл", price: 150, category: "hygiene", image: "img/hygiene/sanitizer.jpg" },
    { id: 15, name: "Вата стерильная 100г", price: 65, category: "hygiene", image: "img/hygiene/cotton.jpg" },
    
    // Медтехника (5 товаров)
    { id: 16, name: "Термометр электронный", price: 490, category: "devices", image: "img/devices/thermometer.jpg" },
    { id: 17, name: "Тонометр автоматический", price: 1890, category: "devices", image: "img/devices/tonometer.jpg" },
    { id: 18, name: "Ингалятор компрессорный", price: 1450, category: "devices", image: "img/devices/inhaler.jpg" },
    { id: 19, name: "Глюкометр с тест-полосками", price: 950, category: "devices", image: "img/devices/glucometer.jpg" },
    { id: 20, name: "Грелка электрическая", price: 650, category: "devices", image: "img/devices/heating-pad.jpg" }
];

// Настройки пагинации
const productsPerPage = 8;
let currentPage = 1;

// Функция загрузки товаров
function loadProducts() {
    const grid = document.getElementById('products-grid');
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    
    document.getElementById('category-filter').value = category;
    grid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    // Пагинация
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    updatePaginationControls(totalPages);
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Отображение товаров
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price} ₽</p>
            <button class="add-to-cart" data-id="${product.id}">В корзину</button>
        `;
        grid.appendChild(productCard);
    });
    
    // Обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
            updateCartCounter();
            alert('Товар добавлен в корзину!');
        });
    });
}

// Управление пагинацией
function updatePaginationControls(totalPages) {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function goToPage(page) {
    currentPage = page;
    loadProducts();
    window.scrollTo(0, 0);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Сохраняем товары в localStorage для корзины
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    loadProducts();
    
    // Обработчик изменения фильтра
    document.getElementById('category-filter').addEventListener('change', function() {
        currentPage = 1; // Сбрасываем на первую страницу при изменении фильтра
        const category = this.value;
        window.history.pushState({}, '', `products.html?category=${category}`);
        loadProducts();
    });
    
    // Кнопки пагинации
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || 'all';
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });
});
