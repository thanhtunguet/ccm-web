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
import { Customer } from "src/models";
import { customerRepository } from "src/repositories/customer-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";

export const CustomerMaster: FC = () => {
  const [customers, counts, isLoading, handleRefresh, filter, handleChangePage, pagination] =useMaster<Customer>(
    customerRepository.list,
    customerRepository.count,
  );

  const navigate = useNavigate();
  const [handleDelete] = useDelete<Customer>(customerRepository.delete);

  const columns: ColumnProps<Customer>[] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(...[, , index]: [number, Customer, number]) {
        return index + 1;
      },
    },
    {
      title: "Tên khách hàng",
      dataIndex: nameof(Customer.prototype.displayName),
      key: "displayName",
    },
    {
      title: "Email",
      dataIndex: nameof(Customer.prototype.email),
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: nameof(Customer.prototype.phoneNumber),
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: nameof(Customer.prototype.address),
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
              pathname: AppRoute.CUSTOMER_CREATE,
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

  const handleImportFile = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    if (files!.length > 0 ) {
      const file = files![0];
      const data: Customer[] =  await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(customerRepository.create(record));
      }
    }
    handleRefresh();
  },[handleRefresh]);

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={customers}
        rowKey="id"
        pagination={pagination}
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.CUSTOMER_CREATE);
            }}
            onImport={handleImportFile}
            template="/customer-template.xlsx"
          />
        )}
        footer={() => FooterCount({counts})}
      />
    </>
  );
};

export default CustomerMaster;
