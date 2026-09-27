// ==================== CART ====================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==================== CART COUNT ====================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
}


// ==================== ADD TO CART ====================

function addToCart(name, price) {

    let product = cart.find(function(item) {
        return item.name === name;
    });

    if (product) {

        product.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " has been added to your cart!");

}


// ==================== DISPLAY CART ====================

function displayCart() {

    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.textContent = "Total: ₹0";

        return;
    }

    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <p>Item Total: ₹${itemTotal}</p>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    cartTotal.textContent = "Total: ₹" + total;

}


// ==================== INCREASE ====================

function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ==================== DECREASE ====================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ==================== REMOVE ====================

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    displayCart();

}


// ==================== SEARCH ====================

function searchProducts() {

    let searchBox =
        document.getElementById("searchProducts");

    if (!searchBox) {
        return;
    }

    let search =
        searchBox.value.toLowerCase();

    let products =
        document.querySelectorAll(".gallery-item");

    products.forEach(function(product) {

        if (
            product.textContent
                .toLowerCase()
                .includes(search)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ==================== FILTER ====================

function filterProducts(category) {

    let products =
        document.querySelectorAll(".gallery-item");

    products.forEach(function(product) {

        let productCategory =
            product.getAttribute("data-category");

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ==================== LOAD CART ====================

displayCart();

updateCartCount();

// ==================== WHATSAPP ORDER ====================

function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const nameElement = document.getElementById("customerName");
    const phoneElement = document.getElementById("customerPhone");
    const addressElement = document.getElementById("customerAddress");

    if (!nameElement || !phoneElement || !addressElement) {
        alert("Customer details fields are missing.");
        return;
    }

    const name = nameElement.value.trim();
    const phone = phoneElement.value.trim();
    const address = addressElement.value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please fill in all customer details.");
        return;
    }

    let message = "NEW ORDER - RK ENTERPRISES\n\n";

    message += "CUSTOMER DETAILS\n";
    message += "Name: " + name + "\n";
    message += "Phone: " + phone + "\n";
    message += "Delivery Address: " + address + "\n\n";

    message += "ORDER DETAILS\n";

    let total = 0;

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        message +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";

        total += itemTotal;
    });

    message += "\nTOTAL: ₹" + total;

    const whatsappNumber = "917876138676";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}