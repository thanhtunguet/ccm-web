import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import Title from "antd/es/typography/Title";
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
import { cardRepository } from "src/repositories/card-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";
import CardHelp from './CardClassHelp.md';

// Import moment.js if using ES modules or if not using CDN
// import moment from 'moment';

function isTodayOrTomorrow(date: Date) {
  // Get current date without time part
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today

  // Get tomorrow's date without time part
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set to beginning of tomorrow

  // Convert input date to Date object if it's not already
  const inputDate = new Date(date);

  // Check if inputDate is either today or tomorrow
  return inputDate.getTime() >= today.getTime() && inputDate.getTime() < tomorrow.getTime();
}


export const CardMaster: FC = () => {
  const [cards, counts, isLoading, handleRefresh] = useMaster<Card>(
    cardRepository.list,
    cardRepository.count,
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
        return cardClass?.dueDate ? getNextDate(cardClass?.dueDate).format('DD/MM/YYYY') : '';
      },
    },
    {
      title: "Ngày sao kê",
      dataIndex: "cardClass",
      key: "cardClass.statementDate",
      render(cardClass: CardClass) {
        return cardClass?.statementDate ? getNextDate(cardClass?.statementDate).format('DD/MM/YYYY') : '';
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
          <Button className="mx-1" type="default" icon={<EditOutlined/>} onClick={() => {
            navigate({
              pathname: AppRoute.CARD_CREATE,
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

  const handleImportFile = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    if (files!.length > 0 ) {
      const file = files![0];
      const data: CardClass[] =  await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(cardRepository.create(record));
      }
    }
    handleRefresh();
  },[handleRefresh]);

  const [binLoading, toggleBinLoading] = useBoolean(false);

  const handleSyncBin= React.useCallback(async () => {
    toggleBinLoading();
    await firstValueFrom(cardRepository.syncBin());
    toggleBinLoading();

  },[toggleBinLoading]);

  const statementCards = React.useMemo(() => cards.filter((card) => {
    if (!card.cardClass?.statementDate) {
      return false;
    }
    const nextDate = getNextDate(card.cardClass?.statementDate);
    return isTodayOrTomorrow(nextDate.toDate());
  }),[cards]);

  const dueCards = React.useMemo(() => cards.filter((card) => {
    if (!card.cardClass?.statementDate) {
      return false;
    }
    const nextDate = getNextDate(card.cardClass.dueDate!);
    return isTodayOrTomorrow(nextDate.toDate());
  }), [cards]);

  return (
    <>
      <Title>Thẻ đến hạn sao kê </Title>
      {statementCards.length > 0 && (<Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={statementCards}
        rowKey="id"
      />)}

      <Title>Thẻ đến hạn thanh toán </Title>
      {dueCards.length > 0 && (
        <Table showHeader={true}
          loading={isLoading}
          columns={columns}
          dataSource={dueCards}
          rowKey="id"
        />
      )}

      <Title>
        Toàn bộ thẻ
      </Title>

      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={cards}
        rowKey="id"
        title={() => (
          <>
            <Button loading={binLoading} type="primary" onClick={() => {
              handleSyncBin();
            }}>
          Đồng bộ theo BIN
            </Button>
            <TableHeader
              onAdd={() => {
                navigate(AppRoute.CARD_CREATE);
              }}

              onImport={handleImportFile}
              template="/card-template.xlsx"
            />
          
          </>
        )}
        footer={() => FooterCount({counts})}
      />

      <CardHelp />
    </>
  );
};

export default CardMaster;
