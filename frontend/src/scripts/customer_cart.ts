import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

interface CartItem {
  pid: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const cartTable = document.getElementById("cartTable") as HTMLElement | null;
const grandTotalElement = document.getElementById("grandTotal") as HTMLElement | null;
const placeOrderBtn = document.getElementById("placeOrderBtn") as HTMLButtonElement | null;



const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

if (!user || !user.id) {
  alert("Please login first");
  window.location.href = "customer_login.html";
}

const cartKey = "cart_" + user.id;



let cart: CartItem[] = JSON.parse(localStorage.getItem(cartKey) || "[]");



function showCart(): void {

  if (!cartTable || !grandTotalElement) return;

  cartTable.innerHTML = "";
  let grandTotal = 0;

  if (cart.length === 0) {

    cartTable.innerHTML = `
      <tr>
        <td colspan="6" class="p-4 text-center">
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

        <td>
         <img src="${item.image}"
          class="w-full h-40 object-cover rounded mb-3">
        </td>

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

  localStorage.setItem(cartKey, JSON.stringify(cart));
}



function updateQuantity(index: number, newQty: string): void {

  const quantity = parseInt(newQty);
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const product = products.find((p: any) => p.pid === cart[index]!.pid);

  if (product && quantity > product.stock) {
    alert("Exceeds available stock");
    return;
  }

  if (isNaN(quantity) || quantity < 1) {
    alert("Invalid quantity");
    return;
  }

  cart[index]!.quantity = quantity;

  showCart();
}


function removeItem(index: number): void {

  cart.splice(index, 1);

  localStorage.setItem(cartKey, JSON.stringify(cart));

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


(window as any).updateQuantity = updateQuantity;
(window as any).removeItem = removeItem;


showCart();