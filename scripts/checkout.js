import { cart, deleteCart, updateCartQuantity } from '../data/cart.js'
import * as payment from './payment.js';
import { deliveryOptions  } from '../data/deliveryOptions.js';

export function renderOrderSummary() {
  document.querySelector('.js-cart-items').textContent = updateCartQuantity();

  const order_summary = document.querySelector('.order-summary')
  if (!order_summary) return;

  let display_cart = ``

  cart.forEach(cart_item => {
    display_cart += `
        <div class="cart-item-container" data-cart-id="${cart_item.productID}">
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
                  $${(cart_item.productPrice / 100).toFixed(2)}
                </div>
                <div class="product-quantity" data-product-id="${cart_item.productID}">
                  <span>
                    Quantity: <span class="quantity-label">${cart_item.productQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" >
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
                    <div class="delivery-option-date" data-shipping-date="tuesday">
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
                    <div class="delivery-option-date" data-shipping-date="wednesday">
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
                    <div class="delivery-option-date" data-shipping-date="monday">
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

  // Render the payment summary to ensure values are calculated and displayed
  payment.renderFeeSummary();

  document.querySelectorAll('.cart-item-container').forEach(container => {
    const cartId = container.dataset.cartId

    container.querySelectorAll('.delivery-option').forEach(options => {
      const input = options.querySelector('.delivery-option-input')

      const updateShippingFee = cart.find(({productID}) => productID === cartId)
      
      input.addEventListener('change', e => {
        if (input.checked) {
          console.log(updateShippingFee);
          const dateText = options.querySelector('.delivery-option-date').innerText.trim()
          const dateShipping = options.querySelector('.delivery-option-date').dataset.shippingDate

          updateShippingFee.shippingDay = dateShipping;
          payment.renderFeeSummary();
          container.querySelector('.delivery-date').innerText = 'Delivery date: ' + dateText
        }
      })

      if (input.checked) {
        const defaultDate = options.querySelector('.delivery-option-date').innerText.trim()
        const dateShipping = options.querySelector('.delivery-option-date').dataset.shippingDate
        updateShippingFee.shippingDay = dateShipping;
        container.querySelector('.delivery-date').innerText = 'Delivery date: ' + defaultDate
      }
    })
  })
}

document.querySelector('.order-summary').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-quantity-link')) {
    const productId = e.target.closest('.product-quantity').dataset.productId;
    deleteCart(productId);
    renderOrderSummary();
  }
});

renderOrderSummary();