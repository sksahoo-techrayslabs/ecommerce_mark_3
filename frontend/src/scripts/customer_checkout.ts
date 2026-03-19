import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;
interface CartItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}



const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

if (!user || !user.id) {
    // alert("Please login first");
    // window.location.href = "customer_login.html";
    Swal.fire({
        icon: "error",
        title: "Please login first",

    }).then(() => {

        window.location.href = "customer_login.html";

    })
}

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

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = "<p>Cart is empty</p>";
        totalElement.textContent = "0";

        return;
    }

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        checkoutItems.innerHTML += `
        <div class="flex justify-between mb-2">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        </div>
        `;
    });

    totalElement.textContent = calculateTotal().toString();
}

if (form) {

    form.addEventListener("submit", (e: Event) => {

        e.preventDefault();

        if (cart.length === 0) {
            // alert("Cart is empty!");
            Swal.fire({
                icon: "error",
                title: "Cart is empty!",

            })
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
            // alert("All fields are required");
             Swal.fire({
                icon: "error",
                title: "All fields are required",
            })
            return;
        }

        if (phone.length !== 10) {
            // alert("Enter valid phone number");
            Swal.fire({
                icon: "error",
                title: "Enter valid phone number",
            })

            return;
        }

        const checkoutInfo = {
            name,
            address,
            phone
        };

        localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));

        window.location.href = "customer_payment.html";

    });

}



showCheckout();