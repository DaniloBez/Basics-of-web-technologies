/**
 * Клас, що представляє товар у списку покупок.
 * @class
 */
export class Product {
    static nextId = 0;

    constructor(name, quantity, isBought) {
        this.productId = Product.nextId++;
        this.name = name;
        this.quantity = quantity;
        this.isBought = isBought;
    }
}