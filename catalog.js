// catalog.js
document.addEventListener('DOMContentLoaded', function () {
    const catalog = document.getElementById('catalog');

    const products = [
        {
            id: 1,
            name: 'Трекінгові черевики',
            price: 20.99,
            image: '1.png',
            colors: ['Червоний', 'Синій'],
            sizes: ['38', '39', '40'],
            description: 'Ідельне взуття для випадкових походів по лісі, парку і низьким гірським ділянкам.'
        },
        {
            id: 2,
            name: 'Кросівки Saucony EXSCURSION',
            price: 30.50,
            image: '2.png',
            colors: ['Зелений', 'Жовтий'],
            sizes: ['41', '42', '43'],
            description: 'Опис товару 2'
        },
        {
            id: 3,
            name: 'Кросівки Saucony SHADOW 5000',
            price: 20.99,
            image: '3.png',
            colors: ['Червоний', 'Синій'],
            sizes: ['38', '39', '40'],
            description: 'Кросівки BOba3 — для ваших спортивних змагань'
        },
        {
            id: 4,
            name: 'Кросівки New Balance',
            price: 30.50,
            image: '4.png',
            colors: ['Зелений', 'Жовтий'],
            sizes: ['41', '42', '43'],
            description: 'Опис товару 4'
        },
        {
            id: 5,
            name: 'Черевики SH100 WARM',
            price: 20.99,
            image: '5.png',
            colors: ['Червоний', 'Синій'],
            sizes: ['38', '39', '40'],
            description: 'Кросівки BOba — для ваших спортивних змагань'
        },
        {
            id: 6,
            name: 'Черевики шкіряні Benito',
            price: 30.50,
            image: '6.png',
            colors: ['Зелений', 'Жовтий'],
            sizes: ['41', '42', '43'],
            description: 'Опис товару 2'
        },
        {
            id: 7,
            name: 'Miguel Miratez',
            price: 20.99,
            image: '7.png',
            colors: ['Червоний', 'Синій'],
            sizes: ['38', '39', '40'],
            description: 'Кросівки BOba3 — для ваших спортивних змагань'
        },
        {
            id: 8,
            name: 'Кеди Estro',
            price: 30.50,
            image: '8.png',
            colors: ['Зелений', 'Жовтий'],
            sizes: ['41', '42', '43'],
            description: 'Опис товару 4'
        },
        {
            id: 9,
            name: 'Scarpa Rush TRK GTX',
            price: 20.99,
            image: '9.png',
            colors: ['Червоний', 'Синій'],
            sizes: ['38', '39', '40'],
            description: 'Кросівки BOba — для ваших спортивних змагань'
        },
        // Додайте інші товари, які вам потрібно
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('id', `product${product.id}`);
        productDiv.innerHTML = `
            <p class="product-name">${product.name}</p>
            <img src="${product.image}" alt="${product.name}">
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button onclick="openDetails(${product.id},'${product.name}',${product.price},'${product.image}')">Відкрити детальну інформацію</button>
        `;
        catalog.appendChild(productDiv);
    });
});

function generateOptions(options) {
    return options.map(option => `<option value="${option}">${option}</option>`).join('');
}

function openDetails(productId, name, price, image) {
    // Переадресовуємо на сторінку "Детальна інформація" і передаємо параметри товару
    window.location.href = `detal_info.html?productId=${productId}&name=${name}&price=${price}&image=${image}`;
}
