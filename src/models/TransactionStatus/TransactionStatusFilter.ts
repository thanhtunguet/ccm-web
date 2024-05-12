import {AutoModel, IdFilter, ModelFilter, ObjectField, StringFilter} from "react3l";

@AutoModel()
export class TransactionStatusFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public color?: StringFilter = new StringFilter();

  
}
