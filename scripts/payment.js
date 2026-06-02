import * as cartItems from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js"; 

export function renderFeeSummary() {
  function cartPrice(){
    let price = 0
    cartItems.cart.forEach((cartItem) => {
        price += cartItem.productQuantity * cartItem.productPrice;
    });
    return price;
  }

  const calculateShippingFee = () => {
    let totalShippingFee = 0;
    cartItems.cart.forEach(cart_items => {
      const matchedOption = deliveryOptions.find(
        option => option.days === cart_items.shippingDay
      );
      if (matchedOption) {
        totalShippingFee += matchedOption.priceCents;
      }
    })
    return totalShippingFee
  }

  const shippingFeeCents = calculateShippingFee();
  const totalBeforeTaxCents = cartPrice() + shippingFeeCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1);
  const totalCents = totalBeforeTaxCents + taxCents;

  const display_payment = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartItems.updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${(cartPrice()/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-added-shipping">$${(shippingFeeCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-before-tax">$${(totalBeforeTaxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div data-tax="10">Estimated tax (10%):</div>
            <div class="payment-summary-money js-calculate-tax">$${(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-order">$${(totalCents / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector('.payment-summary').innerHTML = display_payment;
}