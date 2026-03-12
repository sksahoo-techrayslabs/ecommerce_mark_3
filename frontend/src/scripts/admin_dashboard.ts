

import { checkRole } from "../../dist/authorization/authorization.js";

checkRole("admin");

interface Product {
    pid: string;
    category: string;
    name: string;
    price: number;
    stock: number;
}

interface Order {
    id: string;
    userId: string;
    items: any[];
}

interface User {
    id: string;
    name: string;
    role: string;
}

// Get data from localStorage
let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
let orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

// Filter admins and customers
let admins: User[] = users.filter((user: User) => user.role === "admin");
let customers: User[] = users.filter((user: User) => user.role === "customer");

// Update dashboard values
(document.getElementById("totalproducts") as HTMLElement).textContent = products.length.toString();

(document.getElementById("totalorders") as HTMLElement).textContent = orders.length.toString();

(document.getElementById("totalusers") as HTMLElement).textContent = users.length.toString();

(document.getElementById("totaladmins") as HTMLElement).textContent = admins.length.toString();

(document.getElementById("totalcustomer") as HTMLElement).textContent = customers.length.toString();