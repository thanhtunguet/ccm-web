import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Radio, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "react3l";
import { firstValueFrom } from "rxjs";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import { getNextDate } from "src/helpers/date";
import readExcelFile from "src/helpers/file";
import { Card, CardClass } from "src/models";
import { CardFilter } from "src/models/Card";
import { cardRepository } from "src/repositories/card-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";

enum CardType {
  ALL = 1,
  STATEMENT_DATE = 2,
  DUE_DATE = 3,
}

export const CardMaster: FC = () => {
  const [cards, counts, isLoading, handleRefresh, filter, setFilter, pagination] = useMaster<Card, CardFilter>(
    cardRepository.listByType,
    cardRepository.countByType,
    {...new CardFilter(), cardTypeId: CardType.ALL},
  );

  const navigate = useNavigate();
  const [handleDelete] = useDelete<Card>(cardRepository.delete);
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
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render(customer) {
        return <a role="button" href="#" onClick={() => {
          navigate({
            pathname: AppRoute.CUSTOMER_CREATE,
            search: `?id=${customer?.id}`,
          });
        }}>
          {customer?.displayName}
        </a>;
      },
    },
    {
      title: "Số thẻ",
      dataIndex: "number",
      key: "number",
      render(cardNumber: string) {
        return cardNumber ? `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12, 16)}` : '';
      },
    },
    {
      title: "Tên thẻ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "cardClass",
      key: "cardClass.dueDate",
      render(cardClass: CardClass) {
        return cardClass?.dueDate ? getNextDate(cardClass?.dueDate)?.format('DD/MM/YYYY') : '';
      },
    },
    {
      title: "Ngày sao kê",
      dataIndex: "cardClass",
      key: "cardClass.statementDate",
      render(cardClass: CardClass) {
        return cardClass?.statementDate ? getNextDate(cardClass?.statementDate)?.format('DD/MM/YYYY') : '';
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: nameof(Card.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined />} onClick={() => {
            navigate({
              pathname: AppRoute.CARD_CREATE,
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

  const handleImportFile = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files!.length > 0) {
      const file = files![0];
      const data: CardClass[] = await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(cardRepository.create(record));
      }
    }
    handleRefresh();
  }, [handleRefresh]);

  const [binLoading, toggleBinLoading] = useBoolean(false);

  const handleSyncBin = React.useCallback(async () => {
    toggleBinLoading();
    await firstValueFrom(cardRepository.syncBin());
    toggleBinLoading();

  }, [toggleBinLoading]);

  return (
    <>
      <Table
        showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={cards}
        rowKey="id"
        pagination={false}
        title={() => (
          <TableHeader
            pagination={pagination}
            onAdd={() => {
              navigate(AppRoute.CARD_CREATE);
            }}
            onImport={handleImportFile}
            template="/card-template.xlsx"
          >
            <Button loading={binLoading} className="mx-2" type="primary" onClick={async () => {
              await handleSyncBin();
            }}>
              Đồng bộ theo BIN
            </Button>
            <Radio.Group value={filter.cardTypeId} className="ml-2" onChange={(event) => {
              setFilter({
                ...filter,
                cardTypeId: event.target.value,
              });
            }}>
              <Radio.Button value={CardType.ALL}>Tất cả</Radio.Button>
              <Radio.Button value={CardType.STATEMENT_DATE}>Hạn sao kê</Radio.Button>
              <Radio.Button value={CardType.DUE_DATE}>Hạn thanh toán</Radio.Button>
            </Radio.Group>
          </TableHeader>
        )}
        footer={() => FooterCount({ counts, pagination })}
      />
    </>
  );
};

export default CardMaster;
