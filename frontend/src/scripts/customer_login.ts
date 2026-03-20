declare const Swal: any;
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}


import { hashPassword } from "../../dist/utils/password_hashing.js";

document.addEventListener("DOMContentLoaded", () => {

  // this is for checking user is already logged in or on if yes then it will redirect it to customer product page
  const existingUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (existingUser && existingUser.role === "customer") {
    window.location.href = "customer_products.html";
  }


  const loginForm = document.getElementById("customerloginform") as HTMLFormElement | null;
  const emailInput = document.getElementById("email") as HTMLInputElement | null;
  const passwordInput = document.getElementById("password") as HTMLInputElement | null;

  if (!loginForm || !emailInput || !passwordInput)
    return;



  loginForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Email and Password are required!!",
      })
      return;
    }

    const emailPattern = /^(?!.*\s)[A-Za-z][A-Za-z0-9]{2,}@[A-Za-z]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Please enter a valid email!!",
      })
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password must be at least 6 characters!!",
      })
      return;
    }
    const hashedPassword = await hashPassword(password);

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const customer = users.find((user: User) =>
      user.email === email &&
      user.password === hashedPassword &&
      user.role === "customer"
    );

    if (!customer) {
      Swal.fire({
        icon: "error",
        title: "Invalid customer email or password!!",
      })
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(customer));

    Swal.fire({
      icon: "success",
      title: "successgul login",

    }).then(() => {
      window.location.href = "customer_products.html";
    });
  });
});