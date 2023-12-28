let promptForContinueShopping = true;
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    const name = params.get('name');
    const price = params.get('price');
    const image = params.get('image');

    document.getElementById('product-image').src = image;
    document.getElementById('product-name').textContent = name;
    document.getElementById('product-price').textContent = `$${parseFloat(price).toFixed(2)}`;

    const colorSelect = document.getElementById('color');
    const sizeSelect = document.getElementById('size');
    const colors = ['Червоний', 'Синій'];
    const sizes = ['38', '39', '40'];

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

    document.getElementById('product-description').textContent = `Кросівки ${name} — для вашого комфорту та стилю.`;

    const addToCartButton = document.getElementById('add-to-cart-button');
    addToCartButton.addEventListener('click', function () {
        const selectedQuantity = parseInt(document.getElementById('quantity').value, 10);

        // Перевірка мінімальної та максимальної кількості
        const minQuantity = 1;
        const maxQuantity = 10;

        if (selectedQuantity < minQuantity || selectedQuantity > maxQuantity) {
            alert(`Будь ласка, виберіть кількість від ${minQuantity} до ${maxQuantity}.`);
            return;
        }

        addToCart(name, parseFloat(price), image, selectedQuantity, colorSelect.value, sizeSelect.value);
    });
});

function addToCart(name, price, photo, quantity, color, size) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    let existingItem = cartItems.find(item => (
        item.name === name && item.color === color && item.size === size
    ));

    if (existingItem) {
        const confirmMessage = `${name} вже є в вашому кошику. Додати до кількості вже існуючого товару?`;

        if (customConfirm(confirmMessage) == true) {
            existingItem.quantity += quantity;
        }
    } else {
        const newItem = { name, price, photo, quantity, color, size };
        cartItems.push(newItem);

        if (cartItems.length === 1 && promptForContinueShopping) {
            const firstItemMessage = 'Ви успішно додали товар у кошик. Продовжити покупку?';

            if (!customConfirm(firstItemMessage)) {
                promptForContinueShopping = false;
                return;
            }
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
