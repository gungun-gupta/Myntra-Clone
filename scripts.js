document.addEventListener("DOMContentLoaded", function () {
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");
  const wishlistCount = document.getElementById("wishlist-count");

  // Load saved wishlist
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Pre-fill icons if already in wishlist
  wishlistBtns.forEach(btn => {
    const productId = btn.dataset.id.toString();
    if (wishlist.includes(productId)) {
      btn.classList.remove("bi-heart");
      btn.classList.add("bi-heart-fill", "text-danger");
    }
  });

  // Function to update wishlist count badge
  function updateWishlistCount() {
    if (wishlistCount) {
      wishlistCount.textContent = wishlist.length;
      wishlistCount.style.display = wishlist.length > 0 ? "inline-block" : "none";
    }
  }

  // Function to update bag count badge
  function updateBagCount() {
    const bag = JSON.parse(localStorage.getItem("bag")) || [];
    const bagCountElement = document.getElementById("bag-count");
    if (bagCountElement) {
      bagCountElement.innerText = bag.length;
      bagCountElement.style.display = bag.length > 0 ? "inline-block" : "none";
    }
  }

  // Initial counts load
  updateWishlistCount();
  updateBagCount();

  // Toggle wishlist on click
  wishlistBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id.toString();

      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        btn.classList.remove("bi-heart-fill", "text-danger");
        btn.classList.add("bi-heart");
      } else {
        wishlist.push(productId);
        btn.classList.remove("bi-heart");
        btn.classList.add("bi-heart-fill", "text-danger");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
    });
  });

  // Handle Add to Bag directly
  const addToBagButtons = document.querySelectorAll(".add-to-cart");

  addToBagButtons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      const product = { id, name, price };

      let bag = JSON.parse(localStorage.getItem("bag")) || [];

      const alreadyInBag = bag.some(item => item.id === id);
      if (!alreadyInBag) {
        bag.push(product);
        localStorage.setItem("bag", JSON.stringify(bag));
      }

      updateBagCount();
    });
  });

});
