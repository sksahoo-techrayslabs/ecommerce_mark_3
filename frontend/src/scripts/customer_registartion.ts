// User interface
interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

// Get form
const form = document.getElementById("customersignupform") as HTMLFormElement;

form.addEventListener("submit", function (e: Event): void {
    e.preventDefault();

    // Get input values
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value.trim();

    // 1️⃣ Required field validation
    if (!name || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }

    // 2️⃣ Name validation
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        return;
    }

    // 3️⃣ Email validation
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // 4️⃣ Password validation
    const passwordPattern: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Password must contain:\n" +
            "- At least 1 uppercase letter\n" +
            "- At least 1 lowercase letter\n" +
            "- At least 1 special character\n" +
            "- Minimum 6 characters"
        );
        return;
    }

    // 5️⃣ Password match check
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get users from localStorage
    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // 6️⃣ Duplicate email check
    const exists: boolean = users.some((user: User) => user.email === email);

    if (exists) {
        alert("Email already registered!");
        return;
    }

    // Create new user
    const newUser: User = {
        name: name,
        email: email,
        password: password,
        role: "customer"
    };

    users.push(newUser);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Customer account created successfully!");

    // Redirect to login page
    window.location.href = "customer_login.html";
});