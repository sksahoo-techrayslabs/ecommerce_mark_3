// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
// }

// export function checkRole(requiredRole: string): void {

//     const user: User = JSON.parse(localStorage.getItem("currentUser") || "null");

//     if (!user) {
//         alert("Please login first");
//         window.location.href = "/frontend/index.html";
//         return;
//     }

//     if (user.role !== requiredRole) {
//         alert("Access denied");
//         window.location.href = "/frontend/index.html";
//     }

// }

// export function logout(): void {
//     localStorage.removeItem("currentUser");
//     alert("logged out successfully");
//     window.location.href = "/frontend/index.html";
// }

// (window as any).logout = logout;



// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
// }

// function getCurrentUser(): User | null {
//     const storedUser = localStorage.getItem("currentUser");
//     return storedUser ? JSON.parse(storedUser) : null;
// }

// function redirectToLogin(): void {
//     window.location.href = "/frontend/index.html";
// }

// export function checkRole(requiredRole: string): void {
//     const user = getCurrentUser();

//     if (!user) {
//         alert("Please login first");
//         redirectToLogin();
//         return;
//     }

//     if (user.role !== requiredRole) {
//         alert("Access denied");
//         redirectToLogin();
//     }
// }

// export function logout(): void {
//     localStorage.removeItem("currentUser");
//     alert("Logged out successfully");
//     redirectToLogin();
// }

// (window as any).logout = logout;
// export function logout(): void {
//     localStorage.removeItem("currentUser");
//     alert("Logged out successfully");
//     window.location.href = "/frontend/index.html";
// }

// const logoutBtn = document.getElementById("logoutbtn");

// if (logoutBtn) {
//     logoutBtn.addEventListener("click", logout);
// }


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