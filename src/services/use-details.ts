import {Model} from "react3l";
import {finalize, Observable} from "rxjs";
import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {Form, FormInstance} from "antd";

export function useDetails<T extends Model>(
  getDetails: (id: number) => Observable<T>,
  doCreate: (t: T) => Observable<T>,
  doUpdate: (t: T) => Observable<T>,
  routeGoBack: string,
): [
  FormInstance<T>,
  boolean,
  (values: T) => void,
] {
  const {search} = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm<T>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
          next(values: any) {
            form.setFieldsValue(values);
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
        next(values: any) {
          form.setFieldsValue(values);
          navigate(routeGoBack);
        },
      });
  }, [id, doUpdate, doCreate, form, navigate, routeGoBack]);

  return [
    form,
    isLoading,
    handleCreate,
  ];
}
