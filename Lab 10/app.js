document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://fakestoreapi.com/products'; // URL de la API de Fake Store
    const productsContainer = document.getElementById('products'); // Contenedor donde se mostrarán los productos
    const categorySelect = document.getElementById('categorySelect'); // Selector de categoría
    const searchInput = document.getElementById('searchInput'); // Campo de búsqueda de productos
    const cartContainer = document.querySelector('#lista-carrito tbody'); // Contenedor del carrito
    const totalAmount = document.getElementById('total'); // Total del carrito
    const emptyCartButton = document.getElementById('vaciar-carrito'); // Botón de vaciar carrito
    const notificationContainer = document.getElementById('notification-container'); // Contenedor de notificaciones

    let cart = [];

    // Fetch products and categories (Obtener productos y categorías)
    axios.get(API_URL)
        .then(response => {
            const products = response.data; // Guardar los datos de los productos en una variable
            displayProducts(products); // Mostrar los productos en la página
            populateCategories(products); // Poblar el selector de categorías con las categorías obtenidas
        })
        .catch(error => console.error(error)); // Manejar cualquier error que ocurra al obtener los datos

    // Function to display products (Función para mostrar productos)
    function displayProducts(products) {
        productsContainer.innerHTML = ''; // Limpiar el contenedor de productos antes de añadir nuevos
        products.forEach(product => { // Iterar sobre cada producto
            // Crear la tarjeta de producto con Bootstrap
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <a href="product.html?id=${product.id}" class="stretched-link">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        </a>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price}</strong></p>
                            <button class="btn add-to-cart mt-auto" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productCard); // Añadir la tarjeta de producto al contenedor
        });

        // Añadir event listener para los botones de agregar al carrito
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Function to add products to cart (Función para agregar productos al carrito)
    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        axios.get(`${API_URL}/${productId}`)
            .then(response => {
                const product = response.data;
                addItemToCart(product);
                showNotification('Product added to cart'); // Mostrar notificación
            })
            .catch(error => console.error(error));
    }

    // Add item to cart array and update UI (Agregar producto al array del carrito y actualizar la UI)
    function addItemToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        renderCart();
    }

    // Render cart items (Mostrar los productos del carrito)
    function renderCart() {
        cartContainer.innerHTML = '';
        cart.forEach(product => {
            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td><img src="${product.image}" width="50"></td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-id="${product.id}">X</button></td>
            `;
            cartContainer.appendChild(cartRow);
        });

        // Add event listener to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });

        updateTotal();
    }

    // Remove item from cart (Eliminar producto del carrito)
    function removeItemFromCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        cart = cart.filter(product => product.id != productId);
        renderCart();
    }

    // Update total amount (Actualizar el total del carrito)
    function updateTotal() {
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Empty cart (Vaciar el carrito)
    emptyCartButton.addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    // Function to populate categories (Función para poblar categorías)
    function populateCategories(products) {
        // Obtener una lista de categorías únicas de los productos
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => { // Iterar sobre cada categoría
            const option = document.createElement('option'); // Crear un nuevo elemento <option>
            option.value = category; // Establecer el valor de la opción como la categoría
            option.textContent = category; // Establecer el texto de la opción como la categoría
            categorySelect.appendChild(option); // Añadir la opción al selector de categorías
        });
    }

    // Event listener to filter products by category (Filtrar productos por categoría)
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value; // Obtener la categoría seleccionada
        axios.get(API_URL)
            .then(response => {
                const products = response.data; // Obtener los productos
                // Filtrar los productos por la categoría seleccionada o mostrar todos si se selecciona 'all'
                const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
                displayProducts(filteredProducts); // Mostrar los productos filtrados
            })
            .catch(error => console.error(error)); // Manejar cualquier error que ocurra al obtener los datos
    });

    // Event listener to search products (Buscar productos)
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase(); // Obtener el término de búsqueda y convertirlo a minúsculas
        axios.get(API_URL)
            .then(response => {
                const products = response.data; // Obtener los productos
                // Filtrar los productos cuyo título incluya el término de búsqueda
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts); // Mostrar los productos filtrados
            })
            .catch(error => console.error(error)); // Manejar cualquier error que ocurra al obtener los datos
    });

    // Function to show notification (Función para mostrar notificación)
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        notificationContainer.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
});
