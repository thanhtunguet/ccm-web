import {DateFilter, IdFilter, ModelFilter, ObjectField, StringFilter} from 'react3l';

export class CustomerFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public displayName?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public firstName?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public lastName?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public email?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public address?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public phoneNumber?: StringFilter = new StringFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  public search?: string;

}
