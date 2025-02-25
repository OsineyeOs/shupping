document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderOrderSummary() {
    const summaryContainer = document.getElementById('order-summary-items');
    const orderTotalEl = document.getElementById('order-total');
    summaryContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'summary-item';
      itemDiv.innerHTML = `<strong>${item.name}</strong> (x${item.quantity}) - $${itemTotal.toFixed(2)}`;
      summaryContainer.appendChild(itemDiv);
    });
    orderTotalEl.textContent = '$' + total.toFixed(2);
  }

  renderOrderSummary();

  const checkoutForm = document.getElementById('checkout-form');
  checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Additional form validation and payment processing can be added here.
    // For example, if BNPL is selected, further instructions or approval might be required.
    // For now, we simulate success by clearing the cart and redirecting.

    localStorage.removeItem('cart');
    window.location.href = 'order-confirmation.html';
  });
});
