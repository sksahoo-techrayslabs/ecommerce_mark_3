fetch("/frontend/src/components/footer.html")
    .then((response: Response) => response.text())
    .then((data: string) => {
        const navbar = document.getElementById("footer") as HTMLElement | null;

        if (navbar) {
            navbar.innerHTML = data;
        }
    })
    .catch((error: Error) => {
        console.error("Error loading admin navbar:", error);
    });