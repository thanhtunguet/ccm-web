import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { Bank } from "src/models";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { useMaster } from "src/services/use-master.ts";

const columns: ColumnProps<Bank>[] = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render(...[, , index]: [number, Bank, number]) {
      return index + 1;
    },
  },
  {
    title: "Mã",
    dataIndex: nameof(Bank.prototype.shortCode),
    key: nameof(Bank.prototype.shortCode),
  },
  {
    title: "Tên",
    dataIndex: nameof(Bank.prototype.name),
    key: nameof(Bank.prototype.name),
  },
  {
    title: "Tên rút gọn",
    dataIndex: nameof(Bank.prototype.shortName),
    key: nameof(Bank.prototype.shortName),
  },
  {
    title: "English Name",
    dataIndex: nameof(Bank.prototype.englishName),
    key: nameof(Bank.prototype.englishName),
  },
  {
    title: "BIN",
    dataIndex: nameof(Bank.prototype.bin),
    key: nameof(Bank.prototype.bin),
  },
  {
    title: "Độ dài số thẻ",
    dataIndex: nameof(Bank.prototype.cardLength),
    key: nameof(Bank.prototype.cardLength),
  },
];

export const BankMaster: FC = () => {
  const [banks, counts, isLoading] = useMaster<Bank>(
    bankRepository.list,
    bankRepository.count,
  );

  const navigate = useNavigate();

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={banks}
        rowKey="id"
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.BANK_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default BankMaster;
