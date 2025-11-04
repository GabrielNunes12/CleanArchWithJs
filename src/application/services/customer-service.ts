import { Customer } from '../../domain/entities/customer.js';
import type { CustomerRepository } from '../../domain/repositories/customer-repository.js';
import { Email } from '../../domain/value-objects/email.js';
import { v4 as uuidv4 } from 'uuid';
import type { CreateCustomerDto, UpdateCustomerDto } from '../../domain/dtos/customer.dto.js';

export class CustomerService {
    constructor(private customerRepository: CustomerRepository) {}

    async createCustomer(data: CreateCustomerDto): Promise<Customer> {
        const customer = new Customer(
            uuidv4(),
            data.name,
            new Email(data.email)
        );

        await this.customerRepository.save(customer);
        return customer;
    }

    async updateCustomer(data: UpdateCustomerDto): Promise<Customer> {
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

    async deactivateCustomer(id: string): Promise<void> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        customer.deactivate();
        await this.customerRepository.update(customer);
    }

    async getCustomer(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    }

    async getAllCustomers(): Promise<Customer[]> {
        return await this.customerRepository.findAll();
    }
}