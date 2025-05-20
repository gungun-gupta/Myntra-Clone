document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.getElementById("wishlist-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Dummy product data (you can replace this with real data or fetch it later)
  const products = {
    1: {
      id: "1",
      name: "Floral Print Fit & Flare Maxi Dress",
      brand: "STYLUM",
      price: "₹756",
      originalPrice: "₹2999",
      discount: "75% OFF",
      rating: "⭐ 4.2 | 2.3k",
      image: "images/maxi dress.jpg"
    },
    2: {
      id: "2",
      name: "Maxi Dress",
      brand: "STYLUM",
      price: "₹756",
      originalPrice: "₹2999",
      discount: "75% OFF",
      rating: "⭐ 4.2 | 2.3k",
      image: "images/p3.jpg"
    },
    3: {
      id: "3",
      name: "Printed Kurti",
      brand: "W for Woman",
      price: "₹899",
      originalPrice: "₹2199",
      discount: "60% OFF",
      rating: "⭐ 4.0 | 1.1k",
      image: "images/p4.jpg"
    },
    4: {
      id: "4",
      name: "Anarkali Kurta",
      brand: "Libas",
      price: "₹999",
      originalPrice: "₹2499",
      discount: "65% OFF",
      rating: "⭐ 4.3 | 3.2k",
      image: "images/p5.jpg"
    },
  };

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>No items in your wishlist 😔. Explore and add your favourites! </p>";
    return;
  }

  wishlist.forEach(id => {
    const product = products[id];
    if (product) {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card position-relative">
          <div class="wishlist-icon position-absolute top-0 end-0 m-2">
            <i class="bi bi-heart-fill text-danger remove-btn" data-id="${product.id}"></i>
          </div>
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h6 class="brand-name">${product.brand}</h6>
            <p class="product-name">${product.name}</p>
            <p class="rating">${product.rating}</p>
            <p class="price">
              ${product.price} <span class="original-price">${product.originalPrice}</span>
              <span class="discount">(${product.discount})</span>
            </p>
            <button class="btn btn-sm btn-success move-to-cart-btn" data-id="${product.id}">Move to Cart</button>
          </div>
        </div>
      `;
      wishlistContainer.appendChild(card);
    }
  });

  // Remove from wishlist
  wishlistContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.dataset.id;
      const updatedWishlist = wishlist.filter(pid => pid !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      location.reload();
    }

    // Move to Cart
    if (e.target.classList.contains("move-to-cart-btn")) {
      const id = e.target.dataset.id;
      const product = products[id];

      // ✅ Get bag from localStorage
      let bag = JSON.parse(localStorage.getItem("bag")) || [];

      // ✅ Check if item already in bag
      const alreadyInBag = bag.some(p => p.id === product.id);
      if (!alreadyInBag) {
        bag.push(product);
        localStorage.setItem("bag", JSON.stringify(bag));
      }

      // ✅ Remove from wishlist
      const updatedWishlist = wishlist.filter(pid => pid !== id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // ✅ Refresh
      location.reload();
    }

  });
});
