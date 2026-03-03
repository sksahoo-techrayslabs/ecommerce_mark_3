const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener("submit", function (e: Event) {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();

    // hardcoding admin details
    const admin_email: string = "admin@gmail.com";
    const admin_password: string = "1234567890";

    if (email !== admin_email || password !== admin_password) {
        alert("not authorized admin");
        return;
    }

    interface Admin {
        id: number;
        name: string;
        email: string;
        role: string;
    }

    const admin: Admin = {
        id: 1,
        name: "admin1",
        email: admin_email,
        role: "admin"
    };

    localStorage.setItem("currentUser", JSON.stringify(admin));

    window.location.href = "#";
});