let cart = [];

function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    renderCart();
}

function updateQuantity(itemName, newQuantity) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity = newQuantity;
    }
    renderCart();
}

function renderCart() {
    const orderItems = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    orderItems.innerHTML = ''; // Clear current items
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        orderItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>BDT ${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                </td>
                <td>BDT ${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
            </tr>
        `;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderSummary = "Your order:\n\n";
    cart.forEach(item => {
        orderSummary += `${item.name} (x${item.quantity}) - BDT ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    orderSummary += `\nTotal: BDT ${document.getElementById('totalPrice').innerText}`;
    alert(orderSummary);
    cart = []; // Clear cart after checkout
    renderCart();
}
