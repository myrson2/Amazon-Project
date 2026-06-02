# Assignment: Implement the "Place Order" Feature (Local Mock Version)

## Objective
Enable users to finalize their purchase by clicking the "Place your order" button on the checkout page. This involves simulating a backend order process locally, clearing the cart, and redirecting the user to the orders page.

## Tasks

### 1. Mock Order Creation
- Intercept the click event on the "Place your order" button.
- Create a function to simulate a backend response. This function should:
    - Take the current cart data.
    - Generate a unique Order ID and a timestamp (Order Date).
    - Calculate the total cost (including shipping and tax).
    - Return an "Order Object" containing these details.

### 2. Local Data Persistence
- Store the generated "Order Object" in a new `orders` array within `localStorage`.
- Ensure the cart is cleared (emptied) and updated in `localStorage` after the order is "placed."

### 3. Navigation
- Upon successful local "processing," redirect the user from the `checkout.html` page to the `orders.html` page.

### 4. Code Organization
- Consider creating a `data/orders.js` file to handle all order-related logic (saving, loading from localStorage).
- Ensure the "Place your order" button logic is integrated into the existing checkout script (likely `scripts/checkout.js` or `scripts/payment.js`).

---

## Expected Output

### Checkout Page Behavior
- When the "Place your order" button is clicked:
    1. The cart data in `localStorage` is reset to an empty array.
    2. A new entry is added to an `orders` array in `localStorage`.
    3. The browser redirects to `orders.html`.

### Orders Page Preview
- While you won't build the full Orders page in this step, you should be able to check your browser's Developer Tools (Application tab -> Local Storage) and see:
    - `cart` is empty.
    - `orders` contains the detail of the order you just "placed."

---

## Constraints
- **No External APIs:** All logic must run locally within the browser.
- **Realistic Data:** Use the actual product prices and shipping choices from the current checkout session to calculate the order total.
- **Consistency:** Ensure that once an order is placed, the "cart count" in the header updates to 0.
