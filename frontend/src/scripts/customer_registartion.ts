
declare const Swal: any;
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

import { hashPassword } from "../../src/utils/password_hashing.js";

// declaring and getting form
const form = document.getElementById("customersignupform") as HTMLFormElement;

if (!form) throw new Error("Form not found");

form.addEventListener("submit", async function (e: Event): Promise<void> {

    e.preventDefault();

    //these are the  inputs that i am taking
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;

    //these are the  values that i am taking and trimming it
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // validating forms 
    if (!name || !email || !password || !confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "All fields are required",
        });
        return;
    }

    // regex for name
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    if (!namePattern.test(name)) {
        Swal.fire({
            icon: "error",
            title: "Invalid name",
            text: "Only letters allowed, no leading space"
        });
        return;
    }

    //regex for email
    const emailPattern = /^(?!.*\s)[A-Za-z][A-Za-z0-9]{2,}@[A-Za-z]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid email",
            text: "Must start with letter, min 3 chars before @, no spaces"
        });
        return;
    }

    // regex for password
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Weak password",
            text: "Min 8 chars, include upper, lower, number, special char"
        });
        return;
    }

    //confirming the old password with new one
    if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Passwords do not match"
        });
        return;
    }

    //getting the users
    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Duplicate email check
    const exists = users.some((user: User) => user.email === email);

    if (exists) {
        Swal.fire({
            icon: "warning",
            title: "Email already registered"
        });
        return;
    }

    // encrypting/ hashing my password
    const hashedPassword = await hashPassword(password);

    // new user gets created with the required credentials
    
    const newUser: User = {
        id: "user_" + Date.now(), // here user is getting an user id
        name,
        email,
        password: hashedPassword,
        role: "customer"
    };

    users.push(newUser);

    // saving in the localStorage
    localStorage.setItem("users", JSON.stringify(users));

    //success message
    Swal.fire({
        icon: "success",
        title: "Account created successfully!",
    }).then(() => {
        window.location.href = "customer_login.html";
    });

});