import { productNameInput } from "./dom.js";
import { products } from "./state.js";
import { Product } from "./model.js";
import { renderProduct, renderAllProductInfo } from "./render.js";
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

    renderAllProductInfo();
}

/**
 * Перемикає стан товару на "куплено", оновлює DOM.
 * @param {MouseEvent} event - Подія натискання на кнопку "Куплено".
 */
export function addToBuyList(event){
    const product = getProductFromEvent(event);

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
    const product = getProductFromEvent(event);

    if(product == null)
        return;

    product.isBought = false;
    renderProduct(product);
}

/**
 * Оновлює ім'я товару, яку користувач ввів.
 * @param {FocusEvent} event - Подія при дефокусування назви товару.
 */
export function changeName(event){
    const product = getProductFromEvent(event);

    if(product == null)
        return;

    const newName = event.target.value.trim();
    if (newName === '') return;
    product.name = newName;

    renderProduct(product);
}

/**
 * Перевіряє чи можна змінювати назву торвару.
 * @param {MouseEvent} event - Подія натиску на назву товару.
 */
export function canChangeName(event){
    const product = getProductFromEvent(event);

    return product.isBought == false;
}   

/**
 * Повертає товар, з яким взаємодіють.
 * @param {MouseEvent | FocusEvent} event - Подія взаємодії з товаром 
 * @returns Товар, на який натиснули
 */
function getProductFromEvent(event) {
    const id = event.target.closest('.row')?.id;
    return products.find(pr => pr.productId == id);
}

export function changeQuantityProduct(event, delta){
    const product = getProductFromEvent(event);

    if(product == null)
        return;

    product.quantity += delta;
    renderProduct(product);
}