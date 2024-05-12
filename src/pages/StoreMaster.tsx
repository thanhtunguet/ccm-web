import {FC} from "react";
import {ColumnProps} from "antd/lib/table";
import {Customer, Store} from "src/models";
import {Button, Popconfirm, Table} from "antd";
import {useMaster} from "src/services/use-master.ts";
import {storeRepository} from "src/repositories/store-repository.ts";
import {FooterCount} from "src/components/FooterCount.tsx";
import {TableHeader} from "src/components/TableHeader";
import {AppRoute} from "src/config/app-route";
import {useNavigate} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDelete} from "src/services/use-delete.ts";

export const StoreMaster: FC = () => {
  const [stores, counts, isLoading] = useMaster<Store>(
    storeRepository.list,
    storeRepository.count,
  );

  const navigate = useNavigate();
  const [handleDelete] = useDelete<Store>(storeRepository.delete);

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
    {
      title: "Actions",
      dataIndex: nameof(Customer.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined/>} onClick={() => {
            navigate({
              pathname: AppRoute.STORE_CREATE,
              search: `?id=${id}`,
            });
          }}/>
          <Popconfirm
            title="Delete this?"
            description="Are you sure to delete this?"
            onConfirm={() => {
              handleDelete(record)();
            }}
            onCancel={() => {
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button className="mx-1" danger icon={<DeleteOutlined className="text-danger"/>}/>
          </Popconfirm>

        </>;
      },
    },
  ];

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
        footer={() => FooterCount({counts})}
      />
    </>
  );
};

export default StoreMaster;
