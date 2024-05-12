import {BaseRepository} from "src/core/base-repository.ts";
import {Card} from "src/models";

export class CardRepository extends BaseRepository<Card> {
  constructor() {
    super(Card);
    this.baseURL = `${super.baseURL}/api/card`;
  }
}

export const cardRepository = new CardRepository();
