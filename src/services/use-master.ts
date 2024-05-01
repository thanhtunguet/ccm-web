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
] {
  const [list, setList] = React.useState<T[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
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

  return [
    list,
    count,
    isLoading,
  ];
}