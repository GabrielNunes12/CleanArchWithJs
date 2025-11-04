import type { Request, Response } from 'express';
import type { CustomerRepository } from '../../domain/repositories/customer-repository.js';
import type { CreateCustomerDto, UpdateCustomerDto } from '../../domain/dtos/customer.dto.js';
import { CreateCustomerUseCase } from '../../application/use-cases/customer/create-customer.use-case.js';
import { UpdateCustomerUseCase } from '../../application/use-cases/customer/update-customer.use-case.js';
import { DeactivateCustomerUseCase } from '../../application/use-cases/customer/deactivate-customer.use-case.js';
import { GetCustomerUseCase } from '../../application/use-cases/customer/get-customer.use-case.js';
import { GetAllCustomersUseCase } from '../../application/use-cases/customer/get-all-customers.use-case.js';

export class CustomerController {
    private readonly createCustomerUseCase: CreateCustomerUseCase;
    private readonly updateCustomerUseCase: UpdateCustomerUseCase;
    private readonly deactivateCustomerUseCase: DeactivateCustomerUseCase;
    private readonly getCustomerUseCase: GetCustomerUseCase;
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase;

    constructor(customerRepository: CustomerRepository) {
        this.createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        this.updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        this.deactivateCustomerUseCase = new DeactivateCustomerUseCase(customerRepository);
        this.getCustomerUseCase = new GetCustomerUseCase(customerRepository);
        this.getAllCustomersUseCase = new GetAllCustomersUseCase(customerRepository);
    }

    getAllCustomers = async (req: Request, res: Response): Promise<void> => {
        try {
            const customers = await this.getAllCustomersUseCase.execute();
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customers' });
        }
    };

    getCustomer = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ message: 'Customer ID is required' });
                return;
            }
            const customer = await this.getCustomerUseCase.execute(id);
            res.json(customer);
        } catch (error) {
            res.status(404).json({ message: 'Customer not found' });
        }
    };

    createCustomer = async (req: Request, res: Response): Promise<void> => {
        try {
            const customerData: CreateCustomerDto = req.body;
            const customer = await this.createCustomerUseCase.execute(customerData);
            res.status(201).json(customer);
        } catch (error) {
            res.status(400).json({ message: 'Invalid customer data' });
        }
    };

    updateCustomer = async (req: Request, res: Response): Promise<void> => {
        try {
            const customerData: UpdateCustomerDto = {
                id: req.params.id,
                ...req.body
            };
            const customer = await this.updateCustomerUseCase.execute(customerData);
            res.json(customer);
        } catch (error) {
            res.status(404).json({ message: 'Customer not found' });
        }
    };

    deactivateCustomer = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ message: 'Customer ID is required' });
                return;
            }
            await this.deactivateCustomerUseCase.execute(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: 'Customer not found' });
        }
    };
}