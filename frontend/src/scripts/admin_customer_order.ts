import { checkRole } from "../../src/authorization/authorization.js";
checkRole("admin");
interface Order {
    userId: string;
    items: any[];
    total: number;
    paymentMethod: string;
    date: string;
    status: string;
    address: string;
    phone: string;
}
interface User {
    id: string | number;
    name: string;
}

document.addEventListener("DOMContentLoaded", () => {

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    let allOrders: Order[] = [];

    // collecting all orders from all users
    users.forEach(user => {
        const orders = JSON.parse(localStorage.getItem("orders_" + user.id) || "[]");
        allOrders = [...allOrders, ...orders];
    });

    //sort descending
    allOrders.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const table = document.getElementById("ordersTable") as HTMLElement | null;
    if (!table) return;

    if (allOrders.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="11" class="text-center p-4">No orders found</td>
        </tr>
        `;
        return;
    }

    let rows = "";

    allOrders.forEach(order => {

        //finding user
        let user = users.find(u => String(u.id) === String(order.userId));

        if (!user) {
            user = {
                id: order.userId || "N/A",
                name: "Guest User"
            };
        }

        const totalQty = order.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        const productNames = order.items.map((item: any) => item.name).join(", ");

        const statusColor = order.status === "Paid" ? "text-green-600" : "text-red-600";

        rows += `
        <tr>
            <td class="p-3">${user.id}</td>
            <td class="p-3">${user.name}</td>
            <td class="p-3">${new Date(order.date).toLocaleString()}</td>
            <td class="p-3">${productNames}</td>
            <td class="p-3">${order.items.length}</td>
            <td class="p-3">${totalQty}</td>
            <td class="p-3">₹${order.total}</td>
            <td class="p-3">${order.paymentMethod}</td>
            <td class="p-3 ${statusColor} font-semibold">${order.status}</td>
            <td class="p-3">${order.address}</td>
            <td class="p-3">${order.phone}</td>
        </tr>
        `;
    });

    table.innerHTML = rows;

});