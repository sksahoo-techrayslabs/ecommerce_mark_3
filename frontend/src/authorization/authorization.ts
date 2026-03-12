interface User {
id: number;
name: string;
email: string;
role: string;
}

 export function checkRole(requiredRole: string): void {

const user: User | null = JSON.parse(localStorage.getItem("currentUser") || "null");

if (!user) {
alert("Please login first");
window.location.href = "/frontend/index.html";
return;
}

if (user.role !== requiredRole) {
alert("Access denied");
window.location.href = "/frontend/index.html";
}

}

export function logout(): void{
    localStorage.removeItem("currentUser");
    alert("logged out successfully");
    window.location.href="/frontend/index.html";
}

