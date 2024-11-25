// DOM Elements
const openCart = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');
const itemsContainer = document.querySelector('.items-container');
const cartItems = document.querySelector('.cart-items');
const wishlistItems = document.querySelector('.wishlist-items');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const body = document.querySelector('body');

// Data
let cart = [];
let wishlist = [];
const products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'https://assets.ajio.com/medias/sys_master/root/20231005/xSVr/651de8e9ddf77915191f1748/-473Wx593H-466668066-pink-MODEL.jpg',
        price: 1600
    },
    // Add more products here...
];

// Functions
function initApp() {
    products.forEach(product => {
        const item = createProductItem(product);
        itemsContainer.appendChild(item);
    });
}

function createProductItem(product) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="title">${product.name}</div>
        <div class="price">$${product.price.toLocaleString()}</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="add-to-wishlist" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
    `;
    return item;
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

function addToWishlist(productId) {
    const product = products.find(item => item.id === productId);
    if (product && !wishlist.includes(product)) {
        wishlist.push(product);
        updateWishlist();
    }
}

function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
    let totalQuantity = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <div class="title">${item.name}</div>
                    <div class="price">$${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="quantity">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    total.innerText = `Total: $${totalPrice.toLocaleString()}`;
    quantity.innerText = totalQuantity;
}

function updateWishlist() {
    wishlistItems.innerHTML = '';
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('li');
        wishlistItem.innerHTML = `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="details">
                    <div class="title">${item.name}</div>
                    <div class="price">$${item.price.toLocaleString()}</div>
                </div>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Event Listeners
openCart.addEventListener('click', () => {
    body.classList.add('active');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('active');
});

// Initialize App
initApp();
