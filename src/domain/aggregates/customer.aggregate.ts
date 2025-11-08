import { Customer } from '../entities/customer.js';
import { Order } from '../entities/order.js';

export class CustomerAggregate {
    private readonly _customer: Customer;
    private readonly _orders: Order[] = [];

    constructor(customer: Customer) {
        this._customer = customer;
    }

    get customer(): Customer {
        return this._customer;
    }

    get orders(): ReadonlyArray<Order> {
        return this._orders;
    }

    addOrder(order: Order): void {
        // Business rule: Cannot add orders if customer is inactive
        if (!this._customer.active) {
            throw new Error('Cannot create order for inactive customer');
        }
        // Business rule: Customer must have at least one address to place orders
        if (this._customer.addresses.length === 0) {
            throw new Error('Customer must have at least one address to place orders');
        }
        // Business rule: Order must belong to this customer
        if (order.customerId !== this._customer.retrieveId()) {
            throw new Error('Order does not belong to this customer');
        }
        this._orders.push(order);
    }

    getTotalOrders(): number {
        return this._orders.length;
    }

    getActiveOrders(): Order[] {
        return this._orders.filter(order => order.status === 'active');
    }

    // Business rules for the entire aggregate
    validateState(): boolean {
        // Cannot have orders if customer is inactive
        if (!this._customer.active && this._orders.length > 0) {
            throw new Error('Inactive customer cannot have orders');
        }

        return true;
    }
}