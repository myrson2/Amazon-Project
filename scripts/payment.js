import * as cartItems from "../data/cart.js";

function cartPrice(){
    let price = 0
    cartItems.cart.forEach((cartItem) => {
        price += cartItem.productQuantity * cartItem.productPrice;
    });
    return price;
}

export const calculatePrices = (shippingDay) => {
  console.log(shippingDay);
  const shippingElement = document.querySelector('.js-added-shipping');
  shippingElement.textContent = `$${(shippingDay / 100).toFixed(2)}`; 
  document.querySelector('.js-before-tax').textContent =`$${(beforeTax(shippingDay)/100).toFixed(2)}`
  document.querySelector('.js-calculate-tax').textContent =`$${(calculateTax(shippingDay)/100).toFixed(2)}`
  document.querySelector('.js-total-order').textContent =`$${(totalOrder(shippingDay)/100).toFixed(2)}`
}

const beforeTax = (shippingDay) => {
  return cartPrice() + Number(shippingDay);
} 

const calculateTax = (shippingDay) => {
  console.log('before tax:' + beforeTax(shippingDay));
  return (beforeTax(shippingDay) * 10) / 100
}

const totalOrder = (shippingDay) => {
  return beforeTax(shippingDay) + calculateTax(shippingDay)
}

// const afterTax = beforeTax(shippingDay) 

export let display_payment = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartItems.updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${(cartPrice()/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-added-shipping"></div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-before-tax"></div>
          </div>

          <div class="payment-summary-row">
            <div data-tax="10">Estimated tax (10%):</div>
            <div class="payment-summary-money js-calculate-tax"></div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-order"></div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
`
