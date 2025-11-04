import { Customer } from '../entities/customer.js';

export interface CustomerRepository {
    save(customer: Customer): Promise<void>;
    findById(id: string): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    update(customer: Customer): Promise<void>;
    delete(id: string): Promise<void>;
}