import { Customer } from '../../../domain/entities/customer.js';
import type { CustomerRepository } from '../../../domain/repositories/customer-repository.js';

export class GetAllCustomersUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(): Promise<Customer[]> {
        return await this.customerRepository.findAll();
    }
}