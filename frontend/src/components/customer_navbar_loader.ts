
fetch("/frontend/src/components/customer_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {

        const navbar = document.getElementById("customernavbar") as HTMLElement | null;

        if (!navbar) return;

        navbar.innerHTML = data;

        /*user details */

        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const userInfo = document.getElementById("userInfo");

        if (userInfo && user.name) {
            userInfo.textContent = `👤 ${user.name} (${user.id})`;
        }

    })
    .catch((error: Error) => {
        console.error("Error loading customer navbar:", error);
    });