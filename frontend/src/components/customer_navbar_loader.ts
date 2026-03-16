fetch("/frontend/src/components/customer_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {

        const navbar = document.getElementById("customernavbar") as HTMLElement | null;

        if (!navbar) return;

        navbar.innerHTML = data;

        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const username = document.getElementById("userinfo");

        if (username && user.name) {
            username.textContent = `Hi!!__CUSTOMER__${user.name}`;
        }
//  (${user.id})
    })
    .catch((error: Error) => {
        console.error("Error loading customer navbar:", error);
    });