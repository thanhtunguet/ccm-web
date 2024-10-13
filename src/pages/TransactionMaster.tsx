import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, Tag } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "react3l";
import { finalize, firstValueFrom } from "rxjs";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader.tsx";
import { VpBankStatementModal } from "src/components/VpBankStatementModal";
import { AppRoute } from "src/config/app-route.ts";
import readExcelFile from "src/helpers/file";
import { Customer, Transaction } from "src/models";
import { TransactionFilter } from "src/models/Transaction";
import { transactionRepository } from "src/repositories/transaction-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";

export const TransactionMaster: FC = () => {
  const [transactions, counts, isLoading, handleRefresh, , , pagination] = useMaster<Transaction, TransactionFilter>(
    transactionRepository.list,
    transactionRepository.count,
    new TransactionFilter(),
  );

  const navigate = useNavigate();
  const [handleDelete] = useDelete<Transaction>(transactionRepository.delete);

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
      title: "Thẻ",
      dataIndex: "card",
      key: "card",
      render(card) {
        return (
          <Button type="link" onClick={() => {
            navigate({
              pathname: AppRoute.CARD_CREATE,
              search: `?id=${card?.id}`,
            });
          }}>
            {card?.name}
          </Button>
        );
      },
    },
    {
      title: "Cửa hàng",
      dataIndex: "store",
      key: "store",
      render(store) {
        return (
          <Button type="link" onClick={() => {
            navigate({
              pathname: AppRoute.STORE_CREATE,
              search: `?id=${store?.id}`,
            });
          }}>
            {store?.name}
          </Button>
        );
      },
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      className: "text-right",
      render(content: number) {
        return content?.toLocaleString();
      },
    },
    {
      title: "Phí chuyển",
      dataIndex: "fee",
      key: "fee",
      className: "text-right",
      render(content: number) {
        return (content ?? 0)?.toLocaleString();
      },
    },
    {
      title: "Phí máy",
      dataIndex: "posFee",
      key: "posFee",
      className: "text-right",
      render(content: number) {
        return (content ?? 0)?.toLocaleString();
      },
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      className: "text-right",
      render(content: number) {
        return (content ?? 0)?.toLocaleString();
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "statusId",
      key: "statusId",
      render(statusId: number) {
        if (statusId === 2) {
          return <Tag color="green">Đã nhận tiền</Tag>;
        }
        return <Tag color="yellow">Chưa nhận tiền</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: nameof(Customer.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined />} onClick={() => {
            navigate({
              pathname: AppRoute.TRANSACTION_CREATE,
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
            okType="danger"
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
      const data: Transaction[] = await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(transactionRepository.create(record));
      }
    }
    handleRefresh();
  }, [handleRefresh]);

  const [modalOpen, toggleModal, , closeModal] = useBoolean(false);
  const [statementString, setStatementString] = React.useState<string[]>([]);
  const [modalLoading, toggleModalLoading] = useBoolean(false);

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={false}
        title={() => (
          <>
            <VpBankStatementModal 
              open={modalOpen}
              onCancel={closeModal}
              confirmLoading={modalLoading}
              onOk={() => {
                toggleModalLoading();
                transactionRepository.updateVpBankLog(statementString).pipe(
                  finalize(() => {
                    toggleModalLoading();
                    closeModal();
                    handleRefresh();
                  }),
                ).subscribe({
                  next() {
                    handleRefresh();
                  },
                  error(error: Error) {
                    console.log(error);
                  },
                });
              }} 
              onChange={
                (event) => {
                  setStatementString(event.target.value.split("\n"));
                }
              }
            />

            <TableHeader
              pagination={pagination}
              onAdd={() => {
                navigate(AppRoute.TRANSACTION_CREATE);
              }}
              onImport={handleImportFile}
              template="/transaction-template.xlsx"
            >
              <Button type="primary" onClick={() => {
                toggleModal();
              }}>
                Nhập sao kê VPBank
              </Button>
            </TableHeader>
          </>
        )}
        footer={() => FooterCount({ counts, pagination })}
      />

    </>
  );
};

export default TransactionMaster;
