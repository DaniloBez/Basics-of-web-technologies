// --- Models ---
/**
 * Клас, що представляє товар у списку покупок.
 * @class
 */
class Product{
    static nextId = 0;

    /**
     * Створює новий товар.
     * @param {string} name - Назва товару.
     * @param {number} quantity - Кількість товару.
     * @param {boolean} isBought - Чи куплено товар.
     */
    constructor(name, quantity, isBought){
        this.productId = Product.nextId++;
        this.name = name;
        this.quantity = quantity;
        this.isBought = isBought
    }
}


// --- DOM Elements ---
/** @type {HTMLButtonElement} */
const addProductButton = document.getElementById('add-product-button');

/** @type {HTMLInputElement} */
const productNameInput = document.getElementById('product-name-input');

/** @type {HTMLDivElement} */
const listOfProducts = document.getElementById('list-of-products');


// --- State ---
/** @type {Product[]} */
const products = [];

// --- Utils ---
/**
 * Створює новий HTML-елемент з класом і текстом.
 * @param {string} tag - Назва тега.
 * @param {string} [classList=''] - Класи CSS через пробіл.
 * @param {string} [textContent=''] - Вміст тексту.
 * @returns {HTMLElement} Створений HTML-елемент.
 */
function createElement(tag, classList = '', textContent = ''){
    const el = document.createElement(tag);
    if (classList) el.classList = classList;
    if (textContent) el.textContent = textContent;
    return el;
}

// --- Rendering ---
/**
 * Відображає товар, якщо його ще не додано на сторінку.
 * @param {Product} product - Товар для відображення.
 */
function renderProduct(product){
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
    productElement.appendChild(name);

    let quantity = getQuantityElement(product);
    productElement.appendChild(quantity);

    let logicButton = product.isBought ? getRemoveFromBuyListButtons(product) : getBuyButtons();
    productElement.appendChild(logicButton);

    return productElement;
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


// --- Logic ---
/**
 * Створює новий товар з базовими значеннями.
 * @param {string} name - Назва товару.
 * @returns {Product} Новий товар.
 */
function getNewProduct(name){
    return new Product(name, 1, false);
}

/**
 * Обробляє додавання товару з інпуту.
 */
function addProduct(){
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
function removeProduct(event){
    const id = event.target.closest('.row').id;
    listOfProducts.removeChild(event.target.closest('.row'));
    
    const productId = products.findIndex((pr) => pr.productId == id);
    if(productId !== -1) products.splice(productId, 1);
}

/**
 * Перемикає стан товару на "куплено", оновлює DOM.
 * @param {MouseEvent} event - Подія натискання на кнопку "Куплено".
 */
function addToBuyList(event){
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
function removeFromBuyList(event){
    const id = event.target.closest('.row').id;

    const product = products.find((pr) => pr.productId == id);

    if(product == null)
        return;

    product.isBought = false;
    renderProduct(product);
}


// --- Events ---
addProductButton.addEventListener('click', addProduct);
//addProductButton.addEventListener('keypress', (event) => {if(event.key == 'Enter') addProduct()});  
productNameInput.addEventListener('keypress', (event) => {if(event.key == 'Enter') addProduct()});


// --- Init ---
productNameInput.focus();

for (const productName of ['Помідори', 'Печиво', 'Сир']) {
    const product = getNewProduct(productName);
    products.push(product);
    renderProduct(product);
}