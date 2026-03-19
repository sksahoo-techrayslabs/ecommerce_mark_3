fetch("/frontend/src/components/customer_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {

        const navbar = document.getElementById("customernavbar") as HTMLElement | null;

        if (!navbar) return;

        // Insert navbar HTML
        navbar.innerHTML = data;

        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const userInfo = document.getElementById("userinfo");

        if (userInfo && user.name) {
            userInfo.textContent = `👤 ${user.name}`;//  (${user.id}
        }


        // const logoutBtn = document.getElementById("logoutbtn") as HTMLButtonElement | null;

        // if (logoutBtn) {
        //     logoutBtn.addEventListener("click", () => {

        //         localStorage.removeItem("currentUser");

        //         // alert("Logged out successfully");
                

        //         // window.location.href = "/frontend/index.html";

        //     });
        // }

    })
    .catch((error: Error) => {
        console.error("Error loading customer navbar:", error);
    });