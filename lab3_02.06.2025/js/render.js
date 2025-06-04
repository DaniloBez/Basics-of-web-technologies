import { createElement } from "./utils.js";
import { Product } from "./model.js";
import { listOfProducts } from "./dom.js";
import { addToBuyList, removeFromBuyList, changeName, canChangeName, changeQuantityProduct } from "./handlers.js";
import { removeProduct } from "./handlers.js";


/**
 * Відображає товар, якщо його ще не додано на сторінку.
 * @param {Product} product - Товар для відображення.
 */
export function renderProduct(product){
    if(document.getElementById(product.productId)){
        rerenderProduct(product);
    }
    else{
        createProduct(product)
    }
}

/**
 * Повністю оновлює вміст елемента товару відповідно до його стану.
 * @param {Product} product - Товар, який потрібно перерендерити.
 */
function rerenderProduct(product){
    let productElement = document.getElementById(product.productId);
    productElement.replaceChildren();

    productElement = fillProductElement(productElement, product);
}

/**
 * Створює HTML-структуру товару та додає її в DOM.
 * @param {Product} product - Товар для створення.
 */
function createProduct(product){
    let productElement = createElement('div', 'row')
    productElement.id = product.productId;

    productElement = fillProductElement(productElement, product);

    listOfProducts.appendChild(productElement, product);
}

/**
 * Оновлює HTML-елемент товару відповідно до його стану (куплено / не куплено).
 * Додає назву товару, кількість і відповідні кнопки (залежно від `product.isBought`).
 *
 * @param {HTMLDivElement} productElement - Елемент, який представляє товар у DOM.
 * @param {Product} product - Обʼєкт товару з інформацією про назву, кількість, статус.
 * @returns {HTMLDivElement} - Оновлений елемент товару.
 */
function fillProductElement(productElement, product){
    let name = createElement('div', 'left', product.name);
    name.classList += product.isBought ? ' crossed' : '';
    name.addEventListener('click', (event) => startChangingName(event));
    productElement.appendChild(name);

    let quantity = getQuantityElement(product);
    productElement.appendChild(quantity);

    let logicButton = product.isBought ? getRemoveFromBuyListButtons(product) : getBuyButtons();
    productElement.appendChild(logicButton);

    return productElement;
}

/**
 * Створює поле для редагування ім'я продукта.
 * @param {MouseEvent} event - подія натискання на назву товару.
 */
function startChangingName(event){
    if(!canChangeName(event))
        return;

    let changeNameElement = createElement('input', 'change-name');
    changeNameElement.type = 'text';
    changeNameElement.value = event.target.textContent;
    changeNameElement.addEventListener('focusout', (event) => changeName(event));

    event.target.replaceWith(changeNameElement);
    changeNameElement.focus();
}

/**
 * Створює блок керування кількістю.
 * @param {Product} product 
 * @returns {HTMLDivElement} Елемент кількості.
 */
function getQuantityElement(product){
    let quantityElement = createElement('div', 'center');

    if(!product.isBought){
        let remove = createElement('div', 'button-with-tooltip');
        let removeButton;

        if(product.quantity > 1){
            removeButton = createElement('button', 'remove-button', '-');
            removeButton.addEventListener('click', (event) => changeQuantityProduct(event, -1));
        }
        else{
            removeButton = createElement('button', 'remove-button disabled-button', '-');
        }

        removeButton.type = 'button';
        let removeTooltip = createElement('span', 'data-tooltip', 'Зменшити кількість');
        remove.appendChild(removeButton);
        remove.appendChild(removeTooltip);
        quantityElement.appendChild(remove);
    }

    let quantityCount = createElement('div', 'count', product.quantity);
    quantityElement.appendChild(quantityCount);

    if(!product.isBought){
        let add = createElement('div', 'button-with-tooltip');
        let addButton = createElement('button', 'add-button', '+');
        addButton.addEventListener('click', (event) => changeQuantityProduct(event, 1));
        addButton.type = 'button';
        let addTooltip = createElement('span', 'data-tooltip', 'Збільшити кількість');
        add.appendChild(addButton);
        add.appendChild(addTooltip);
        quantityElement.appendChild(add);
    }

    return quantityElement;
}

/**
 * Створює блок кнопок "Куплено" і "Видалити".
 * @returns {HTMLDivElement} Елемент кнопок.
 */
function getBuyButtons(){
    let buyButtons = createElement('div', 'right');

    let buy = createElement('div', 'button-with-tooltip');
    let buyButton = createElement('button', '', 'Куплено');
    buyButton.type = 'button';
    buyButton.addEventListener('click', (event) => addToBuyList(event));
    let buyTooltip = createElement('span', 'data-tooltip', 'Познатичти як куплене');
    buy.appendChild(buyButton);
    buy.appendChild(buyTooltip);
    buyButtons.appendChild(buy);

    let remove = createElement('div', 'button-with-tooltip');
    let removeButton = createElement('button', 'remove-all-button', 'X');
    removeButton.type = 'button';
    removeButton.addEventListener('click', (event) => removeProduct(event));
    let removeTooltip = createElement('span', 'data-tooltip', 'Видалити товар');
    remove.appendChild(removeButton);
    remove.appendChild(removeTooltip);
    buyButtons.appendChild(remove);
    return buyButtons;
}

/**
 * Створює блок кнопок "Куплено" і "Видалити".
 * @returns {HTMLDivElement} Елемент кнопок.
 */
function getRemoveFromBuyListButtons(){
    let removeButton = createElement('div', 'right');

    let remove = createElement('div', 'button-with-tooltip');
    let removeFromBuyListButton = createElement('button', '', 'Не куплено');
    removeFromBuyListButton.addEventListener('click', (event) => removeFromBuyList(event));
    removeFromBuyListButton.type = 'button';
    let removeTooltip = createElement('span', 'data-tooltip', 'Познатичти як не куплене');
    remove.appendChild(removeFromBuyListButton);
    remove.appendChild(removeTooltip);
    removeButton.appendChild(remove);

    return removeButton;
}