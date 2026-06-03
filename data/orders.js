const orders = JSON.parse(localStorage.getItem('Orders')) || []

export const placeOrders = (cart) => {
    console.log(cart);
    localStorage.setItem('Orders', JSON.stringify(cart))
}


