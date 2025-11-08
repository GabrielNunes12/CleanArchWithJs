export class OrderItem {
    constructor(
        private readonly _id: string,
        private readonly _productId: string,
        private readonly _price: number,
        private readonly _quantity: number
    ) {
        if (_price <= 0) throw new Error('Price must be greater than 0');
        if (_quantity <= 0) throw new Error('Quantity must be greater than 0');
    }

    get productId(): string {
        return this._productId;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }
    get id(): string {
        return this._id;
    }
}