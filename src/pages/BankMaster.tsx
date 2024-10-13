import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { firstValueFrom } from "rxjs";
import { FooterCount } from "src/components/FooterCount.tsx";
import { TableHeader } from "src/components/TableHeader";
import { AppRoute } from "src/config/app-route";
import readExcelFile from "src/helpers/file";
import { Bank } from "src/models";
import { BankFilter } from "src/models/Bank";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { useDelete } from "src/services/use-delete.ts";
import { useMaster } from "src/services/use-master.ts";

export const BankMaster: FC = () => {
  const [banks, counts, isLoading, handleRefresh, , , pagination] = useMaster<Bank, BankFilter>(
    bankRepository.list,
    bankRepository.count,
    new BankFilter(),
  );

  const [handleDelete] = useDelete<Bank>(bankRepository.delete);

  const navigate = useNavigate();

  const columns: ColumnProps<Bank>[] = React.useMemo(() => [
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
      dataIndex: nameof(Bank.prototype.code),
      key: nameof(Bank.prototype.code),
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
      title: "Actions",
      dataIndex: nameof(Bank.prototype.id),
      key: "actions",
      render(id, record) {
        return <>
          <Button className="mx-1" type="default" icon={<EditOutlined />} onClick={() => {
            navigate({
              pathname: AppRoute.BANK_CREATE,
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
  ], [handleDelete, navigate]);

  const handleImportFile = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files!.length > 0) {
      const file = files![0];
      const data: Bank[] = await readExcelFile(file);
      for (const record of data) {
        await firstValueFrom(bankRepository.create(record));
      }
    }
    handleRefresh();
  }, [handleRefresh]);

  return (
    <>
      <Table showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={banks}
        rowKey="id"
        pagination={false}
        title={() => (
          <TableHeader
            pagination={pagination}
            onAdd={() => {
              navigate(AppRoute.BANK_CREATE);
            }}
            onImport={handleImportFile}
            template="/bank-template.xlsx"
          />
        )}
        footer={() => FooterCount({ counts, pagination })}
      />

    </>
  );
};

export default BankMaster;
