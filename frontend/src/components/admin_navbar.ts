import { logout } from "../authorization/authorization.js";

const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement | null;

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    logout();

  });

}