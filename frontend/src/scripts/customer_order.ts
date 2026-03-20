import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("customer");

declare const Swal: any;
interface OrderItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}
interface Order {
    userId: string;
    date: string;
    items: OrderItem[];
    name: string;
    address: string;
    phone: string;
    total: number;
    status: string;
}
const user = JSON.parse(localStorage.getItem("currentUser") || "null");
const orderKey = "orders_" + user.id;
const container = document.getElementById("ordersContainer") as HTMLElement | null;

let orders: Order[] = JSON.parse(localStorage.getItem(orderKey) || "[]");

function renderOrderItems(items: OrderItem[]): string {

    let html = "";

    items.forEach(item => {
        html += `
        <div class="flex justify-between">
            <span>${item.name} × ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>
        `;
    });

    return html;
}

function showOrders(): void {

    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
        <div class="bg-white p-6 rounded shadow text-center text-gray-500">
            No orders placed yet.
        </div>
        `;
        return;
    }

    orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let html = "";

    orders.forEach(order => {

        html += `
        <div class="bg-white p-6 rounded-xl shadow space-y-2">

            <p class="text-sm text-gray-600">Date: ${new Date(order.date).toLocaleString()}
            </p>

            <div class="border-t pt-2">
                ${renderOrderItems(order.items)}
            </div>

            <div class="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>₹${order.total}</span>
            </div>

            <p class="text-sm text-gray-600">
                Status: ${order.status || "Pending"}
            </p>

        </div>
        `;
    });

    container.innerHTML = html;
}
showOrders();