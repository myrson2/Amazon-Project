import { cart, returnQuantity } from "../data/cart.js"; // Corrected and consolidated import

export let orders = JSON.parse(localStorage.getItem('Orders')) || [];

function saveOrders() {
  localStorage.setItem('Orders', JSON.stringify(orders));
}

export const placeOrders = (cart, totalCostCents) => {
  if (cart.length === 0) return;

  const order = {
    id: crypto.randomUUID(),
    orderTime: new Date().toLocaleDateString(),
    totalCostCents: totalCostCents,
    products: [...cart] // Spread to create a shallow copy/snapshot
  };

  orders.unshift(order); // Add newest order to the beginning
  saveOrders();
  renderOrderSummary
}

export function renderOrderSummary() {
  const orderGrid = document.querySelector('.orders-grid')
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = returnQuantity();
  }

  let display_order = ``

  orders.forEach(order => {
    let productsHTML = '';

    order.products.forEach(product => {
      productsHTML += `
        <div class="order-details">
          <div class="product-image-container">
            <img src="${product.productImage}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.productName}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${product.shippingDay}
            </div>
            <div class="product-quantity">
              Quantity: ${product.productQuantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });

    display_order += `
       <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalCostCents/100).toFixed(2)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsHTML}
          </div>
        </div>
    `;
  });

  orderGrid.innerHTML = display_order
}
