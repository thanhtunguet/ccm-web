import {FC} from "react";
import {ColumnProps} from "antd/lib/table";
import {Customer} from "src/models";
import {Button, Popconfirm, Table} from "antd";
import {useMaster} from "src/services/use-master.ts";
import {customerRepository} from "src/repositories/customer-repository.ts";
import {FooterCount} from "src/components/FooterCount.tsx";
import {TableHeader} from "src/components/TableHeader";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "src/config/app-route";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDelete} from "src/services/use-delete.ts";

export const CustomerMaster: FC = () => {
  const [customers, counts, isLoading] = useMaster<Customer>(
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

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={customers}
        rowKey="id"
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.CUSTOMER_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({counts})}
      />
    </>
  );
};

export default CustomerMaster;
