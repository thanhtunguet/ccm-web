import { SmileOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "src/config/app-route";
import { Customer } from "src/models/Customer";
import { customerRepository } from "src/repositories/customer-repository";

const CustomerDetail = () => {
  // Form initialization
  const [form] = Form.useForm<Customer>();
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
  const onFinish = (values: Customer) => {
    setIsLoading(true);
    customerRepository.create(values)
      .pipe()
      .subscribe({
        next() {
          navigate(AppRoute.CUSTOMER);
          openNotification('Customer created');
        },
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {contextHolder}
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
