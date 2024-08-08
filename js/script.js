document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch dynamic content
    function fetchDynamicContent() {
        console.log('Dynamic content fetching logic goes here.');
    }

    fetchDynamicContent();

    // Shopping cart functionality
    const cart = [];
    const cartContainer = document.getElementById('cart-container');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');
    const cartCounter = document.getElementById('cart-counter');
    const checkoutModal = document.getElementById('checkout-modal');
    const modalClose = document.getElementById('modal-close');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');

    function addToCart(item) {
        cart.push(item);
        displayCart();
        updateCartCounter();
    }

    function displayCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.textContent = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price);
        });
        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
    }

    function updateCartCounter() {
        cartCounter.textContent = cart.length;
    }

    // Event listener for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            const item = {
                name: this.dataset.name,
                price: this.dataset.price
            };
            addToCart(item);
        });
    });

    // Show the cart dialog
    cartButton.addEventListener('click', function() {
        cartContainer.style.display = 'block';
    });

    // Hide the cart dialog
    closeCartButton.addEventListener('click', function() {
        cartContainer.style.display = 'none';
    });

    // Handle checkout button click
    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            checkoutModal.style.display = 'block'; // Show the modal
        } else {
            alert('Your cart is empty.');
        }
    });

    // Handle modal close
    modalClose.addEventListener('click', function() {
        checkoutModal.style.display = 'none';
    });

    // Handle modal confirm
    modalConfirm.addEventListener('click', function() {
        alert('Proceeding to checkout');
        cart.length = 0; // Clear cart after checkout
        displayCart(); // Update cart display
        updateCartCounter(); // Update cart counter
        checkoutModal.style.display = 'none'; // Hide modal
        cartContainer.style.display = 'none'; // Hide cart dialog
    });

    // Handle modal cancel
    modalCancel.addEventListener('click', function() {
        checkoutModal.style.display = 'none'; // Hide modal
    });
});
