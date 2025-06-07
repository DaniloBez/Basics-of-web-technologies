import { products } from "./state.js";
import { addProductButton, productNameInput} from "./dom.js";
import { renderProduct } from "./render.js";
import { addProduct, loadData } from "./handlers.js";


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

loadData();
for (const product of products) {
    renderProduct(product);
}