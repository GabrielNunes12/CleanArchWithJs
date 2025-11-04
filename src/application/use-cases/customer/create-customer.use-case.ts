import { Customer } from '../../../domain/entities/customer.js';
import type { CustomerRepository } from '../../../domain/repositories/customer-repository.js';
import { Email } from '../../../domain/value-objects/email.js';
import { v4 as uuidv4 } from 'uuid';
import type { CreateCustomerDto } from '../../../domain/dtos/customer.dto.js';

export class CreateCustomerUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(data: CreateCustomerDto): Promise<Customer> {
        const customer = new Customer(
            uuidv4(),
            data.name,
            new Email(data.email)
        );

        await this.customerRepository.save(customer);
        return customer;
    }
}