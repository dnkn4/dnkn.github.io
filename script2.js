
// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Отримуємо параметри товару з URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    const name = params.get('name');
    const price = params.get('price');
    const image = params.get('image');

    // Заповнюємо інформацію про товар на сторінці
    document.getElementById('product-image').src = image;
    document.getElementById('product-name').textContent = name;
    document.getElementById('product-price').textContent = `$${parseFloat(price).toFixed(2)}`;

    // Додавання опцій для кольору та розміру (можна замінити на вашу логіку)
    const colorSelect = document.getElementById('color');
    const sizeSelect = document.getElementById('size');
    const colors = ['Червоний', 'Синій'];  // Замініть це на ваш масив кольорів
    const sizes = ['38', '39', '40'];  // Замініть це на ваш масив розмірів

    colors.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    // Додавання опису товару (замініть це на ваш опис)
    document.getElementById('product-description').textContent = `Кросівки ${name} — для вашого комфорту та стилю.`;
});

function addToCart() {
    // Логіка додавання товару у кошик (замініть це на вашу логіку)
    const quantity = document.getElementById('quantity').value;
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;

    // Тут ви можете викликати вашу функцію addToCart з передачею відповідних параметрів
    console.log(`Додано у кошик: ${quantity} ${color} розмір ${size} ${document.getElementById('product-name').textContent}`);
}


let promptForContinueShopping = true; // Додаємо змінну

function addToCart(name, price, photo, quantity, color, size) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    const existingItemIndex = cartItems.findIndex(item => (
        item.name === name && item.color === color && item.size === size
    ));

    if (existingItemIndex !== -1) {
        const confirmMessage = `${name} вже є в вашому кошику. Продовжити покупку?`;

        const userResponse = customConfirm(confirmMessage);

        if (!userResponse) {
            // Користувач натиснув "ні", виходимо з функції
            return;
        } else {
            // Користувач вирішив продовжити покупку, не питати його про перехід у кошик
            promptForContinueShopping = false;
        }
    }

    // Якщо товару немає в кошику або користувач вирішив продовжити покупку, додаємо товар
    const newItem = { name, price, photo, quantity, color, size };
    cartItems.push(newItem);

    // Якщо це перший товар, виводимо повідомлення
    if (cartItems.length === 1 && promptForContinueShopping) {
        const firstItemMessage = 'Ви успішно добавили товар у кошик. Продовжити покупку?';
        const userResponse = customConfirm(firstItemMessage);

        if (!userResponse) {
            // Користувач натиснув "ні", виходимо з функції
            return;
        } else {
            // Користувач вирішив продовжити покупку, не питати його про перехід у кошик
            promptForContinueShopping = false;
        }
    }

    // Зміна тут: використовуємо новий масив [...cartItems]
    localStorage.setItem('cartItems', JSON.stringify([...cartItems]));
    localStorage.setItem('cartTotal', calculateTotal(cartItems).toString());

    updateCart();
}

function customConfirm(message) {
    const confirmation = window.confirm(message);

    if (confirmation) {
        return true; // Користувач натиснув "так"
    } else {
        return false; // Користувач натиснув "ні"
    }
}


function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    if (cartItems.length === 0) {
        // Якщо кошик порожній, встановлюємо ціну на 0
        cartTotal = 0;
    }

    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}, Color: ${item.color}, Size: ${item.size}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = () => removeItem(index);
        li.appendChild(deleteButton);

        li.onclick = () => showOrderDetails(index);

        cartList.appendChild(li);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}