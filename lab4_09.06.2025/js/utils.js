/**
 * Створює новий HTML-елемент з класом і текстом.
 * @param {string} tag - Назва тега.
 * @param {string} [classList=''] - Класи CSS через пробіл.
 * @param {string} [textContent=''] - Вміст тексту.
 * @returns {HTMLElement} Створений HTML-елемент.
 */
export function createElement(tag, classList = '', textContent = ''){
    const el = document.createElement(tag);
    if (classList) el.classList = classList;
    if (textContent) el.textContent = textContent;
    return el;
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}