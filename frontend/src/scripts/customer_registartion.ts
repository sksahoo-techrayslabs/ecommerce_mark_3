// User interface
declare const Swal: any;
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

import { hashPassword } from "../../dist/utils/password_hashing.js";

// Get form
const form = document.getElementById("customersignupform") as HTMLFormElement;

form.addEventListener("submit", async function (e: Event): Promise<void> {

    e.preventDefault();

    // Get input elements
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;

    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    //  Required field validation
    if (!name || !email || !password || !confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "All fields are required",
            text: "Enter all data"
        })
        // alert("All fields are required!");
        return;
    }

    //  Name validation
    if (name.length < 3) {
        Swal.fire({
            icon: "error",
            title: "Name must be at least 3 characters long.",

        })
        // alert("Name must be at least 3 characters long.");
        return;
    }

    // Email validation
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Please enter a valid email address.",

        })
        // alert("Please enter a valid email address.");
        return;
    }

    //  Password validation
    const passwordPattern: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if (!passwordPattern.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Please enter correct password.",
            text: "Password must contain:\n" +
                "- At least 1 uppercase letter\n" +
                "- At least 1 lowercase letter\n" +
                "- At least 1 special character\n" +
                "- Minimum 6 characters"

        })
        // alert(
        //     "Password must contain:\n" +
        //     "- At least 1 uppercase letter\n" +
        //     "- At least 1 lowercase letter\n" +
        //     "- At least 1 special character\n" +
        //     "- Minimum 6 characters"
        // );
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Passwords do not match!",

        })
        // alert("Passwords do not match!");
        return;
    }

    // Get users from localStorage
    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Duplicate email check
    const exists: boolean = users.some((user: User) => user.email === email);

    if (exists) {
        Swal.fire({
            icon: "warning",
            title: "Email already registered!",

        })
        // alert("Email already registered!");
        return;
    }

    //  password hashing
    const hashedPassword = await hashPassword(password);

    // Creating new user
    const newUser: User = {
        id: "user_" + Date.now(),
        name: name,
        email: email,
        password: hashedPassword,
        role: "customer"
    };


    users.push(newUser);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // alert("Customer account created successfully!");
    Swal.fire({
            icon: "success",
            title: "Customer account created successfully!",

        }).then(()=> {
         window.location.href = "customer_login.html";
       });

    // Redirect to login page
    window.location.href = "customer_login.html";
});