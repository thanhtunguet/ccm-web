import { Form, FormInstance } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Model } from "react3l";
import { Observable, finalize } from "rxjs";

type SetFieldsValueArg = Parameters<FormInstance['setFieldsValue']>[0];

export function useDetails<T extends Model>(
  getDetails: (id: number) => Observable<T>,
  doCreate: (t: Partial<T>) => Observable<Partial<T>>,
  doUpdate: (t: Partial<T>) => Observable<Partial<T>>,
  routeGoBack: string,
  ModelClass?: (new () => T) & {create(): T;},
): [
  FormInstance<T>,
  boolean,
  (values: T) => void,
  T | undefined,
] {
  const {search} = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm<T>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [t, setT] = React.useState<T | undefined>(ModelClass && ModelClass.create());

  const id = React.useMemo(() => {
    const params = new URLSearchParams(search);
    const id = params.get("id");
    return id !== null ? Number(id) : undefined;
  }, [search]);

  React.useEffect(() => {
    if (typeof id === "number") {
      setIsLoading(true);
      getDetails(id)
        .pipe(
          finalize(() => {
            setIsLoading(false);
          }),
        )
        .subscribe({
          next(values: T) {
            setT(values);
            form.setFieldsValue(values as SetFieldsValueArg);
          },
        });
    }
  }, [getDetails, id, form]);

  const handleCreate = React.useCallback((values: T) => {
    setIsLoading(true);
    (typeof id === "number" ? doUpdate({...values, id}) : doCreate(values))
      .pipe(
        finalize(() => {
          setIsLoading(false);
        }),
      )
      .subscribe({
        next(values) {
          form.setFieldsValue(values as SetFieldsValueArg);
          navigate(routeGoBack);
        },
      });
  }, [id, doUpdate, doCreate, form, navigate, routeGoBack]);

  return [
    form,
    isLoading,
    handleCreate,
    t,
  ];
}
