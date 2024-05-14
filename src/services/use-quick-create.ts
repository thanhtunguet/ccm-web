import React from "react";
import { Observable } from "rxjs";

export function useQuickCreate<T>(
  createMethod: (customer: T) => Observable<T>,
  newItem: (value: string) => T,
  onRefresh: () => void,
): [
    string,
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => void,
] {
  const [name, setName] = React.useState<string>('');

  const handleChangeName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value);}, []);

  const handleCreateCustomer = React.useCallback(() => {
    const item = newItem(name);
    createMethod(item)
      .pipe()
      .subscribe({
        next() {
          onRefresh();
        },
      });
  }, [createMethod, newItem, onRefresh, name]);

  return [
    name,
    handleChangeName,
    handleCreateCustomer,
  ];
}
