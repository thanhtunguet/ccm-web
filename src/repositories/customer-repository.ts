// customer-repository.ts
import { BaseRepository } from "src/core/base-repository.ts";
import { Customer } from "src/models";

export class CustomerRepository extends BaseRepository<Customer> {
  constructor() {
    super(Customer);
    this.baseURL = `${super.baseURL}/api/customer`;
  }
}

export const customerRepository = new CustomerRepository();
