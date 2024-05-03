import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { Card } from "src/models";
import { cardRepository } from "src/repositories/card-repository.ts";
import { useMaster } from "src/services/use-master.ts";

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

  const navigate = useNavigate();

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={cards}
        rowKey="id"
        title={() => (
          <TableHeader
            onAdd={() => {
              navigate(AppRoute.CARD_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default CardMaster;
