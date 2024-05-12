import {Model} from "react3l";
import {finalize, Observable, zip} from "rxjs";
import React from "react";

export function useMaster<T extends Model>(
  getList: () => Observable<T[]>,
  getCount: () => Observable<number>,
): [
  T[],
  number,
  boolean,
  () => void | Promise<void>,
] {
  const [list, setList] = React.useState<T[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setIsLoading(true);
    zip([
      getList(),
      getCount(),
    ])
      .pipe(
        finalize(() => {
          setIsLoading(false);
        }),
      )
      .subscribe({
        next: (values) => {
          setList(values[0]);
          setCount(values[1]);
        },
      });
  }, [getCount, getList]);

  React.useEffect(() => {
    handleRefresh();
  }, [getCount, getList, handleRefresh]);

  return [
    list,
    count,
    isLoading,
    handleRefresh,
  ];
}
