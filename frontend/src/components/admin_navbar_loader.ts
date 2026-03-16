fetch("/frontend/src/components/admin_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {

        const navbar = document.getElementById("adminnavbar") as HTMLElement | null;

        if (!navbar) return;

        navbar.innerHTML = data;
        
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        
        const adminname = document.getElementById("admininfo");

        if (adminname && user.name) {
            adminname.textContent = `Hi!!__ADMIN__${user.name}`;
        }
//  (${user.id})
    })
    .catch((error: Error) => {
        console.error("Error loading admin navbar:", error);
    });