import type { CustomerRepository } from '../../domain/repositories/customer-repository.js';
import { Customer } from '../../domain/entities/customer.js';

// This is a simple in-memory implementation. In a real application, 
// you would implement this using a database
export class InMemoryCustomerRepository implements CustomerRepository {
    private customers: Map<string, Customer> = new Map();

    async save(customer: Customer): Promise<void> {
        this.customers.set(customer.id, customer);
    }

    async findById(id: string): Promise<Customer | null> {
        return this.customers.get(id) || null;
    }

    async findAll(): Promise<Customer[]> {
        return Array.from(this.customers.values());
    }

    async update(customer: Customer): Promise<void> {
        if (!this.customers.has(customer.id)) {
            throw new Error('Customer not found');
        }
        this.customers.set(customer.id, customer);
    }

    async delete(id: string): Promise<void> {
        this.customers.delete(id);
    }
}