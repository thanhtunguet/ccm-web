import { Model, Repository } from "react3l";
import { Observable } from "rxjs";

export abstract class BaseRepository<T extends Model> extends Repository {
  protected constructor(private TClass: typeof Model) {
    super({});
    this.baseURL = window.location.origin;
  }

  public readonly list: () => Observable<T[]> = () => {
    return this.http.get('/list').pipe(
      Repository.responseMapToList<T>(this.TClass),
    );
  };

  public readonly count: () => Observable<number> = () => {
    return this.http.get('/count').pipe(
      Repository.responseDataMapper<number>(),
    );
  };

  public readonly get: (id: number) => Observable<T> = (id: number) => {
    return this.http.get(`/get`, {
      params: {
        id,
      },
    }).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly create: (model: T) => Observable<T> = (model: T) => {
    return this.http.post('/create', model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly update: (model: T) => Observable<T> = (model: T) => {
    return this.http.put('/update', model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly delete: (model: T) => Observable<T> = (model: T) => {
    return this.http.delete('/delete', {
      params: {
        id: model.id,
      },
    }).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };
}
