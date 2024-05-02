import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { Transaction } from "src/models";
import { Table, Tag } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { transactionRepository } from "src/repositories/transaction-repository.ts";
import { FooterCount } from "src/components/FooterCount.tsx";
import { useNavigate } from "react-router-dom";
import { TableHeader } from "src/components/TableHeader.tsx";
import { AppRoute } from "src/config/app-route.ts";

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
    dataIndex: "transactionFee",
    key: "transactionFee",
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
];

export const TransactionMaster: FC = () => {
  const [transactions, counts, isLoading] = useMaster<Transaction>(
    transactionRepository.list,
    transactionRepository.count,
  );

  const navigate = useNavigate();

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
             footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default TransactionMaster;
