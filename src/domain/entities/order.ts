import type { OrderItem } from "./order_item.js";

export class Order {
    private readonly _id: string;
    private readonly _customerId: string;
    private _status: 'active' | 'completed' | 'cancelled';
    private readonly _items: OrderItem[] = [];
    private readonly _createdAt: Date;

    constructor(id: string, customerId: string) {
        this._id = id;
        this._customerId = customerId;
        this._status = 'active';
        this._createdAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get status(): 'active' | 'completed' | 'cancelled' {
        return this._status;
    }

    get items(): ReadonlyArray<OrderItem> {
        return this._items;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    addItem(item: OrderItem): void {
        this._items.push(item);
    }

    complete(): void {
        if (this._items.length === 0) {
            throw new Error('Cannot complete empty order');
        }
        this._status = 'completed';
    }

    cancel(): void {
        if (this._status === 'completed') {
            throw new Error('Cannot cancel completed order');
        }
        this._status = 'cancelled';
    }

    calculateTotal(): number {
        return this._items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}
