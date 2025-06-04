import { products } from "./state.js";
import { addProductButton, productNameInput} from "./dom.js";
import { renderProduct } from "./render.js";
import { addProduct, getNewProduct } from "./handlers.js";


// --- Events ---
addProductButton.addEventListener('click', addProduct);
productNameInput.addEventListener('keypress', (event) => {
    if(event.key == 'Enter') {
        event.preventDefault();
        addProduct();
    }

    });


// --- Init ---
productNameInput.focus();

for (const productName of ['Помідори', 'Печиво', 'Сир']) {
    const product = getNewProduct(productName);
    products.push(product);
    renderProduct(product);
}