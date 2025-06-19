// Глобальные переменные
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const products = [
    // Лекарства
    { id: 1, category: "medicines", name: "Нурофен таблетки 200мг №20", price