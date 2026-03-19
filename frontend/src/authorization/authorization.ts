interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
declare const Swal:any;

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
        // alert("Please login first");
        Swal.fire({
        icon:"error",
        title:"Please login first!!",
       
       })
        redirectToLogin();
        return;
    }

    if (user.role !== requiredRole) {
        Swal.fire({
        icon:"error",
        title:"Access denied",
       
       })
        // alert("Access denied");
        redirectToLogin();
    }
}

export function logout(): void {
    localStorage.removeItem("currentUser");
    Swal.fire({
        icon:"error",
        title:"Logged out successfully",
       
       })
    // alert("Logged out successfully");
    redirectToLogin();
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target && target.id === "logoutbtn") {
        logout();
    }
});