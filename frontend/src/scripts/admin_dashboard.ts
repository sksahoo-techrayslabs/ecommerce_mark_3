import { checkRole } from "../../dist/authorization/authorization.js";

checkRole("admin");

/* INTERFACES */
interface Product {
    pid: string;
    name: string;
    price: number;
    stock: number;
}

interface Order {
    id: string;
    userId: string;
    total: number;
}

interface User {
    id: string | number;
    name: string;
    role: string;
}


/* MAIN */
document.addEventListener("DOMContentLoaded", () => {

    /* LOAD DATA */
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    /* ensure admin exists (for count) */
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (currentUser && currentUser.role === "admin") {
        const exists = users.find(u => String(u.id) === String(currentUser.id));

        if (!exists) {
            users.push(currentUser);
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    /* GET ALL ORDERS */
    let totalOrders = 0;
    let totalRevenue = 0;

    users.forEach(user => {

        const userOrders: Order[] =
            JSON.parse(localStorage.getItem("orders_" + user.id) || "[]");

        totalOrders += userOrders.length;

        userOrders.forEach(order => {
            totalRevenue += order.total;
        });

    });

    /* FILTER USERS */
    const admins = users.filter(u => u.role === "admin");
    const customers = users.filter(u => u.role === "customer");


    /* UPDATE CARDS */
    setText("totalproducts", products.length);
    setText("totalorders", totalOrders);
    setText("totalusers", users.length);
    setText("totaladmins", admins.length);
    setText("totalcustomers", customers.length);
    setText("totalrevenue", "₹" + totalRevenue);

});


/* HELPER FUNCTION */
function setText(id: string, value: any) {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toString();
}