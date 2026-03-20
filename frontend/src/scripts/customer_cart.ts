import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;
interface CartItem {
  pid: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

//getting elements
const cartTable = document.getElementById("cartTable") as HTMLElement | null;
const grandTotalElement = document.getElementById("grandTotal") as HTMLElement | null;
const placeOrderBtn = document.getElementById("placeOrderBtn") as HTMLButtonElement | null;

//this is the  user data
const user = JSON.parse(localStorage.getItem("currentUser") || "null");
const cartKey = "cart_" + user.id;

//this is the  cart data
let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");


// showing the data of cart
function showCart(): void {

  if (!cartTable || !grandTotalElement) return;

  if (cart.length === 0) {
    cartTable.innerHTML = `
      <tr>
        <td colspan="6" class="p-4 text-center text-gray-500">
          Cart is empty
        </td>
      </tr>
    `;
    grandTotalElement.textContent = "0";
    return;
  }

  let html = "";
  let grandTotal = 0;

  cart.forEach(item => {

    const total = item.price * item.quantity;
    grandTotal += total;

    html += `
      <tr class="border-b">

        <td class="p-2">${item.name}</td>

        <td class="p-2">
          <img src="${item.image}"
               class="w-18 h-18 object-contain mx-auto ml-3">
        </td>

        <td class="p-2">₹${item.price}</td>

        <td class="p-2">
          <input
            type="number"
            value="${item.quantity}"
            min="1"
            class="border rounded px-2 w-16"
            onchange="updateQuantity('${item.pid}', this.value)">
        </td>

        <td class="p-2 font-semibold">₹${total}</td>

        <td class="p-2">
          <button
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onclick="removeItem('${item.pid}')">
            Delete
          </button>
        </td>

      </tr>
    `;
  });

  cartTable.innerHTML = html;
  grandTotalElement.textContent = grandTotal.toString();
}


// quantity is getting updated here
function updateQuantity(pid: string, newQty: string): void {

  const quantity = parseInt(newQty);

  if (isNaN(quantity) || quantity < 1) {
    Swal.fire({
      icon: "error",
      title: "Invalid quantity"
    });
    return;
  }

  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const product = products.find((p: any) => p.pid === pid);

  if (product && quantity > product.stock) {
    Swal.fire({
      icon: "error",
      title: "Exceeds available stock"
    });
    return;
  }

  const item = cart.find(i => i.pid === pid);
  if (!item) return;

  item.quantity = quantity;

  localStorage.setItem(cartKey, JSON.stringify(cart));
  showCart();
}


//removing item with this logic
function removeItem(pid: string): void {

  cart = cart.filter(item => item.pid !== pid);

  localStorage.setItem(cartKey, JSON.stringify(cart));
  showCart();
}


// finally placing order
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {

    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Cart is empty!"
      });
      return;
    }

    window.location.href = "customer_checkout.html";
  });
}


// these are the functions that will work to update or remove
(window as any).updateQuantity = updateQuantity;
(window as any).removeItem = removeItem;
// showing cart
showCart();