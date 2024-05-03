import { Button, Col, Form, Input, Row, Select } from "antd";
import { AppRoute } from "src/config/app-route";
import { Card } from "src/models/Card";
import { cardRepository } from "src/repositories/card-repository";
import { useDetails } from "src/services/use-details.ts";
import { useMaster } from "src/services/use-master.ts";
import { Bank, CardClass, Customer } from "src/models";
import { bankRepository } from "src/repositories/bank-repository.ts";
import { customerRepository } from "src/repositories/customer-repository.ts";
import { cardClassRepository } from "src/repositories/card-class-repository.ts";

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

  const [customers] = useMaster<Customer>(
    customerRepository.list,
    customerRepository.count,
  );

  const [cardClasses] = useMaster<CardClass>(
    cardClassRepository.list,
    cardClassRepository.count,
  );

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
            name="cardNumber"
            label="Card Number"
            rules={[{ required: true, message: "Please enter the card number" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Name field */}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Sample Link field */}
          <Form.Item
            name="sampleLink"
            label="Sample Link"
            rules={[{ required: true, message: "Please enter the sample link" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={8}>
          {/* Benefits field */}
          <Form.Item
            name="benefits"
            label="Benefits"
            rules={[{ required: true, message: "Please enter the benefits" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Due Date field */}
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please enter the due date" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Statement Date field */}
          <Form.Item
            name="statementDate"
            label="Statement Date"
            rules={[{ required: true, message: "Please enter the statement date" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={8}>
          {/* Bank ID field */}
          <Form.Item
            name="bankId"
            label="Bank"
            rules={[{ required: true, message: "Please enter the bank ID" }]}
          >
            <Select>
              {banks.map((bank) => (
                <Select.Option key={bank.id} value={bank.id}>
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
            rules={[{ required: true, message: "Please enter the card class ID" }]}
          >
            <Select>
              {cardClasses.map((cardClass) => (
                <Select.Option key={cardClass.id} value={cardClass.id}>
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
            rules={[{ required: true, message: "Please enter the customer ID" }]}
          >
            <Select>
              {customers.map((customer) => (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.displayName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={8}>
          {/* Description field */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea />
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
