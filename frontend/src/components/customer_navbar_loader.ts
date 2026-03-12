
fetch("/frontend/src/components/customer_navbar.html")
    .then((response: Response) => response.text())
    .then((data: string) => {
        const navbar = document.getElementById("customernavbar") as HTMLElement | null;

        if (navbar) {
            navbar.innerHTML = data;
        }
    })
    .catch((error: Error) => {
        console.error("Error loading admin navbar:", error);
    });


 