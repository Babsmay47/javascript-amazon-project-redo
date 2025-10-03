import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  document.querySelector('.js-cart-quan').innerHTML = `${calculateCartQuantity()} items`;
}