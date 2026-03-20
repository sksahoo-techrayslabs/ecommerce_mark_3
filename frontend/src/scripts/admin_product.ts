import { checkRole } from "../../src/authorization/authorization.js";
checkRole("admin");

declare const Swal:any;

interface Product {
    pid: string;
    category: string;
    name: string;
    price: number;
    stock: number;
    image: string;
}

const form = document.getElementById("productform") as HTMLFormElement;
const table = document.getElementById("producttable") as HTMLTableElement;

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

const searchInput = document.getElementById("searchProduct") as HTMLInputElement | null;

let editIndex: number = -1;


//----------------------------- 
// converting image to base64 so that it can be stored as a string 

function convertToBase64(file: File): Promise<string> {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result as string);

        reader.onerror = error => reject(error);

    });

}


// --------------------------------------
//  showing products
function showProducts(list: Product[] = products): void {

    table.innerHTML = "";

    for (let i = 0; i < list.length; i++) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="p-3">${list[i]!.pid}</td>

            <td class="p-3">
                <img src="${list[i]!.image}" class="w-14 h-14 object-cover rounded">
            </td>

            <td class="p-3">${list[i]!.category}</td>

            <td class="p-3">${list[i]!.name}</td>

            <td class="p-3">₹${list[i]!.price}</td>

            <td class="p-3">${list[i]!.stock}</td>

            <td class="p-3">
                <button class="px-3 py-1 bg-blue-500 text-white rounded edit-btn">Edit</button>
                <button class="px-3 py-1 bg-red-500 text-white rounded delete-btn">Delete</button>
            </td>
        `;

        const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
        const deleteButton = row.querySelector(".delete-btn") as HTMLButtonElement;

        editButton.addEventListener("click", () => editProduct(i));
        deleteButton.addEventListener("click", () => deleteProduct(i));

        table.appendChild(row);
    }

    localStorage.setItem("products", JSON.stringify(products));

}


// -------------------------------------
// adding data
form.addEventListener("submit", async (e: Event) => {

    e.preventDefault();

    const pid = (document.getElementById("pid") as HTMLInputElement).value.trim();
    const category = (document.getElementById("category") as HTMLInputElement).value.trim();
    const name = (document.getElementById("productname") as HTMLInputElement).value.trim();
    const priceValue = (document.getElementById("price") as HTMLInputElement).value.trim();
    const stockValue = (document.getElementById("stock") as HTMLInputElement).value.trim();

    const imageInput = document.getElementById("image") as HTMLInputElement;

    const file = imageInput.files?.[0];

    let imageBase64 = "";

    if (file) {
        imageBase64 = await convertToBase64(file);
    }

    if (!pid || !category || !name || !priceValue || !stockValue) {
        Swal.fire({
        icon:"error",
        title:"All fields are required!",
       })
        return;
    }

    const price = parseFloat(priceValue);
    const stock = parseInt(stockValue);

    if (isNaN(price) || price < 0) {
        Swal.fire({
        icon:"error",
        title:"Price must be positive",
       })
        return;
    }

    if (isNaN(stock) || stock < 0) {
        Swal.fire({
        icon:"error",
        title:"Stock must be positive",
       })
        return;
    }

    const action = editIndex === -1 ? "add" : "update";

    if (!confirm(`Are you sure you want to ${action} this product?`)) { // this is alert
        return;
    }

    const product: Product = {
        pid,
        category,
        name,
        price,
        stock,
        image: imageBase64
    };

    if (editIndex === -1) {

        products.push(product);

    } else {

        products[editIndex] = product;
        editIndex = -1;

    }

    form.reset();

    showProducts();

});


// -------------------------------------- 
// deleting product

function deleteProduct(index: number): void {

    if (!confirm("Are you sure you want to delete this product?")) return;

    products.splice(index, 1);

    showProducts();

}


// -----------------------------------
// editing product  

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


//  --------------------------------
// searching product
if (searchInput) {

    searchInput.addEventListener("input", () => {

        const query = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        showProducts(filteredProducts);

    });

}


// loading data

showProducts();