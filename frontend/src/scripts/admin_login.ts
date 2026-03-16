interface Admin {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

import { hashPassword } from "../../dist/utils/password_hashing.js";

const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener("submit", async function (e: Event) {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const encoded_password = await hashPassword(password);

    // hardcoding admin details
    const admin_email: string = "admin@gmail.com";
    const admin_password: string = "1234567890";
    //  password hashing
    const hashedPassword = await hashPassword(admin_password);


    if (email !== admin_email || encoded_password !== hashedPassword) {
        alert("Admin crededentials are wrong !!");
        return;
    }


    const admin: Admin = {
        id: 1,
        name: "admin1",
        email: admin_email,
        password: hashedPassword,
        role: "admin"
    };

    localStorage.setItem("currentUser", JSON.stringify(admin));

    window.location.href = "admin_product.html";
});