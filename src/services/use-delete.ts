import React from "react";
import { Model } from "react3l";
import { Observable } from "rxjs";

export function useDelete<T extends Model>(
  getDelete: (entity: T) => Observable<T>,
): [
  (entity: T) => () => void,
] {
  const handleDelete = React.useCallback((entity: T) => () => {
    getDelete(entity)
      .subscribe({
        next() {
          window.location.reload();
        },
      });
  }, [getDelete]);

  return [handleDelete];
}
