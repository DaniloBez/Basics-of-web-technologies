import { productNameInput } from "./dom.js";
import { products } from "./state.js";
import { Product } from "./model.js";
import { renderProduct } from "./render.js";
import { listOfProducts } from "./dom.js";

/**
 * Створює новий товар з базовими значеннями.
 * @param {string} name - Назва товару.
 * @returns {Product} Новий товар.
 */
export function getNewProduct(name){
    return new Product(name, 1, false);
}

/**
 * Обробляє додавання товару з інпуту.
 */
export function addProduct(){
    const productName = productNameInput.value.trim();

    if (!productName) {
        alert("Введіть ім'я продукта!");
        return;
    }

    const product = getNewProduct(productName);
    products.push(product);
    renderProduct(product);

    productNameInput.value = '';
    productNameInput.focus();
}

/**
 * Видаляє товар зі списку після натискання кнопки.
 * Видаляє елемент з DOM і з масиву `products`.
 * 
 * @param {MouseEvent} event - Подія кліку по кнопці видалення.
 */
export function removeProduct(event){
    const id = event.target.closest('.row').id;
    listOfProducts.removeChild(event.target.closest('.row'));
    
    const productId = products.findIndex((pr) => pr.productId == id);
    if(productId !== -1) products.splice(productId, 1);
}

/**
 * Перемикає стан товару на "куплено", оновлює DOM.
 * @param {MouseEvent} event - Подія натискання на кнопку "Куплено".
 */
export function addToBuyList(event){
    const id = event.target.closest('.row').id;

    const product = products.find((pr) => pr.productId == id);

    if(product == null)
        return;

    product.isBought = true;
    renderProduct(product);
}

/**
 * Перемикає стан товару на "не куплено", оновлює DOM.
 * @param {MouseEvent} event - Подія натискання на кнопку "Не куплено".
 */
export function removeFromBuyList(event){
    const id = event.target.closest('.row').id;

    const product = products.find((pr) => pr.productId == id);

    if(product == null)
        return;

    product.isBought = false;
    renderProduct(product);
}