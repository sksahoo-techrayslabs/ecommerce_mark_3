

// -------------1st code 

// Define Product interface
// interface Product {
//     pid: string;
//     category: string;
//     name: string;
//     price: number;
//     stock: number;
// }

// Get DOM elements
// const form = document.getElementById("productform") as HTMLFormElement;
// const table = document.getElementById("producttable") as HTMLTableElement;

// Edit product
// function editProduct(index: number): void {
//     const p = products[index];

//     (document.getElementById("pid") as HTMLInputElement).value = p.pid;
//     (document.getElementById("category") as HTMLInputElement).value = p.category;
//     (document.getElementById("productname") as HTMLInputElement).value = p.name;
//     (document.getElementById("price") as HTMLInputElement).value = p.price.toString();
//     (document.getElementById("stock") as HTMLInputElement).value = p.stock.toString();

//     editIndex = index;
// }

// Initial render
// showProducts();

// Initialize products array and editIndex
// let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
// let editIndex: number = -1;

// Function to show products in the table
// function showProducts(): void {
//     table.innerHTML = "";

//     for (let i = 0; i < products.length; i++) {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td class="p-3">${products[i].pid}</td>
//             <td class="p-3">${products[i].category}</td>
//             <td class="p-3">${products[i].name}</td>
//             <td class="p-3">₹${products[i].price}</td>
//             <td class="p-3">${products[i].stock}</td>
//             <td class="p-3">
//                 <button class="px-3 py-1 bg-blue-500 text-white rounded edit-btn">
//                     Edit
//                 </button>
//                 <button class="px-3 py-1 bg-red-500 text-white rounded delete-btn">
//                     Delete
//                 </button>
//             </td>
//         `;

// Add event listeners for edit and delete buttons
//     const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
//     const deleteButton = row.querySelector(".delete-btn") as HTMLButtonElement;

//     editButton.addEventListener("click", () => editProduct(i));
//     deleteButton.addEventListener("click", () => deleteProduct(i));

//     table.appendChild(row);
// }

// Save products to localStorage
// localStorage.setItem("products", JSON.stringify(products));
// }

// Form submit event
// form.addEventListener("submit", (e: Event) => {
//     e.preventDefault();

// Get input values
//     const pid = (document.getElementById("pid") as HTMLInputElement).value;
//     const category = (document.getElementById("category") as HTMLInputElement).value;
//     const name = (document.getElementById("productname") as HTMLInputElement).value;
//     const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
//     const stock = parseInt((document.getElementById("stock") as HTMLInputElement).value, 10);

//     const product: Product = { pid, category, name, price, stock };

//     if (editIndex === -1) {
//         products.push(product); // Add new product
//     } else {
//         products[editIndex] = product; // Update existing product
//         editIndex = -1;
//     }

//     form.reset();
//     showProducts();
// });

// Delete product
// function deleteProduct(index: number): void {
//     products.splice(index, 1);
//     showProducts();
// }

// Edit product
// function editProduct(index: number): void {
//     const p = products[index];

//     (document.getElementById("pid") as HTMLInputElement).value = p.pid;
//     (document.getElementById("category") as HTMLInputElement).value = p.category;
//     (document.getElementById("productname") as HTMLInputElement).value = p.name;
//     (document.getElementById("price") as HTMLInputElement).value = p.price.toString();
//     (document.getElementById("stock") as HTMLInputElement).value = p.stock.toString();

//     editIndex = index;
// }

// Initial render
// showProducts();






// ------------------------ 2nd code

// Define Product interface
interface Product {
    pid: string;
    category: string;
    name: string;
    price: number;
    stock: number;
}

// Get DOM elements
const form = document.getElementById("productform") as HTMLFormElement;
const table = document.getElementById("producttable") as HTMLTableElement;

// Initialize products array and editIndex
let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
let editIndex: number = -1;

// Function to show products in the table
function showProducts(): void {
    table.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const row = document.createElement("tr");

        
        row.innerHTML = `
            <td class="p-3">${products[i]!.pid}</td>
            <td class="p-3">${products[i]!.category}</td>
            <td class="p-3">${products[i]!.name}</td>
            <td class="p-3">₹${products[i]!.price}</td>
            <td class="p-3">${products[i]!.stock}</td>
            <td class="p-3">
                <button class="px-3 py-1 bg-blue-500 text-white rounded edit-btn">Edit</button>
                <button class="px-3 py-1 bg-red-500 text-white rounded delete-btn">Delete</button>
            </td>
        `;

        // Add event listeners with confirmation
        const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
        const deleteButton = row.querySelector(".delete-btn") as HTMLButtonElement;

        editButton.addEventListener("click", () => editProduct(i));
        deleteButton.addEventListener("click", () => deleteProduct(i));

        table.appendChild(row);
    }

    localStorage.setItem("products", JSON.stringify(products));
}

// Form submit event
form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    // Get input values
    const pid = (document.getElementById("pid") as HTMLInputElement).value.trim();
    const category = (document.getElementById("category") as HTMLInputElement).value.trim();
    const name = (document.getElementById("productname") as HTMLInputElement).value.trim();
    const priceValue = (document.getElementById("price") as HTMLInputElement).value.trim();
    const stockValue = (document.getElementById("stock") as HTMLInputElement).value.trim();

    // Validation
    if (!pid || !category || !name || !priceValue || !stockValue) {
        alert("All fields are required!");
        return;
    }

    const price = parseFloat(priceValue);
    const stock = parseInt(stockValue, 10);

    if (isNaN(price) || price < 0) {
        alert("Price must be a positive number!");
        return;
    }

    if (isNaN(stock) || stock < 0) {
        alert("Stock must be a positive number!");
        return;
    }

    // Confirmation
    const action = editIndex === -1 ? "add" : "update";
    if (!confirm(`Are you sure you want to ${action} this product?`)) {
        return;
    }

    const product: Product = { pid, category, name, price, stock };

    if (editIndex === -1) {
        products.push(product); // Add new product
    } else {
        products[editIndex] = product; // Update existing
        editIndex = -1;
    }

    form.reset();
    showProducts();
});

// Delete product
function deleteProduct(index: number): void {
    if (!confirm("Are you sure you want to delete this product?")) return;

    products.splice(index, 1);
    showProducts();
}

// Edit product
function editProduct(index: number): void {
    if (!confirm("Are you sure you want to edit this product?")) return;

    const p = products[index];

    (document.getElementById("pid") as HTMLInputElement).value = p!.pid;
    (document.getElementById("category") as HTMLInputElement).value = p!.category;
    (document.getElementById("productname") as HTMLInputElement).value = p!.name;
    (document.getElementById("price") as HTMLInputElement).value = p!.price.toString();
    (document.getElementById("stock") as HTMLInputElement).value = p!.stock.toString();

    editIndex = index;
}

// Initial render
showProducts();