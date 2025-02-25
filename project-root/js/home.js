document.addEventListener('DOMContentLoaded', function() {
  // Function to create a product card with both "Add to Cart" and "Buy Now" buttons
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <div class="action-buttons">
        <button class="add-to-cart" data-product="${product.title}" data-price="${product.price}">
          Add to Cart
        </button>
        <button class="buy-now" data-product="${product.title}" data-price="${product.price}">
          Buy Now
        </button>
      </div>
    `;
    return card;
  }

  // Use product arrays from js/products.js
  const flashDeals = products.deals;
  const trendingProducts = products.trending;

  // Populate Flash Deals section
  const flashDealsGrid = document.querySelector('.flash-deals .products-grid');
  if (flashDealsGrid) {
    flashDeals.forEach(product => {
      flashDealsGrid.appendChild(createProductCard(product));
    });
  }

  // Populate Trending Products section
  const trendingGrid = document.querySelector('.trending-products .products-grid');
  if (trendingGrid) {
    trendingProducts.forEach(product => {
      trendingGrid.appendChild(createProductCard(product));
    });
  }

  // Note: Event listeners for both "add-to-cart" and "buy-now" buttons are managed in js/cart.js.
});
