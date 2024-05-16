import { Repository } from "react3l";
import { Observable } from "rxjs";
import {BaseRepository} from "src/core/base-repository.ts";
import {Card} from "src/models";

export class CardRepository extends BaseRepository<Card> {
  constructor() {
    super(Card);
    this.baseURL = `${super.baseURL}/api/card`;
  }

  public readonly syncBin = (): Observable<number> => {
    return this.http.post<number>('/sync-bin')
      .pipe(
        Repository.responseDataMapper<number>(),
      );
  };
}

export const cardRepository = new CardRepository();
