import { Repository } from "react3l";
import { Observable } from "rxjs";
import { BaseRepository } from "src/core/base-repository.ts";
import { Card } from "src/models";
import { CardFilter } from "src/models/Card";

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

  public readonly listByType: (filter: CardFilter) => Observable<Card[]> = (filter: CardFilter = {}) => {
    return this.http.post("/list-by-type", filter).pipe(
      Repository.responseMapToList<Card>(Card),
    );
  };

  public readonly countByType: (filter: CardFilter) => Observable<number> = (filter: CardFilter = {}) => {
    return this.http.post("/count-by-type", filter).pipe(
      Repository.responseDataMapper<number>(),
    );
  };
}

export const cardRepository = new CardRepository();
