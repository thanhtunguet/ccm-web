import {Button, Popconfirm, Table} from "antd";
import {ColumnProps} from "antd/lib/table";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {FooterCount} from "src/components/FooterCount.tsx";
import {TableHeader} from "src/components/TableHeader";
import {AppRoute} from "src/config/app-route";
import {Card, CardClass} from "src/models";
import {cardRepository} from "src/repositories/card-repository.ts";
import {useMaster} from "src/services/use-master.ts";
import {useDelete} from "src/services/use-delete.ts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { getNextDate } from "src/helpers/date";
import readExcelFile from "src/helpers/file";
import { firstValueFrom } from "rxjs";
import { useBoolean } from "react3l";

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

  return (
    <>
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
    </>
  );
};

export default CardMaster;
