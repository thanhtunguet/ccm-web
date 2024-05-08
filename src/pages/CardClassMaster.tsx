import { Button, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { CardClass } from "src/models";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";
import { useMaster } from "src/services/use-master.ts";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDelete } from "src/services/use-delete.ts";
import { getNextDate } from "src/helpers/date.ts";

export const CardClassMaster: FC = () => {
  const [banks, counts, isLoading] = useMaster<CardClass>(
    cardClassRepository.list,
    cardClassRepository.count,
  );

  const navigate = useNavigate();

  const [handleDelete] = useDelete<CardClass>(cardClassRepository.delete);

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
      render(date) {
        return getNextDate(date).format('DD/MM/YYYY');
      },
    },
    {
      title: "Ngày sao kê",
      dataIndex: "statementDate",
      key: "statementDate",
      render(date) {
        return getNextDate(date).format('DD/MM/YYYY');
      },
    },
    {
      title: "Miễn lãi",
      dataIndex: "freePeriod",
      key: "freePeriod",
      render(freePeriod) {
        return (
          <span>{freePeriod} days</span>
        );
      },
    },
    {
      title: "BIN",
      dataIndex: nameof(CardClass.prototype.bin),
      key: nameof(CardClass.prototype.bin),
    },
    {
      title: "Actions",
      dataIndex: nameof(CardClass.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined />} onClick={() => {
            navigate({
              pathname: AppRoute.CARD_CLASS_CREATE,
              search: `?id=${id}`,
            });
          }} />
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
            <Button className="mx-1" danger icon={<DeleteOutlined className="text-danger" />} />
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
