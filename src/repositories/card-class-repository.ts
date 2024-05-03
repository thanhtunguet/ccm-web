// card-class-repository.ts
import { BaseRepository } from "src/core/base-repository.ts";
import { CardClass } from "src/models";

export class CardClassRepository extends BaseRepository<CardClass> {
  constructor() {
    super(CardClass);
    this.baseURL = `${super.baseURL}/api/card-class`;
  }
}

export const cardClassRepository = new CardClassRepository();
