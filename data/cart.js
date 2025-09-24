export const cart = [];


export function addToCart(productId) {
  let macthingItem;

  const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantityElement.value);

  cart.forEach(cartItem => {
    if(productId === cartItem.productId){
      macthingItem = cartItem;
    }
  });

  if(macthingItem) {
    macthingItem.quantity += quantity;
  } else {
      cart.push({
      productId,
      quantity
    });
  }
}

