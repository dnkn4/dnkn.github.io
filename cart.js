let promptForContinueShopping = true;
// cart.js
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const addedItem = urlParams.get('addedItem');

    if (addedItem) {
        const addedItemMessage = document.getElementById('added-item-message');
        addedItemMessage.textContent = `${addedItem} було додано до корзини!`;

        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const checkoutForm = document.getElementById('checkoutForm');

    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(checkoutForm);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        handleCheckout(formDataObject);
    });

    updateCart();
});


function handleCheckout(formData) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderData = {
        CustomerName: formData.name,
        CustomerEmail: formData.email,
        // Додайте інші дані покупця за потреби
    };

    const wb = XLSX.utils.book_new();
    const wsOrder = XLSX.utils.json_to_sheet([orderData], { header: ['CustomerName', 'CustomerEmail'] });
    
    // Додайте підписи для товарів
    const itemsData = [['Назва товару', 'Ціна', 'Кількість', 'Загальна ціна']];
    cartItems.forEach(item => {
        itemsData.push([item.name, item.price.toFixed(2), item.quantity, (item.price * item.quantity).toFixed(2)]);
    });

    const wsItems = XLSX.utils.aoa_to_sheet(itemsData);

    XLSX.utils.book_append_sheet(wb, wsOrder, 'Order');
    XLSX.utils.book_append_sheet(wb, wsItems, 'Items');

    XLSX.writeFile(wb, 'order.xlsx');

    // Очистіть кошик
    clearCart();

    // Сховати форму
    document.getElementById('orderForm').style.display = 'none';
}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
    updateCart(); // Оновити відображення кошика
}

function showOrderForm() {
    document.getElementById('orderForm').style.display = 'block';
}

function resetForm() {
    document.getElementById('checkoutForm').reset();
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    const removedItem = cartItems[index];
    const removedItemTotal = removedItem.price * removedItem.quantity;

    cartItems.splice(index, 1);
    cartTotal -= removedItemTotal;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toString());

    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    if (cartItems.length === 0) {
        // Якщо кошик порожній, встановлюємо ціну на 0
        cartTotal = 0;

        // Деактивуємо кнопку "Оформити замовлення"
        checkoutButton.disabled = true;
        checkoutForm.style.display = 'none';
    } else {
        // Активуємо кнопку "Оформити замовлення"
        checkoutButton.disabled = false;
        checkoutForm.style.display = 'block';
    }

    cartList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${(item.price * item.quantity).toFixed(2)} x ${item.quantity}, Color: ${item.color}, Size: ${item.size}`;

        // Додайте відступ між текстом і кнопкою
        const spacer = document.createElement('div');
        spacer.style.marginBottom = '10px'; // Змініть значення за вашим бажанням
        li.appendChild(spacer);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Видалити';
        deleteButton.onclick = () => removeItem(index);
        li.appendChild(deleteButton);

        li.classList.add('cart-item');

        li.onclick = () => showOrderDetails(index);

        cartList.appendChild(li);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}