export let cart = JSON.parse(localStorage.getItem('Cart')) || []

function saveStorage() {
    localStorage.setItem('Cart', JSON.stringify(cart));
}

export function addToCart(cart_products) {
     // 1. FIX: Use .find() to locate the matching item object inside the cart array
        const matchingItem = cart.find(item => item.productID === cart_products.productID);

        // 2. FIX: Check if we actually found a matching item
        if (matchingItem) {
            // Update the quantity property of THAT SPECIFIC matching item object
            matchingItem.productQuantity += cart_products.productQuantity;
        } else {
            // 3. FIX: Only push a brand-new object if it wasn't found in the cart yet
            cart.push(cart_products)
        }
        saveStorage()
        console.log(cart);
}

export function deleteCart(productId) {
  const newCart = [];
  cart.forEach((item) => {
    if (item.productID !== productId) {
      newCart.push(item);
    }
  });
  cart = newCart;
  saveStorage()
}

export function deleteAllCart() {
   cart = []
   saveStorage()
}

export function updateCartQuantity() {
    let total_cartquantity = 0
        cart.forEach(c => {
            total_cartquantity += c.productQuantity
        })
    return total_cartquantity
}