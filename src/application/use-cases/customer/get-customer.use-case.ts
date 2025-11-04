import { Customer } from '../../../domain/entities/customer.js';
import type { CustomerRepository } from '../../../domain/repositories/customer-repository.js';

export class GetCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    }
}