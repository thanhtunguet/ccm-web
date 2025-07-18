import { DateFilter, IdFilter, ModelFilter, ObjectField, StringFilter } from "react3l";


export class CardFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public cardNumber?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public sampleLink?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public benefits?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public description?: StringFilter = new StringFilter();

  @ObjectField(StringFilter)
  public bin?: StringFilter = new StringFilter();

  @ObjectField(IdFilter)
  public bankId?: IdFilter = new IdFilter();

  @ObjectField(IdFilter)
  public cardClassId?: IdFilter = new IdFilter();

  @ObjectField(IdFilter)
  public customerId?: IdFilter = new IdFilter();

  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();

  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();

  public cardTypeId?: number;  
}
