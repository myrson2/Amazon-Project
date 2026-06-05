import { cart, returnQuantity } from "../data/cart.js"; // Corrected and consolidated import
import { renderTrackingPage } from "./tracking.js";

export let orders = JSON.parse(localStorage.getItem('Orders')) || [];

function saveOrders() {
  localStorage.setItem('Orders', JSON.stringify(orders));
}

export const placeOrders = (cart, totalCostCents) => {
  if (cart.length === 0) return;

  // Fallback for crypto.randomUUID() which is undefined in insecure contexts like file://
  const generatedId = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') 
    ? crypto.randomUUID() 
    : 'order-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

  const order = {
    id: generatedId,
    orderTime: new Date().toLocaleDateString(),
    totalCostCents: totalCostCents,
    products: [...cart] // Spread to create a shallow copy/snapshot
  };

  orders.push(order);
  saveOrders();
}

export function renderOrderSummary() {
  const orderGrid = document.querySelector('.orders-grid')
  if (!orderGrid) return;

  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = returnQuantity();
  }

  let display_order = ``

  const groupedOrders = Object.groupBy(orders, order => order.orderTime);

  Object.entries(groupedOrders).forEach(([date, ordersOnThisDate]) => {
    let productsHTML = '';
    let dayTotalCents = 0;

    ordersOnThisDate.forEach(order => {
      dayTotalCents += order.totalCostCents;

      order.products.forEach(product => {
        const orderId = order.id || '';
        const productId = product.productID || '';
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

            <div class="product-actions" data-order-id="${orderId}" data-product-id="${productId}">
              <a href="tracking.html?orderId=${orderId}&productId=${productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        `;
      });
    });

    const firstOrderId = (ordersOnThisDate[0] && ordersOnThisDate[0].id) ? ordersOnThisDate[0].id.slice(0, 8) : 'N/A';

    display_order += `
       <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(dayTotalCents/100).toFixed(2)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Group ID:</div>
              <div>${firstOrderId}...</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsHTML}
          </div>
        </div>
    `;
  });

  orderGrid.innerHTML = display_order

  document.querySelectorAll('.product-actions').forEach(actions => {
    actions.addEventListener('click', e => {
      // Find the closest anchor to allow natural navigation
      const anchor = e.target.closest('a');
      if (anchor) {
        // Let the default link navigation go to tracking.html with query parameters
        return;
      }
      const target = e.target.closest('.product-actions');
      const order_id = target.dataset.orderId;
      const product_id = target.dataset.productId;
      renderTrackingPage(product_id);
      console.log('Order ID:', order_id, 'Product ID:', product_id);
    })
  })

}

renderOrderSummary()
