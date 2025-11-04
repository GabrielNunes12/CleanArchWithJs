export interface CreateCustomerDto {
    name: string;
    email: string;
}

export interface UpdateCustomerDto {
    id: string;
    name?: string;
    email?: string;
}