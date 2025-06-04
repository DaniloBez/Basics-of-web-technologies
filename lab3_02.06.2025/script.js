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

    }
    else{
        createProduct(product)
    }
}

/**
 * Створює HTML-структуру товару та додає її в DOM.
 * @param {Product} product - Товар для створення.
 */
function createProduct(product){
    let row = createElement('div', 'row')
    row.id = product.productId;

    let name = createElement('div', 'left', product.name);
    row.appendChild(name);

    let quantity = getQuantityElement();
    row.appendChild(quantity);

    let buyButtons = getBuyButtons();
    row.appendChild(buyButtons);

    listOfProducts.appendChild(row);
}

/**
 * Створює блок керування кількістю.
 * @returns {HTMLDivElement} Елемент кількості.
 */
function getQuantityElement(){
    let quantityElement = createElement('div', 'center');

    let remove = createElement('div', 'button-with-tooltip');
    let removeButton = createElement('button', 'remove-button disabled-button', '-');
    removeButton.type = 'button';
    let removeTooltip = createElement('span', 'data-tooltip', 'Зменшити кількість');
    remove.appendChild(removeButton);
    remove.appendChild(removeTooltip);
    quantityElement.appendChild(remove);

    let quantityCount = createElement('div', 'count', 1);
    quantityElement.appendChild(quantityCount)

    let add = createElement('div', 'button-with-tooltip');
    let addButton = createElement('button', 'add-button', '+');
    addButton.type = 'button';
    let addTooltip = createElement('span', 'data-tooltip', 'Збільшити кількість');
    add.appendChild(addButton);
    add.appendChild(addTooltip);
    quantityElement.appendChild(add);

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
 * @param {MouseEvent} event
 */
function removeProduct(event){
    const id = event.target.closest('.row').id;
    listOfProducts.removeChild(event.target.closest('.row'));
    
    const productId = products.findIndex((pr) => pr.productId == id);
    if(productId !== -1) products.splice(productId, 1);
    console.log(products);
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

console.log(products);