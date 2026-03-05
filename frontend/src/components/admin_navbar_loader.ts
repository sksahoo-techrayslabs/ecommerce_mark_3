fetch("/frontend/src/components/admin_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {
        const navbar = document.getElementById("adminnavbar") as HTMLElement | null;

        if (navbar) {
            navbar.innerHTML = data;
        }
    })
    .catch((error: Error) => {
        console.error("Error loading admin navbar:", error);
    });