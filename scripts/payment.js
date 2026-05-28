import * as cartItems from "../data/cart.js";

function cartPrice(){
    let price = 0
    cartItems.cart.forEach((cartItem) => {
        price += cartItem.productQuantity * cartItem.productPrice;
    });

    return (price / 100).toFixed(2);
}

export let display_payment = `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartItems.updateCartQuantity()}):</div>
            <div class="payment-summary-money">$${cartPrice()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
`

