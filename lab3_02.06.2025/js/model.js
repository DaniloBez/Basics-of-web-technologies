/**
 * Клас, що представляє товар у списку покупок.
 * @class
 */
export class Product {
    constructor(name, quantity, isBought) {
        this.productId = crypto.randomUUID();
        this.name = name;
        this.quantity = quantity;
        this.isBought = isBought;
    }
}