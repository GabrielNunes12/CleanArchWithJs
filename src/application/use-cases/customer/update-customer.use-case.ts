import { Customer } from '../../../domain/entities/customer.js';
import type { CustomerRepository } from '../../../domain/repositories/customer-repository.js';
import { Email } from '../../../domain/value-objects/email.js';
import type { UpdateCustomerDto } from '../../../domain/dtos/customer.dto.js';

export class UpdateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(data: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.customerRepository.findById(data.id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        if (data.name) {
            customer.updateName(data.name);
        }

        if (data.email) {
            customer.updateEmail(new Email(data.email));
        }

        await this.customerRepository.update(customer);
        return customer;
    }
}