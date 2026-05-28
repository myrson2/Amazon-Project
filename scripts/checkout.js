import { cart } from '../data/cart.js'
import { display_payment } from './payment.js';

console.log(cart);

const order_summary = document.querySelector('.order-summary')
let display_cart = ``

cart.forEach(cart_item => {
    display_cart += `
        <div class="cart-item-container">
            <div class="delivery-date">
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${cart_item.productImage}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${cart_item.productName}
                </div>
                <div class="product-price">
                  $${(cart_item.productPrice/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cart_item.productQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="select-delivery-options">

                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${cart_item.productID}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>

                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cart_item.productID}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cart_item.productID}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
});

order_summary.innerHTML = display_cart

document.querySelectorAll('.cart-item-container').forEach(container => {
    
    container.querySelectorAll('.delivery-option').forEach(options => {
        const input = options.querySelector('.delivery-option-input')

        input.addEventListener('change', e => {
            if(input.checked) {
                const dateText = options.querySelector('.delivery-option-date').innerText.trim();
                container.querySelector('.delivery-date').innerText = 'Delivery date: ' + dateText;
            }
        })

         if(input.checked) {
            const defaultDate = options.querySelector('.delivery-option-date').innerText.trim();
            container.querySelector('.delivery-date').innerText = 'Delivery date: ' + defaultDate;
        }
    })
})

document.querySelector('.payment-summary').innerHTML = display_payment
