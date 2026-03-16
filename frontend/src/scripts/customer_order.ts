import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

interface OrderItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    date: string;
    items: OrderItem[];
    name: string;
    address: string;
    phone: string;
    total?: number;
    status?: string;
}

const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

if (!user || !user.id) {
    alert("Please login first");
    window.location.href = "customer_login.html";
}

const orderKey = "orders_" + user.id;

const container = document.getElementById("ordersContainer") as HTMLElement | null;

const orders: Order[] = JSON.parse(localStorage.getItem(orderKey) || "[]");

function calculateOrderTotal(items: OrderItem[]): number {

    let total = 0;

    items.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
}


function renderOrderItems(items: OrderItem[]): string {

    let html = "";
    let total = 0;

    items.forEach(item => {

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
        <div class="flex justify-between">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        </div>
        `;
    });

    return `
    <div class="border-t pt-3 space-y-2">
        ${html}
    </div>

    <div class="border-t mt-3 pt-3 flex justify-between font-bold">
        <span>Total</span>
        <span>₹${total}</span>
    </div>
    `;
}
function showOrders(): void {

    if (!container) return;

    container.innerHTML = "";

    if (orders.length === 0) {

        container.innerHTML = `
        <div class="bg-white p-6 rounded shadow text-center">
            No orders placed yet.
        </div>
        `;

        return;
    }

    orders.forEach((order, index) => {

        const orderHTML = `
        <div class="bg-white p-6 rounded-xl shadow">

            <h2 class="text-lg font-bold mb-2">
                Order ID: ${index + 1}
            </h2>

            <p class="mb-2">Date: ${order.date}</p>

            ${renderOrderItems(order.items)}

            <p class="mt-2 text-sm text-gray-600">
                Status: ${order.status || "Pending"}
            </p>

        </div>
        `;

        container.innerHTML += orderHTML;
    });
}


showOrders();