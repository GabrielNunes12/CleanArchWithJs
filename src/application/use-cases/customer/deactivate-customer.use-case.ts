import type { CustomerRepository } from '../../../domain/repositories/customer-repository.js';

export class DeactivateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(id: string): Promise<void> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.deactivate();
        await this.customerRepository.update(customer);
    }
}