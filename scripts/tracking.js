import { returnQuantity } from "../data/cart.js";

export function renderTrackingPage() {
  // Update header cart quantity
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = returnQuantity();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  const productId = urlParams.get('productId');

  const orders = JSON.parse(localStorage.getItem('Orders')) || [];

  // Find the matching order
  const order = orders.find(o => o.id === orderId);

  // Find the matching product inside the order
  let product = null;
  if (order) {
    product = order.products.find(p => p.productID === productId);
  }

  const trackingContainer = document.querySelector('.order-tracking');

  if (!order || !product) {
    if (trackingContainer) {
      trackingContainer.innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
        <div class="delivery-date" style="color: #c45500; font-weight: bold; margin-top: 20px;">
          Order or product tracking information not found.
        </div>
      `;
    }
    return;
  }

  // Delivery options mapping (matching keys in data/deliveryOptions.js & checkout.js)
  const deliveryDates = {
    tuesday: { text: 'Tuesday, June 21', date: new Date('2026-06-21') },
    wednesday: { text: 'Wednesday, June 15', date: new Date('2026-06-15') },
    monday: { text: 'Monday, June 13', date: new Date('2026-06-13') }
  };

  const shippingDayKey = (product.shippingDay || 'tuesday').toLowerCase();
  const deliveryInfo = deliveryDates[shippingDayKey] || deliveryDates['tuesday'];

  // Parse the order placed date and calculate elapsed/total time for the progress bar
  const orderDate = new Date(order.orderTime);
  const deliveryDate = deliveryInfo.date;
  const currentDate = new Date();

  const totalTime = deliveryDate - orderDate;
  const elapsedTime = currentDate - orderDate;

  let percent = 0;
  if (totalTime > 0) {
    percent = Math.min(100, Math.max(0, (elapsedTime / totalTime) * 100));
  } else {
    percent = 15; // Fallback if dates are invalid
  }

  // Determine which class should be highlighted as current status
  let preparingClass = '';
  let shippedClass = '';
  let deliveredClass = '';

  if (percent < 50) {
    preparingClass = 'current-status';
  } else if (percent < 100) {
    shippedClass = 'current-status';
  } else {
    deliveredClass = 'current-status';
  }

  if (trackingContainer) {
    trackingContainer.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryInfo.text}
      </div>

      <div class="product-info">
        ${product.productName}
      </div>

      <div class="product-info">
        Quantity: ${product.productQuantity}
      </div>

      <img class="product-image" src="${product.productImage}">

      <div class="progress-labels-container">
        <div class="progress-label ${preparingClass}">
          Preparing
        </div>
        <div class="progress-label ${shippedClass}">
          Shipped
        </div>
        <div class="progress-label ${deliveredClass}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percent}%;"></div>
      </div>
    `;
  }
}

renderTrackingPage();