import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { firstValueFrom } from "rxjs";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import readExcelFile from "src/helpers/file";
import { Customer, Store } from "src/models";
import { StoreFilter } from "src/models/Store";
import { storeRepository } from "src/repositories/store-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";

export const StoreMaster: FC = () => {
  const [stores, counts, isLoading, handleRefresh, , , pagination] = useMaster<Store, StoreFilter>(
    storeRepository.list,
    storeRepository.count,
    new StoreFilter(),
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
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mức phí (%)",
      dataIndex: "fee",
      key: "fee",
      render(fee) {
        return `${fee ?? 0}%`;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      dataIndex: nameof(Customer.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined />} onClick={() => {
            navigate({
              pathname: AppRoute.STORE_CREATE,
              search: `?id=${id}`,
            });
          }} />
          <Popconfirm
            title="Xóa mục này?"
            description="Bạn có chắc chắn muốn xóa mục này không?"
            onConfirm={() => {
              handleDelete(record)();
            }}
            onCancel={() => {
            }}
            okText="Có"
            okType="danger"
            cancelText="Không"
          >
            <Button className="mx-1" danger icon={<DeleteOutlined className="text-danger" />} />
          </Popconfirm>
        </>;
      },
    },
  ];

  const handleImportFile = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files!.length > 0) {
      const file = files![0];
      const data: Store[] = await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(storeRepository.create(record));
      }
    }
    handleRefresh();
  }, [handleRefresh]);

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={stores}
        rowKey="id"
        pagination={false}
        title={() => (
          <TableHeader
            pagination={pagination}
            onAdd={() => {
              navigate(AppRoute.STORE_CREATE);
            }}
            onImport={handleImportFile}
            template="/store-template.xlsx"
          />
        )}
        footer={() => FooterCount({ counts, pagination })}
      />
    </>
  );
};

export default StoreMaster;
