import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;

interface CartItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}


const user = JSON.parse(localStorage.getItem("currentUser") || "null");
const cartKey = "cart_" + user.id;
const checkoutItems = document.getElementById("checkoutItems") as HTMLElement | null;
const totalElement = document.getElementById("grandTotal") as HTMLElement | null;
const form = document.getElementById("checkoutForm") as HTMLFormElement | null;


let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");


function calculateTotal(): number {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}



function showCheckout(): void {

    if (!checkoutItems || !totalElement) return;

    if (cart.length === 0) {
        checkoutItems.innerHTML = "<p class='text-center text-gray-500'>Cart is empty</p>";
        totalElement.textContent = "0";
        return;
    }

    let html = "";

    cart.forEach(item => {
        html += `
        <div class="flex justify-between mb-2">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
        `;
    });

    checkoutItems.innerHTML = html;
    totalElement.textContent = calculateTotal().toString();
}


if (form) {

    form.addEventListener("submit", (e: Event) => {

        e.preventDefault();

        if (cart.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Cart is empty!"
            });
            return;
        }

        const nameInput = document.getElementById("fullname") as HTMLInputElement | null;
        const addressInput = document.getElementById("address") as HTMLInputElement | null;
        const phoneInput = document.getElementById("phone") as HTMLInputElement | null;

        if (!nameInput || !addressInput || !phoneInput) return;

        const name = nameInput.value.trim();
        const address = addressInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !address || !phone) {
            Swal.fire({
                icon: "error",
                title: "All fields are required"
            });
            return;
        }

        // phone number validation
        if (!/^[6-9]\d{9}$/.test(phone)) {
            Swal.fire({
                icon: "error",
                title: "Enter valid phone number"
            });
            return;
        }

        // saving data
        const checkoutInfo = {
            name,
            address,
            phone
        };

        localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));

        // redirect
        window.location.href = "customer_payment.html";
    });

}


// init
showCheckout();