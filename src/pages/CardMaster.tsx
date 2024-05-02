import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { Card } from "src/models";
import { Table } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { cardRepository } from "src/repositories/card-repository.ts";
import { FooterCount } from "src/components/FooterCount.tsx";

const columns: ColumnProps<Card>[] = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render(...[, , index]: [number, Card, number]) {
      return index + 1;
    },
  },
  {
    title: "Số thẻ",
    dataIndex: "cardNumber",
    key: "cardNumber",
  },
  {
    title: "Tên thẻ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Interest",
    dataIndex: "interest",
    key: "interest",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];

export const CardMaster: FC = () => {
  const [cards, counts, isLoading] = useMaster<Card>(
    cardRepository.list,
    cardRepository.count,
  );

  return (
    <>
      <Table showHeader={true}
             loading={isLoading}
             columns={columns}
             dataSource={cards}
             rowKey="id"
             footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default CardMaster;
