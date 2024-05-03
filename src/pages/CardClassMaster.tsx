import { FC } from "react";
import { ColumnProps } from "antd/lib/table";
import { CardClass } from "src/models";
import { Table } from "antd";
import { useMaster } from "src/services/use-master.ts";
import { FooterCount } from "src/components/FooterCount.tsx";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { useNavigate } from "react-router-dom";

const columns: ColumnProps<CardClass>[] = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
    render(...[, , index]: [number, CardClass, number]) {
      return index + 1;
    },
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Ngày thanh toán",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Ngày sao kê",
    dataIndex: "statementDate",
    key: "statementDate",
  },
  {
    title: "Miễn lãi",
    dataIndex: "freePeriod",
    key: "freePeriod",
  },
  {
    title: "Ngân hàng",
    dataIndex: "bankShortName",
    key: "bankShortName",
  },
  {
    title: "Tên ngân hàng",
    dataIndex: "bankName",
    key: "bankName",
  },
];

export const CardClassMaster: FC = () => {
  const [banks, counts, isLoading] = useMaster<CardClass>(
    cardClassRepository.list,
    cardClassRepository.count,
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
              navigate(AppRoute.CARD_CLASS_CREATE);
            }}
          />
        )}
        footer={() => FooterCount({ counts })}
      />
    </>
  );
};

export default CardClassMaster;
