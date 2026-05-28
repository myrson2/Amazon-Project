import * as myCart from '../data/cart.js'
import { products } from '../data/products.js';

const product_grid = document.querySelector('.js-products-grid')
let displayProduct = ``

products.forEach(product => {
    displayProduct += `
        <div class="product-container">
        <div class="product-image-container">
            <img class="product-image js-product-image-${product.id}"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines js-product-name-${product.id}">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
            src="images/ratings/rating-45.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
        </div>

        <div class="product-price-${product.id}">
            ${product.priceCents}
        </div>

        <div class="product-quantity-container">
            <select class="item-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
        </div>
    `
    product_grid.innerHTML = displayProduct
});

document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', e => {
        const productID = button.dataset.productId;

        const cart_products = {
            productID: productID,
            productQuantity : Number(document.querySelector(`.item-quantity-${productID}`).value),
            productPrice : Number(document.querySelector(`.product-price-${productID}`).innerText),
            productImage : document.querySelector(`.js-product-image-${productID}`).src,
            productName : document.querySelector(`.js-product-name-${productID}`).innerText,
        }

        myCart.addToCart(cart_products)
        myCart.showAddedNotif(productID)
        document.querySelector('.cart-quantity').textContent = myCart.updateCartQuantity()
    });
});

document.querySelector('.cart-quantity').textContent = myCart.updateCartQuantity()
