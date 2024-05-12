// store-repository.ts
import {BaseRepository} from "src/core/base-repository.ts";
import {Store} from "src/models";

export class StoreRepository extends BaseRepository<Store> {
  constructor() {
    super(Store);
    this.baseURL = `${super.baseURL}/api/store`;
  }
}

export const storeRepository = new StoreRepository();
