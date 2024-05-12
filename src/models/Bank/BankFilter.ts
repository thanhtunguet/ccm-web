import {AutoModel, IdFilter, ModelFilter, ObjectField, StringFilter} from "react3l";

@AutoModel()
export class BankFilter extends ModelFilter {
    @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

    @ObjectField(StringFilter)
    public code?: StringFilter = new StringFilter();

    @ObjectField(StringFilter)
    public name?: StringFilter = new StringFilter();

    @ObjectField(StringFilter)
    public englishName?: StringFilter = new StringFilter();

    @ObjectField(StringFilter)
    public shortName?: StringFilter = new StringFilter();
}
