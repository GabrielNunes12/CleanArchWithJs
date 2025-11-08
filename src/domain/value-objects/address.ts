export class Address {
    constructor(
        private readonly _street: string,
        private readonly _number: string,
        private readonly _city: string,
        private readonly _state: string,
        private readonly _zipCode: string,
        private readonly _type: 'billing' | 'shipping'
    ) {
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get type(): 'billing' | 'shipping' {
        return this._type;
    }

    private validate(): void {
        if (!this._street || this._street.trim().length === 0) {
            throw new Error('Street is required');
        }
        if (!this._city || this._city.trim().length === 0) {
            throw new Error('City is required');
        }
        if (!this._state || this._state.trim().length === 0) {
            throw new Error('State is required');
        }
        if (!this._zipCode || !this.isValidZipCode(this._zipCode)) {
            throw new Error('Invalid zip code');
        }
    }

    private isValidZipCode(zipCode: string): boolean {
        // Add your zip code validation logic here
        // This is a simple example
        return /^\d{5}(-\d{4})?$/.test(zipCode);
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._city}, ${this._state} ${this._zipCode}`;
    }
}