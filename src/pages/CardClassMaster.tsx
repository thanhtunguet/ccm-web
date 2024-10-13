import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Button, Popconfirm, Table} from 'antd';
import {ColumnProps} from 'antd/lib/table';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {firstValueFrom} from 'rxjs';
import {FooterCount} from 'src/components/FooterCount.tsx';
import {TableHeader} from 'src/components/TableHeader';
import {AppRoute} from 'src/config/app-route';
import {getNextDate} from 'src/helpers/date.ts';
import readExcelFile from 'src/helpers/file';
import {CardClass} from 'src/models';
import {CardClassFilter} from 'src/models/CardClass';
import {cardClassRepository} from 'src/repositories/card-class-repository.ts';
import {useDelete} from 'src/services/use-delete.ts';
import {useMaster} from 'src/services/use-master.ts';

export const CardClassMaster: FC = () => {
  const [banks, counts, isLoading, handleRefresh, , , pagination] = useMaster<
    CardClass,
    CardClassFilter
  >(cardClassRepository.list, cardClassRepository.count, new CardClassFilter());

  const navigate = useNavigate();

  const [handleDelete] = useDelete<CardClass>(cardClassRepository.delete);

  const columns: ColumnProps<CardClass>[] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render(...[, , index]: [number, CardClass, number]) {
        return index + 1;
      },
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bank',
      key: 'bank',
      render(bank) {
        return (
          <a
            role="button"
            href="#"
            onClick={() => {
              navigate({
                pathname: AppRoute.BANK_CREATE,
                search: `?id=${bank?.id}`,
              });
            }}>
            {bank?.name}
          </a>
        );
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render(date) {
        return getNextDate(date)?.format('DD/MM/YYYY');
      },
    },
    {
      title: 'Ngày sao kê',
      dataIndex: 'statementDate',
      key: 'statementDate',
      render(date) {
        return getNextDate(date)?.format('DD/MM/YYYY');
      },
    },
    {
      title: 'Miễn lãi',
      dataIndex: 'freePeriod',
      key: 'freePeriod',
      render(freePeriod) {
        return <span>{freePeriod} days</span>;
      },
    },
    {
      title: 'BIN',
      dataIndex: nameof(CardClass.prototype.bin),
      key: nameof(CardClass.prototype.bin),
    },
    {
      title: 'Actions',
      dataIndex: nameof(CardClass.prototype.id),
      key: 'actions',
      render(id, record) {
        return (
          <>
            <Button
              className="mx-1"
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                navigate({
                  pathname: AppRoute.CARD_CLASS_CREATE,
                  search: `?id=${id}`,
                });
              }}
            />
            <Popconfirm
              title="Delete this?"
              description="Are you sure to delete this?"
              onConfirm={() => {
                handleDelete(record)();
              }}
              onCancel={() => {}}
              okText="Yes"
              okType="danger"
              cancelText="No">
              <Button
                className="mx-1"
                danger
                icon={<DeleteOutlined className="text-danger" />}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleImportFile = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const {files} = event.target;
      if (files!.length > 0) {
        const file = files![0];
        const data: CardClass[] = await readExcelFile(file);
        for (const record of data) {
          await firstValueFrom(cardClassRepository.create(record));
        }
      }
      handleRefresh();
    },
    [handleRefresh],
  );

  return (
    <>
      <Table
        showHeader={true}
        loading={isLoading}
        columns={columns}
        dataSource={banks}
        rowKey="id"
        pagination={false}
        title={() => (
          <TableHeader
            pagination={pagination}
            onAdd={() => {
              navigate(AppRoute.CARD_CLASS_CREATE);
            }}
            onImport={handleImportFile}
            template="/card-class-template.xlsx"
          />
        )}
        footer={() => FooterCount({counts, pagination})}
      />
    </>
  );
};

export default CardClassMaster;
