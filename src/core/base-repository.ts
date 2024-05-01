import {Model, Repository} from "react3l";
import {Observable} from "rxjs";

export abstract class BaseRepository<T extends Model> extends Repository {
  protected constructor(private TClass: typeof Model) {
    super({});
    this.baseURL = window.location.origin;
  }

  public list(): Observable<T[]> {
    return this.http.get('/list').pipe(
      Repository.responseMapToList<T>(this.TClass),
    );
  }

  public count(): Observable<number> {
    return this.http.get('/count').pipe(
      Repository.responseDataMapper<number>(),
    );
  }

  public get(id: number): Observable<T> {
    return this.http.get(`/get`, {
      params: {
        id,
      },
    }).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  }

  public create(model: T): Observable<T> {
    return this.http.post('/create', model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  }

  public update(model: T): Observable<T> {
    return this.http.post('/update', model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  }

  public delete(model: T): Observable<T> {
    return this.http.post('/delete', model).pipe(
      Repository.responseMapToModel<T>(this.TClass),
    );
  }
}
