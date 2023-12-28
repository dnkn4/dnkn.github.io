document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
        // Отримайте інформацію про товар з productId та відобразіть її на сторінці
        displayProductDetails(productId);
    }
});

function displayProductDetails(productId) {
    const productDetailsContainer = document.getElementById('productDetails');
    const quantity = document.getElementById('quantity1').value;
    const color = document.getElementById('color1').value;
    const size = document.getElementById('size1').value;

    // Отримайте інформацію про товар з productId та відобразіть її в productDetailsContainer
    // Ви можете отримати дані з локального сховища, бази даних або будь-якого іншого місця, де вони зберігаються
    // Наприклад, використовуючи localStorage.getItem(productId) і розпаковуючи рядок JSON

    // Спростимо цей приклад і просто відобразимо дані на сторінці:
    productDetailsContainer.innerHTML = `
        <img src="1.png" alt="Product 1">
        <p>Product 1 - $20.99</p>
        <p>Кількість: ${quantity}</p>
        <p>Колір: ${color}</p>
        <p>Розмір: ${size}</p>
        <p>Опис товару: Кросівки BOba -- для ваших спортивних змагань</p>
    `;
}

function addToCartFromDetails() {
    // Додаткова логіка для додавання товару до кошика з детальної сторінки
    // Використайте інформацію, яку ви отримали під час відображення деталей товару
    const quantity = document.getElementById('quantity1').value;
    const color = document.getElementById('color1').value;
    const size = document.getElementById('size1').value;

    // Додайте товар до кошика за допомогою вашої функції addToCart
    addToCart('Product 1', 20.99, '1.png', parseInt(quantity), color, size);
    // Опціонально: можна вивести повідомлення або здійснити інші дії, які потрібні після додавання товару до кошика
    alert('Товар додано до кошика!');
}