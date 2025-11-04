import { Kafka } from 'kafkajs';
import type { EachMessagePayload, Consumer } from 'kafkajs';
import { CustomerService } from '../../application/services/customer-service.js';

export class KafkaConsumer {
    private consumer: Consumer;
    private customerService: CustomerService;

    constructor(kafka: Kafka, customerService: CustomerService) {
        this.consumer = kafka.consumer({ groupId: 'customer-group' });
        this.customerService = customerService;
    }

    async start(): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'customer-updates', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async (payload: EachMessagePayload) => {
                try {
                    const message = JSON.parse(payload.message.value?.toString() || '');
                    await this.processMessage(message);
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            },
        });
    }

    private async processMessage(message: any): Promise<void> {
        switch (message.type) {
            case 'CUSTOMER_CREATED':
                await this.customerService.createCustomer(message.data);
                break;
            case 'CUSTOMER_UPDATED':
                await this.customerService.updateCustomer(message.data);
                break;
            case 'CUSTOMER_DEACTIVATED':
                await this.customerService.deactivateCustomer(message.data.id);
                break;
            default:
                console.warn('Unknown message type:', message.type);
        }
    }

    async stop(): Promise<void> {
        await this.consumer.disconnect();
    }
}