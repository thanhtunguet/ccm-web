import {DateFilter, IdFilter, ModelFilter, ObjectField, StringFilter} from 'react3l';

export class StoreFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  @ObjectField(StringFilter)
  public address?: StringFilter = new StringFilter();

  public search?: string;

}
