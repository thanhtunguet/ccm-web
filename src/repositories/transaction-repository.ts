// transaction-repository.ts
import {BaseRepository} from "src/core/base-repository.ts";
import {Transaction} from "src/models";

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    super(Transaction);
    this.baseURL = `${super.baseURL}/api/transaction`;
  }
}

export const transactionRepository = new TransactionRepository();
