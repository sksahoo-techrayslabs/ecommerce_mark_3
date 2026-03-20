import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;
interface Product {
    pid: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;

}

interface CartItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
    image: string;

}

const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

const cartKey = "cart_" + user.id;

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

const searchInput = document.getElementById("searchProduct") as HTMLInputElement | null;

let container: HTMLElement | null = null;

document.addEventListener("DOMContentLoaded", () => {

    container = document.getElementById("productContainer");

    showProducts();

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const query = searchInput.value.toLowerCase();

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );

            showProducts(filteredProducts);

        });

    }

});


function showProducts(list: Product[] = products): void {

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No products available</p>";
        return;
    }

    list.forEach((product, index) => {

        container!.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow text-center item-center">

            <img src="${product.image}"
                 class="w-full h-40 object-contain rounded mb-3">

            <h2 class="text-lg font-bold mb-2">
                ${product.name}
            </h2>

            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <p>Stock: ${product.stock}</p>

            <div class="flex items-center mt-3 space-x-2 justify-center">
                <label>Qty:</label>

                <input type="number"
                       id="qty_${product.pid}"
                       value="1"
                       min="1"
                       max="${product.stock}"
                       class="w-16 border rounded px-2 py-1">
            </div>

            <button onclick="addToCart('${product.pid}')"
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
            </button>

        </div>
        `

    });

}

function addToCart(pid: string): void {

    //finding product using pid 
    const product = products.find(p => p.pid === pid);
    if (!product) return;

    // 🔹 using pid quantity is fetched
    const qtyInput = document.getElementById("qty_" + pid) as HTMLInputElement | null;
    if (!qtyInput) return;

    const quantity = parseInt(qtyInput.value);

    //validation
    if (isNaN(quantity) || quantity < 1 || quantity > product.stock) {
        Swal.fire({
            icon: "error",
            title: "Invalid quantity",
        });
        return;
    }

    //geting cart details from localStorage
    let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");

    //checking if item already exists or not
    const existingItem = cart.find(item => item.pid === product.pid);

    if (existingItem) {

        //prevent exceeding stock
        if (existingItem.quantity + quantity > product.stock) {
            Swal.fire({
                icon: "error",
                title: "Exceeds stock limit"
            });
            return;
        }

        existingItem.quantity += quantity;

    } else {

        const item: CartItem = {
            pid: product.pid,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        };

        cart.push(item);
    }

    //saving updated cart in localstorage
    localStorage.setItem(cartKey, JSON.stringify(cart));

    //success message
    Swal.fire({
        icon: "success",
        title: "Added to cart!",
    });
}


(window as any).addToCart = addToCart;