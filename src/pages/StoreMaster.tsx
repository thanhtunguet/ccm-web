import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { Store } from "src/models";
import { Table } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { storeRepository } from "src/repositories/store-repository.ts";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { useNavigate } from "react-router-dom";

const columns: ColumnProps<Store>[] = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render(...[, , index]: [number, Store, number]) {
      return index + 1;
    },
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const StoreMaster: FC = () => {
  const [stores, counts, isLoading] = useMaster<Store>(
    storeRepository.list,
    storeRepository.count,
  );

  const navigate = useNavigate();

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={stores}
        rowKey="id"
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.STORE_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default StoreMaster;
