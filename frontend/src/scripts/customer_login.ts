interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

import { hashPassword } from "../../dist/utils/password_hashing.js";

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("customerloginform") as HTMLFormElement | null;
  const emailInput = document.getElementById("email") as HTMLInputElement | null;
  const passwordInput = document.getElementById("password") as HTMLInputElement | null;

  if (!loginForm || !emailInput || !passwordInput) return;



  loginForm.addEventListener("submit",async (e: Event) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
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
      alert("Invalid customer email or password");
      return;
    }



    localStorage.setItem("currentUser", JSON.stringify(customer));

    window.location.href = "customer_products.html";

  });

});