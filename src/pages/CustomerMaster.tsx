import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { Customer } from "src/models";
import { Table } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { customerRepository } from "src/repositories/customer-repository.ts";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "src/config/app-route";

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
    title: "Tên",
    dataIndex: nameof(Customer.prototype.firstName),
    key: "firstName",
  },
  {
    title: "Họ",
    dataIndex: nameof(Customer.prototype.lastName),
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: nameof(Customer.prototype.email),
    key: "email",
  },
  {
    title: "Địa chỉ",
    dataIndex: nameof(Customer.prototype.address),
    key: "address",
  },
  {
    title: "SĐT",
    dataIndex: nameof(Customer.prototype.phoneNumber),
    key: "phoneNumber",
  },
];

export const CustomerMaster: FC = () => {
  const [customers, counts, isLoading] = useMaster<Customer>(
    customerRepository.list,
    customerRepository.count,
  );

  const navigate = useNavigate();

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
        footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default CustomerMaster;
