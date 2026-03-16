

import { checkRole } from "../../dist/authorization/authorization.js";

checkRole("customer");

interface Product {
    pid: string;
    name: string;
    category: string;
    price: number;
    stock: number;
}

interface CartItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}


const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

if (!user || !user.id) {
    alert("Please login first");
    window.location.href = "customer_login.html";
}

const cartKey = "cart_" + user.id;


const container = document.getElementById("productContainer") as HTMLElement | null;


let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");


function showProducts(): void {

    if (!container) return;

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products available</p>";
        return;
    }

    products.forEach((product, index) => {

        container.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow">

            <h2 class="text-lg font-bold mb-2">
                ${product.name}
            </h2>

            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${product.stock}</p>

            <div class="flex items-center mt-3 space-x-2">
                <label>Qty:</label>

                <input type="number"
                       id="qty_${index}"
                       value="1"
                       min="1"
                       max="${product.stock}"
                       class="w-16 border rounded px-2 py-1">
            </div>

            <button onclick="addToCart(${index})"
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
            </button>

        </div>
        `;
    });
}

function addToCart(index: number): void {

    const qtyInput = document.getElementById("qty_" + index) as HTMLInputElement | null;

    if (!qtyInput) return;

    const quantity = parseInt(qtyInput.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Invalid quantity");
        return;
    }

    const product = products[index];

    let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const existingItem = cart.find(item => item.pid === product.pid);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {

        const item: CartItem = {
            pid: product!.pid,
            name: product!.name,
            price: product!.price,
            quantity: quantity
        };

        cart.push(item);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert("Added to cart!");
}

/* -------- MAKE FUNCTION GLOBAL -------- */

(window as any).addToCart = addToCart;

/* -------- INITIAL LOAD -------- */

showProducts();