import { Button, Col, Form, Input, Row } from "antd";
import { AppRoute } from "src/config/app-route";
import { Customer } from "src/models/Customer";
import { customerRepository } from "src/repositories/customer-repository";
import { useDetails } from "src/services/use-details.ts";

const CustomerDetail = () => {
  const [form, isLoading, handleCreate] = useDetails<Customer>(
    customerRepository.get,
    customerRepository.create,
    customerRepository.update,
    AppRoute.CUSTOMER,
  );

  return (
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
            label="Display Name"
            rules={[{ required: true, message: "Please enter the display name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* First name field */}
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter the first name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Last name field */}
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter the last name" }]}
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
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Phone number field */}
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter the phone number" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          {/* Address field */}
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
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

export default CustomerDetail;
