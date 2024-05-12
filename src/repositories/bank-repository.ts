import {BaseRepository} from "src/core/base-repository.ts";
import {Bank} from "src/models";

export class BankRepository extends BaseRepository<Bank> {
  constructor() {
    super(Bank);
    this.baseURL = `${super.baseURL}/api/bank`;
  }
}

export const bankRepository = new BankRepository();
