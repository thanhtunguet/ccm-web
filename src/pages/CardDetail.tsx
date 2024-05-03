import { SmileOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "src/config/app-route";
import { Bank, CardClass, Customer } from "src/models";
import { Card } from "src/models/Card";
import { bankRepository } from "src/repositories/bank-repository";
import { cardClassRepository } from "src/repositories/card-class-repository";
import { cardRepository } from "src/repositories/card-repository";
import { customerRepository } from "src/repositories/customer-repository";
import { useMaster } from "src/services/use-master";

const CardDetail = () => {
  // Form initialization
  const [form] = Form.useForm<Card>();
  // State for loading spinner
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // Notification hook
  const [api, contextHolder] = notification.useNotification();
  // Function to display notification
  const openNotification = React.useCallback((message: string) => {
    api.open({
      message: "Notification",
      description: message,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  }, [api]);
  // Navigation hook
  const navigate = useNavigate();
  // Form submit handler
  const onFinish = (values: Card) => {
    setIsLoading(true);
    cardRepository.create(values)
      .pipe()
      .subscribe({
        next() {
          navigate(AppRoute.CARD);
          openNotification('Card created');
        },
      });
  };

  const [customers] = useMaster<Customer>(
    customerRepository.list,
    customerRepository.count,
  );

  const [banks] = useMaster<Bank>(
    bankRepository.list,
    bankRepository.count,
  );

  const [cardClasses] = useMaster<CardClass>(
    cardClassRepository.list,
    cardClassRepository.count,
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {contextHolder}
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
          {/* Card Name field */}
          <Form.Item
            name="cardName"
            label="Card Name"
            rules={[{ required: true, message: "Please enter the card name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
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
          {/* Interest field */}
          <Form.Item
            name="interest"
            label="Interest"
            rules={[{ required: true, message: "Please enter the interest" }]}
          >
            <Input type="number" />
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
        <Col span={8}>
          {/* BIN field */}
          <Form.Item
            name="bin"
            label="BIN"
            rules={[{ required: true, message: "Please enter the BIN" }]}
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
      </Row>
      <Row gutter={12}>
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
      </Row>
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
