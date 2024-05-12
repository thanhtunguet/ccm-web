import {FC} from "react";
import {ColumnProps} from "antd/lib/table";
import {Customer, Transaction} from "src/models";
import {Button, Popconfirm, Table, Tag} from "antd";
import {useMaster} from "src/services/use-master.ts";
import {transactionRepository} from "src/repositories/transaction-repository.ts";
import {FooterCount} from "src/components/FooterCount.tsx";
import {useNavigate} from "react-router-dom";
import {TableHeader} from "src/components/TableHeader.tsx";
import {AppRoute} from "src/config/app-route.ts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDelete} from "src/services/use-delete.ts";

export const TransactionMaster: FC = () => {
  const [transactions, counts, isLoading] = useMaster<Transaction>(
    transactionRepository.list,
    transactionRepository.count,
  );

  const navigate = useNavigate();
  const [handleDelete] = useDelete<Transaction>(transactionRepository.delete);

  const columns: ColumnProps<Transaction>[] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render(...[, , index]: [number, Transaction, number]) {
        return index + 1;
      },
    },
    {
      title: "Mã giao dịch",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "ID thẻ",
      dataIndex: "cardId",
      key: "cardId",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Phí chuyển",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusId",
      key: "statusId",
      render(statusId: number) {
        if (statusId === 1) {
          return <Tag color="green">Đã nhận tiền</Tag>;
        }
        return <Tag color="yellow">Chưa nhận tiền</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: nameof(Customer.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined/>} onClick={() => {
            navigate({
              pathname: AppRoute.TRANSACTION_CREATE,
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
        dataSource={transactions}
        rowKey="id"
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.TRANSACTION_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({counts})}
      />
    </>
  );
};

export default TransactionMaster;
