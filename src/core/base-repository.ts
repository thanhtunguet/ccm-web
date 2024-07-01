import { Model, ModelFilter, Repository } from "react3l";
import { Observable } from "rxjs";

export abstract class BaseRepository<T extends Model & {id?: number;}> extends Repository {
  protected constructor(private TClass: typeof Model) {
    super({});
    this.baseURL = window.location.origin;
  }

  public readonly list: (filter: ModelFilter) => Observable<T[]> = (filter: ModelFilter = {}) => {
    return this.http.post("/list", filter).pipe(
      Repository.responseMapToList<T>(this.TClass),
    );
  };

  public readonly count: (filter: ModelFilter) => Observable<number> = (filter: ModelFilter = {}) => {
    return this.http.post("/count", filter).pipe(
      Repository.responseDataMapper<number>(),
    );
  };

  public readonly get: (id: number) => Observable<T> = (id: number) => {
    return this.http.post(`/${id}`).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly create: (model: T) => Observable<T> = (model: T) => {
    return this.http.post("/create", model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly update: (model: T) => Observable<T> = (model: T) => {
    return this.http.post(`/update/${model.id}`, model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };

  public readonly delete: (model: T) => Observable<T> = (model: T) => {
    return this.http.post(`/delete/${model.id}`).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  };
}
