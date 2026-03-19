interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
declare const Swal: any;

function getCurrentUser(): User | null {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
}

function redirectToLogin(): void {
    window.location.href = "/frontend/index.html";
}

export function checkRole(requiredRole: string): void {
    const user = getCurrentUser();

    if (!user) {
        Swal.fire({
            icon: "error",
            title: "Please login first!!",

        }).then(() => {
            redirectToLogin();
        });

        return;
    }

    if (user.role !== requiredRole) {
        Swal.fire({
            icon: "error",
            title: "Access denied",

        }).then(() => {
            redirectToLogin()
        });

    }
}


export function logout(): void {
    localStorage.removeItem("currentUser");
    Swal.fire({
        icon: "error",
        title: "Logged out successfully",

    }).then(() => {
        redirectToLogin();
    });

}


document.addEventListener("click", (event) => {
     const target = event.target as HTMLElement;
    if (target.id === "logoutbtn") {
        logout();
    }
});

