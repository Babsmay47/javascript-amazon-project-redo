import { calculateCartQuantity } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}



async function loadPage() {
  await loadProductsFetch();

  renderOrdersGrid();
}

loadPage();


console.log(orders);

function renderOrdersGrid() {
  let ordersHTML = '';

  orders.forEach(order => {
    const orderId = order.id;
    const products = order.products;
    const totalPriceCents = order.totalCostCents;
    const dateString = displayDate(order.orderTime);

    ordersHTML += `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${dateString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalPriceCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${renderOrderDetails(products, orderId)}
        </div>
          
      </div>
    `;

    
  });

  function updateCartQuantity() {
    document.querySelector('.js-cart-quantity').innerHTML = `${calculateCartQuantity()}`;
  }

  updateCartQuantity();

  document.querySelector('.js-order-grid').innerHTML = ordersHTML;
}

function renderOrderDetails(products, orderId) {
  let html = '';

  products.forEach(product => {
    const productId = product.productId;
    const matchingProduct = getProduct(productId);
    const quantity = product.quantity;
    const estimatedDeliveryDate = displayDate(product.estimatedDeliveryTime);

    html += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${estimatedDeliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${orderId}&productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  });

  return html;
}


function displayDate(dateISO) {
  const date = dayjs(dateISO);
  let dateString = date.format('MMMM D');
  return dateString;
}