import { checkRole } from "../../src/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;
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
  userId: string;   //  this idn will be used to get customer id that will be shown in admin dashboard
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


const user = JSON.parse(localStorage.getItem("currentUser") || "null");
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
  cart.forEach(item => total += item.price * item.quantity);
  return total;
}

function renderPaymentFields(method: string): void {

  if (!paymentDetails) return;

  paymentDetails.innerHTML = "";

  if (method === "UPI") {
    paymentDetails.innerHTML = `
      <div>
        <label class="block mb-1">UPI ID</label>
        <input type="text" id="upi"
          placeholder="example@upi"
          class="w-full border p-2 rounded">
      </div>
    `;
  }

  if (method === "CARD") {
    paymentDetails.innerHTML = `
      <div class="space-y-2">
        <input type="text" id="card"
          placeholder="Card Number"
          class="w-full border p-2 rounded">
        <input type="password" id="cvv"
          placeholder="CVV"
          class="w-full border p-2 rounded">
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
    const upi = (document.getElementById("upi") as HTMLInputElement)?.value.trim();

    if (!upi) {
      Swal.fire({ icon: "error", title: "Enter UPI ID" });
      return false;
    }
  }

  if (method === "CARD") {
    const card = (document.getElementById("card") as HTMLInputElement)?.value.trim();
    const cvv = (document.getElementById("cvv") as HTMLInputElement)?.value.trim();

    if (!card || card.length < 12) {
      Swal.fire({ icon: "error", title: "Enter valid card number" });
      return false;
    }

    if (!cvv || cvv.length !== 3) {
      Swal.fire({ icon: "error", title: "Enter valid CVV" });
      return false;
    }
  }

  return true;
}
function placeOrder(method: string): void {

  let orders: Order[] = JSON.parse(localStorage.getItem(orderKey) || "[]");

  const newOrder: Order = {
    userId: user.id,
    date: new Date().toISOString(),
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

  cart.forEach(item => {
    const product = products.find(p => p.pid === item.pid);
    if (product) product.stock -= item.quantity;
  });

  localStorage.setItem("products", JSON.stringify(products));

  // clearing the cartkey after successful payment
  localStorage.removeItem(cartKey);
  localStorage.removeItem("checkoutInfo");

  Swal.fire({
    icon: "success",
    title: "Order placed successfully!"
  }).then(() => {
    window.location.href = "customer_order.html";
  });
}


//submit button
if (paymentForm) {
  paymentForm.addEventListener("submit", (e: Event) => {

    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({ icon: "error", title: "Cart is empty" });
      return;
    }

    if (!paymentMethod || paymentMethod.value === "") {
      Swal.fire({ icon: "error", title: "Select payment method" });
      return;
    }

    const method = paymentMethod.value;

    if (!validatePayment(method)) return;

    placeOrder(method);
  });
}