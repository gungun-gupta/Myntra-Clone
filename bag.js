// This script handles the bag (cart) page functionality

document.addEventListener('DOMContentLoaded', () => {
  const bag = JSON.parse(localStorage.getItem('bag')) || [];
  const bagItemsContainer = document.querySelector('.bag-items');
  const subtotalElem = document.getElementById('subtotal');
  const taxElem = document.getElementById('tax');
  const totalElem = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Update bag count in navbar badge
  updateBagCount();

  if (bag.length === 0) {
    bagItemsContainer.innerHTML = `<p class="empty-bag-msg">Your bag is empty.</p>`;
    checkoutBtn.disabled = true;
    return;
  }

  bagItemsContainer.innerHTML = '';

  // Display each item
  bag.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('bag-item');
    itemDiv.style.borderBottom = '1px solid #ddd';
    itemDiv.style.padding = '15px 0';
    itemDiv.style.display = 'flex';
    itemDiv.style.justifyContent = 'space-between';
    itemDiv.style.alignItems = 'center';

    itemDiv.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity || 1}</p>
      </div>
      <div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    bagItemsContainer.appendChild(itemDiv);
  });

  // Calculate totals
  let subtotal = bag.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  let tax = +(subtotal * 0.1).toFixed(2);
  let total = +(subtotal + tax).toFixed(2);

  subtotalElem.textContent = subtotal.toFixed(2);
  taxElem.textContent = tax.toFixed(2);
  totalElem.textContent = total.toFixed(2);

  checkoutBtn.disabled = false;

  // Remove item from bag
  bagItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const idToRemove = e.target.getAttribute('data-id');
      const updatedBag = bag.filter(item => item.id !== idToRemove);
      localStorage.setItem('bag', JSON.stringify(updatedBag));
      location.reload();
    }
  });
});

// Function to update bag count badge in navbar
function updateBagCount() {
  const bag = JSON.parse(localStorage.getItem('bag')) || [];
  const count = bag.reduce((total, item) => total + (item.quantity || 1), 0);
  const bagCountElem = document.getElementById('bag-count');

  if (bagCountElem) {
    bagCountElem.textContent = count;
    bagCountElem.style.display = count > 0 ? 'inline-block' : 'none';
  }
}
