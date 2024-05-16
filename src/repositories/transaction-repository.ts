// transaction-repository.ts
import { Repository } from "react3l";
import { Observable } from "rxjs";
import {BaseRepository} from "src/core/base-repository.ts";
import {Transaction} from "src/models";

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    super(Transaction);
    this.baseURL = `${super.baseURL}/api/transaction`;
  }

  public readonly updateVpBankLog = (statementString: string[]): Observable<Transaction[]> => {
    return this.http.post<Transaction[]>('/update-vpbank-logs', statementString)
      .pipe(
        Repository.responseMapToList<Transaction>(Transaction),
      );
  };
}

export const transactionRepository = new TransactionRepository();
