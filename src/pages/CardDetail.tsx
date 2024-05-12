import {Button, Col, Divider, Form, Input, Row, Select, Space} from "antd";
import {AppRoute} from "src/config/app-route";
import {Card} from "src/models/Card";
import {cardRepository} from "src/repositories/card-repository";
import {useDetails} from "src/services/use-details.ts";
import {useMaster} from "src/services/use-master.ts";
import {Bank, CardClass, Customer} from "src/models";
import {bankRepository} from "src/repositories/bank-repository.ts";
import {customerRepository} from "src/repositories/customer-repository.ts";
import {cardClassRepository} from "src/repositories/card-class-repository.ts";
import {filterFunc} from "src/helpers/select.ts";
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

const CardDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Card>(
    cardRepository.get,
    cardRepository.create,
    cardRepository.update,
    AppRoute.CARD,
  );

  const [banks] = useMaster<Bank>(
    bankRepository.list,
    bankRepository.count,
  );

  const [customers, , , handleRefreshCustomer] = useMaster<Customer>(
    customerRepository.list,
    customerRepository.count,
  );

  const [cardClasses] = useMaster<CardClass>(
    cardClassRepository.list,
    cardClassRepository.count,
  );

  const [selectedBankId, setSelectedBankId] = React.useState<number | null | undefined>();

  const filteredCardClasses = React.useMemo(() => cardClasses.filter((cardClass) => {
    if (typeof selectedBankId === 'number' && !Number.isNaN(selectedBankId)) {
      return cardClass.bankId === selectedBankId;
    }
    return true;
  }), [selectedBankId, cardClasses]);

  const [customerName, setCustomerName] = React.useState<string>('');

  const handleCreateCustomer = React.useCallback(() => {
    const customer = Customer.create<Customer>();
    customer.displayName = customerName;
    customerRepository.create(customer).pipe()
      .subscribe({
        next() {
          handleRefreshCustomer();
        },
      });
  }, [customerName, handleRefreshCustomer]);

  return (
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
            label="Card Number"
            rules={[{required: true, message: "Please enter the card number"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Name field */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{required: true, message: "Please enter the name"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Sample Link field */}
          <Form.Item
            name="sampleLink"
            label="Sample Link"
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          {/* Bank ID field */}
          <Form.Item
            name="bankId"
            label="Bank"
            rules={[{required: true, message: "Please enter the bank ID"}]}
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
            name="cardClassId"
            label="Card Class"
            rules={[{required: true, message: "Please enter the card class ID"}]}
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
            label="Customer"

          >
            {/*<Select>*/}
            {/*  {customers.map((customer) => (*/}
            {/*    <Select.Option key={customer.id} value={customer.id}>*/}
            {/*      {customer.displayName}*/}
            {/*    </Select.Option>*/}
            {/*  ))}*/}
            {/*</Select>*/}
            <Select
              placeholder="Select or create new customer"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider className="my-2"/>
                  <Space className="my-1 mx-2 d-flex w-100">
                    <Input
                      placeholder="Please enter customer name"
                      value={customerName}
                      className="flex-grow-1 justify-content-start"
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<PlusOutlined/>} onClick={handleCreateCustomer}>Add
                      customer</Button>
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
            name="description"
            label="Description"
            rules={[{required: true, message: "Please enter the description"}]}
          >
            <Input.TextArea/>
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
  );
};

export default CardDetail;
