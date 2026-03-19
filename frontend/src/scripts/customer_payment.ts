import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");
declare const Swal:any;
interface CartItem {
  pid: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutInfo {
  name: string;
  address: string;
  phone: string;
}

interface Order {
  date: string;
  items: CartItem[];
  name: string;
  address: string;
  phone: string;
  paymentMethod: string;
  total: number;
  status: string;
}

interface Product {
  pid: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}


const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

if (!user || !user.id) {
    Swal.fire({
        icon:"error",
        title:"Please login first!!",
       
       })
    // alert("Please login first");
    window.location.href = "customer_login.html";
}

const cartKey = "cart_" + user.id;
const orderKey = "orders_" + user.id;


const paymentForm = document.getElementById("paymentForm") as HTMLFormElement | null;
const paymentMethod = document.getElementById("paymentMethod") as HTMLSelectElement | null;
const paymentDetails = document.getElementById("paymentDetails") as HTMLElement | null;


let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");
let checkoutInfo: CheckoutInfo = JSON.parse(localStorage.getItem("checkoutInfo") || "{}");
let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

function calculateTotal(): number {

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}


function renderPaymentFields(method: string): void {

  if (!paymentDetails) return;

  paymentDetails.innerHTML = "";

  if (method === "UPI") {

    paymentDetails.innerHTML = `
        <div>
            <label class="block mb-1">UPI ID</label>
            <input
            type="text"
            id="upi"
            placeholder="example@upi"
            class="w-full border p-2 rounded">
        </div>
        `;
  }

  if (method === "CARD") {

    paymentDetails.innerHTML = `
        <div class="space-y-2">

            <div>
                <label class="block mb-1">Card Number</label>
                <input
                type="text"
                id="card"
                placeholder="1234 5678 9012 3456"
                class="w-full border p-2 rounded">
            </div>

            <div>
                <label class="block mb-1">CVV</label>
                <input
                type="password"
                id="cvv"
                placeholder="123"
                class="w-full border p-2 rounded">
            </div>

        </div>
        `;
  }

}

if (paymentMethod) {

  paymentMethod.addEventListener("change", () => {
    renderPaymentFields(paymentMethod.value);
  });

}

function validatePayment(method: string): boolean {

  if (method === "UPI") {

    const upiInput = document.getElementById("upi") as HTMLInputElement | null;

    if (!upiInput || upiInput.value.trim() === "") {
      alert("Enter UPI ID");
      return false;
    }
  }

  if (method === "CARD") {

    const cardInput = document.getElementById("card") as HTMLInputElement | null;
    const cvvInput = document.getElementById("cvv") as HTMLInputElement | null;

    if (!cardInput || cardInput.value.trim().length < 12) {
      alert("Enter valid card number");
      return false;
    }

    if (!cvvInput || cvvInput.value.trim().length !== 3) {
      alert("Enter valid CVV");
      return false;
    }

  }

  return true;
}


function placeOrder(method: string): void {

  let orders: Order[] = JSON.parse(localStorage.getItem(orderKey) || "[]");

  const newOrder: Order = {

    date: new Date().toLocaleString(),

    items: cart,

    name: checkoutInfo.name,
    address: checkoutInfo.address,
    phone: checkoutInfo.phone,

    paymentMethod: method,

    total: calculateTotal(),

    status: method === "COD" ? "Pending" : "Paid"
  };

  orders.push(newOrder);

  localStorage.setItem(orderKey, JSON.stringify(orders)); 


/* reduce stock after successful payment */

cart.forEach(item => {

  const product = products.find(p => p.pid === item.pid);

  if (product) {
    product.stock -= item.quantity;
  }

});

/* save updated stock */
localStorage.setItem("products", JSON.stringify(products));


  /* Clear only this user's cart */
  localStorage.removeItem(cartKey);
  localStorage.removeItem("checkoutInfo");

  alert("Payment successful! Order placed.");

  window.location.href = "customer_order.html";

}

if (paymentForm) {

  paymentForm.addEventListener("submit", (e: Event) => {

    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!paymentMethod || paymentMethod.value === "") {
      alert("Select payment method");
      return;
    }

    const method = paymentMethod.value;

    if (!validatePayment(method)) {
      return;
    }

    placeOrder(method);

  });

}