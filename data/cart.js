export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

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

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart; 
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}