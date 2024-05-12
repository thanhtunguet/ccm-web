import {AutoModel, DateFilter, IdFilter, ModelFilter, ObjectField, StringFilter} from "react3l";

@AutoModel()
export class CustomerFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public displayName?: StringFilter = new StringFilter();

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

  
}
