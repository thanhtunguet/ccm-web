import { TablePaginationConfig } from "antd";
import React from "react";
import { Model, ModelFilter } from "react3l";
import { Observable, finalize, zip } from "rxjs";

export function useMaster<T extends Model>(
  getList: (filter: ModelFilter) => Observable<T[]>,
  getCount: (filter: ModelFilter) => Observable<number>,
): [
    T[],
    number,
    boolean,
    () => void | Promise<void>,
    ModelFilter,
    (page: number, pageSize: number) => void,
    TablePaginationConfig,
  ] {
  const [list, setList] = React.useState<T[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [filter, setFilter] = React.useState<ModelFilter>({ skip: 0, take: 10 });

  const handleRefresh = React.useCallback(() => {
    setFilter({ ...filter });
  }, [filter]);

  React.useEffect(() => {
    setIsLoading(true);
    zip([
      getList(filter),
      getCount(filter),
    ])
      .pipe(
        finalize(() => {
          setIsLoading(false);
        }),
      )
      .subscribe({
        next: (values: [T[], number]) => {
          setList(values[0]);
          setCount(values[1]);
        },
      });
  }, [filter, getList, getCount]);

  const handleChangePage = React.useCallback((page: number, pageSize: number = 10) => {
    setFilter({
      ...filter,
      skip: pageSize * (page - 1),
      take: pageSize,
    });
  }, [filter]);

  const pagination: TablePaginationConfig = React.useMemo(() => ({
    position: ['bottomRight'],
    pageSize: filter.take,
    current: Math.round(filter.skip! / filter.take!) + 1,
    total: count,
    onChange: handleChangePage,
  }), [filter.skip, filter.take, handleChangePage, count]);

  return [
    list,
    count,
    isLoading,
    handleRefresh,
    filter,
    handleChangePage,
    pagination,
  ];
}
