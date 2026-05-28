export const cart = JSON.parse(localStorage.getItem('Cart')) || []

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
        
        localStorage.setItem('Cart', JSON.stringify(cart));
        console.log(cart);
}

export function updateCartQuantity() {
    let total_cartquantity = 0
        cart.forEach(c => {
            total_cartquantity += c.productQuantity
        })
    
    return total_cartquantity
}

export function showAddedNotif(productID) {
    const message = document.querySelector(`.js-added-to-cart-${productID}`)
        if(message) {
            setTimeout(() => {
                message.style.opacity = 1
            }, 500)
            message.style.opacity = 0
        } 
}