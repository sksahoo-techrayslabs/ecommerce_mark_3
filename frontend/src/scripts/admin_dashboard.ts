import { checkRole } from "../../dist/authorization/authorization.js";
checkRole("admin");
interface Product {
    pid: string;
    name: string;
    price: number;
    stock: number;
}
interface User {
    id: string | number;
    name: string;
    role: string;
}
interface Order {
    userId: string;
    total: number;
    status: string;
}
document.addEventListener("DOMContentLoaded", () => {
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    let totalOrders = 0;
    let totalRevenue = 0;
    let paidRevenue = 0;
    let pendingRevenue = 0;

    //Loop through all users to get orders
    users.forEach(user => {

        const userOrders: Order[] =
            JSON.parse(localStorage.getItem("orders_" + user.id) || "[]");

        totalOrders += userOrders.length;

        userOrders.forEach(order => {

            const amount = order.total || 0;

            // total revenue (all orders)
            totalRevenue += amount;

            if (order.status === "Paid") {
                paidRevenue += amount;
            } else {
                pendingRevenue += amount;
            }

        });

    });

    //filtering users on basis of customers and admins
    const admins = users.filter(u => u.role === "admin");
    const customers = users.filter(u => u.role === "customer");

    //updating the ui
    setText("totalproducts", products.length);
    setText("totalorders", totalOrders);

    setText("totalusers", users.length);
    setText("totaladmins", admins.length);
    setText("totalcustomers", customers.length);

    setText("totalrevenue", "₹" + totalRevenue);
    setText("paidrevenue", "₹" + paidRevenue);
    setText("pendingrevenue", "₹" + pendingRevenue);

});

function setText(id: string, value: any) {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toString();
}