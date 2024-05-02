import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { Bank } from "src/models";
import { Button, Table } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { FooterCount } from "src/components/FooterCount.tsx";
import {PlusOutlined} from '@ant-design/icons';

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

  return (
    <>
      <Table showHeader={true}
             loading={isLoading}
             columns={columns}
             dataSource={banks}
             rowKey="id"
             title={() => (
               <Button type="primary" icon={<PlusOutlined />}>
                 Create
               </Button>
             )}
             footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default BankMaster;
