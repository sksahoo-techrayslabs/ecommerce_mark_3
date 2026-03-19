import { checkRole } from "../../dist/authorization/authorization.js";

checkRole("admin");

interface Order {
    userId: string;
    items: any[];
    total: number;
    paymentMethod: string;
    date: string;
}

interface User {
    id: string | number;
    name: string;
}

document.addEventListener("DOMContentLoaded", () => {

    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    let allOrders: Order[] = [];

    users.forEach(user => {
        const orders = JSON.parse(localStorage.getItem("orders_" + user.id) || "[]");
        allOrders = [...allOrders, ...orders];
    });

    const table = document.getElementById("ordersTable");

    if (!table) return;

    if (allOrders.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="8" class="text-center p-4">No orders found</td>
        </tr>
        `;
        return;
    }

    allOrders.forEach(order => {

        /* 🔥 FIX: ensure user exists */
        let user = users.find(u => String(u.id) === String(order.userId));

        if (!user) {
            user = {
                id: order.userId,
                name: "Guest User"
            };
        }

        /* total quantity */
        const totalQty = order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

        /* product names */
        const productNames = order.items.map((item: any) => item.name).join(", ");

        table.innerHTML += `
        <tr>
            <td class="p-3">${user.id}</td>
            <td class="p-3">${user.name}</td>
            <td class="p-3">${order.date}</td>
            <td class="px-4">${productNames}</td>
            <td class="p-3">${order.items.length}</td>
            <td class="p-3">${totalQty}</td>
            <td class="p-3">₹${order.total}</td>
            <td class="p-3">${order.paymentMethod}</td>
        </tr>
        `;
    });

});