import { Button, Col, Form, Input, Row } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import React from "react";
import { FooterCount } from "src/components/FooterCount";
import { AppRoute } from "src/config/app-route";
import { getNextDate } from "src/helpers/date";
import { CardClass } from "src/models";
import { Bank } from "src/models/Bank";
import { bankRepository } from "src/repositories/bank-repository";
import { useDetails } from "src/services/use-details.ts";

const BankDetail = () => {
  const [form, isLoading, handleCreate, bank] = useDetails<Bank>(
    bankRepository.get,
    bankRepository.create,
    bankRepository.update,
    AppRoute.BANK,
    Bank,
  );


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
  ];

  const cardClasses = React.useMemo(() => bank?.cardClasses ?? [], [bank]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
      >
        <Row gutter={12}>
          <Col span={8}>
            {/* Display name field */}
            <Form.Item
              name={nameof(Bank.prototype.code)}
              label="Bank code"
              rules={[{required: true, message: "Please enter the bank code"}]}
            >
              <Input/>
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={12}>
          <Col span={8}>
            {/* Email field */}
            <Form.Item
              name={nameof(Bank.prototype.shortName)}
              label="Short name"
              rules={[{required: true, message: "Please enter the short name"}]}
            >
              <Input type="text"/>
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* First name field */}
            <Form.Item
              name={nameof(Bank.prototype.name)}
              label="Bank Name"
              rules={[{required: true, message: "Please enter the bank name"}]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Last name field */}
            <Form.Item
              name={nameof(Bank.prototype.englishName)}
              label="English Name"
              rules={[{required: true, message: "Please enter the English name"}]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
          </Button>
        </Form.Item>
      </Form>
      {cardClasses.length > 0 && (
        <Table showHeader={true}
          loading={isLoading}
          columns={columns}
          dataSource={bank?.cardClasses}
          rowKey="id"
        
          footer={() => FooterCount({counts: bank!.cardClasses!.length})}
        />
      )}
    </>
  );
};

export default BankDetail;
