import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tag } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import React from "react";
import { FooterCount } from "src/components/FooterCount";
import { AppRoute } from "src/config/app-route";
import { filterFunc } from "src/helpers/select.ts";
import { Bank, CardClass, Customer, Transaction } from "src/models";
import { BankFilter } from "src/models/Bank";
import { Card } from "src/models/Card";
import { CardClassFilter } from "src/models/CardClass";
import { CustomerFilter } from "src/models/Customer";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";
import { cardRepository } from "src/repositories/card-repository";
import { customerRepository } from "src/repositories/customer-repository.ts";
import { useDetails } from "src/services/use-details.ts";
import { useMaster } from "src/services/use-master.ts";
import { useQuickCreate } from "src/services/use-quick-create";

const CardDetail = () => {
  const [form, isLoading, handleCreate, card] = useDetails<Card>(
    cardRepository.get,
    cardRepository.create,
    cardRepository.update,
    AppRoute.CARD,
    Card,
  );

  const [banks] = useMaster<Bank, BankFilter>(
    bankRepository.list,
    bankRepository.count,
    {
      ...new BankFilter(),
      take: 10000,
    },
  );

  const [customers, , , handleRefreshCustomer] = useMaster<Customer, CustomerFilter>(
    customerRepository.list,
    customerRepository.count,
    {
      ...new CustomerFilter(),
      take: 10000,
    },
  );

  const [cardClasses] = useMaster<CardClass, CardClassFilter>(
    cardClassRepository.list,
    cardClassRepository.count,
    {
      ...new CardClassFilter(),
      take: 10000,
    },
  );

  const [selectedBankId, setSelectedBankId] = React.useState<number | null | undefined>();

  const filteredCardClasses = React.useMemo(() => cardClasses.filter((cardClass) => {
    if (typeof selectedBankId === 'number' && !Number.isNaN(selectedBankId)) {
      return cardClass.bankId === selectedBankId;
    }
    return true;
  }), [selectedBankId, cardClasses]);

  const [customerName, handleChangeCustomerName, handleCreateCustomer] = useQuickCreate<Customer>(
    customerRepository.create,
    (value) => {
      const customer = Customer.create<Customer>();
      customer.displayName = value;
      return customer;
    },
    handleRefreshCustomer,
  );

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
      title: "Mã giao dịch",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "ID thẻ",
      dataIndex: "cardId",
      key: "cardId",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Phí chuyển",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusId",
      key: "statusId",
      render(statusId: number) {
        if (statusId === 1) {
          return <Tag color="green">Đã nhận tiền</Tag>;
        }
        return <Tag color="yellow">Chưa nhận tiền</Tag>;
      },
    },
  ];

  const transactions = React.useMemo(() => card?.transactions ?? [], [card]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreate}
      >
        <Row gutter={12}>
          <Col span={8}>
            {/* Card Number field */}
            <Form.Item
              name="number"
              label="Số thẻ"
              rules={[{ required: true, message: "Vui lòng nhập số thẻ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Name field */}
            <Form.Item
              name="name"
              label="Tên"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Sample Link field */}
            <Form.Item
              name="sampleLink"
              label="Link mẫu"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            {/* Bank ID field */}
            <Form.Item
              name="bankId"
              label="Ngân hàng"
            >
              <Select showSearch={true} filterOption={filterFunc}
                onChange={(bankId) => setSelectedBankId(bankId)}>
                {banks.map((bank) => (
                  <Select.Option key={bank.id} value={bank.id} searchValue={bank.shortName}>
                    {bank.shortName} - {bank.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Card Class ID field */}
            <Form.Item
              name={nameof(Card.prototype.cardClassId)}
              label="Lớp thẻ"
            >
              <Select showSearch={true} filterOption={filterFunc} disabled={!selectedBankId}>
                {filteredCardClasses.map((cardClass) => (
                  <Select.Option key={cardClass.id} value={cardClass.id} searchValue={cardClass.name}>
                    {cardClass.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Customer ID field */}
            <Form.Item
              name="customerId"
              label="Khách hàng"

            >
              <Select
                placeholder="Chọn hoặc tạo khách hàng mới"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider className="my-2" />
                    <Space className="my-1 mx-2 d-flex w-100">
                      <Input
                        placeholder="Vui lòng nhập tên khách hàng"
                        value={customerName}
                        className="flex-grow-1 justify-content-start"
                        onChange={handleChangeCustomerName}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button type="text" icon={<PlusOutlined />} onClick={handleCreateCustomer}>
                        Thêm khách hàng
                      </Button>
                    </Space>
                  </>
                )}
                options={customers.map((customer) => ({
                  label: customer.displayName,
                  value: customer.id,
                  searchValue: customer.displayName,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={8}>
            {/* Description field */}
            <Form.Item
              name={nameof(Card.prototype.description)}
              label="Mô tả"
            >
              <Input.TextArea />
            </Form.Item>
          </Col>

        </Row>
        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Gửi
          </Button>
        </Form.Item>
      </Form>

      {transactions.length > 0 && (
        <Table showHeader={true}
          loading={isLoading}
          columns={columns}
          dataSource={card?.transactions}
          rowKey="id"
          footer={() => FooterCount({ counts: transactions!.length, pagination: false })}
        />
      )}
    </>
  );
};

export default CardDetail;
