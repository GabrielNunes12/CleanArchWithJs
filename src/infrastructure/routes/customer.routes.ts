import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { CustomerController } from '../../interfaces/controllers/customer.controller.js';
import { InMemoryCustomerRepository } from '../repositories/in-memory-customer-repository.js';

const router = Router();
const customerRepository = new InMemoryCustomerRepository();
const customerController = new CustomerController(customerRepository);

router.use(authMiddleware); // Protect all routes

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomer);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deactivateCustomer);

export default router;