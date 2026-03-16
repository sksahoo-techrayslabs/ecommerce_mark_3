
import { checkRole } from "../authorization/authorization.js";

checkRole("customer");
interface CartItem {
pid: string;
name: string;
price: number;
quantity: number;
}

const cartTable = document.getElementById("cartTable") as HTMLElement | null;
const grandTotalElement = document.getElementById("grandTotal") as HTMLElement | null;
const placeOrderBtn = document.getElementById("placeOrderBtn") as HTMLButtonElement | null;

let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

function showCart(): void {

if (!cartTable || !grandTotalElement) return;

cartTable.innerHTML = "";
let grandTotal = 0;

if (cart.length === 0) {

cartTable.innerHTML = `
  <tr>
    <td colspan="5" class="p-4 text-center">
      Cart is empty
    </td>
  </tr>
`;

grandTotalElement.textContent = "0";
return;

}

cart.forEach((item, index) => {

const total = item.price * item.quantity;
grandTotal += total;

cartTable.innerHTML += `
  <tr class="border-b">

    <td class="p-2">${item.name}</td>

    <td class="p-2">₹${item.price}</td>

    <td class="p-2">
      <input
        type="number"
        value="${item.quantity}"
        min="1"
        class="border rounded px-2 w-16"
        onchange="updateQuantity(${index}, this.value)">
    </td>

    <td class="p-2 font-semibold">₹${total}</td>

    <td class="p-2">
      <button
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onclick="removeItem(${index})">
        Delete
      </button>
    </td>

  </tr>
`;

});

grandTotalElement.textContent = grandTotal.toString();

localStorage.setItem("cart", JSON.stringify(cart));

}

function updateQuantity(index: number, newQty: string): void {

const quantity = parseInt(newQty);

if (isNaN(quantity) || quantity < 1) {
alert("Invalid quantity");
return;
}

cart[index]!.quantity = quantity;

showCart();
}

function removeItem(index: number): void {

cart.splice(index, 1);

localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

if (placeOrderBtn) {

placeOrderBtn.addEventListener("click", () => {

if (cart.length === 0) {
  alert("Cart is empty!");
  return;
}

window.location.href = "customer_checkout.html";

});

}

// expose functions to HTML
(window as any).updateQuantity = updateQuantity;
(window as any).removeItem = removeItem;

showCart();