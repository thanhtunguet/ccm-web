import {DateFilter, IdFilter, ModelFilter, NumberFilter, ObjectField, StringFilter} from 'react3l';

export class TransactionFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();

  @ObjectField(IdFilter)
  public cardId?: IdFilter = new IdFilter();

  @ObjectField(NumberFilter)
  public amount?: NumberFilter = new NumberFilter();

  @ObjectField(NumberFilter)
  public transactionFee?: NumberFilter = new NumberFilter();

  @ObjectField(IdFilter)
  public statusId?: IdFilter = new IdFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  @ObjectField(IdFilter)
  public storeId?: IdFilter = new IdFilter();

  public search?: string;

}
