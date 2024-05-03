// transaction-status-repository.ts
import { BaseRepository } from "src/core/base-repository.ts";
import { TransactionStatus } from "src/models";

export class TransactionStatusRepository extends BaseRepository<TransactionStatus> {
  constructor() {
    super(TransactionStatus);
    this.baseURL = `${super.baseURL}/api/transaction-status`;
  }
}

export const transactionStatusRepository = new TransactionStatusRepository();
