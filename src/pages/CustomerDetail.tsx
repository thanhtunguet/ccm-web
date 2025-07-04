import { Button, Col, Form, Input, Row } from "antd";
import { ColumnProps } from "antd/es/table";
import { Table } from "antd/lib";
import React from "react";
import { FooterCount } from "src/components/FooterCount";
import { AppRoute } from "src/config/app-route";
import { Card } from "src/models";
import { Customer } from "src/models/Customer";
import { customerRepository } from "src/repositories/customer-repository";
import { useDetails } from "src/services/use-details.ts";

const CustomerDetail = () => {
  const [form, isLoading, handleCreate, customer] = useDetails<Customer>(
    customerRepository.get,
    customerRepository.create,
    customerRepository.update,
    AppRoute.CUSTOMER,
    Customer,
  );

  const cards = React.useMemo(() => customer?.cards ?? [], [customer]);

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
      title: "Số thẻ",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Tên thẻ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

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
              name="displayName"
              label="Tên hiển thị"
              rules={[{ required: true, message: "Vui lòng nhập tên hiển thị" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={8}>
            {/* Email field */}
            <Form.Item
              name="email"
              label="Email"
            >
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Phone number field */}
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            {/* Address field */}
            <Form.Item
              name="address"
              label="Địa chỉ"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Nộp
          </Button>
        </Form.Item>
      </Form>

      {cards?.length > 0 && (
        <Table showHeader={true}
          loading={isLoading}
          columns={columns}
          dataSource={cards}
          rowKey="id"
          footer={() => FooterCount({ counts: cards!.length, pagination: false })}
        />
      )}
    </>
  );
};

export default CustomerDetail;
