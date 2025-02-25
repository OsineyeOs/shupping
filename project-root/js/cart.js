document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCartStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const updateCartCount = () => {
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountEl.textContent = totalCount;
    }
  };

  updateCartCount();

  // Common function to add a product to the cart
  function addProduct(productName, productPrice) {
    const product = { name: productName, price: productPrice, quantity: 1 };
    const existingIndex = cart.findIndex(item => item.name === productName);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(product);
    }
    updateCartStorage();
    updateCartCount();
  }

  // "Add to Cart" functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.getAttribute('data-product');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      addProduct(productName, productPrice);
      alert(`${productName} has been added to your cart.`);
    });
  });

  // "Buy Now" functionality: add product then redirect to checkout
  const buyNowButtons = document.querySelectorAll('.buy-now');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.getAttribute('data-product');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      addProduct(productName, productPrice);
      window.location.href = 'checkout.html';
    });
  });

  // Render cart items if on the cart page
  const cartItemsContainer = document.getElementById('cart-items');
  if (cartItemsContainer) {
    const renderCart = () => {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${itemTotal.toFixed(2)}</p>
          </div>
          <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      const cartTotalEl = document.getElementById('cart-total');
      if (cartTotalEl) {
        cartTotalEl.textContent = '$' + total.toFixed(2);
      }
    };

    renderCart();

    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCartStorage();
        renderCart();
        updateCartCount();
      }
    });

    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
      clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCartStorage();
        renderCart();
        updateCartCount();
      });
    }
  }
});
