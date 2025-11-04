import { Email } from '../value-objects/email.js';

export class Customer {
    private readonly _id: string;
    private _name: string;
    private _email: Email;
    private _active: boolean;

    constructor(id: string, name: string, email: Email) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._active = true;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email.toString();
    }

    get active(): boolean {
        return this._active;
    }

    updateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        this._name = name;
    }

    updateEmail(email: Email): void {
        this._email = email;
    }

    deactivate(): void {
        this._active = false;
    }

    activate(): void {
        this._active = true;
    }
}