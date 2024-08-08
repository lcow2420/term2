document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display products
    function fetchDynamicContent() {
        fetch('js/products.json')
            .then(response => response.json())
            .then(products => {
                const productGrid = document.getElementById('product-grid');
                productGrid.innerHTML = ''; // Clear existing content

                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    productItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-button" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                    `;

                    productGrid.appendChild(productItem);
                });

                // Reattach event listeners to dynamically added buttons
                document.querySelectorAll('.add-to-cart-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const item = {
                            name: this.dataset.name,
                            price: this.dataset.price
                        };
                        addToCart(item);
                    });
                });
            })
            .catch(error => console.error('Error fetching products:', error));
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
