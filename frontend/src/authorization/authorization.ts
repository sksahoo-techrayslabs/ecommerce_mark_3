interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

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
        alert("Please login first");
        redirectToLogin();
        return;
    }

    if (user.role !== requiredRole) {
        alert("Access denied");
        redirectToLogin();
    }
}

export function logout(): void {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    redirectToLogin();
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target && target.id === "logoutbtn") {
        logout();
    }
});