import { checkRole } from "../../dist/authorization/authorization.js";

checkRole("admin");

interface Product {
    pid: string;
    category: string;
    name: string;
    price: number;
    stock: number;
}

interface OrderItem {
    pid: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    paymentMethod: string;
    date: string;
}

interface User {
    id: string;
    name: string;
    role: string;
}

/* LOAD DATA */

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

/* GET ALL ORDERS FROM ALL USERS */

let allOrders: Order[] = [];

users.forEach(user => {

    const userOrders: Order[] =
        JSON.parse(localStorage.getItem("orders_" + user.id) || "[]");

    allOrders = allOrders.concat(userOrders);

});

/* FILTER USERS */

let admins: User[] = users.filter(user => user.role === "admin");
let customers: User[] = users.filter(user => user.role === "customer");

/* DASHBOARD TOTALS */

(document.getElementById("totalproducts") as HTMLElement).textContent =
    products.length.toString();

(document.getElementById("totalorders") as HTMLElement).textContent =
    allOrders.length.toString();

(document.getElementById("totalusers") as HTMLElement).textContent =
    users.length.toString();

(document.getElementById("totaladmins") as HTMLElement).textContent =
    admins.length.toString();

(document.getElementById("totalcustomers") as HTMLElement).textContent =
    customers.length.toString();

/* TOTAL REVENUE */

let revenue = 0;

allOrders.forEach(order => {
    revenue += order.total;
});

(document.getElementById("totalrevenue") as HTMLElement).textContent =
    "₹" + revenue;


/* LOW STOCK PRODUCTS */

const lowStock = products.filter(p => p.stock <= 5);

if (lowStock.length > 0) {
    console.log("Low stock products:", lowStock);
}


/* RECENT ORDERS */

const recentOrdersTable = document.getElementById("recentOrders");

if (recentOrdersTable) {

    const recentOrders = allOrders.slice(-5).reverse();

    recentOrders.forEach(order => {

        recentOrdersTable.innerHTML += `
        <tr>
            <td class="p-3">${order.userId}</td>
            <td class="p-3">${order.items.length} items</td>
            <td class="p-3">₹${order.total}</td>
            <td class="p-3">${order.paymentMethod}</td>
            <td class="p-3">${order.date}</td>
        </tr>
        `;

    });

}