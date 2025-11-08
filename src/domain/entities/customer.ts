import { Email } from '../value-objects/email.js';
import { Address } from '../value-objects/address.js';

export class Customer {
    private readonly _id: string;
    private _name: string;
    private _email: Email;
    private _active: boolean;
    private _addresses: Address[] = [];

    constructor(id: string, name: string, email: Email) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._active = true;
        this.validate();
    }

    updateName(name: string): void {
        this._name = name;
        this.validate();
    }

    updateEmail(email: Email): void {
        this._email = email;
        this.validate();
    }

    deactivate(): void {
        this._active = false;
    }

    activate(): void {
        this._active = true;
    }
    retrieveName(): string {
        return this._name;
    }
    retrieveId(): string {
        return this._id;
    }
    retrieveEmail(): Email {
        return this._email;
    }
    validate(): boolean {
        if(this.retrieveId() === '') {
            throw new Error('Customer ID is invalid');
        }
        if(this.retrieveName() === '') {
            throw new Error('Customer name is invalid');
        }
        return this._active;
    }

    addAddress(address: Address): void {
        // Business rule: Customer can have maximum of 3 addresses
        if (this._addresses.length >= 3) {
            throw new Error('Customer cannot have more than 3 addresses');
        }
        this._addresses.push(address);
    }

    get addresses(): ReadonlyArray<Address> {
        return this._addresses;
    }
}